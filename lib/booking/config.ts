/**
 * Booking configuration & policy (docs/BOOKING-ARCHITECTURE.md).
 *
 * DEMO MODE: with no provider API keys present, the whole flow runs on mock data
 * so it is demoable end-to-end. Real keys flip individual providers live.
 *
 * DEPOSIT RULE is a recommended DEFAULT and remains 【CONFIRM】 until the owner
 * sets the real policy — the UI shows a visible token, never presents it as final.
 */

export type BookingEngine = "square" | "stripe-standalone";

/** Which engine to use. Square is the default (wrap her existing calendar). */
export const BOOKING_ENGINE: BookingEngine =
  (process.env.NEXT_PUBLIC_BOOKING_ENGINE as BookingEngine) || "square";

/** True when the selected engine has no credentials → run on mock data. */
export function isDemoMode(): boolean {
  if (BOOKING_ENGINE === "square") {
    return !(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID);
  }
  return !process.env.STRIPE_SECRET_KEY;
}

/**
 * Recommended deposit default — 20% on services $300+, otherwise a $25 flat
 * hold, capped at $50. 【CONFIRM exact rule with owner】. Applies to the total.
 */
export const DEPOSIT_RULE = {
  flat: 25,
  flatCap: 50,
  percentThreshold: 300,
  percent: 0.2,
  confirmed: false, // when true, drop the 【CONFIRM】 badge in the UI
  note: "Recommended default — applies to your total. Pending owner confirmation.",
};

export function computeDeposit(serviceTotal: number): number {
  if (serviceTotal >= DEPOSIT_RULE.percentThreshold) {
    return Math.round(serviceTotal * DEPOSIT_RULE.percent);
  }
  return Math.min(DEPOSIT_RULE.flat, DEPOSIT_RULE.flatCap);
}

/** Availability search window (days ahead) for the demo/mock engine. */
export const AVAILABILITY_WINDOW_DAYS = 28;

/** Notification provider for confirmations/reminders — 【CONFIRM provider】. */
export const NOTIFICATIONS = {
  provider: null as string | null, // e.g. "Twilio" / "Postmark" — pending owner
  confirmed: false,
};
