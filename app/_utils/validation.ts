import {
  addDays,
  isAfter,
  isBefore,
  isValid,
  parseISO,
  startOfDay,
} from "date-fns";

export function isStrictISODate(dateStr: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

export function getValidDates(checkInParam?: string, checkOutParam?: string) {
  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);

  /**
   * 1. if checkIn is there than parseISO(checkIn) else use today.
   * 2. if checkOut is there than parseISO(checkOut) else use tomorrow.
   * 3. check if checkIn(! then use today) and checkOut(! then use tomorrow) dates are valid
   * 4. checkIn is ifBefore today reset it to today, checkOut isBefore checkIn then make checkOut a day after checkIn
   */

  let checkIn =
    checkInParam && isStrictISODate(checkInParam)
      ? parseISO(checkInParam)
      : today;

  let checkOut =
    checkOutParam && isStrictISODate(checkOutParam)
      ? parseISO(checkOutParam)
      : tomorrow;

  if (!isValid(checkIn)) checkIn = today;
  if (!isValid(checkOut)) checkOut = tomorrow;

  if (isBefore(checkIn, today)) {
    checkIn = today;
    checkOut = tomorrow;
  }

  if (!isAfter(checkOut, checkIn)) {
    checkOut = addDays(checkIn, 1);
  }

  return { checkIn, checkOut };
}
