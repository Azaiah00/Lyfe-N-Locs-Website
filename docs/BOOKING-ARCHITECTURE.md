# BOOKING-ARCHITECTURE.md — Custom Booking Portal

Goal: turn 80 confusing services into a guided, glam, mobile-first flow that gets each client
into the RIGHT service, protects her time with **deposits + consultation gating**, and confirms
clearly. Visually seamless with the marketing site (same DESIGN.md tokens).

---

## ✅ BUILD STATUS (PROMPT B — implemented)

The portal is built and wired into **`/book`**, visually seamless with the marketing site. It
runs in **DEMO MODE** end-to-end when no API keys are present (mock availability generated from
her real posted hours), so the whole flow is demoable today.

**Code map**
- `lib/booking/types.ts` — domain types + the `BookingProvider` interface (the UI's only contract)
- `lib/booking/config.ts` — engine flag, demo-mode detection, deposit rule (`computeDeposit`),
  notification-provider placeholder
- `lib/booking/availability.ts` — mock slot engine honoring real hours (Monday closed, Friday
  split 8–3 & 5–8; the evening block is after-hours = **retwist only**, enforced here)
- `lib/booking/square.ts` — **SquareProvider (default)**; `lib/booking/stripe-standalone.ts` —
  **Stripe stub (behind `NEXT_PUBLIC_BOOKING_ENGINE=stripe-standalone`)**;
  `lib/booking/index.ts` — `getBookingProvider()` factory
- `app/api/booking/{availability,create,lookup}/route.ts` — server routes (keep secrets server-side)
- `components/booking/*` — `BookingFlow` state machine, `Stepper`, `steps/*`, `MyBookings`

**Engine tradeoff (decision: Option 1 — wrap Square).** Option 1 keeps her on ONE calendar and
her existing payments with zero migration, and layers our better UX on top — the highest-ROI,
lowest-risk path. Option 2 (Stripe standalone) is kept as a working stub behind a flag to prove
the interface is swappable, but it means self-managing availability + a second system, so it is
not the default. Switching engines is a one-line env change; no component touches an adapter
directly. **The site never stores raw card numbers — `createBooking` returns a hosted-checkout
URL for the deposit.**

## Why this matters (the business case)
She books 5–11 hour, $300–$1,000 appointments with **no published deposit**. One no-show is a
lost day of income. Deposits + a consultation funnel are the highest-ROI part of this build.

## Key architecture decision — swappable `BookingProvider`
Implement **Option 1** by default; keep **Option 2** behind a flag. Document tradeoffs here.

- **Option 1 (recommended): wrap Square.** Use Square Bookings API / deep-links as the
  calendar + payments engine so the owner keeps ONE calendar and her existing payment setup,
  and clients get our better UX on top. **No data migration.**
- **Option 2: standalone.** Stripe for deposits + a self-managed availability model.

```ts
// lib/booking/provider.ts
export interface BookingProvider {
  listServices(): Promise<Service[]>;
  getAvailability(serviceId: string, dateRange: DateRange): Promise<Slot[]>;
  createBooking(input: BookingInput): Promise<BookingResult>;   // returns hosted-checkout URL for deposit
  lookupBookings(contact: string): Promise<Booking[]>;
}
// adapters: SquareProvider (default), StripeStandaloneProvider (stub)
```
The UI talks only to `BookingProvider`, so switching engines later is trivial.

## Flow (guided, category-first — NOT one giant list)
1. **"What are you here for?"** → the 10 categories (SERVICES.md) as big glam tiles.
2. **New-client gating:** if user picks a loc service and taps "I'm new / not sure," route to
   the **$25 Consultation** instead of a mis-book. Show a friendly nudge on complex services.
3. **Service select** → real "from $" price, duration, condensed note; surface relevant add-ons
   (long/thick tax, custom parting, complex style) as optional checkboxes.
4. **Date/time** → real availability from the provider; respect her hours incl. the **Friday
   split (8–3 and 5–8)** and **Monday closed**; after-hours/off-day = retwist only.
5. **Client details** → name, phone, email, loc size/count, notes, optional photo upload.
6. **Deposit step (the point of the whole thing):** require a deposit that applies to the
   total. Recommend **$25–$50 flat, or 20% on services $300+**. 【CONFIRM exact rule with
   owner】. The site NEVER collects raw card numbers — always hand off to **Square/Stripe
   hosted checkout**.
7. **Review + confirm** → success screen with add-to-calendar, per-service prep instructions,
   policy reminder, directions (1049 W. Abram St, Arlington TX 76013).
8. **"My bookings"** lookup (by phone/email) to view/reschedule per policy.

## Extras that beat Square
Live duration + end-time preview ("done by ~4:30 PM"); transparent price-range explainer;
service search + filters (size/time/price); consultation CTA everywhere; SMS/email confirmation
+ reminder hooks 【CONFIRM provider】; waitlist capture for full days; saved-client fast path.

## Constraints
Reuse DESIGN.md tokens/components (gold buttons, fuchsia focus ring, onyx cards, gold hairlines,
restrained gold-dust motion in-flow). Mobile-first, fully keyboard-accessible, AA contrast,
Lighthouse ≥ 95. Every unverified price/policy/deposit = visible 【CONFIRM】 token. Never invent
availability. **Prohibited:** the site storing card/bank numbers — always hosted checkout.

## Env / secrets (never commit — .env.local)
`SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`, `SQUARE_APP_ID` (Option 1) or
`STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY` (Option 2); SMS/email provider keys. Build must
run in **demo mode with mock data** when keys are absent, so the whole flow is demoable.
