"use client";
import { ReservationProp } from "@/app/account/reservations/page";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format, isToday, isTomorrow, isPast, isFuture } from "date-fns";
import Link from "next/link";
import { UpdateReservation } from "./update-reservation";
import { usePathname, useSearchParams } from "next/navigation";

function checkBookingStatus(check_in: string) {
  const myDate = new Date(check_in);

  if (isToday(myDate)) {
    return "Today";
  } else if (isTomorrow(myDate)) {
    return "Tomorrow";
  } else if (isPast(myDate)) {
    return "Past";
  } else if (isFuture(myDate)) {
    return "Upcoming";
  } else {
    return "Unconfirmed";
  }
}

export default function ReservationCard({
  reservation,
  onDelete,
}: {
  reservation: ReservationProp;
  onDelete: (id: string) => void;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  function handleUpdate(booking_code: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("update", booking_code);
    const newUrl = `${pathname}?${newParams.toString()}`;
    window.history.pushState(null, "", newUrl);
  }

  const bookingStatus = checkBookingStatus(reservation.check_in);
  const isBookingPast = bookingStatus === "Past";
  const bookAgainUrl = Array.isArray(reservation?.properties)
    ? reservation?.properties[0]?.slug
    : reservation?.properties?.slug || "";

  return (
    <div
      key={reservation.id}
      // 1. ADDED 'relative' to the main card container
      className="relative border-border/40 bg-secondary dark:bg-card/60 hover:border-border/80 rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 transition-colors"
    >
      {/* 2. MOVED THE LINK OUT, ADDED 'absolute top-6 right-6' */}
      <Link
        href={`/booking-success/${reservation.booking_code}`}
        className="absolute top-6 right-6 group text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors flex gap-1 items-center"
      >
        <span className="">View Details</span>
        <HugeiconsIcon
          icon={ArrowUpRight}
          size={14}
          color="currentColor"
          strokeWidth={1.5}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
        />
      </Link>

      <div className="flex flex-col gap-2 w-full lg:w-auto flex-1">
        {/* Status is now on its own, no longer fighting with the link */}
        <p className="text-primary text-xs font-semibold tracking-wider uppercase mt-1 md:mt-0">
          {bookingStatus}
        </p>

        <div>
          {/* Replace the old h4 with this clean version */}
          <h4 className="text-xl font-serif mb-1">
            {Array.isArray(reservation?.properties)
              ? reservation?.properties[0]?.name
              : reservation?.properties?.name || "Unknown Retreat"}
          </h4>
          <p className="text-muted-foreground text-sm">
            {format(new Date(reservation.check_in), "MMM do yyyy")} —{" "}
            {format(new Date(reservation.check_out), "MMM do yyyy")}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full sm:w-auto gap-4 self-end mt-2 lg:mt-0">
        {isBookingPast ? (
          <Button variant="secondary" className="w-full lg:w-auto" asChild>
            <Link href={`/stays/${bookAgainUrl}`}>Book Again</Link>
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleUpdate(reservation.booking_code)}
            >
              Update
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => onDelete(reservation.id)}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
