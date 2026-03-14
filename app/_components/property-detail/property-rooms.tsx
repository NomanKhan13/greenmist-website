import RoomsList from "./rooms-list";
import { BookingStrip } from "../booking-strip/booking-strip";
import { Suspense } from "react";
import GreenMistLoaderMini from "../greenmist-loader-mini";

export default async function PropertyRooms({
  propertySlug,
  selectedRoomSlug,
  initialCheckIn,
  initialCheckOut,
  initialGuest,
}: {
  propertySlug: string;
  selectedRoomSlug: string;
  initialCheckIn: Date;
  initialCheckOut: Date;
  initialGuest: {
    adults: number;
    kids: number;
  };
}) {
  return (
    <div>
      <div className="mb-8 md:mb-12 text-center">
        <span className="block text-[0.65rem] md:text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-3">
          The Collection
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-foreground">
          Choose Your Sanctuaries
        </h2>
      </div>
      <div className="mb-10">
        <BookingStrip
          defaultCheckIn={initialCheckIn}
          defaultCheckOut={initialCheckOut}
        />
      </div>
      <Suspense fallback={<GreenMistLoaderMini />}>
        <RoomsList
          propertySlug={propertySlug}
          selectedRoomSlug={selectedRoomSlug}
          checkIn={initialCheckIn}
          checkOut={initialCheckOut}
          guests={initialGuest}
        />
      </Suspense>
    </div>
  );
}
