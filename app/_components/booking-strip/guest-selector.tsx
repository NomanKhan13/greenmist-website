import { useState } from "react";
import { GuestCountProp } from "../useBookingSearch";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChevronDown,
  MinusSignIcon,
  PlusSignIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

type GuestSelectorProps = {
  guestCount: GuestCountProp;
  updateGuestCount: (type: "adults" | "kids", increment: boolean) => void;
};

export function GuestSelector({
  guestCount,
  updateGuestCount,
}: GuestSelectorProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="flex-1 p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-border/50 dark:border-border
    "
    >
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="guests"
          className="text-xs uppercase tracking-wider text-muted-foreground font-medium flex items-center gap-2"
        >
          <HugeiconsIcon
            icon={UserGroupIcon}
            size={14}
            color="currentColor"
            strokeWidth={1.5}
          />
          Guests
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              id="guests"
              className="w-full justify-between font-normal text-base h-auto py-1 px-2 hover:bg-transparent text-card-foreground"
            >
              <span className="font-medium">
                {`${guestCount.adults} adult${guestCount.adults !== 1 ? "s" : ""}, ${guestCount.kids} kid${guestCount.kids !== 1 ? "s" : ""}`}
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
            className="overflow-hidden p-6 space-y-4"
            align="start"
          >
            <div className="grid grid-cols-2">
              <div className="grid gap-0.5">
                <span className="font-medium">Adults</span>
                <span className="text-sm text-muted-foreground">Ages 12+</span>
              </div>
              <ButtonGroup
                orientation="horizontal"
                aria-label="Adult count controls"
                className="h-fit"
              >
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => updateGuestCount("adults", false)}
                  disabled={guestCount.adults <= 1}
                >
                  <HugeiconsIcon
                    icon={MinusSignIcon}
                    size={16}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </Button>
                <span className="px-4 m-auto font-medium min-w-8 text-center">
                  {guestCount.adults}
                </span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => updateGuestCount("adults", true)}
                >
                  <HugeiconsIcon
                    icon={PlusSignIcon}
                    size={16}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </Button>
              </ButtonGroup>
            </div>
            <div className="grid grid-cols-2">
              <div className="grid gap-0.5">
                <span className="font-medium">Kids</span>
                <span className="text-sm text-muted-foreground">Ages 0-12</span>
              </div>
              <ButtonGroup
                orientation="horizontal"
                aria-label="Kids count controls"
                className="h-fit"
              >
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => updateGuestCount("kids", false)}
                  disabled={guestCount.kids <= 0}
                >
                  <HugeiconsIcon
                    icon={MinusSignIcon}
                    size={16}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </Button>
                <span className="px-4 m-auto font-medium min-w-8 text-center">
                  {guestCount.kids}
                </span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => updateGuestCount("kids", true)}
                >
                  <HugeiconsIcon
                    icon={PlusSignIcon}
                    size={16}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </Button>
              </ButtonGroup>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
