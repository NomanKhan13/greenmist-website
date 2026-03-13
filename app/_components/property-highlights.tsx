import Image from "next/image";
import Link from "next/link";
import { getProperties } from "../_lib/data-service";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import LandingSectionHeader from "./landing-section-header";

const SUPABASE_BASE_IMG_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_IMG_URL;

export function formatter(price: number) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
  return formatted;
}

export default async function PropertyHighlights() {
  const stays = await getProperties();
  console.log(stays);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingSectionHeader
          title="Our Sanctuaries."
          description=" Each retreat is uniquely designed to harmonize with its natural
            surroundings. Discover the perfect elevation for your escape to
            Munnar."
        />

        {/* Note - Used article tag for better semantic HTML */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-12 mb-16">
          {stays.map((stay) => (
            <article
              key={stay.id}
              className="group flex flex-col cursor-pointer"
            >
              <div className="relative w-full aspect-video lg:aspect-4/5 mb-6 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={`${SUPABASE_BASE_IMG_URL}${stay.thumbnail}`}
                  alt={`View of ${stay.name}`}
                  fill
                  quality={75}
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {stay.highlights.slice(3).map((highlight: string) => (
                  <span
                    key={highlight}
                    className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <h3 className="font-serif text-2xl font-medium mb-3">
                {stay.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 grow">
                {stay.description}
              </p>

              <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                    Starting from
                  </span>
                  <span className="font-medium">
                    {formatter(stay.startsFrom)}{" "}
                    <span className="text-xs text-muted-foreground font-normal">
                      / night
                    </span>
                  </span>
                </div>

                <Link
                  href={`/stays/${stay.slug}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Explore
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    strokeWidth={1.5}
                    color="currentColor"
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  />{" "}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center border-t border-border pt-12">
          <Link
            href="/stays"
            className="inline-flex h-12 items-center justify-center rounded-md bg-foreground px-8 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Compare All Retreats
          </Link>
        </div>
      </div>
    </section>
  );
}
