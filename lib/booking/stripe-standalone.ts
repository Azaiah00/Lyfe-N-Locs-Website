/**
 * StripeStandaloneProvider — Option 2 STUB, behind a flag
 * (docs/BOOKING-ARCHITECTURE.md). Stripe for deposits + a self-managed
 * availability model. Kept intentionally minimal: it proves the engine is
 * swappable. Enable with NEXT_PUBLIC_BOOKING_ENGINE=stripe-standalone.
 *
 * Like the Square adapter, it runs in DEMO MODE on mock data when no
 * STRIPE_SECRET_KEY is present, and NEVER stores raw card numbers — deposits go
 * through Stripe Checkout (hosted).
 */

import { services } from "@/data/services";
import { isDemoMode } from "./config";
import { getMockAvailability } from "./availability";
import type {
  BookingProvider,
  BookingInput,
  BookingResult,
  Booking,
  DateRange,
  Slot,
  Service,
} from "./types";

export class StripeStandaloneProvider implements BookingProvider {
  readonly name = "stripe-standalone";
  readonly demo = isDemoMode();

  async listServices(): Promise<Service[]> {
    return services;
  }

  async getAvailability(serviceId: string, range: DateRange): Promise<Slot[]> {
    // Self-managed availability model would live here; demo uses the shared
    // mock engine so both engines behave identically for the demo.
    return getMockAvailability(serviceId, range);
  }

  async createBooking(input: BookingInput): Promise<BookingResult> {
    const service = services.find((s) => s.id === input.serviceId);
    if (!service) {
      return { ok: false, confirmationId: "", demo: this.demo, message: "Unknown service." };
    }
    // Real: create a Stripe Checkout Session for the deposit and return its URL.
    return {
      ok: true,
      confirmationId: `LNL-S-${Date.now().toString(36).toUpperCase().slice(-5)}`,
      checkoutUrl: undefined, // a real Stripe Checkout Session URL in production
      demo: this.demo,
      message: this.demo
        ? "Demo booking (Stripe standalone stub). Wire STRIPE_SECRET_KEY to enable hosted checkout."
        : undefined,
    };
  }

  async lookupBookings(): Promise<Booking[]> {
    return [];
  }
}
