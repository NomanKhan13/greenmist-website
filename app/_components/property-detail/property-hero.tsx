import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const SUPABASE_IMG_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_IMG_URL;

// colors are hard-coded because we want same appearence on both light and dark modes.

export default function PropertyHero({
  name,
  thumbnail,
  location,
  startsFrom,
}: {
  name: string;
  thumbnail: string;
  location: string;
  startsFrom: number;
}) {
  return (
    <div className="relative h-[85vh] w-full">
      <div className="absolute left-0 top-0 w-full h-full">
        <Image
          fill
          src={`${SUPABASE_IMG_BASE_URL}${thumbnail}`}
          alt={name}
          className="object-cover object-right lg:object-center"
          priority
        />
        <div className="absolute inset-0 z-0 bg-black/30" />
        <div className="absolute inset-x-0 top-0 h-48 z-0 bg-linear-to-b from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 z-0 bg-linear-to-t from-[#0c0a09] to-transparent" />
      </div>

      <div className="absolute top-8 left-8 md:top-24 md:left-24 z-20">
        <Button variant="ghost" asChild>
          <Link href="/stays" className="flex items-center gap-2 text-stone-50">
            <HugeiconsIcon icon={ArrowLeft02Icon} size={16} strokeWidth={2} />
            <span className="tracking-wide text-[0.65rem] md:text-xs uppercase font-medium">
              Back to Retreats
            </span>
          </Link>
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-4 md:px-12 pb-12 md:pb-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div className="animate-fade-in-up max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 md:mb-6 border border-stone-50text-stone-50/30 rounded-full bg-black/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-stone-50 font-medium">
                {location}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-stone-50 leading-[0.9] drop-shadow-lg">
              {name}
            </h1>
          </div>

          {/* Pricing Block */}
          <div className="md:text-right shrink-0">
            <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-stone-50/80 mb-1 md:mb-2">
              Starting From
            </p>
            <div className="flex items-baseline md:justify-end gap-2 text-stone-50">
              <span className="text-3xl md:text-5xl font-serif font-medium">
                ₹{startsFrom.toLocaleString()}
              </span>
              <span className="text-sm font-sans text-stone-50/70">
                / night
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
