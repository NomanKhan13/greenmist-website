import PropertyHero from "@/app/_components/property-detail/property-hero";
import PropertyHighlights from "@/app/_components/property-detail/property-highlights";
import PropertyIntro from "@/app/_components/property-detail/property-intro";
import PropertyRooms from "@/app/_components/property-detail/property-rooms";
import { getPropertyDetails } from "@/app/_lib/data-service";
import { getValidDates } from "@/app/_utils/validation";

export default async function PropertyDetailPage({
  params,
  searchParams,
}: {
  params: { propertySlug: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { propertySlug } = await params;
  const propertyDetails = await getPropertyDetails(propertySlug);

  const query = await searchParams;

  const { checkIn, checkOut } = getValidDates(
    query?.["checkIn"]?.toString(),
    query?.["checkOut"]?.toString(),
  );
  const guests = {
    adults: Number(query?.["adults"]) || 2,
    kids: Number(query?.["kids"]) || 0,
  };
  const selectedRoomSlug = Array.isArray(query?.["room"])
    ? String(query?.["room"].at(0))
    : String(query?.["room"]);

  return (
    <main className="min-h-screen bg-background text-foreground pb-32">
      <PropertyHero
        name={propertyDetails?.name}
        location={propertyDetails?.location}
        thumbnail={propertyDetails?.thumbnail}
        startsFrom={propertyDetails?.startsFrom}
      />
      <div className="max-w-7xl mx-auto mt-16 px-4 md:px-12 grid gap-16 md:gap-32 lg:gap-40">
        <PropertyIntro description={propertyDetails.description} />
        <PropertyRooms
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          initialGuest={guests}
          propertySlug={propertySlug}
          selectedRoomSlug={selectedRoomSlug}
        />

        <PropertyHighlights highlights={propertyDetails.highlights} />
      </div>
    </main>
  );
}
