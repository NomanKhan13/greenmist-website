import { notFound } from "next/navigation";
import { supabase } from "./supabase";
import { ReservationData } from "../_components/checkout/checkout";

export async function getProperties() {
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*");
  if (error) throw new Error("Failed to load properties");
  return properties;
}

export async function getPropertyDetails(propertySlug: string) {
  const { data: propertyDetails, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", propertySlug)
    .single();
  if (error) throw new Error("Failed to load property details");
  return propertyDetails;
}

export async function getRoomTypes(propertySlug: string) {
  const { data: roomTypes, error } = await supabase
    .from("roomType")
    .select("*, properties!inner(slug)")
    .eq("properties.slug", propertySlug);
  if (error) throw new Error("Failed to load room types for property");
  return roomTypes;
}

export async function getRoomDetails(roomSlug: string | undefined | null) {
  if (!roomSlug) return;
  const { data: roomDetails, error } = await supabase
    .from("roomType")
    .select("*, properties!inner(slug)")
    .eq("slug", roomSlug)
    .maybeSingle();
  if (error) throw new Error("Failed to load room details");
  if (!roomDetails) notFound();

  console.log(`room details is ${roomSlug}`);

  return roomDetails;
}

export async function getAddOns() {
  const { data: addOns, error } = await supabase
    .from("addOns")
    .select(
      "id, name, description, price, isDailyPricing, isActive, unit, slug",
    );
  if (error) throw new Error("Failed to load add-ons");
  return addOns;
}

export async function checkAvailability(
  checkIn: Date,
  checkOut: Date,
  guests: { adults: number; children: number },
  targetRoomId?: string,
) {
  /**
   * There should be an adult per 2 children rule.
   * eg - 1 adult can accompany 2 children, 2 adults can accompany 4 children, 5 adults can accompany 10 children etc.
   * So, if the number of children exceeds twice the number of adults, we should throw an error.
   */

  if (Number(guests.children) > Number(guests.adults) * 2) {
    throw new Error(
      "Each adult can accompany up to 2 children. Please adjust your guest count.",
    );
  }
  console.log(
    "CHECK AVAILABILITY CALLED",
    checkIn,
    checkOut,
    guests,
    targetRoomId ?? null,
  );
  const { data: availability, error } = await supabase.rpc(
    "check_rooms_availability",
    {
      check_in_date: checkIn,
      check_out_date: checkOut,
      guest_count: Number(guests.adults) + Number(guests.children),
      target_room_type_id: targetRoomId ?? null,
    },
  );
  if (error) throw new Error("Failed to check availability");
  console.log("FROM data service ", availability);
  return availability;
}

export async function checkAvailabilityByProperty(
  checkIn: Date,
  checkOut: Date,
  guests: { adults: number; children: number },
  propertySlug?: string | null,
  targetRoomId?: string | null,
  targetRoomSlug?: string | null,
) {
  /**
   * There should be an adult per 2 children rule.
   * eg - 1 adult can accompany 2 children, 2 adults can accompany 4 children, 5 adults can accompany 10 children etc.
   * So, if the number of children exceeds twice the number of adults, we should throw an error.
   */

  console.log(
    "CHECK AVAILABILITY CALLED",
    checkIn,
    checkOut,
    guests,
    propertySlug,
    targetRoomId ?? null,
  );
  // const { data: availability, error } = await supabase.rpc("available_rooms", {
  //   check_in_date: checkIn,
  //   check_out_date: checkOut,
  //   guest_count: Number(guests.adults) + Number(guests.children),
  //   target_property_slug: propertySlug,
  //   target_room_type_id: targetRoomId ?? null,
  // });
  const { data: availability, error } = await supabase.rpc("available_rooms2", {
    check_in_date: checkIn,
    check_out_date: checkOut,
    guest_count: Number(guests.adults) + Number(guests.children),
    target_property_slug: propertySlug ?? null,
    target_room_type_id: targetRoomId ?? null,
    target_room_type_slug: targetRoomSlug ?? null,
  });
  if (error) {
    console.log(error);
    throw new Error("Failed to check availability");
  }
  // console.log("FROM data service ", availability);
  return availability;
}

export async function createBooking(bookingData: ReservationData) {
  console.log("CHECK DATA TYPE", bookingData);

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert([bookingData])
    .select()
    .single();

  return { booking, error };
}

export async function bookingExist(bookingCode: string) {
  const { data: booking, error } = await supabase
    .from("bookings")
    .select(
      "status, check_in, check_out, numAdults, properties!inner(name), roomType(name)",
    )
    .eq("booking_code", bookingCode)
    .single();
  // console.log(booking.status);

  return booking;
}
