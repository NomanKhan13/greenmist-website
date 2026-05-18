import {
  checkAvailabilityByProperty,
  getAddOns,
  getRoomTypes2,
} from "@/app/_lib/data-service";
import RoomCard from "./room-card";
import BookingSheet from "../booking-drawer/booking-drawer";
import { BookingBar } from "../booking-bar";
import { GuestCountProp } from "../useBookingSearch";
import { distributeGuestsInRooms } from "@/app/checkout/page";

export interface RoomDetails {
  id: string;
  name: string;
  description: string | null;
  ideal_for: string | null;
  price_per_night: number;
  thumbnail: string | null;
  max_adults: number;
  max_kids: number;
  is_active: boolean;
  slug: string;
  size: number;
  bed_type: string;
  bed_count: number;
  total_rooms: number;
  rooms_remaining: number;
  property_slug?: string;
  property_id: string;
  property_name?: string;
}
export default async function RoomsList({
  propertySlug,
  selectedRoomSlug,
  checkIn,
  checkOut,
  guests,
  propertyId,
}: {
  propertySlug: string;
  selectedRoomSlug: string;
  checkIn: Date;
  checkOut: Date;
  guests: GuestCountProp;
  propertyId: string;
}) {
  const [roomTypes, addOns] = await Promise.all([
    await getRoomTypes2(
      propertyId,
      checkIn.toISOString(),
      checkOut.toISOString(),
      guests,
    ),
    getAddOns(),
  ]);

  let selectedRoom = null;
  selectedRoom = roomTypes.find((r: RoomDetails) => {
    const roomsRequired = distributeGuestsInRooms(
      guests.adults,
      guests.kids,
      r.max_adults,
      r.max_kids,
    );
    const isRoomAvailable =
      r.is_active && roomsRequired ? roomsRequired <= r.rooms_remaining : false;

    return r.slug === selectedRoomSlug && isRoomAvailable;
  });
  console.log("Room types:", roomTypes);

  return (
    <div className="flex flex-col scroll-m-32" id="room-collection-section">
      {roomTypes.map((room: RoomDetails, index: number) => {
        const roomsRequired = distributeGuestsInRooms(
          guests.adults,
          guests.kids,
          room.max_adults,
          room.max_kids,
        );
        return (
          <RoomCard
            key={room.slug}
            room={room}
            index={index}
            roomsRequired={roomsRequired}
          />
        );
      })}
      <BookingSheet roomDetails={selectedRoom} addOns={addOns} />
      <BookingBar
        name={selectedRoom?.name}
        price={selectedRoom?.price_per_night}
      />
    </div>
  );
}
