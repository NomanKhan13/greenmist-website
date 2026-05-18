"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  addDays,
  differenceInCalendarDays,
  format,
  startOfDay,
} from "date-fns";
import { useState, useTransition } from "react";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import {
  Calendar01Icon,
  Calendar03Icon,
  ChevronDown,
  Home04Icon,
  PartyPopper,
  UserGroupIcon,
  Alert01Icon, // MENTOR NOTE: Added this icon for the unavailable state
} from "@hugeicons/core-free-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GuestSelector } from "../booking-strip/guest-selector";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { toast } from "sonner";

import { ReservationProp } from "@/app/account/reservations/page";
import { existingBookedRooms } from "@/app/_lib/data-service";
import { distributeGuestsInRooms } from "@/app/checkout/page";
import { AddOnProps } from "../booking-drawer/booking-drawer";
import { updateReservation } from "@/app/_lib/booking-actions";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

// MENTOR NOTE: Explicit state types prevent "boolean traps"
type AvailabilityStatus = "idle" | "success" | "error";

export function UpdateReservation({
  reservations,
  addOnsData,
}: {
  reservations: ReservationProp[] | null;
  addOnsData: AddOnProps[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const bookingCode = searchParams.get("update") || null;
  const isOpen = !!bookingCode;

  const reservationToUpdate =
    reservations?.find((res) => res.booking_code === bookingCode) || null;

  function handleClose() {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("update");
    router.replace(`${pathname}?${newParams.toString()}`);
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl mt-6">Modify Reservation</SheetTitle>
          <SheetDescription>
            Adjust your dates, guest count, or add experiences to your retreat.
          </SheetDescription>
        </SheetHeader>

        {!reservationToUpdate ? (
          <div className="py-10">
            <p className="text-center text-muted-foreground">
              Reservation not found. Please try again.
            </p>
          </div>
        ) : (
          <ReservationEditor
            key={reservationToUpdate.booking_code}
            reservation={reservationToUpdate}
            addOnsData={addOnsData}
            onCancel={handleClose}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: IconSvgElement;
  label: string;
  value: React.ReactNode;
}) {
  return (
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
}

const PriceRow = ({
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
    <span className="text-foreground font-medium">
      {isPlus ? "+" : ""} {value}
    </span>
  </div>
);

function ReservationEditor({
  reservation,
  addOnsData,
  onCancel,
}: {
  reservation: ReservationProp;
  addOnsData: AddOnProps[];
  onCancel: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);
  const dayAfterTomorrow = addDays(today, 2);

  const from = reservation?.check_in
    ? new Date(reservation.check_in)
    : tomorrow;
  const to = reservation?.check_out
    ? new Date(reservation.check_out)
    : dayAfterTomorrow;

  const defaultGuest = {
    adults: reservation?.numAdults || 2,
    kids: reservation?.numKids || 0,
  };

  const [dateFrom, setDateFrom] = useState<Date | undefined>(from);
  const [dateTo, setDateTo] = useState<Date | undefined>(to);
  const [guestCount, setGuestCount] = useState(defaultGuest);
  const [isChecking, setIsChecking] = useState(false);

  // MENTOR NOTE: Replaced boolean with our explicit enum status
  const [availabilityStatus, setAvailabilityStatus] =
    useState<AvailabilityStatus>("idle");

  const [selectedAddons, setSelectedAddons] = useState<
    { id: string; isDailyPricing: boolean; price: number }[]
  >(reservation?.add_ons || []);

  const hasModifications = !(
    dateFrom?.getTime() === from.getTime() &&
    dateTo?.getTime() === to.getTime() &&
    guestCount.adults === defaultGuest.adults &&
    guestCount.kids === defaultGuest.kids
  );

  function updateGuestCount(type: "adults" | "kids", increment: boolean) {
    setGuestCount((prev) => ({
      ...prev,
      [type]: increment
        ? prev[type] + 1
        : Math.max(type === "adults" ? 1 : 0, prev[type] - 1),
    }));
    setAvailabilityStatus("idle"); // Reset to idle on change
  }

  function handleAddonToggle(checked: boolean | string, addOn: AddOnProps) {
    if (checked) {
      setSelectedAddons((prev) => [
        ...prev,
        {
          id: addOn.id,
          isDailyPricing: addOn.isDailyPricing,
          price: addOn.price,
        },
      ]);
    } else {
      setSelectedAddons((prev) =>
        prev.filter((addon) => addon.id !== addOn.id),
      );
    }
  }

  // MENTOR NOTE: Derived boolean for convenience in our UI calculations below
  const isConfirmedAvailable = availabilityStatus === "success";

  const roomCapacityAdults =
    reservation?.roomType && !Array.isArray(reservation?.roomType)
      ? reservation?.roomType?.maxAdults
      : 0;
  const roomCapacityKids =
    reservation?.roomType && !Array.isArray(reservation?.roomType)
      ? reservation?.roomType?.maxKids
      : 0;

  const roomsRequired = isConfirmedAvailable
    ? distributeGuestsInRooms(
        guestCount.adults,
        guestCount.kids,
        roomCapacityAdults,
        roomCapacityKids,
      )
    : reservation?.roomsCount;

  async function handleCheckAvailability() {
    if (!dateFrom || !dateTo || !hasModifications) return;

    try {
      setIsChecking(true);
      setAvailabilityStatus("idle"); // Clear any previous errors

      const roomId = !Array.isArray(reservation?.roomType)
        ? reservation?.roomType?.id
        : null;
      const remainingRooms = await existingBookedRooms(
        { dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() },
        roomId,
      );

      const isDateUnchanged =
        dateFrom.getTime() === from.getTime() &&
        dateTo.getTime() === to.getTime();

      const availableRoomsCount = isDateUnchanged
        ? Number(remainingRooms) + Number(reservation?.roomsCount || 0)
        : Number(remainingRooms);

      // MENTOR NOTE: Set state based on actual math result
      if (availableRoomsCount >= Number(roomsRequired)) {
        setAvailabilityStatus("success");
      } else {
        setAvailabilityStatus("error");
      }
    } catch (error) {
      console.error("Error checking availability: ", error);
      setAvailabilityStatus("error"); // Failsafe state
    } finally {
      setIsChecking(false);
    }
  }

  const safeDateFrom = dateFrom || from;
  const safeDateTo = dateTo || to;
  const nights = Math.max(
    1,
    differenceInCalendarDays(safeDateTo, safeDateFrom),
  );

  const roomPricePerNight = !Array.isArray(reservation?.roomType)
    ? reservation?.roomType?.pricePerNight
    : null;

  const roomName = !Array.isArray(reservation?.roomType)
    ? reservation?.roomType?.name
    : null;

  const roomTotal =
    roomPricePerNight && roomsRequired
      ? roomPricePerNight * nights * roomsRequired
      : 0;

  const addonsTotal = roomsRequired
    ? selectedAddons.reduce(
        (total, addOn) =>
          total + (addOn.isDailyPricing ? addOn.price * nights : addOn.price),
        0,
      ) * roomsRequired
    : 0;

  const taxes = (roomTotal + addonsTotal) * 0.18;
  const grandTotal = roomTotal + addonsTotal + taxes;

  async function handleConfirmChanges() {
    if (isPending || !dateFrom || !dateTo || !roomsRequired) return;
    const payload = {
      id: reservation.id,
      check_in: dateFrom.toISOString(),
      check_out: dateTo.toISOString(),
      numNights: nights,
      numAdults: guestCount.adults,
      numKids: guestCount.kids,
      roomsCount: roomsRequired,
      basePriceAtBooking: roomTotal,
      addOnsAtBooking: addonsTotal,
      totalPriceAtBooking: grandTotal,
      updatedAt: today,
      add_ons: selectedAddons,
    };

    startTransition(async () => {
      const result = await updateReservation(payload);
      if (result.success) {
        toast.success("Reservation updated successfully!");
      } else {
        toast.error("Reservation update failed");
      }
      onCancel();
    });
  }

  return (
    <>
      <ScrollArea className="flex-1 h-96 px-4">
        <div className="grid sm:grid-cols-2 gap-4 pb-4">
          <div className="flex flex-col gap-2 p-3 rounded-lg border border-border/40 bg-card/50">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <HugeiconsIcon icon={Calendar01Icon} size={14} /> Check-in
            </Label>
            <Popover open={openFrom} onOpenChange={setOpenFrom}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-medium justify-between hover:bg-transparent text-left"
                >
                  {dateFrom ? format(dateFrom, "MMM dd, yyyy") : "Select date"}
                  <HugeiconsIcon
                    icon={ChevronDown}
                    size={16}
                    className="text-muted-foreground"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  disabled={{ before: today }}
                  onSelect={(date) => {
                    setDateFrom(date);
                    setOpenFrom(false);
                    setOpenTo(true);
                    setAvailabilityStatus("idle"); // MENTOR NOTE: Reset status on change
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-2 p-3 rounded-lg border border-border/40 bg-card/50">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <HugeiconsIcon icon={Calendar01Icon} size={14} /> Check-out
            </Label>
            <Popover open={openTo} onOpenChange={setOpenTo}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-medium justify-between hover:bg-transparent text-left"
                >
                  {dateTo ? format(dateTo, "MMM dd, yyyy") : "Select date"}
                  <HugeiconsIcon
                    icon={ChevronDown}
                    size={16}
                    className="text-muted-foreground"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  disabled={dateFrom ? { before: dateFrom } : { before: today }}
                  onSelect={(date) => {
                    setDateTo(date);
                    setOpenTo(false);
                    setAvailabilityStatus("idle"); // MENTOR NOTE: Reset status on change
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <GuestSelector
          guestCount={guestCount}
          updateGuestCount={updateGuestCount}
        />

        <Button
          variant="outline"
          className="w-full mt-6"
          onClick={handleCheckAvailability}
          disabled={isChecking || !dateFrom || !dateTo || !hasModifications}
        >
          {isChecking ? "Checking Availability..." : "Check Availability"}
        </Button>

        {/* MENTOR NOTE: Explicit UI for our new state machine */}
        {availabilityStatus === "success" && hasModifications && (
          <p className="text-primary text-sm font-medium mx-2 mt-4 flex items-center gap-1">
            Great news! Your new dates are available.
            <HugeiconsIcon
              icon={PartyPopper}
              size={16}
              className="inline-block ml-1"
            />
          </p>
        )}

        {availabilityStatus === "error" && hasModifications && (
          <p className="text-destructive text-sm font-medium mx-2 mt-4 flex items-center gap-1">
            <HugeiconsIcon
              icon={Alert01Icon}
              size={16}
              className="inline-block"
            />
            Sorry, these dates are unavailable for your group.
          </p>
        )}

        <Separator className="my-4 opacity-75" />

        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg">Enhance Your Stay</h4>
          <FieldGroup>
            {addOnsData.map((addOn) => (
              <FieldLabel key={addOn.id}>
                <Field orientation="horizontal">
                  <Checkbox
                    id={`toggle-addon-${addOn.id}`}
                    name={`toggle-addon-${addOn.id}`}
                    checked={selectedAddons.some((a) => a.id === addOn.id)}
                    onCheckedChange={(checked) =>
                      handleAddonToggle(checked, addOn)
                    }
                  />
                  <FieldContent>
                    <FieldTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-2">
                      <p>{addOn.name}</p>
                      <p className="italic">
                        <span> ₹{addOn.price}</span>
                        <span className="text-muted-foreground text-xs ml-1">
                          {addOn.isDailyPricing && "/night"}
                        </span>
                      </p>
                    </FieldTitle>
                    <FieldDescription>
                      <span>{addOn.description}</span>
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
            ))}
          </FieldGroup>
        </div>

        <div className="border-border/40 bg-secondary dark:bg-card/40 hover:border-border/80 rounded-xl p-2.5 sm:p-5 border space-y-4 mt-8">
          <SummaryRow
            icon={Calendar03Icon}
            label="Dates"
            value={
              <span className="flex flex-col text-right leading-tight">
                <span>
                  {format(safeDateFrom, "MMM dd")} -{" "}
                  {format(safeDateTo, "MMM dd, yyyy")}
                </span>
                <span className="text-[10px] text-muted-foreground font-normal">
                  ({nights} Nights)
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
                  {`${guestCount.adults} Adults`}
                  {guestCount.kids > 0 ? `, ${guestCount.kids} Kids` : ""}
                </span>
                <span className="text-[10px] text-muted-foreground font-normal">
                  ({roomsRequired}{" "}
                  {roomsRequired && roomsRequired > 1 ? "rooms" : "room"})
                </span>
              </span>
            }
          />
          <SummaryRow
            icon={Home04Icon}
            label="Room"
            value={roomName || "N/A"}
          />
        </div>

        <div className="space-y-4 py-4 mt-4">
          <h3 className="text-sm font-medium text-foreground">
            Price Breakdown
          </h3>
          <div className="space-y-3 text-sm">
            <PriceRow
              label={`${roomPricePerNight ? formatCurrency(roomPricePerNight) : "N/A"} x ${nights} ${nights > 1 ? "nights" : "night"}`}
              value={formatCurrency(roomTotal)}
            />

            {addonsTotal > 0 && (
              <PriceRow
                label="Selected Add-ons"
                value={formatCurrency(addonsTotal)}
                isPlus
                subtext={
                  selectedAddons.length > 0
                    ? `${selectedAddons.length} items`
                    : undefined
                }
              />
            )}

            <PriceRow
              label="Taxes & Fees (18%)"
              value={formatCurrency(taxes)}
            />

            <Separator className="bg-border my-2" />

            <div className="flex justify-between items-end pt-2">
              <span className="text-foreground font-medium text-base">
                Grand Total
              </span>
              <div className="text-right">
                <span className="text-2xl font-serif text-foreground block leading-none">
                  {formatCurrency(grandTotal)}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Includes all taxes
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <SheetFooter className="mt-auto pt-6 border-t border-border/40">
        <Button
          type="button"
          variant="ghost"
          className="w-full sm:w-auto"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleConfirmChanges}
          // MENTOR NOTE: They cannot confirm unless they are unmodified, or successfully modified!
          disabled={
            isPending || (hasModifications && availabilityStatus !== "success")
          }
          className="w-full sm:w-auto"
        >
          {isPending ? "Updating..." : "Confirm Changes"}
        </Button>
      </SheetFooter>
    </>
  );
}
