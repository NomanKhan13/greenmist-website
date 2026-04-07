"use client";

// ================= IMPORTS =================
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft02FreeIcons,
  Calendar03Icon,
  CalendarCheck2,
  Home04Icon,
  Lightning,
  LockPasswordFreeIcons,
  Shield01Icon,
  UserGroupIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { differenceInDays, format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useReducer } from "react";
import { createBookingAction } from "../../_lib/booking-actions";
import { RoomDetails } from "../property-detail/rooms-list";
import { BookingDataProps } from "@/app/checkout/page";
import { formatCurrency } from "@/app/booking-success/[reference]/page";

// ================= CONSTANTS =================
const TAXES_RATE = 0.18;

// ================= TYPES =================

type UserDetailsProps = {
  firstName: string;
  lastName: string;
  email: string;
  observations: string;
};

type UserActionProps =
  | { type: "change-firstName"; data: string }
  | { type: "change-lastName"; data: string }
  | { type: "change-email"; data: string }
  | { type: "change-observations"; data: string };

export type ReservationData = {
  numNights: number;
  observations: string;
  numAdults: number;
  roomsCount: number;
  basePriceAtBooking: number;
  addOnsAtBooking: number;
  totalPriceAtBooking: number;
  room_type_id: string;
  check_in: Date;
  check_out: Date;
  property_id: string;
  booking_code: string;
  status: string;
  isPaid: boolean;
  guestId: string | null;
};

// ================= REDUCER =================

const initialState: UserDetailsProps = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe123@gmail.com",
  observations: "",
};

function userReducer(
  state: UserDetailsProps,
  action: UserActionProps,
): UserDetailsProps {
  if (action.type === "change-firstName") {
    return { ...state, firstName: action.data };
  }
  if (action.type === "change-lastName") {
    return { ...state, lastName: action.data };
  }
  if (action.type === "change-email") {
    return { ...state, email: action.data };
  }
  if (action.type === "change-observations") {
    return { ...state, observations: action.data };
  }
  return state;
}

// ================= MAIN COMPONENT =================

export default function CheckoutPage({
  roomData,
  bookingData,
}: {
  roomData: RoomDetails;
  bookingData: BookingDataProps;
}) {
  const [userDetails, dispatch] = useReducer(userReducer, initialState);

  return (
    <div className="min-h-screen pt-16 font-sans selection:bg-primary selection:text-primary-foreground relative overflow-hidden bg-background text-foreground">
      {/* 1. AMBIENT GLOW EFFECTS (The "Mist") - Uses Semantic Primary Color */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      {/* THIS COMPONENT - 
              Header (nav. back) 
              body(form + checkout details)
              footer (trust signals) 
      */}

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <Link
            href={`/stays/${roomData.property_slug}`}
            className="text-sm text-muted-foreground hover:text-foreground transition mb-6 flex items-center gap-2 group"
          >
            <HugeiconsIcon
              icon={ArrowLeft02FreeIcons}
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
              color="currentColor"
              strokeWidth={1.5}
            />
            Return to Retreat
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif mb-2 text-foreground">
            Secure Your Sanctuary
          </h1>
          <p className="text-muted-foreground">
            Complete your reservation details below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN: GUEST DETAILS */}
          <div className="lg:col-span-7">
            <GuestForm userDetails={userDetails} onDetailChange={dispatch} />
          </div>

          {/* RIGHT COLUMN: BOKING SUMMARY */}
          <div className="lg:col-span-5">
            <CheckoutSummaryCard
              roomData={roomData}
              userDetails={userDetails}
              bookingData={bookingData}
            />
          </div>
        </div>
        <TrustTiles />
      </div>
    </div>
  );
}

function GuestForm({
  userDetails,
  onDetailChange,
}: {
  userDetails: UserDetailsProps;
  onDetailChange: React.Dispatch<UserActionProps>;
}) {
  return (
    <section>
      <h2 className="text-xl font-serif mb-6 border-b border-border pb-4">
        Guest Information
      </h2>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label
              className="text-xs uppercase tracking-widest text-muted-foreground font-medium py-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full bg-muted/30 border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition placeholder:text-muted-foreground/50"
              placeholder="John"
              value={userDetails.firstName}
              onChange={(e) =>
                onDetailChange({
                  type: "change-firstName",
                  data: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-xs uppercase tracking-widest text-muted-foreground font-medium py-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full bg-muted/30 border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition placeholder:text-muted-foreground/50"
              placeholder="Doe"
              value={userDetails.lastName}
              onChange={(e) =>
                onDetailChange({
                  type: "change-lastName",
                  data: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label
            className="text-xs uppercase tracking-widest text-muted-foreground font-medium py-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full bg-muted/30 border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition placeholder:text-muted-foreground/50"
            placeholder="johndoe123@email.com"
            value={userDetails.email}
            onChange={(e) =>
              onDetailChange({ type: "change-email", data: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-xs uppercase tracking-widest text-muted-foreground font-medium py-2"
            htmlFor="observations"
          >
            Special Requests
          </label>
          <input
            type="text"
            id="observations"
            className="w-full bg-muted/30 border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition placeholder:text-muted-foreground/50"
            placeholder="Arrival time, dietary restrictions, special occasions..."
            value={userDetails.observations}
            onChange={(e) =>
              onDetailChange({
                type: "change-observations",
                data: e.target.value,
              })
            }
          />
        </div>
      </div>
    </section>
  );
}

export function CheckoutSummaryCard({
  roomData,
  bookingData,
  userDetails,
}: {
  roomData: RoomDetails;
  bookingData: BookingDataProps;
  userDetails: UserDetailsProps;
}) {
  const formattedCheckIn = format(bookingData.checkIn, "MMM dd");
  const formattedCheckOut = format(bookingData.checkOut, "MMM dd, yyyy");
  // ================= PRICE CALCULATIONS =================
  const nights = differenceInDays(bookingData.checkOut, bookingData.checkIn);
  const roomTotal = roomData.price * nights * bookingData.roomCount;
  const addonsTotal = bookingData.selectedAddons.reduce((sum, addon) => {
    const addonPrice = addon.isDailyPricing
      ? addon.price * nights * bookingData.roomCount
      : addon.price;
    return sum + addonPrice;
  }, 0);
  const subtotal = roomTotal + addonsTotal;
  const taxes = subtotal * TAXES_RATE;
  const grandTotal = subtotal + taxes;

  // ================= CHECKOUT DATA FOR SERVER =================
  const checkoutData = {
    numNights: nights,
    observations: userDetails.observations,
    numAdults: bookingData.adults,
    roomsCount: bookingData.roomCount,
    basePriceAtBooking: roomData.price,
    addOnsAtBooking: addonsTotal,
    totalPriceAtBooking: grandTotal,
    room_type_id: roomData.room_type_id,
    check_in: bookingData.checkIn,
    check_out: bookingData.checkOut,
    property_id: roomData.property_id,
  };
  const createBookingWithData = createBookingAction.bind(null, checkoutData);

  return (
    <div className="sticky top-12">
      {/* Glass Card Effect using sematic variables */}
      <div className="bg-card/40 backdrop-blur-xl border border-border p-4 sm:p-8 rounded-2xl shadow-2xl">
        {/* Property Context */}
        <div className="flex gap-4 mb-4">
          <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden relative">
            {/* Placeholder for Image */}
            <Image
              src="/hero-bg.jpg"
              alt={`photo of ${roomData.room_type_name}`}
              fill
              className="absolute inset-0"
            />
            {/* <div className="absolute inset-0 bg-muted/80" /> */}
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-primary font-bold tracking-wider uppercase mb-1">
              Property
            </p>
            <h3 className="font-serif text-lg sm:text-xl text-foreground leading-tight">
              {roomData.property_name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Munnar, Kerela
            </p>
          </div>
        </div>

        <Link
          href={`/stays/${roomData?.property_slug}?checkIn=${format(bookingData.checkIn, "yyyy-MM-dd")}&checkOut=${format(bookingData.checkOut, "yyyy-MM-dd")}&room=${bookingData.room}`}
          className="text-xs sm:text-sm p-2 block text-right text-primary hover:underline"
        >
          Edit Dates & Guests
        </Link>
        {/* Dates */}
        <div className="bg-muted/30 rounded-xl p-5 border border-border/50 space-y-4">
          <SummaryRow
            icon={Calendar03Icon}
            label="Dates"
            value={
              <span className="flex flex-col text-right leading-tight">
                <span>
                  {formattedCheckIn} - {formattedCheckOut}
                </span>
                <span className="text-[10px] text-muted-foreground font-normal">
                  ({nights} {nights > 1 ? "Nights" : "Night"})
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
                  {`${bookingData.adults} Adults` +
                    (bookingData.kids > 0 ? `, ${bookingData.kids} Kids` : "")}
                </span>
                <span className="text-[10px] text-muted-foreground font-normal">
                  ({bookingData.roomCount}{" "}
                  {bookingData.roomCount > 1 ? "rooms" : "room"})
                </span>
              </span>
            }
          />
          <SummaryRow
            icon={Home04Icon}
            label="Room"
            value={roomData.room_type_name}
          />
        </div>

        {/* DYNAMIC PRICE BREAKDOWN */}
        <div className="space-y-4 py-8">
          <h3 className="text-sm font-medium text-foreground">
            Price Breakdown
          </h3>
          <div className="space-y-3 text-sm">
            {/* Room Cost */}
            <PriceRow
              label={`₹${Number(roomData.price).toLocaleString()} x ${nights} ${nights > 1 ? "nights" : "night"}`}
              value={formatCurrency(roomTotal)}
            />

            {/* Add-ons List */}
            {bookingData.selectedAddons.length > 0 && (
              <div className="-mt-1 flex flex-col">
                {bookingData.selectedAddons.map((addon) => (
                  <div
                    key={addon.slug}
                    className="flex justify-between text-xs"
                  >
                    <span className="text-primary">+ {addon.name}</span>
                    <span>
                      ₹
                      {addon.isDailyPricing
                        ? (
                            addon.price *
                            nights *
                            bookingData.roomCount
                          ).toLocaleString()
                        : addon.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Taxes */}
            <PriceRow
              label="Taxes & Fees (18%)"
              value={formatCurrency(taxes)}
            />
            <Separator className="bg-border my-2" />
            {/* Total */}
            <div className="flex justify-between items-end pt-2">
              <span className="text-foreground font-medium text-base">
                Grand Total
              </span>
              <div className="text-right">
                <span className="text-2xl font-serif text-foreground block leading-none">
                  ₹{grandTotal.toLocaleString()}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Includes all taxes
                </span>
              </div>
            </div>
          </div>
        </div>

        <form action={createBookingWithData}>
          <input type="hidden" value={JSON.stringify(userDetails)} />
          <Button
            type="submit"
            className="w-full py-6 cursor-pointer rounded-md font-medium tracking-wide transition-all shadow-lg shadow-primary/20"
          >
            <HugeiconsIcon
              icon={LockPasswordFreeIcons}
              size={24}
              color="currentColor"
              strokeWidth={1.5}
            />
            <span>Secure Your Stay</span>
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Best price guaranteed.
        </p>
      </div>
    </div>
  );
}

export const SummaryRow = ({
  icon,
  label,
  value,
}: {
  icon: IconSvgElement;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between items-start">
    <div className="flex items-center gap-2 text-muted-foreground shrink-0">
      <HugeiconsIcon
        icon={icon}
        size={16}
        color="currentColor"
        strokeWidth={1.5}
      />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="text-foreground font-medium text-sm text-right">
      {value}
    </div>
  </div>
);

export const PriceRow = ({
  label,
  value,
  isPlus = false,
  subtext,
}: {
  label: string;
  value: string;
  isPlus?: boolean;
  subtext?: string;
}) => (
  <div
    className={`flex justify-between items-center ${isPlus ? "text-primary" : "text-muted-foreground"}`}
  >
    <div className="flex flex-col">
      <span>{label}</span>
      {subtext && <span className="text-[10px] opacity-70">{subtext}</span>}
    </div>
    <span>
      {isPlus ? "+" : ""} {value.toLocaleString()}
    </span>
  </div>
);

function TrustTiles() {
  return (
    <div className="flex justify-between gap-8 flex-wrap py-12 px-4 text-primary font-medium">
      <p className="flex items-center gap-2">
        <HugeiconsIcon
          icon={CalendarCheck2}
          size={18}
          color="currentColor"
          strokeWidth={1.5}
        />
        <span>Free cancellation up to 48h before check-in</span>
      </p>
      <p className="flex items-center gap-2">
        <HugeiconsIcon
          icon={Shield01Icon}
          size={18}
          color="currentColor"
          strokeWidth={1.5}
        />
        <span>Secure reservation</span>
      </p>
      <p className="flex items-center gap-2">
        <HugeiconsIcon
          icon={Wallet01Icon}
          size={18}
          color="currentColor"
          strokeWidth={1.5}
        />
        <span>No payment charged now</span>
      </p>
      <p className="flex items-center gap-2">
        <HugeiconsIcon
          icon={Lightning}
          size={18}
          color="currentColor"
          strokeWidth={1.5}
        />
        <span>Instant confirmation</span>
      </p>
    </div>
  );
}
