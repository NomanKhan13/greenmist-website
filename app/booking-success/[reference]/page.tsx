import { bookingExist } from "@/app/_lib/data-service";
import {
  Calendar01Icon,
  Check,
  Download,
  MapPin,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format } from "date-fns";

export default async function BookingSuccess({ params }) {
  const { reference } = await params;
  console.log(reference);

  const bookingData = await bookingExist(reference);
  console.log("bookingData", bookingData);

  const formatedCheckIn = format(bookingData?.check_in, "MMM dd");
  const formatedCheckOut = format(bookingData?.check_out, "MMM dd, yyyy");
  console.log(formatedCheckIn);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20 p-6 relative overflow-hidden text-foreground">
      {/* Background Image with Heavy Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        {/* Placeholder for hero image */}
        <div className="w-full h-full bg-muted/20 bg-cover bg-center grayscale" />
      </div>
      {/* Gradient fade using background color */}
      <div className="absolute inset-0 z-0 bg-linear-to-t from-background via-background/90 to-background/60" />

      {/* Content Card - Glassmorphism using 'card' variable */}
      <div className="relative z-10 max-w-lg w-full bg-card/40 backdrop-blur-2xl border border-border p-4 sm:p-8 md:p-12 rounded-2xl text-center shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        {/* Success Icon - Uses Primary Color for Glow */}
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20 text-primary shadow-[0_0_30px_rgba(0,0,0,0)] shadow-primary/20">
          <HugeiconsIcon
            icon={Check}
            size={32}
            color="currentColor"
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">
          You are going to Munnar.
        </h1>
        <p className="text-muted-foreground mb-8">
          Reservation #{reference} confirmed.
        </p>

        {/* Itinerary Snippet */}
        <div className="bg-muted/30 rounded-xl p-6 mb-8 border border-border text-left space-y-4">
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <HugeiconsIcon
                icon={MapPin}
                size={16}
                color="currentColor"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-foreground font-medium">
                {bookingData?.properties?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {bookingData?.roomType?.name} • {bookingData?.numAdults} Guests
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <HugeiconsIcon
                icon={Calendar01Icon}
                size={16}
                color="currentColor"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-foreground font-medium">
                {formatedCheckIn} - {formatedCheckOut}
              </p>
              <p className="text-sm text-muted-foreground">
                Check-in after 12:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {/* Primary Action */}
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition font-medium shadow-lg shadow-primary/10">
            Manage Reservation
          </button>

          {/* Secondary Action */}
          <button className="w-full bg-transparent border border-border text-muted-foreground py-3 rounded-md hover:bg-muted/50 hover:text-foreground transition flex items-center justify-center gap-2">
            <HugeiconsIcon
              icon={Download}
              size={16}
              color="currentColor"
              strokeWidth={1.5}
            />{" "}
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
