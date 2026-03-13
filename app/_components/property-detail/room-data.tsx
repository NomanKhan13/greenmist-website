import { Separator } from "@/components/ui/separator";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import RoomsList from "../rooms-list";
import SectionHeader from "../section-header";
import { getPropertyDetails } from "@/app/_lib/data-service";

export default async function RoomData({ propertySlug }) {
  const propertyDetails = await getPropertyDetails(propertySlug);
  return (
    <div className="max-w-7xl px-4 mt-40 space-y-16">
      {/* <div className="text-center space-y-6">
        <h2 className="mx-auto text-2xl md:text-3xl font-serif">
          
          Where Luxury Meets The Mist
        </h2>
        <p className="max-w-4xl mx-auto text-muted-foreground leading-relaxed text-lg">
          {description}
        </p>
      </div>

      <Separator className="bg-border/50" /> */}

      <div className="px-4">
        <SectionHeader
          heading="Find Your Sanctuary"
          subHeading="The Estate"
          description={propertyDetails.description}
        />
        <RoomsList propertySlug={propertySlug} />
      </div>

      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-serif mb-8 text-center">
          Property Highlights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {propertyDetails.highlights.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-2xl bg-background/80 dark:bg-card/95 border border-border/50 hover:border-border transition-colors"
            >
              <div className="shrink-0 p-2 rounded-full bg-primary-foreground text-primary">
                <HugeiconsIcon
                  icon={Tick02Icon}
                  size={16}
                  color="text-primary-foreground"
                  strokeWidth={1.5}
                  className="group-hover:-translate-x-1 transition"
                />
              </div>
              <span className="text-muted-foreground font-medium">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
