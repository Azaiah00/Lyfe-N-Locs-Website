"use client";

/** Thin client wrapper over the booking API routes. The UI talks to this, which
 *  talks to the provider server-side — so engine + secrets stay off the client. */

import type { Slot, BookingInput, BookingResult, Booking } from "./types";

export async function fetchAvailability(
  serviceId: string
): Promise<{ demo: boolean; slots: Slot[] }> {
  const res = await fetch(`/api/booking/availability?serviceId=${encodeURIComponent(serviceId)}`);
  if (!res.ok) throw new Error("availability failed");
  return res.json();
}

export async function submitBooking(input: BookingInput): Promise<BookingResult> {
  const res = await fetch("/api/booking/create", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  return res.json();
}

export async function lookupBookings(
  contact: string
): Promise<{ demo: boolean; bookings: Booking[] }> {
  const res = await fetch(`/api/booking/lookup?contact=${encodeURIComponent(contact)}`);
  if (!res.ok) throw new Error("lookup failed");
  return res.json();
}
