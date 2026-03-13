"use client";

import { format, isValid } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export type GuestCountProp = {
  adults: number;
  kids: number;
};

export default function useBookingSearch(
  defaultCheckIn: Date,
  defaultCheckOut: Date,
  defaultGuests: GuestCountProp,
  navigateToPage?: string,
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [dateFrom, setDateFrom] = useState<Date | undefined>(defaultCheckIn);
  const [dateTo, setDateTo] = useState<Date | undefined>(defaultCheckOut);
  const [guestCount, setGuestCount] = useState<GuestCountProp>(defaultGuests);

  const updateGuestCount = (type: "adults" | "kids", increment: boolean) => {
    setGuestCount((prev) => ({
      ...prev,
      [type]: increment
        ? prev[type] + 1
        : Math.max(type === "adults" ? 1 : 0, prev[type] - 1),
    }));
  };

  async function handleAvailabilitySearch(
    startDate: Date | undefined,
    endDate: Date | undefined,
    guests: GuestCountProp,
  ) {
    if (
      !startDate ||
      !endDate ||
      !isValid(new Date(startDate)) ||
      !isValid(new Date(endDate)) ||
      guests.adults <= 0
    )
      return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("checkIn", format(startDate, "yyyy-MM-dd"));
    params.set("checkOut", format(endDate, "yyyy-MM-dd"));
    params.set("adults", guests.adults.toString());
    params.set("kids", guests.kids.toString());
    params.delete("room");

    const destinationPath = navigateToPage ? `/${navigateToPage}` : pathname;
    if (navigateToPage && pathname !== destinationPath) {
      router.push(`${destinationPath}?${params.toString()}`, { scroll: true });
    } else {
      router.replace(`${destinationPath}?${params.toString()}`, {
        scroll: false,
      });
    }
  }

  return {
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    guestCount,
    updateGuestCount,
    handleAvailabilitySearch,
  };
}
