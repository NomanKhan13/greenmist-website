import ReservationsList from "@/app/_components/account/reservations-list";
import { UpdateReservation } from "@/app/_components/account/update-reservation";
import { createClient } from "@/app/_lib/supabase-server";

// Drop this right below your imports
export type ReservationProp = {
  id: string;
  booking_code: string;
  status: string; // e.g., 'UNCONFIRMED', 'CONFIRMED'
  check_in: string;
  check_out: string;
  numAdults: number;
  numKids: number;
  roomsCount: number;
  add_ons: { id: string; isDailyPricing: boolean; price: number }[];
  properties:
    | {
        name: string;
        slug: string;
      }
    | { name: string; slug: string }[]
    | null;
  roomType:
    | {
        name: string;
        pricePerNight: number;
        id: string;
        maxAdults: number;
        maxKids: number;
      }
    | {
        name: string;
        pricePerNight: number;
        id: string;
        maxAdults: number;
        maxKids: number;
      }[]
    | null;
  // Note: We include the array option because Supabase sometimes infers joins as arrays depending on your foreign key setup!
};

export default async function MyReservations() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.user_metadata?.email;

  async function getBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        "status, check_in, check_out, id, numAdults, numKids, roomsCount, booking_code, add_ons, properties(name, slug), roomType(name, pricePerNight, id, maxAdults, maxKids)",
      )
      .eq("email", email);

    if (error) {
      console.log("ERROR FETCHING BOOKINGS", error);
      return null;
    }
    return data;
  }

  async function getAddOns() {
    const { data, error } = await supabase.from("addOns").select("*");
    if (error) {
      console.log("ERROR FETCHING ADD-ONS", error);
      return null;
    }
    return data;
  }

  const [bookingsData, addOnsData] = await Promise.all([
    await getBookings(),
    await getAddOns(),
  ]);

  // Cast the data so TypeScript knows exactly what it is
  const reservations = bookingsData as ReservationProp[] | null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <h3 className="text-3xl font-serif mb-2">Your Reservations</h3>
      <p className="text-muted-foreground mb-8 text-sm">
        Manage your retreats.
      </p>

      <ReservationsList reservations={reservations || []} />
      <UpdateReservation
        reservations={reservations}
        addOnsData={addOnsData || []}
      />
    </div>
  );
}
