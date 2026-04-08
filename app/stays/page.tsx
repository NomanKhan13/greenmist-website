import { Suspense } from "react";

import SectionHeader from "../_components/section-header";
import PropertyGrid from "../_components/property-types/property-list";
import { sanitizeCheckoutQuery } from "../checkout/page";
import { getValidDates } from "../_utils/validation";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import { BookingStrip } from "../_components/booking-strip/booking-strip";
import GreenMistLoaderMini from "../_components/greenmist-loader-mini";
import StepCounter from "../_components/step-counter";

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
  // Prevent user from sending unexpected params.
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
  // Prevent user from tempering the URL, like using params which don't exist
  if (`/stays?${new URLSearchParams(query).toString()}` !== cannonicalUrl) {
    redirect(cannonicalUrl);
  }

  return (
    <section className="pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          subHeading="Munnar, kerala"
          heading="Pick Your Perfect Escape"
          description="Choose from our handpicked retreats. Once you pick your stay, you'll be able to explore available room options."
        />
        <StepCounter step={1} label="Select a property" />

        <BookingStrip defaultCheckIn={checkIn} defaultCheckOut={checkOut} />
        <Suspense key="/stays" fallback={<GreenMistLoaderMini />}>
          <PropertyGrid data={stayOptionsBookingData} />
        </Suspense>
      </div>
    </section>
  );
}
