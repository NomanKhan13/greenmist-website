import {
  checkAvailabilityByProperty,
  getAddOns,
} from "@/app/_lib/data-service";
import RoomCard from "./room-card";
import BookingSheet from "../booking-drawer/booking-drawer";
import { BookingBar } from "../booking-bar";
import { GuestCountProp } from "../useBookingSearch";

export type RoomDetails = {
  property_id: string;
  property_name: string;
  property_slug: string;
  property_image: string;
  room_type_id: string;
  room_type_name: string;
  thumbnail: string;
  ideal_for: string;
  description: string;
  size: number;
  bed_count: number;
  bed_type: string;
  max_adults: number;
  max_kids: number;
  amenities: string[];
  slug: string;
  price: number;
  rooms_left: number;
  required_rooms: number;
  is_available: boolean;
};

export default async function RoomsList({
  propertySlug,
  selectedRoomSlug,
  checkIn,
  checkOut,
  guests,
}: {
  propertySlug: string;
  selectedRoomSlug: string;
  checkIn: Date;
  checkOut: Date;
  guests: GuestCountProp;
}) {
  const [roomTypes, addOns] = await Promise.all([
    checkAvailabilityByProperty(
      checkIn,
      checkOut,
      {
        adults: guests.adults,
        children: guests.kids,
      },
      propertySlug,
      null,
      null,
    ),
    getAddOns(),
  ]);

  let selectedRoom = null;
  selectedRoom = roomTypes.find(
    (r: RoomDetails) => r.slug === selectedRoomSlug && r.is_available,
  );
  console.log("Selected room: ", selectedRoom);

  return (
    <div className="flex flex-col scroll-m-32" id="room-collection-section">
      {roomTypes.map((room: RoomDetails, index: number) => {
        return <RoomCard key={room.room_type_id} room={room} index={index} />;
      })}
      <BookingSheet roomDetails={selectedRoom} addOns={addOns} />
      <BookingBar
        name={selectedRoom?.property_name}
        price={selectedRoom?.price}
      />
    </div>
  );
}
