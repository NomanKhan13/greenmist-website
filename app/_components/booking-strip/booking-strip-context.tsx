"use client";
import { createContext, ReactNode, useContext, useState } from "react";

const initialState = {
  startDate: undefined,
  endDate: undefined,
  guests: {
    adults: 2,
    children: 0,
  },
};
type GuestProp = { adults: number; children: number };
type BookingProp = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  guests: GuestProp;
  onBooking?: (startDate: Date, endDate: Date, guests: GuestProp) => void;
};

export const BookingContext = createContext<BookingProp>(initialState);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [guests, setGuests] = useState<GuestProp>(initialState.guests);
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialState.startDate,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    initialState.endDate,
  );

  function onBooking(startDate: Date, endDate: Date, guests: GuestProp) {
    setGuests(guests);
    setStartDate(startDate);
    setEndDate(endDate);
    console.log(guests, startDate, endDate);
  }

  return (
    <BookingContext value={{ guests, startDate, endDate, onBooking }}>
      {children}
    </BookingContext>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context)
    throw new Error("useBooking must be used within BookingProvider");

  return context;
}
