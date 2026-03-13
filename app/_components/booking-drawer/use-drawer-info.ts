"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { getValidDates } from "../../_utils/validation";
import { differenceInDays, format } from "date-fns";
import { RoomDetails } from "../property-detail/rooms-list";
import { AddOnProps } from "./booking-drawer";
import { customAlphabet } from "nanoid/non-secure";

export default function useDrawerInfo(
  roomDetails: RoomDetails,
  addOns: AddOnProps[],
  adults: number,
  kids: number,
  roomsRequired: number,
) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  // --- 1. Date & Guest Logic ---
  const { checkIn, checkOut } = getValidDates(
    searchParams.get("checkIn")?.toString(),
    searchParams.get("checkOut")?.toString(),
  );

  const formattedCheckIn = format(checkIn, "MMM dd");
  const formattedCheckOut = format(checkOut, "MMM dd, yyyy");
  const nights = differenceInDays(checkOut, checkIn);

  // --- 2. Drawer State Logic ---
  const isBookingMode = searchParams.get("showBooking") === "true";
  // const isOpen = !!roomDetails && isBookingMode;
  const isOpen = isBookingMode;

  function toggleDrawer(open: boolean) {
    if (!open) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("showBooking");
      router.replace(`?${newParams.toString()}`, { scroll: false });
    }
  }

  const toggleAddon = (slug: string) => {
    setSelectedAddons((prev) =>
      prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug],
    );
  };

  // --- 3. Financial Calculations (Memoized for performance) ---
  const { roomTotal, addonsTotal, taxes, grandTotal } = useMemo(() => {
    const rTotal = Number(roomDetails?.price || 0) * nights * roomsRequired;

    // UX FIX: Calculate daily pricing correctly
    const aTotal = addOns
      .filter((addon) => selectedAddons.includes(addon.slug))
      .reduce((sum, addon) => {
        const cost = addon.isDailyPricing
          ? addon.price * nights * roomsRequired
          : addon.price;
        return sum + cost;
      }, 0);

    const taxAmount = (rTotal + aTotal) * 0.18; // Standard Hotel GST is usually 12-18%, adjusted to 18 for safety
    const gTotal = rTotal + aTotal + taxAmount;

    return {
      roomTotal: rTotal,
      addonsTotal: aTotal,
      taxes: taxAmount,
      grandTotal: gTotal,
    };
  }, [roomDetails?.price, nights, addOns, selectedAddons, roomsRequired]);

  // --- 4. Navigation Logic ---
  function handleProceedToCheckout() {
    const params = new URLSearchParams();
    const { checkIn, checkOut } = getValidDates(
      searchParams.get("checkIn")?.toString(),
      searchParams.get("checkOut")?.toString(),
    );

    params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    params.set("checkOut", format(checkOut, "yyyy-MM-dd"));
    params.set("adults", adults.toString());
    params.set("kids", kids.toString());
    params.set("room", roomDetails?.slug || "");
    params.set("roomCount", roomsRequired.toString());
    // const generateBookingCode = customAlphabet(
    //   "23456789ABCDEFGHJKLMNPQRSTUVWXYZ",
    //   6,
    // );
    // const booking_code = `GM-${generateBookingCode()}`;

    // params.set("bookingCode", booking_code);

    // LOGIC FIX: Pass the selected addons to checkout
    if (selectedAddons.length > 0) {
      params.set("addons", selectedAddons.join(","));
    }

    router.push(`/checkout?${params.toString()}`);
  }

  return {
    selectedAddons,
    formattedCheckIn,
    formattedCheckOut,
    nights,
    adults,
    kids,
    isOpen,
    toggleDrawer,
    toggleAddon,
    roomTotal,
    addonsTotal,
    taxes,
    grandTotal,
    handleProceedToCheckout,
  };
}
