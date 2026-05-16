"use server";
import { customAlphabet } from "nanoid/non-secure";
import { bookingExist, createBooking } from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ReservationData } from "../_components/checkout/checkout";
import { createClient } from "./supabase-server";

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

export async function deleteReservationAction(reservationIdToDelete: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      error: "Only authenticated guests can delete their reservations.",
    };
  }

  const { error: deleteError } = await supabase
    .from("bookings")
    .delete()
    .eq("id", reservationIdToDelete)
    .eq("email", user.email);

  if (deleteError) {
    console.error("Delete error:", deleteError);
    return {
      success: false,
      error: "Failed to delete the reservation. Please try again.",
    };
  }

  revalidatePath(`/account/reservation`);

  return { success: true };
}

export async function updateReservation(payload: {
  id: string;
  check_in: string;
  check_out: string;
  numNights: number;
  numAdults: number;
  numKids: number;
  roomsCount: number;
  basePriceAtBooking: number;
  addOnsAtBooking: number;
  totalPriceAtBooking: number;
  updatedAt: Date;
  add_ons: { isDailyPricing: boolean; price: number; id: string }[];
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user)
      return {
        success: false,
        message: "You must be logged in to modify a reservation.",
      };

    const { error: updateError } = await supabase
      .from("bookings")
      .update(payload)
      .eq("id", payload.id)
      .eq("email", user.email);

    if (updateError) {
      console.error("Database update error:", updateError);
      return {
        success: false,
        error: "Failed to update the reservation. Please try again.",
      };
    }

    revalidatePath("/account/reservations");

    return {
      success: true,
      message: "Reservation updated successfully",
    };
  } catch (error: any) {
    console.error("Action error:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred.",
    };
  }
}
