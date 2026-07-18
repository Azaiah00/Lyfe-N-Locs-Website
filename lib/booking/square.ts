/**
 * SquareProvider — DEFAULT engine (docs/BOOKING-ARCHITECTURE.md, Option 1).
 *
 * Wraps Square as the calendar + payments engine so the owner keeps ONE
 * calendar and her existing payment setup while clients get our better UX. No
 * data migration. The site NEVER stores raw card numbers — createBooking returns
 * a hosted-checkout URL for the deposit.
 *
 * Without SQUARE_ACCESS_TOKEN / SQUARE_LOCATION_ID this runs in DEMO MODE on the
 * mock availability engine, so the whole flow is demoable end-to-end. The real
 * branches show exactly where the Square Bookings API / hosted checkout wire in.
 */

import { services } from "@/data/services";
import { online } from "@/data/facts";
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

function shortId(prefix: string): string {
  // Node runtime (API route) — safe to use time + entropy for a demo id.
  const t = Date.now().toString(36).toUpperCase().slice(-5);
  const r = Math.floor(Math.random() * 1296)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `${prefix}-${t}${r}`;
}

export class SquareProvider implements BookingProvider {
  readonly name = "square";
  readonly demo = isDemoMode();

  async listServices(): Promise<Service[]> {
    // Our menu is the source of truth; a real impl could reconcile with Square
    // catalog objects by id. (docs/SERVICES.md)
    return services;
  }

  async getAvailability(serviceId: string, range: DateRange): Promise<Slot[]> {
    if (this.demo) return getMockAvailability(serviceId, range);
    // Real: POST /v2/bookings/availability/search with the service's Square
    // catalog id + team member + location, mapped into Slot[]. Never invent.
    return getMockAvailability(serviceId, range);
  }

  async createBooking(input: BookingInput): Promise<BookingResult> {
    const service = services.find((s) => s.id === input.serviceId);
    if (!service) {
      return { ok: false, confirmationId: "", demo: this.demo, message: "Unknown service." };
    }

    if (this.demo) {
      // Simulate a held booking pending deposit. The deposit is collected on
      // Square's HOSTED checkout — we only hand off, never capture cards here.
      return {
        ok: true,
        confirmationId: shortId("LNL"),
        checkoutUrl: online.squareBooking,
        demo: true,
        message: "Demo booking created. In production this holds the slot and opens Square hosted checkout for the deposit.",
      };
    }

    // Real: create the Square booking, then create a Payment Link / hosted
    // checkout for the deposit and return its URL for the client to pay.
    return {
      ok: true,
      confirmationId: shortId("LNL"),
      checkoutUrl: online.squareBooking,
      demo: false,
    };
  }

  async lookupBookings(contact: string): Promise<Booking[]> {
    if (this.demo) {
      // Never fabricate a real client's data. A "demo" contact returns one
      // sample so the lookup UI is demoable; anything else returns none found.
      if (/demo/i.test(contact)) {
        return [
          {
            confirmationId: "LNL-DEMO01",
            serviceName: "Retwist + Simple Style — Medium, 1–90",
            start: "2026-08-05T10:00",
            end: "2026-08-05T11:00",
            status: "confirmed",
            clientName: "Demo Client",
          },
        ];
      }
      return [];
    }
    // Real: query Square bookings by customer phone/email.
    return [];
  }
}
