import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { PropertyProps } from "./property-list";
import { Badge } from "@/components/ui/badge";

const SUPABASE_BASE_IMG_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_IMG_URL;
export default function PropertyCard({
  property,
  index,
  isAvailable = true,
  queryString,
}: {
  property: PropertyProps;
  index: number;
  isAvailable: boolean;
  queryString: string;
}) {
  const isEven = index % 2 === 0;

  const getBadgeStyle = (slug: string) => {
    if (slug === "greenmist-tea-garden-retreat") {
      return "bg-primary text-primary-foreground border-primary";
    }
    return "bg-black/30 backdrop-blur-md text-white border-white/20";
  };

  const getBadgeText = (slug: string) => {
    if (slug === "greenmist-tea-garden-retreat") return "TEA ESTATE";
    if (slug === "greenmist-hill-retreat") return "HILLTOP";
    return "VALLEY";
  };

  const href = `/stays/${property.slug}${queryString ? `?${queryString}` : ""}`;

  return (
    <div
      className={`relative flex flex-col overflow-hidden shadow rounded-2xl ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-stretch gap-0 mb-10 group/card`}
    >
      {!isAvailable && (
        <div
          className={`absolute inset-0 z-20 bg-black/50 p-8 flex ${isEven ? "justify-start" : "justify-end"}`}
        >
          <Badge variant="secondary" className="p-4 text-sm">
            Sold out
          </Badge>
        </div>
      )}
      <div className="w-full lg:w-1/2 relative overflow-hidden">
        <div className="aspect-4/3 lg:aspect-auto overflow-hidden">
          <Image
            fill
            src={`${SUPABASE_BASE_IMG_URL}${property.thumbnail}`}
            alt={property.name}
            className="object-cover transition-transform duration-700 ease-in-out group-hover/card:scale-105"
          />
        </div>

        {isAvailable && (
          <div
            className={`absolute top-6 ${isEven ? "left-6" : "right-6"} px-4 py-2 border rounded-full text-[10px] text-foreground font-bold tracking-widest uppercase ${getBadgeStyle(property.slug)}`}
          >
            {getBadgeText(property.slug)}
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-6 lg:p-12 border-border/40 hover:border-border/80 bg-secondary dark:bg-card/90">
        <div className="mb-6">
          <h3 className="text-3xl lg:text-4xl font-serif text-foreground mb-3 group-hover/card:text-primary transition-colors duration-300">
            {property.name}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
            {property.description}
          </p>
        </div>

        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest mb-3 text-foreground">
            {`What's special?`}
          </p>
          <div className="grid grid-cols-2 sm:flex flex-wrap gap-x-3 gap-y-2 text-sm text-muted-foreground/80 leading-relaxed border-t border-border/50 pt-4 mb-8">
            {property.highlights.map((highlight, idx) => (
              <div key={highlight} className="flex items-center">
                <span className="text-border mr-3">•</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mt-auto">
          <div>
            <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Starting from
            </span>
            <span className="text-2xl font-serif">₹{property.startsFrom}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>

          <Button
            asChild
            disabled={!isAvailable}
            className="group/cta bg-foreground/85 text-background p-6 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <Link href={href}>
              <span>
                {!isAvailable ? "Not Available" : "View Availability"}
              </span>
              <HugeiconsIcon
                icon={ArrowUpRight}
                size={16}
                color="currentColor"
                strokeWidth={1.5}
                className="group-hover/cta:translate-x-1 transition"
              />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
