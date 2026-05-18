import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu01Icon, User02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Logo } from "./header";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <HugeiconsIcon
            icon={Menu01Icon}
            strokeWidth={1.5}
            color="currentColor"
          />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="mt-2 flex items-start">
          <Logo />
        </SheetHeader>

        <div className="mt-16 flex flex-1 flex-col gap-6 px-6 text-3xl font-light tracking-widest">
          <SheetClose asChild>
            <Link className="py-2" href="/stays">
              Stays
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link className="py-2" href="/estate">
              The Estate
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link className="py-2" href="/experiences">
              Experiences
            </Link>
          </SheetClose>
        </div>

        <SheetFooter className="mt-auto pb-6">
          <SheetClose asChild>
            <Button
              variant="outline"
              asChild
              className="h-12 w-full rounded-full"
            >
              <Link
                href="/account"
                className="flex items-center justify-center gap-2"
              >
                <HugeiconsIcon
                  icon={User02Icon}
                  size={18}
                  color="currentColor"
                  strokeWidth={1.5}
                />
                <span className="text-sm font-medium">Account</span>
              </Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
