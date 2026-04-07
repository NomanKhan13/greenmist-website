import PropertyHero from "@/app/_components/property-detail/property-hero";
import PropertyHighlights from "@/app/_components/property-detail/property-highlights";
import PropertyIntro from "@/app/_components/property-detail/property-intro";
import PropertyRooms from "@/app/_components/property-detail/property-rooms";
import { getPropertyDetails } from "@/app/_lib/data-service";
import { getValidDates } from "@/app/_utils/validation";
import { sanitizeCheckoutQuery } from "@/app/checkout/page";
import { format } from "date-fns";
import { redirect } from "next/navigation";

function buildRoomUrl(
  propertySlug: string,
  checkIn: string,
  checkOut: string,
  adults: number,
  kids: number,
  room?: string | null,
  showBooking?: string,
) {
  const params = new URLSearchParams();
  params.set("checkIn", checkIn);
  params.set("checkOut", checkOut);
  params.set("adults", String(adults));
  params.set("kids", String(kids));
  if (room) params.set("room", room);
  if (showBooking) params.set("showBooking", showBooking);
  return `/stays/${propertySlug}?${params.toString()}`;
}

export default async function PropertyDetailPage({
  params,
  searchParams,
}: {
  params: { propertySlug: string };
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { propertySlug } = await params;
  const propertyDetails = await getPropertyDetails(propertySlug);

  const query = await searchParams;
  const data = sanitizeCheckoutQuery(query);

  const { checkIn, checkOut } = getValidDates(
    data.rawCheckIn,
    data.rawCheckOut,
  );
  const guests = {
    adults: data.adults,
    kids: data.kids,
  };
  const selectedRoomSlug = Array.isArray(query?.["room"])
    ? String(query?.["room"].at(0))
    : String(query?.["room"]);

  const cannonicalUrl = buildRoomUrl(
    propertySlug,
    format(checkIn, "yyyy-MM-dd"),
    format(checkOut, "yyyy-MM-dd"),
    data.adults,
    data.kids,
    data.room,
    query.showBooking,
  );

  if (
    `/stays/${propertySlug}?${new URLSearchParams(query).toString()}` !==
    cannonicalUrl
  ) {
    redirect(cannonicalUrl);
  }

  return (
    <section className="min-h-screen bg-background text-foreground pb-32">
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
    </section>
  );
}
