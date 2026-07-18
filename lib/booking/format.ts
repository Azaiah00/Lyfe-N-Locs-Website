/** Client-safe datetime formatting for the booking UI (no server imports). */

import type { Slot } from "./types";

/** "10:00 AM" from a local ISO "YYYY-MM-DDTHH:MM". */
export function formatTime(iso: string): string {
  const [, time] = iso.split("T");
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

/** "Wed, Aug 5" from a date string "YYYY-MM-DD". */
export function formatDateLabel(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/** "Wednesday, August 5, 2026". */
export function formatDateLong(iso: string): string {
  const dateStr = iso.split("T")[0];
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** The signature "done by ~4:30 PM" end-time preview (beats Square). */
export function doneByLabel(slot: Slot): string {
  return `Done by ~${formatTime(slot.end)}`;
}

export function dateOf(iso: string): string {
  return iso.split("T")[0];
}

/** Group available slots by date, preserving order. */
export function groupByDate(slots: Slot[]): { date: string; slots: Slot[] }[] {
  const map = new Map<string, Slot[]>();
  for (const s of slots) {
    if (!s.available) continue;
    const d = dateOf(s.start);
    if (!map.has(d)) map.set(d, []);
    map.get(d)!.push(s);
  }
  return Array.from(map.entries()).map(([date, slots]) => ({ date, slots }));
}

/** Google Calendar add-to-calendar link. */
export function googleCalendarUrl(opts: {
  title: string;
  start: string; // local ISO
  end: string;
  details: string;
  location: string;
}): string {
  const stamp = (iso: string) => `${iso.replace(/[-:]/g, "").replace("T", "T")}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: opts.title,
    dates: `${stamp(opts.start)}/${stamp(opts.end)}`,
    details: opts.details,
    location: opts.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
