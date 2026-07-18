"use client";

import Link from "next/link";
import type { Service } from "@/data/services";
import type { Slot, BookingResult, ClientDetails } from "@/lib/booking/types";
import { formatDateLong, formatTime, doneByLabel, googleCalendarUrl } from "@/lib/booking/format";
import { Button } from "@/components/ui/Button";
import { Confirm } from "@/components/ui/Confirm";
import { LogoMark } from "@/components/ui/LogoMark";
import { directionsHref } from "@/lib/maps";
import { contact } from "@/data/facts";

/**
 * Step 8 — success (docs/BOOKING-ARCHITECTURE.md). Confirmation id, add-to-
 * calendar, per-service prep (【CONFIRM】 until owner sets it), policy reminder,
 * and directions. If a hosted-checkout URL is present, the deposit CTA links to
 * it — the deposit is completed off-site.
 */
export function SuccessStep({
  service,
  slot,
  result,
  client,
}: {
  service: Service;
  slot: Slot;
  result: BookingResult;
  client: ClientDetails;
}) {
  const calUrl = googleCalendarUrl({
    title: `${service.name} — Lyfe N' Locs`,
    start: slot.start,
    end: slot.end,
    details: `Confirmation ${result.confirmationId}. Lyfe N' Locs Beauty Lounge.`,
    location: `${contact.addressLine}, ${contact.city}, ${contact.state} ${contact.postalCode}`,
  });

  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(63,208,138,0.12)]">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <p className="mt-6 text-eyebrow text-[var(--color-gold)]">
        {result.checkoutUrl ? "Almost done" : "You're booked"}
      </p>
      <h2 className="mt-3 text-h1">
        {result.checkoutUrl ? "One step left — your deposit" : "See you soon."}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-[var(--color-muted)]">
        Confirmation <span className="font-semibold text-[var(--color-ivory)]">{result.confirmationId}</span>
        {result.demo && " (demo)"}. {result.checkoutUrl
          ? "Complete your deposit on secure hosted checkout to lock the slot."
          : "A confirmation is on its way."}
      </p>

      {result.checkoutUrl && (
        <div className="mt-6">
          <Button href={result.checkoutUrl} external size="lg">
            Pay deposit on secure checkout →
          </Button>
        </div>
      )}

      {/* Appointment card */}
      <div className="mx-auto mt-8 max-w-lg rounded-[var(--radius-lg)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-6 text-left hairline-top">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-h3 text-[var(--color-ivory)]">{service.name}</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {formatDateLong(slot.start)}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              {formatTime(slot.start)} · {doneByLabel(slot)}
            </p>
          </div>
          <LogoMark className="h-9 w-9 shrink-0 opacity-70" />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button href={calUrl} external variant="secondary" size="md">
            Add to calendar
          </Button>
          <Button href={directionsHref()} external variant="secondary" size="md">
            Directions
          </Button>
        </div>
      </div>

      {/* Prep + policy */}
      <div className="mx-auto mt-6 grid max-w-lg gap-3 text-left sm:grid-cols-2">
        <InfoTile title="How to prep">
          {service.note ? `${service.note} ` : ""}
          <Confirm>per-service prep instructions</Confirm>
        </InfoTile>
        <InfoTile title="Good to know">
          Deposit applies to your total. Reschedule window and cancellation policy:{" "}
          <Link href="/policies" className="text-[var(--color-gold)] underline underline-offset-2">
            see policies
          </Link>
          .
        </InfoTile>
      </div>

      <p className="mt-6 text-caption">
        Booked for {client.name} · {contact.addressLine}, {contact.city}, {contact.state}
      </p>

      <div className="mt-8">
        <Button href="/" variant="ghost">
          ← Back to home
        </Button>
      </div>
    </div>
  );
}

function InfoTile({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-5">
      <p className="text-eyebrow text-[var(--color-gold)]">{title}</p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">{children}</p>
    </div>
  );
}
