// ================= IMPORTS =================

import { redirect } from "next/navigation";
import CheckoutPage from "../_components/checkout/checkout";
import { checkAvailabilityByProperty, getAddOns } from "../_lib/data-service";
import { getValidDates } from "../_utils/validation";
import { format } from "date-fns";
import { AddOnProps } from "../_components/booking-drawer/booking-drawer";

// ================= TYPES =================

export type BookingDataProps = {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  kids: number;
  room: string | null;
  roomCount: number;
  selectedAddons: AddOnProps[];
};

// ================= UTILITIES =================

export function distributeGuestsInRooms(
  adults: number,
  kids: number,
  max_adults: number,
  max_kids: number,
) {
  if (max_kids === 0 && kids > 0) {
    return null;
  }
  if (max_adults <= 0) return null;

  const adultRoomsReq = Math.ceil(adults / max_adults);
  const kidRoomsReq = max_kids > 0 ? Math.ceil(kids / max_kids) : 0;

  if (adults < kidRoomsReq) {
    return null;
  }

  return Math.max(adultRoomsReq, kidRoomsReq);
}

export function sanitizeCheckoutQuery(query: {
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  kids?: string;
  room?: string;
  roomCount?: string;
  addons?: string;
}) {
  const adults = Math.min(20, Math.max(1, Number(query.adults) || 2));
  const kids = Math.min(10, Math.max(0, Number(query.kids) || 0));

  const addons = query.addons?.split(",") ?? [];

  return {
    rawCheckIn: query.checkIn,
    rawCheckOut: query.checkOut,
    adults,
    kids,
    room: query.room ?? null,
    roomCount: Number(query.roomCount) || 1, // bcz in worst case adult is 2 || 1
    addons,
  };
}

export function buildCheckoutUrl(data: {
  checkIn: string;
  checkOut: string;
  adults: number;
  kids: number;
  room: string | null;
  roomCount: number;
  addons: string[];
}) {
  const params = new URLSearchParams();

  params.set("checkIn", data.checkIn);
  params.set("checkOut", data.checkOut);
  params.set("adults", String(data.adults));
  params.set("kids", String(data.kids));

  if (data.room) params.set("room", data.room);

  params.set("roomCount", String(data.roomCount));

  if (data.addons.length) {
    params.set("addons", data.addons.join(","));
  }

  return `/checkout?${params.toString()}`;
}

// ================= MAIN COMPONENT =================

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const query = await searchParams;

  const { rawCheckIn, rawCheckOut, adults, kids, room, addons } =
    sanitizeCheckoutQuery(query);

  const { checkIn, checkOut } = getValidDates(rawCheckIn, rawCheckOut);
  const formattedCheckIn = format(checkIn, "yyyy-MM-dd");
  const formattedCheckOut = format(checkOut, "yyyy-MM-dd");

  const [roomData, allAddOns] = await Promise.all([
    checkAvailabilityByProperty(
      new Date(formattedCheckIn),
      new Date(formattedCheckOut),
      { adults: Number(adults) || 2, children: Number(kids) || 0 },
      null,
      null,
      room,
    ),
    getAddOns(),
  ]);

  if (!roomData?.length) {
    redirect("/");
  }

  const selectedAddons = allAddOns?.filter((addOn) =>
    addons?.includes(addOn.slug),
  );

  const roomsRequired = distributeGuestsInRooms(
    Number(adults),
    Number(kids),
    roomData.at(0).max_adults,
    roomData.at(0).max_kids,
  );

  if (roomsRequired === null) {
    redirect(
      `/stays/${roomData?.at(0).property_slug}?checkIn=${format(checkIn, "yyyy-MM-dd")}&checkOut=${format(checkOut, "yyyy-MM-dd")}&room=${room}&adults=${adults}&kids=${kids}&showBooking=true`,
    );
  }

  const canonicalUrl = buildCheckoutUrl({
    checkIn: formattedCheckIn,
    checkOut: formattedCheckOut,
    adults: adults,
    kids: kids,
    room: room,
    roomCount: roomsRequired,
    addons: selectedAddons.map((a) => a.slug),
  });

  if (`/checkout?${new URLSearchParams(query).toString()}` !== canonicalUrl) {
    redirect(canonicalUrl);
  }

  const bookingData: BookingDataProps = {
    checkIn,
    checkOut,
    adults: adults,
    kids: kids,
    room,
    roomCount: roomsRequired,
    selectedAddons,
  };

  return (
    <div className="min-h-screen">
      <CheckoutPage roomData={roomData[0]} bookingData={bookingData} />
    </div>
  );
}
