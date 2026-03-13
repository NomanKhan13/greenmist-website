"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function BookingBar({ name, price }: { name: string; price: number }) {
  const searchParams = useSearchParams();

  if (!name && !price) return null;

  const proceedParams = new URLSearchParams(searchParams.toString());
  proceedParams.set("showBooking", "true");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50 px-4 py-2 sm:py-4 shadow-2xl z-40 animate-slide-up">
      <div className="container mx-auto flex justify-between sm:justify-end gap-8 items-end sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4">
          <p className="font-bold">{name}</p>
          <div>
            <span className="block text-[0.6rem] text-muted-foreground uppercase tracking-wider mb-1">
              Starting from
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-serif font-medium text-muted-foreground">
                ₹{price.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">/ night</span>
            </div>
          </div>
        </div>

        <Button asChild size="lg">
          <Link href={`?${proceedParams.toString()}`} scroll={false}>
            Continue
          </Link>
        </Button>
      </div>
    </div>
  );
}
