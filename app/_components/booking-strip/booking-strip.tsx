"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDown,
  Search,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSearchParams } from "next/navigation";
import { format, isValid } from "date-fns";
import useBookingSearch from "../useBookingSearch";
import { DateField } from "./date-field";
import { GuestSelector } from "./guest-selector";

export function BookingStrip({
  defaultCheckIn,
  defaultCheckOut,
  navigateToPage,
}: {
  defaultCheckIn: Date;
  defaultCheckOut: Date;
  navigateToPage?: string;
}) {
  const searchParams = useSearchParams();
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const defaultGuests = {
    adults: Number(searchParams.get("adults")) || 2,
    kids: Number(searchParams.get("kids")) || 0,
  };

  const today = new Date();
  const {
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    guestCount,
    updateGuestCount,
    handleAvailabilitySearch,
  } = useBookingSearch(
    defaultCheckIn,
    defaultCheckOut,
    defaultGuests,
    navigateToPage,
  );
  const isSearchButtonDisabled =
    !dateFrom ||
    !dateTo ||
    !isValid(new Date(dateFrom)) ||
    !isValid(new Date(dateTo)) ||
    guestCount?.adults <= 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div
        className="
    flex flex-col lg:flex-row items-stretch gap-0 overflow-hidden
    rounded-2xl
    bg-background/80 dark:bg-card/95
    backdrop-blur-xl
    border border-border/60
    shadow-lg
    shadow-black/5 dark:shadow-black/30
  "
      >
        <DateField
          label="Check-in"
          icon={
            <HugeiconsIcon
              icon={Calendar01Icon}
              size={14}
              color="currentColor"
              strokeWidth={1.5}
            />
          }
        >
          <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                id="date-from"
                className="w-full justify-between font-normal text-base h-auto py-1 px-2 hover:bg-transparent text-card-foreground"
              >
                <span className="font-medium">
                  {dateFrom ? format(dateFrom, "MMM dd yyyy") : "Pick a date"}
                </span>
                <HugeiconsIcon
                  icon={ChevronDown}
                  size={18}
                  color="currentColor"
                  strokeWidth={1.5}
                  className="text-muted-foreground"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateFrom}
                disabled={{ before: today }}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDateFrom(date);
                  setOpenFrom(false);
                  setDateTo(undefined);
                  setOpenTo(true);
                }}
              />
            </PopoverContent>
          </Popover>
        </DateField>

        <DateField
          label="Check-out"
          icon={
            <HugeiconsIcon
              icon={Calendar01Icon}
              size={14}
              color="currentColor"
              strokeWidth={1.5}
            />
          }
        >
          <Popover open={openTo} onOpenChange={setOpenTo}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                id="date-to"
                className="w-full justify-between font-normal text-base h-auto py-1 px-2 hover:bg-transparent text-card-foreground"
              >
                <span className="font-medium">
                  {dateTo
                    ? dateTo.toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Select date"}
                </span>
                <HugeiconsIcon
                  icon={ChevronDown}
                  size={18}
                  color="currentColor"
                  strokeWidth={1.5}
                  className="text-muted-foreground"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateTo}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDateTo(date);
                  setOpenTo(false);
                }}
                disabled={[
                  dateFrom ? { before: dateFrom } : { before: today },
                  today,
                ]}
              />
            </PopoverContent>
          </Popover>
        </DateField>

        {/* Guests */}
        <GuestSelector
          guestCount={guestCount}
          updateGuestCount={updateGuestCount}
        />

        {/* Search Button */}
        <div className="p-4 lg:p-3 flex items-center justify-center lg:justify-end">
          <Button
            className="w-full lg:w-48 h-full p-4 lg:py-0 rounded-lg text-base font-semibold gap-2 cursor-pointer disabled:brightness-50"
            size="lg"
            disabled={isSearchButtonDisabled}
            onClick={() =>
              handleAvailabilitySearch(dateFrom, dateTo, guestCount)
            }
          >
            <HugeiconsIcon
              icon={Search}
              size={20}
              color="currentColor"
              strokeWidth={2}
            />
            Update Search
          </Button>
        </div>
      </div>
    </div>
  );
}
