import { Suspense } from "react";

import SectionHeader from "../_components/section-header";
import GreenMistLoader from "../_components/greenmist-loader";
import PropertyGrid from "../_components/property-types/property-list";
import { sanitizeCheckoutQuery } from "../checkout/page";
import { getValidDates } from "../_utils/validation";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import { BookingStrip } from "../_components/booking-strip/booking-strip";

export type StayOptionsBookingProps = {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  kids: number;
};

function buildStaysUrl(
  checkIn: string,
  checkOut: string,
  adults: number,
  kids: number,
) {
  const params = new URLSearchParams();
  params.set("checkIn", checkIn);
  params.set("checkOut", checkOut);
  params.set("adults", String(adults));
  params.set("kids", String(kids));
  return `/stays?${params.toString()}`;
}

export default async function Properties({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const query = await searchParams;
  const data = sanitizeCheckoutQuery(query);
  const { checkIn, checkOut } = getValidDates(
    data.rawCheckIn,
    data.rawCheckOut,
  );

  const stayOptionsBookingData = {
    checkIn: checkIn,
    checkOut: checkOut,
    adults: data.adults,
    kids: data.kids,
  };

  const cannonicalUrl = buildStaysUrl(
    format(checkIn, "yyyy-MM-dd"),
    format(checkOut, "yyyy-MM-dd"),
    stayOptionsBookingData.adults,
    stayOptionsBookingData.kids,
  );

  if (`/stays?${new URLSearchParams(query).toString()}` !== cannonicalUrl) {
    redirect(cannonicalUrl);
  }

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subHeading="Munnar, kerala"
          heading="Our Properties"
          description="Each retreat is a sanctuary designed to harmonize with its natural
          surroundings."
        />
        <BookingStrip defaultCheckIn={checkIn} defaultCheckOut={checkOut} />
        <Suspense fallback={<GreenMistLoader />}>
          <PropertyGrid data={stayOptionsBookingData} />
        </Suspense>
      </div>
    </section>
  );
}
