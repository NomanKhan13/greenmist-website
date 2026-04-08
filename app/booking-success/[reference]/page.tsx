import { PriceRow, SummaryRow } from "@/app/_components/checkout/checkout";
import { bookingExist } from "@/app/_lib/data-service";
import {
  Calendar01Icon,
  Download,
  Home04Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";

type BookingSuccessProps = {
  params: Promise<{
    reference: string;
  }>;
};

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const SUPABASE_BASE_IMG_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_IMG_URL;

export default async function BookingSuccess({ params }: BookingSuccessProps) {
  const { reference } = await params;
  const bookingData = await bookingExist(reference);
  const propertyName = bookingData?.properties?.name;
  const roomName = bookingData?.roomType?.name;

  const checkInDate = bookingData?.check_in
    ? new Date(bookingData.check_in)
    : new Date();
  const checkOutDate = bookingData?.check_out
    ? new Date(bookingData.check_out)
    : new Date();

  const formattedCheckIn = format(checkInDate, "MMM dd");
  const formattedCheckOut = format(checkOutDate, "MMM dd, yyyy");

  if (!bookingData) {
    notFound();
  }

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
        <div className="bg-card/40 backdrop-blur-md border border-border rounded-2xl py-6 px-4 sm:px-8 shadow-2xl">
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
          <div className="border border-border/40 bg-secondary dark:bg-card/40 hover:border-border/80 rounded-xl p-5 space-y-4 mb-8">
            <SummaryRow
              icon={Calendar01Icon}
              label="Dates"
              value={
                <span className="flex flex-col text-right leading-tight">
                  <span>
                    {formattedCheckIn} - {formattedCheckOut}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-normal">
                    ({bookingData.numNights}{" "}
                    {bookingData.numNights > 1 ? "Nights" : "Night"})
                  </span>
                </span>
              }
            />

            <SummaryRow
              icon={UserGroupIcon}
              label="Guests"
              value={
                <span className="flex flex-col text-right leading-tight">
                  <span>
                    {`${bookingData.numAdults} Adults` +
                      (bookingData?.numKids > 0
                        ? `, ${bookingData.numKids} Kids`
                        : "")}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-normal">
                    ({bookingData.roomsCount}{" "}
                    {bookingData.roomsCount > 1 ? "rooms" : "room"})
                  </span>
                </span>
              }
            />
            <SummaryRow icon={Home04Icon} label="Room" value={roomName} />
          </div>

          {/* Price Breakdown Section */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-foreground mb-4">
              Price Breakdown
            </h3>
            <div className="space-y-2 text-sm">
              <PriceRow
                label={`${formatCurrency(bookingData.basePriceAtBooking)} x ${bookingData.numNights} ${bookingData.numNights > 1 ? "nights" : "night"}`}
                value={formatCurrency(bookingData.basePriceAtBooking)}
              />

              <div className="-mt-1 flex justify-between text-primary text-xs">
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
