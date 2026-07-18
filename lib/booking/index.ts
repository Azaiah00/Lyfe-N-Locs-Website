/**
 * Booking provider factory (docs/BOOKING-ARCHITECTURE.md).
 * The UI never imports a concrete adapter — it calls getBookingProvider(), so
 * switching engines is a one-line env change.
 */

import { BOOKING_ENGINE } from "./config";
import { SquareProvider } from "./square";
import { StripeStandaloneProvider } from "./stripe-standalone";
import type { BookingProvider } from "./types";

let cached: BookingProvider | null = null;

export function getBookingProvider(): BookingProvider {
  if (cached) return cached;
  cached =
    BOOKING_ENGINE === "stripe-standalone"
      ? new StripeStandaloneProvider()
      : new SquareProvider();
  return cached;
}

export * from "./types";
export { computeDeposit, DEPOSIT_RULE, isDemoMode, NOTIFICATIONS } from "./config";
