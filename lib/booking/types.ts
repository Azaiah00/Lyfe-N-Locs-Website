/**
 * Booking domain types (docs/BOOKING-ARCHITECTURE.md).
 * The UI talks only to the BookingProvider interface, so the engine (Square
 * default / Stripe standalone stub) is swappable without touching components.
 */

import type { Service, CategoryId } from "@/data/services";

export type { Service, CategoryId };

export type DateRange = { from: string; to: string }; // ISO yyyy-mm-dd

export type Slot = {
  /** ISO 8601 start datetime (local, no tz suffix — studio local time). */
  start: string;
  /** minutes */
  durationMins: number;
  /** ISO end datetime, precomputed for the "done by ~X" preview. */
  end: string;
  available: boolean;
  /** Friday-evening / off-day block — retwist services only. */
  afterHours?: boolean;
};

export type SelectedAddOn = {
  id: string;
  label: string;
  /** display-only, e.g. "+$50" — unverified pricing stays as posted */
  price: string;
};

export type ClientDetails = {
  name: string;
  phone: string;
  email: string;
  locSizeCount?: string;
  notes?: string;
  /** filename only — the site never uploads/stores card data; photo is optional */
  photoName?: string;
};

export type BookingInput = {
  serviceId: string;
  slotStart: string;
  addOnIds: string[];
  client: ClientDetails;
  /** deposit amount in USD the client agreed to (applies to total) */
  depositAmount: number;
};

export type BookingResult = {
  ok: boolean;
  /** demo confirmation id, or the real provider booking id */
  confirmationId: string;
  /** hosted-checkout URL for the deposit (Square/Stripe) — never card capture here */
  checkoutUrl?: string;
  /** true when running without API keys (mock data) */
  demo: boolean;
  message?: string;
};

export type Booking = {
  confirmationId: string;
  serviceName: string;
  start: string;
  end: string;
  status: "confirmed" | "pending-deposit" | "cancelled";
  clientName: string;
};

export interface BookingProvider {
  readonly name: string;
  readonly demo: boolean;
  listServices(): Promise<Service[]>;
  getAvailability(serviceId: string, range: DateRange): Promise<Slot[]>;
  createBooking(input: BookingInput): Promise<BookingResult>;
  lookupBookings(contact: string): Promise<Booking[]>;
}
