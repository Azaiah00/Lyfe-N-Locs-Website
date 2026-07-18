/**
 * Mock availability engine (DEMO MODE) — docs/BOOKING-ARCHITECTURE.md.
 *
 * Generates realistic-but-fake open slots from her REAL posted hours
 * (data/facts.ts): Monday closed, the Friday split (8–3 & 5–8), etc. The
 * Friday-evening block is after-hours = retwist only, so it is offered ONLY for
 * retwist-category services. Never invents availability outside posted hours.
 *
 * Determinism: a slot's taken/free state is hashed from its datetime, so the
 * same day always renders the same grid (no flicker, no hydration surprise).
 * A real SquareProvider would replace this with Bookings API availability.
 */

import { hours } from "@/data/facts";
import { services } from "@/data/services";
import type { Slot, DateRange } from "./types";

const SHORT_BY_DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const SLOT_GRANULARITY = 30; // minutes

function parseHM(hm: string): number {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/** Build a local ISO "YYYY-MM-DDTHH:MM" from a date string + minutes-of-day. */
function isoAt(dateStr: string, minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${dateStr}T${pad(h)}:${pad(m)}`;
}

/** Stable pseudo-random in [0,1) from a string seed. */
function seededRandom(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // xorshift finish
  h ^= h << 13;
  h ^= h >>> 17;
  h ^= h << 5;
  return ((h >>> 0) % 10000) / 10000;
}

function eachDate(range: DateRange): string[] {
  const out: string[] = [];
  const start = new Date(`${range.from}T00:00:00`);
  const end = new Date(`${range.to}T00:00:00`);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    out.push(
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    );
  }
  return out;
}

export function getMockAvailability(serviceId: string, range: DateRange): Slot[] {
  const service = services.find((s) => s.id === serviceId);
  if (!service) return [];

  const isRetwist = service.category === "retwist";
  const duration = service.durationMins;
  const slots: Slot[] = [];

  for (const dateStr of eachDate(range)) {
    const dow = new Date(`${dateStr}T00:00:00`).getDay();
    const short = SHORT_BY_DOW[dow];
    const day = hours.find((h) => h.short === short);
    if (!day || day.ranges.length === 0) continue; // Monday & any closed day

    for (const r of day.ranges) {
      const afterHours = Boolean(r.note); // Friday 5–8 = after-hours (retwist only)
      if (afterHours && !isRetwist) continue; // never offer after-hours for non-retwist

      const open = parseHM(r.open);
      const close = parseHM(r.close);
      // Must START within the posted block (min 30m before close). The service
      // may run past close by arrangement — the "done by" preview shows when.
      for (let t = open; t <= close - SLOT_GRANULARITY; t += SLOT_GRANULARITY) {
        const start = isoAt(dateStr, t);
        const end = isoAt(dateStr, t + duration);
        const roll = seededRandom(`${serviceId}|${start}`);
        slots.push({
          start,
          end,
          durationMins: duration,
          available: roll > 0.4, // ~60% open
          afterHours: afterHours || undefined,
        });
      }
    }
  }

  return slots;
}
