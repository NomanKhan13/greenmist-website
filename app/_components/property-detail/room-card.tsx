"use client";
import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import tempImg from "@/public/hero-bg-2.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RoomDetails } from "./rooms-list";
import useRoomSelection from "./useRoomSelection";

export default function RoomCard({
  room,
  index,
}: {
  room: RoomDetails;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const { isRoomSelected, toggleRoomSelect } = useRoomSelection(
    room.slug,
    room.is_available,
  );

  return (
    <div
      className={`relative flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } overflow-hidden rounded-3xl bg-secondary dark:bg-card/40 border ${isRoomSelected ? "border-primary/40" : "border-border/40"} group mb-20`}
    >
      {!room.is_available && (
        <div
          className={`absolute inset-0 z-20 bg-black/50 p-8 flex ${isEven ? "justify-start" : "justify-end"}`}
        >
          <Badge variant="secondary" className="p-4 text-sm">
            Sold out
          </Badge>
        </div>
      )}
      {/* Image Section */}
      <div className="w-full lg:w-1/2 relative overflow-hidden">
        <div className="aspect-4/3 lg:aspect-auto lg:h-full w-full relative">
          <Image
            fill
            src={tempImg} // Replace with room.thumbnail
            alt={room.room_type_name}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-14 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto flex flex-col h-full">
          {/* Label */}
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-primary font-bold mb-4">
            {room.ideal_for}
          </p>

          {/* Heading */}
          <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-4 leading-none">
            {room.room_type_name}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3 mb-8">
            {room.description}
          </p>

          {/* Amenities Strip */}
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-muted-foreground/80 border-t border-border/50 pt-6 mb-8">
            <span>{room.max_adults} Adults</span>
            <span className="text-border">•</span>
            <span>{room.size} sqft</span>
            <span className="text-border">•</span>
            <span>
              {room.bed_count} {room.bed_type}
            </span>
            <span className="text-border">•</span>

            <span>{room.amenities?.[0]}</span>
          </div>

          {/* Footer: Price + CTA */}
          <div className="mt-auto flex items-end justify-between gap-4">
            <div>
              <span className="block text-[0.6rem] text-muted-foreground uppercase tracking-wider mb-1">
                Starting from
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-serif font-medium text-foreground">
                  ₹{room.price.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">/ night</span>
              </div>
            </div>

            <Button
              className={`group/cta p-6  ${isRoomSelected ? "bg-primary text-primary-foreground" : "bg-foreground text-background hover:"}`}
              disabled={!room.is_available}
              onClick={toggleRoomSelect}
            >
              <span>
                {!room.is_available
                  ? "Not Available"
                  : isRoomSelected
                    ? "Selected"
                    : "Select"}
              </span>
              {!isRoomSelected && room.is_available && (
                <HugeiconsIcon
                  icon={ArrowUpRight}
                  size={16}
                  color="currentColor"
                  strokeWidth={1.5}
                  className="group-hover/cta:translate-x-1 transition"
                />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
