import { bookingExist } from "@/app/_lib/data-service";
import {
  Calendar01Icon,
  Download,
  Home01Icon,
  UserGroup02FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format, differenceInDays } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type BookingSuccessProps = {
  params: Promise<{
    reference: string;
  }>;
};

export default async function BookingSuccess({ params }: BookingSuccessProps) {
  const { reference } = await params;
  const bookingData = await bookingExist(reference);

  // Safely extract names
  const propertyName = bookingData?.properties?.[0]?.name;

  const roomName = bookingData?.roomType?.[0]?.name;

  // Date formatting and calculations
  const checkInDate = bookingData?.check_in
    ? new Date(bookingData.check_in)
    : new Date();
  const checkOutDate = bookingData?.check_out
    ? new Date(bookingData.check_out)
    : new Date();

  const formatedCheckIn = format(checkInDate, "MMM dd");
  const formatedCheckOut = format(checkOutDate, "MMM dd, yyyy");
  const numNights = differenceInDays(checkOutDate, checkInDate);

  return (
    <div className="min-h-screen relative flex items-center justify-center pt-24 pb-12 p-6 font-sans">
      {/* Background Setup - Matching the dark theme with a subtle green glow */}
      <div className="absolute inset-0 z-0 bg-[#0A0D0A] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Header - Matching "Secure Your Sanctuary" style */}
        <div className="mb-8 text-center sm:text-left">
          <p className="text-sm text-muted-foreground mb-2 tracking-wide uppercase">
            Reservation Confirmed
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">
            Your Sanctuary Awaits
          </h1>
          <p className="text-white/60">
            Booking reference{" "}
            <span className="text-white font-medium">#{reference}</span>
          </p>
        </div>

        {/* Main Summary Card - Mirroring the Checkout Right Panel */}
        <div className="bg-[#111312]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Property Info */}
          <div className="flex items-center gap-4 mb-8">
            {/* Placeholder for Property Image (Matches checkout thumbnail) */}
            <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden relative">
              {/* <Image src={...} alt="..." fill className="object-cover" /> */}
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent" />
            </div>
            <div>
              <p className="text-[10px] text-primary font-bold tracking-widest uppercase mb-1">
                Property
              </p>
              <h2 className="text-lg font-serif text-white">{propertyName}</h2>
              <p className="text-xs text-white/50">Munnar, Kerala</p>
            </div>
          </div>

          {/* Booking Details Box - Mirroring the Drawer layout */}
          <div className="border border-white/10 bg-white/5 rounded-xl p-5 space-y-5 mb-8">
            {/* Dates */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-white/60">
                <HugeiconsIcon
                  icon={Calendar01Icon}
                  size={18}
                  strokeWidth={1.5}
                />
                <span className="text-sm">Dates</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {formatedCheckIn} - {formatedCheckOut}
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                  ({numNights} Nights)
                </p>
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-white/60">
                <HugeiconsIcon
                  icon={UserGroup02FreeIcons}
                  size={18}
                  strokeWidth={1.5}
                />
                <span className="text-sm">Guests</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {bookingData?.numAdults} Adult
                  {bookingData?.numAdults > 1 ? "s" : ""}
                </p>
                <p className="text-xs text-white/50 mt-0.5">(1 room)</p>
              </div>
            </div>

            {/* Room */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-white/60">
                <HugeiconsIcon icon={Home01Icon} size={18} strokeWidth={1.5} />
                <span className="text-sm">Room</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">{roomName}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-primary text-black py-4 rounded-lg hover:bg-primary/90 transition-all font-medium text-sm flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              Manage Reservation
            </button>

            <button className="w-full bg-transparent border border-white/10 text-white/80 py-4 rounded-lg hover:bg-white/5 hover:text-white transition-colors font-medium text-sm flex items-center justify-center gap-2">
              <HugeiconsIcon icon={Download} size={18} strokeWidth={1.5} />
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
