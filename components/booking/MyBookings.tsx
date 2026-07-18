"use client";

import { useState } from "react";
import type { Booking } from "@/lib/booking/types";
import { lookupBookings } from "@/lib/booking/client";
import { formatDateLong, formatTime } from "@/lib/booking/format";
import { Button } from "@/components/ui/Button";
import { contact } from "@/data/facts";
import { cn } from "@/lib/cn";

/**
 * MyBookings — lookup by phone/email to view/reschedule (flow step 8). Never
 * fabricates a real client's data; in demo, the contact "demo" returns a sample.
 */
export function MyBookings() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [bookings, setBookings] = useState<Booking[]>([]);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setState("loading");
    try {
      const res = await lookupBookings(value.trim());
      setBookings(res.bookings);
    } catch {
      setBookings([]);
    }
    setState("done");
  };

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-6 hairline-top md:p-8">
      <h2 className="text-h2">Manage a booking</h2>
      <p className="mt-2 text-[var(--color-muted)]">
        Look up your appointment by phone or email to view or reschedule.
      </p>

      <form onSubmit={search} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Phone or email"
          aria-label="Phone or email"
          className={cn(
            "h-12 flex-1 rounded-[var(--radius-sm)] border border-[var(--color-smoke)] bg-[var(--color-noir)] px-3.5 text-[var(--color-ivory)] placeholder:text-[var(--color-muted-2)]",
            "focus:outline-none focus:border-[var(--color-gold)] focus:ring-4 focus:ring-[rgba(255,46,136,0.3)]"
          )}
        />
        <Button type="submit" disabled={state === "loading"}>
          {state === "loading" ? "Searching…" : "Find booking"}
        </Button>
      </form>

      {state === "done" && (
        <div className="mt-6">
          {bookings.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)]">
              No bookings found for that contact. If you just booked, give it a minute — or
              call{" "}
              <a href={contact.phoneHref} className="text-[var(--color-gold)] underline">
                {contact.phoneDisplay}
              </a>
              .
            </p>
          ) : (
            <ul className="space-y-3">
              {bookings.map((b) => (
                <li
                  key={b.confirmationId}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--color-smoke)] bg-[var(--color-noir)] p-4"
                >
                  <div>
                    <p className="font-semibold text-[var(--color-ivory)]">{b.serviceName}</p>
                    <p className="text-sm text-[var(--color-muted)]">
                      {formatDateLong(b.start)} · {formatTime(b.start)}
                    </p>
                    <p className="text-xs text-[var(--color-muted-2)]">#{b.confirmationId}</p>
                  </div>
                  <a
                    href={contact.phoneHref}
                    className="text-sm font-semibold text-[var(--color-gold)] underline underline-offset-2"
                  >
                    Call to reschedule
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="mt-4 text-xs text-[var(--color-muted-2)]">
        Tip (demo): search &ldquo;demo&rdquo; to preview a sample booking.
      </p>
    </div>
  );
}
