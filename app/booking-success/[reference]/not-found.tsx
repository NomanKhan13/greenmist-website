import Link from "next/link";
import {
  Search02Icon,
  Home04Icon,
  CustomerSupportIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type BookingNotFoundProps = {
  reference?: string;
};

export default function BookingNotFound({ reference }: BookingNotFoundProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 pt-24 pb-12 bg-background">
      {/* Background Setup - Kept subtle to match success page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-primary/5 blur-[150px] rounded-full opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <p className="text-sm text-muted-foreground mb-2 tracking-wide uppercase">
            Invalid Reference
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
            Reservation Not Found
          </h1>
          <p className="text-muted-foreground">
            We {"couldn't"} locate booking{" "}
            {reference ? (
              <span className="text-foreground font-medium">#{reference}</span>
            ) : (
              "with that reference number"
            )}
            .
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card/40 backdrop-blur-md border border-border rounded-2xl py-8 px-4 sm:px-8 shadow-2xl text-center">
          {/* Icon Illustration */}
          <div className="mx-auto size-20 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center mb-6 text-muted-foreground">
            <HugeiconsIcon icon={Search02Icon} size={32} strokeWidth={1.5} />
          </div>

          <h2 className="text-lg font-serif text-foreground mb-2">
            Lost in the mists?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
            Please double-check your reference number. If you just made this
            booking, it might take a few moments to appear in our system.
          </p>

          <div className="border-t border-border/50 w-full mb-8" />

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="w-full">
              <button className="w-full bg-primary text-primary-foreground py-4 rounded-lg hover:bg-primary/90 transition text-sm font-medium shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                <HugeiconsIcon icon={Home04Icon} size={18} strokeWidth={1.5} />
                Return to Homepage
              </button>
            </Link>

            <Link href="/contact" className="w-full">
              <button className="w-full border border-border text-foreground/80 py-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition text-sm font-medium flex items-center justify-center gap-2">
                <HugeiconsIcon
                  icon={CustomerSupportIcon}
                  size={18}
                  strokeWidth={1.5}
                />
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
