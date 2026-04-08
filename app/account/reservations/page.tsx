import { createClient } from "@/app/_lib/supabase-server";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format } from "date-fns";
import Link from "next/link";

export default async function MyReservations() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.user_metadata?.email;

  const { data: reservations, error } = await supabase
    .from("bookings")
    // FIX 1: Removed !inner
    .select("status, check_in, check_out, id, booking_code, properties(name)")
    .eq("email", email);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <h3 className="text-3xl font-serif mb-2">Your Reservations</h3>
      <p className="text-muted-foreground mb-8 text-sm">
        Manage your retreats.
      </p>

      <div className="flex flex-col gap-6">
        {reservations?.map((res) => (
          <div
            key={res.id}
            // 1. ADDED 'relative' to the main card container
            className="relative border-border/40 bg-secondary dark:bg-card/60 hover:border-border/80 rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 transition-colors"
          >
            {/* 2. MOVED THE LINK OUT, ADDED 'absolute top-6 right-6' */}
            <Link
              href={`/booking-success/${res.booking_code}`}
              className="absolute top-6 right-6 group text-sm text-muted-foreground hover:text-foreground transition-colors flex gap-1 items-center"
            >
              <span className="hidden md:block">View Details</span>
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
                {res.status}
              </p>

              <div>
                <h4 className="text-xl font-serif mb-1">
                  {(res?.properties as any)?.name}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {format(new Date(res.check_in), "MMM do yyyy")} —{" "}
                  {format(new Date(res.check_out), "MMM do yyyy")}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex self-end gap-4 w-full md:w-auto mt-2 lg:mt-0">
              <Button variant="outline">Update</Button>
              <Button variant="destructive">Cancel</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
