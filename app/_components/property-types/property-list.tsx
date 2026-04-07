import {
  checkAvailabilityByProperty,
  getProperties,
} from "@/app/_lib/data-service";
import PropertyCard from "./property-card";
import { StayOptionsBookingProps } from "@/app/stays/page";
import { RoomDetails } from "../property-detail/rooms-list";
import { format } from "date-fns";

export type PropertyProps = {
  id: string;
  name: string;
  slug: string;
  location: string;
  description: string;
  thumbnail: string;
  isActive: boolean;
  highlights: string[];
  startsFrom: number;
  title: string;
};

async function PropertyGrid({ data }: { data: StayOptionsBookingProps }) {
  const [properties, availability] = await Promise.all([
    getProperties(),
    checkAvailabilityByProperty(data.checkIn, data.checkOut, {
      adults: data.adults,
      children: data.kids,
    }),
  ]);

  const availabileProperties = new Set(
    availability
      .filter((a: RoomDetails) => a.is_available)
      .map((a: RoomDetails) => a.property_slug),
  );

  const params = new URLSearchParams({
    checkIn: format(data.checkIn, "yyyy-MM-dd"),
    checkOut: format(data.checkOut, "yyyy-MM-dd"),
    adults: String(data.adults),
    kids: String(data.kids),
  });

  const queryString = params.toString();

  return (
    <section className="pt-10 md:pt-16">
      <div className="grid">
        {properties.map((property: PropertyProps, idx: number) => {
          const isAvailable = availabileProperties.has(property.slug);
          return (
            <PropertyCard
              key={property.id}
              property={property}
              index={idx}
              isAvailable={isAvailable}
              queryString={queryString}
            />
          );
        })}
      </div>
    </section>
  );
}

export default PropertyGrid;
