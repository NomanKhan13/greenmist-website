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

type BookingSuccessProps = {
  params: Promise<{
    reference: string;
  }>;
};
const SUPABASE_BASE_IMG_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_IMG_URL;
export default async function BookingSuccess({ params }: BookingSuccessProps) {
  const { reference } = await params;
  const bookingData = await bookingExist(reference);
  const propertyName = bookingData?.properties?.name;
  const roomName = bookingData?.roomType?.name;
  console.log("The room type is", bookingData?.properties?.name);

  const checkInDate = bookingData?.check_in
    ? new Date(bookingData.check_in)
    : new Date();
  const checkOutDate = bookingData?.check_out
    ? new Date(bookingData.check_out)
    : new Date();

  const formatedCheckIn = format(checkInDate, "MMM dd");
  const formatedCheckOut = format(checkOutDate, "MMM dd, yyyy");
  const numNights = differenceInDays(checkOutDate, checkInDate) || 1;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 pt-24 pb-12 bg-background">
      {/* Background Setup */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-primary/10 blur-[150px] rounded-full opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <p className="text-sm text-muted-foreground mb-2 tracking-wide uppercase">
            Reservation Confirmed
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
            Your Sanctuary Awaits
          </h1>
          <p className="text-muted-foreground">
            Booking reference{" "}
            <span className="text-foreground font-medium">#{reference}</span>
          </p>
        </div>

        {/* Main Summary Card */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Property Info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="size-16 rounded-lg bg-secondary/50 border border-border/50 shrink-0 overflow-hidden relative">
              <Image
                src={`${SUPABASE_BASE_IMG_URL}${bookingData.properties.thumbnail}`}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] text-primary font-bold tracking-widest uppercase mb-1">
                Property
              </p>
              <h2 className="text-lg font-serif text-foreground">
                {propertyName}
              </h2>
              <p className="text-xs text-muted-foreground">Munnar, Kerala</p>
            </div>
          </div>

          {/* Booking Details Box */}
          <div className="border border-border/50 bg-secondary/30 rounded-xl p-5 space-y-5 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <HugeiconsIcon
                  icon={Calendar01Icon}
                  size={18}
                  strokeWidth={1.5}
                />
                <span className="text-sm">Dates</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {formatedCheckIn} - {formatedCheckOut}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ({numNights} Nights)
                </p>
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <HugeiconsIcon
                  icon={UserGroup02FreeIcons}
                  size={18}
                  strokeWidth={1.5}
                />
                <span className="text-sm">Guests</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {bookingData?.numAdults} Adult
                  {bookingData?.numAdults > 1 ? "s" : ""}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ({bookingData.roomsCount} room
                  {bookingData.roomsCount > 1 ? "s" : ""})
                </p>
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <HugeiconsIcon icon={Home01Icon} size={18} strokeWidth={1.5} />
                <span className="text-sm">Room</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {roomName}
                </p>
              </div>
            </div>
          </div>

          {/* Price Breakdown Section */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-foreground mb-4">
              Price Breakdown
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>
                  {formatCurrency(bookingData.basePriceAtBooking)} per night x{" "}
                  {numNights} night
                  {numNights > 1 ? "s" : ""} x {bookingData.roomsCount} room
                  {bookingData.roomsCount > 1 ? "s" : ""}
                </span>
                <span className="text-foreground">
                  {formatCurrency(bookingData.roomType.pricePerNight)}
                </span>
              </div>

              <div className="flex justify-between text-primary text-xs">
                <span>+ Add Ons</span>
                <span>{formatCurrency(bookingData.addOnsAtBooking)}</span>
              </div>

              <div className="flex justify-between text-muted-foreground pt-1">
                <span>Taxes & Fees (18%)</span>
                <span className="text-foreground">
                  {formatCurrency(bookingData.basePriceAtBooking * 0.18)}
                </span>
              </div>
            </div>

            <div className="my-5 border-t border-border/50" />

            <div className="flex justify-between items-end">
              <span className="text-base font-medium text-foreground mb-1">
                Grand Total
              </span>
              <div className="text-right">
                <span className="text-2xl font-serif text-foreground">
                  {formatCurrency(bookingData.totalPriceAtBooking)}
                </span>
                <p className="text-[10px] text-muted-foreground mt-1 tracking-wide">
                  Includes all taxes
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-primary text-primary-foreground py-4 rounded-lg hover:bg-primary/90 transition text-sm font-medium shadow-lg shadow-primary/20">
              Manage Reservation
            </button>

            <button className="w-full border border-border text-foreground/80 py-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition text-sm font-medium flex items-center justify-center gap-2">
              <HugeiconsIcon icon={Download} size={18} strokeWidth={1.5} />
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
