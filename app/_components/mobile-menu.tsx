import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu01Icon, User02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <HugeiconsIcon
            icon={Menu01Icon}
            strokeWidth={1.5}
            color="currentColor"
          />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="grid flex-1 auto-rows-min gap-2 px-4 py-16">
          <SheetClose asChild>
            <Link className="py-2" href="/stays">
              Stays
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link className="py-2" href="/about">
              About
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link className="py-2" href="/Experience">
              Experience
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-secondary-foreground/75 dark:text-muted-foreground hover:text-foreground hover:bg-transparent px-2 cursor-pointer"
            >
              <HugeiconsIcon
                icon={User02Icon}
                size={16}
                color="currentColor"
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition"
              />
              <span>Account</span>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
