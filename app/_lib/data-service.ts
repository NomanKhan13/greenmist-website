import { notFound } from "next/navigation";
import { supabase } from "./supabase";
import { ReservationData } from "../_components/checkout/checkout";
import { createClient } from "./supabase-server";

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
    checkIn,
    checkOut,
    Number(guests.adults) + Number(guests.children),
    targetRoomId,
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
  console.log("Availability", availability);
  if (error) throw new Error("Failed to check availability");
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
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert([bookingData])
    .select()
    .single();

  console.log(error);
  return { booking, error };
}

export async function bookingExist(bookingCode: string) {
  const { data: booking, error } = await supabase
    .from("bookings")
    .select(
      "*, properties!inner(name, thumbnail), roomType(name, pricePerNight)",
    )
    .eq("booking_code", bookingCode)
    .single();

  return booking;
}

export async function existingBookedRooms(
  dates: { dateFrom: string; dateTo: string },
  roomTypeId: string | null | undefined,
) {
  if (!roomTypeId) return;

  const cleanCheckIn = dates.dateFrom.split("T")[0];
  const cleanCheckOut = dates.dateTo.split("T")[0];

  const { data: roomData, error: roomError } = await supabase
    .from("roomType")
    .select("totalRooms")
    .eq("id", roomTypeId)
    .single();

  if (roomError) {
    console.error("ERROR FETCHING ROOM TYPE", roomError);
    return 0;
  }

  const { data: bookingData, error: bookingError } = await supabase
    .from("bookings")
    .select("roomsCount.sum()")
    .eq("room_type_id", roomTypeId)
    .eq("status", "CONFIRMED")
    .lt("check_in", cleanCheckOut)
    .gt("check_out", cleanCheckIn)
    .maybeSingle();

  if (bookingError) {
    console.log("ERROR IN BOOKING COUNT", bookingError);
    return;
  }

  const bookedRoomsCount = bookingData?.sum || 0;
  const totalRooms = roomData.totalRooms || 0;
  const remainingRooms = totalRooms - bookedRoomsCount;

  return remainingRooms;
}
