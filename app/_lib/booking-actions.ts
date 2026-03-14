"use server";
import { customAlphabet } from "nanoid/non-secure";
import { bookingExist, createBooking } from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ReservationData } from "../_components/checkout/checkout";

export async function createBookingAction(
  bookingData: Omit<
    ReservationData,
    "booking_code" | "status" | "isPaid" | "guestId"
  >,
) {
  const generateBookingCode = customAlphabet(
    "23456789ABCDEFGHJKLMNPQRSTUVWXYZ",
    6,
  );
  const booking_code = `GM-${generateBookingCode()}`;

  if (bookingData.numAdults > 10)
    throw new Error("Cannot book for more than 10 guests.");

  // console.log(bookingData.booking_code);
  // if (bookingData.booking_code) {
  //   const bookingAlreadyExists = await bookingExist(bookingData.booking_code);
  //   console.log("Does it exist?", bookingAlreadyExists);
  //   if (bookingAlreadyExists) {
  //     redirect(`booking-success/${bookingData.booking_code}`);
  //   }
  // }

  const status = "unconfirmed";
  const isPaid = false;
  const guestId = null; // change later

  const mergedBookingData = {
    ...bookingData,
    booking_code,
    status,
    isPaid,
    guestId,
  };

  const { booking, error } = await createBooking(mergedBookingData);

  if (error) throw new Error("Booking could not be created");
  // do this later
  // revalidatePath(`/stays/${bookingData.slug}`)
  redirect(`/booking-success/${booking_code}`);

  // check guest info
  // create nano-id
  // Make DB call and get room details
  // what I need to create a booking
  //      id(auto gen), booking_code(use nanoid), numNights(gfhf), status(set to unconfirmed),
  //      observation(gfhf), isPaid(set to false), guestId(set to null for now, change when you add auth)
  //      roomsCount(calc using guests and cap of room), basePriceAtBooking(get from DB),
  //      addOnsAtBooking(gfhf), totalPriceAtBooking(calc), roomTypeId(get from DB), checkIn(gfhf),
  //      checkout(gfhf), propertyId(get from DB),
}

export async function deleteReservationction() {
  // check if user is authenticated?
  // check if user is deleting their own reservation
  // delete reservation
  // relvalidate the page.
  // const session = await auth.session();
  // if (!session?.user) thror new Error("Only authenticated users can delete reservation");
  // const guestId = session?.user?.guestId;
  // const guestReservations = await getGuestReservations(guestId);
  // const guestReservationsIds = guestReservations.map(reservation => reservation.id);
  // if (!guestReservationsIds?.includes(reservationIdToDelete)) throw new Error("Guest can only delete their reservations");
  // const {error} = await deleteReservation(reservationIdToDelete);
  // if (error) throw new Error("Failed to delete reservation")
  // revalidatePath(`/account/reservation`);
}
