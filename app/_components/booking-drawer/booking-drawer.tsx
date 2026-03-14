"use client";

// ================= IMPORTS =================
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Hugeicons Imports
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import {
  Tick02Icon,
  Calendar03Icon,
  UserGroupIcon,
  Home04Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { RoomDetails } from "../property-detail/rooms-list";
import useDrawerInfo from "./use-drawer-info";
import { useSearchParams } from "next/navigation";
import { distributeGuestsInRooms } from "@/app/checkout/page";

// ================= TYPES =================
export type AddOnProps = {
  id: string;
  name: string;
  description: string;
  price: number; // Changed to number for math
  isDailyPricing: boolean;
  isActive: boolean;
  unit: number;
  slug: string;
};

// ================= UTILITIES =================

// ================= MAIN COMPONENT =================
export default function BookingSheet({
  roomDetails,
  addOns = [],
}: {
  roomDetails: RoomDetails;
  addOns: AddOnProps[];
}) {
  // hooks, states & derived values
  const searchParams = useSearchParams();
  const adults = Number(searchParams.get("adults")) || 2;
  const kids = Number(searchParams.get("kids")) || 0;

  const roomsRequired =
    distributeGuestsInRooms(
      adults,
      kids,
      roomDetails?.max_adults,
      roomDetails?.max_kids,
    ) || 0;

  const {
    selectedAddons,
    formattedCheckIn,
    formattedCheckOut,
    nights,
    isOpen,
    toggleDrawer,
    toggleAddon,
    roomTotal,
    addonsTotal,
    taxes,
    grandTotal,
    handleProceedToCheckout,
  } = useDrawerInfo(roomDetails, addOns, adults, kids, roomsRequired);

  // early returns
  if (!roomDetails) {
    console.log("check with invalid room", !roomDetails, isOpen);
    return (
      <Sheet open={isOpen} onOpenChange={toggleDrawer}>
        <RoomNotAvailable toggleDrawer={toggleDrawer} />
      </Sheet>
    );
  }
  if (roomsRequired === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={toggleDrawer}>
        <GuestLimitExceedForRoom
          adults={adults}
          kids={kids}
          roomDetails={roomDetails}
          toggleDrawer={toggleDrawer}
        />
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={toggleDrawer}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md md:max-w-lg lg:max-w-150"
      >
        {/* HEADER */}
        <SheetHeader>
          <SheetTitle className="text-2xl md:text-3xl font-serif text-foreground">
            Your Stay
          </SheetTitle>
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest">
            Confirm Details
          </p>
        </SheetHeader>

        {/* SCROLLABLE BODY */}
        <ScrollArea className="flex-1 h-96">
          <div className="space-y-8 p-6">
            {/* 1. Trip Summary Card */}
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
                      {`${adults} Adults` + (kids > 0 ? `, ${kids} Kids` : "")}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      ({roomsRequired} {roomsRequired > 1 ? "rooms" : "room"})
                    </span>
                  </span>
                }
              />
              <SummaryRow
                icon={Home04Icon}
                label="Room"
                value={roomDetails?.room_type_name}
              />
            </div>

            {/* 2. Add-ons Selection */}
            {addOns.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                  Enhance Your Stay
                </h3>

                <div className="space-y-3">
                  {addOns.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.slug);
                    return (
                      <div
                        key={addon.slug}
                        onClick={() => toggleAddon(addon.slug)}
                        className={`
                          relative cursor-pointer group select-none
                          flex items-start gap-4 p-4 rounded-xl border transition-all duration-300
                          ${
                            isSelected
                              ? "bg-primary/5 border-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                              : "bg-background border-border hover:border-primary/30"
                          }
                        `}
                      >
                        {/* Checkbox Visual */}
                        <div
                          className={`
                            mt-1 h-5 w-5 rounded-md border flex items-center justify-center transition-all duration-300
                            ${
                              isSelected
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-muted-foreground/30 group-hover:border-primary/50"
                            }
                          `}
                        >
                          {isSelected && (
                            <HugeiconsIcon
                              icon={Tick02Icon}
                              size={14}
                              strokeWidth={3}
                            />
                          )}
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4
                              className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}
                            >
                              {addon.name}
                            </h4>
                            <div className="text-right">
                              <span className="text-sm font-medium text-foreground">
                                ₹{addon.price}
                              </span>
                              {addon.isDailyPricing && (
                                <p className="text-[10px] text-muted-foreground">
                                  / night
                                </p>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed pr-4">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Price Breakdown */}
            <div className="space-y-4 pt-2 pb-4">
              <h3 className="text-sm font-medium text-foreground">
                Price Breakdown
              </h3>
              <div className="space-y-3 text-sm">
                <PriceRow
                  label={`₹${Number(roomDetails.price).toLocaleString()} x ${roomsRequired} ${roomsRequired > 1 ? "rooms" : "room"} x ${nights} nights`}
                  value={roomTotal}
                />

                {addonsTotal > 0 && (
                  <PriceRow
                    label="Selected Add-ons"
                    value={addonsTotal}
                    isPlus
                    subtext={
                      selectedAddons.length > 0
                        ? `${selectedAddons.length} items`
                        : undefined
                    }
                  />
                )}

                <PriceRow label="Taxes & Fees (18%)" value={taxes} />

                <Separator className="bg-border my-2" />

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
          </div>
        </ScrollArea>

        {/* FOOTER */}
        <SheetFooter className="p-6 border-t border-border bg-background sm:justify-center z-10">
          <div className="w-full space-y-3">
            <Button
              className="w-full py-7 rounded-lg flex items-center justify-between px-6 shadow-lg hover:shadow-xl transition-all"
              size="lg"
              onClick={handleProceedToCheckout}
            >
              <span className="font-medium">Proceed to Checkout</span>
              <div className="flex items-center gap-2 pl-4 border-l border-primary-foreground/20">
                <span>₹{grandTotal.toLocaleString()}</span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  strokeWidth={2.5}
                />
              </div>
            </Button>
            <p className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1">
              Free cancellation until 48 hours before check-in.
            </p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ================= PRESENTATIONAL COMPONENTS =================

const SummaryRow = ({
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

const PriceRow = ({
  label,
  value,
  isPlus = false,
  subtext,
}: {
  label: string;
  value: number;
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
      {isPlus ? "+" : ""} ₹{value.toLocaleString()}
    </span>
  </div>
);

export function RoomNotAvailable({
  toggleDrawer,
}: {
  toggleDrawer: (open: boolean) => void;
}) {
  return (
    <SheetContent
      side="right"
      className="flex flex-col items-center justify-center text-center p-8 space-y-6"
    >
      <HugeiconsIcon
        icon={Home04Icon}
        size={40}
        className="text-muted-foreground"
      />

      <div className="space-y-2">
        <h2 className="text-xl font-serif text-foreground">
          Room Not Available
        </h2>

        <p className="text-sm text-muted-foreground max-w-xs">
          The room you selected is no longer available for your dates. Please
          choose another room from the list.
        </p>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          toggleDrawer(false);
          document
            .getElementById("room-collection-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        View Available Rooms
      </Button>
    </SheetContent>
  );
}

export function GuestLimitExceedForRoom({
  roomDetails,
  adults,
  kids,
  toggleDrawer,
}: {
  roomDetails: RoomDetails;
  adults: number;
  kids: number;
  toggleDrawer: (open: boolean) => void;
}) {
  return (
    <SheetContent
      side="right"
      className="flex flex-col items-center justify-center text-center p-8 space-y-6"
    >
      <HugeiconsIcon
        icon={UserGroupIcon}
        size={40}
        className="text-muted-foreground"
      />

      <div className="space-y-2">
        <h2 className="text-xl font-serif text-foreground">
          Guest Limit Exceeded
        </h2>

        <p className="text-sm text-muted-foreground max-w-xs">
          {roomDetails.room_type_name} can host up to{" "}
          <strong>{roomDetails.max_adults} adults</strong>
          {` and ${roomDetails.max_kids} kids per room.`}
        </p>

        <p className="text-sm text-muted-foreground">
          Your selection:{" "}
          <strong>
            {adults} adults {kids > 0 && `and ${kids} kids`}
          </strong>
        </p>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          toggleDrawer(false);

          document
            .getElementById("date-guest-selector")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Adjust Guest Count
      </Button>
    </SheetContent>
  );
}
