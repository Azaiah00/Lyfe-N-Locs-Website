"use client";

import { useState } from "react";
import type { Service } from "@/data/services";
import type { Slot, ClientDetails } from "@/lib/booking/types";
import { computeDeposit, DEPOSIT_RULE } from "@/lib/booking/config";
import { formatDateLong, formatTime, doneByLabel } from "@/lib/booking/format";
import { Button } from "@/components/ui/Button";
import { Confirm } from "@/components/ui/Confirm";
import { PriceTag } from "@/components/ui/PriceTag";
import { addOnLabel } from "@/lib/booking/addons";
import { StepHeading } from "./CategoryStep";

/**
 * Step 6 + 7 — review + deposit (docs/BOOKING-ARCHITECTURE.md). Shows the full
 * order, then a required deposit that APPLIES TO THE TOTAL. The exact deposit
 * rule is a recommended default and stays a visible 【CONFIRM】 token. The site
 * NEVER collects card numbers — Confirm hands off to hosted checkout.
 */
export function DepositStep({
  service,
  addOnIds,
  slot,
  client,
  submitting,
  error,
  onBack,
  onConfirm,
}: {
  service: Service;
  addOnIds: string[];
  slot: Slot;
  client: ClientDetails;
  submitting: boolean;
  error?: string;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const deposit = computeDeposit(service.priceFrom);

  return (
    <div>
      <StepHeading eyebrow="Step 6" title="Review & deposit" sub="One last look, then a deposit to lock your slot." />

      {/* Order summary */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-6 hairline-top">
        <Row label="Service">
          <span className="text-right">
            <span className="block text-[var(--color-ivory)]">{service.name}</span>
            <span className="mt-1 block">
              <PriceTag amount={service.priceFrom} />
            </span>
          </span>
        </Row>

        {addOnIds.length > 0 && (
          <Row label="Add-ons">
            <span className="text-right text-[var(--color-ivory)]">
              {addOnIds.map((id) => (
                <span key={id} className="block">
                  {addOnLabel(id)}
                </span>
              ))}
            </span>
          </Row>
        )}

        <Row label="When">
          <span className="text-right text-[var(--color-ivory)]">
            {formatDateLong(slot.start)}
            <span className="mt-0.5 block text-sm text-[var(--color-muted)]">
              {formatTime(slot.start)} · {doneByLabel(slot)}
            </span>
            {slot.afterHours && (
              <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-fuchsia)]">
                After-hours (retwist only)
              </span>
            )}
          </span>
        </Row>

        <Row label="Name">
          <span className="text-right text-[var(--color-ivory)]">{client.name}</span>
        </Row>
        <Row label="Contact">
          <span className="text-right text-[var(--color-muted)]">
            {client.phone}
            <span className="block break-all">{client.email}</span>
          </span>
        </Row>
        {client.locSizeCount && (
          <Row label="Locs">
            <span className="text-right text-[var(--color-muted)]">{client.locSizeCount}</span>
          </Row>
        )}
      </div>

      {/* Deposit */}
      <div className="mt-5 rounded-[var(--radius-lg)] border border-[rgba(229,185,78,0.35)] bg-[rgba(229,185,78,0.06)] p-6">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-h3 text-[var(--color-ivory)]">Deposit to book</span>
          <span className="font-sans text-2xl font-bold text-[var(--color-gold)]">${deposit}</span>
        </div>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Applies to your total. Starting price shown is <PriceTag amount={service.priceFrom} />;
          final pricing is confirmed before we start.
        </p>
        <p className="mt-3 text-sm">
          <Confirm>exact deposit rule — {DEPOSIT_RULE.note}</Confirm>
        </p>

        <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm text-[var(--color-ivory)]">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--color-fuchsia)]"
          />
          <span>
            I understand a deposit holds my appointment and applies to my total, and I&apos;ll
            complete it on secure hosted checkout.
          </span>
        </label>
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs text-[var(--color-muted)]">
        <LockIcon />
        This site never sees your card. The deposit is collected on Square/Stripe hosted
        checkout.
      </p>

      {error && (
        <p className="mt-4 rounded-[var(--radius-sm)] border border-[var(--color-danger)] bg-[rgba(255,90,90,0.08)] p-3 text-sm text-[var(--color-danger)]" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="ghost" onClick={onBack} type="button" disabled={submitting}>
          ← Back
        </Button>
        <Button onClick={onConfirm} disabled={!agreed || submitting}>
          {submitting ? "Booking…" : `Confirm & pay $${deposit} deposit →`}
        </Button>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-[var(--color-smoke)] py-3 first:pt-0 last:border-0">
      <span className="text-eyebrow text-[var(--color-muted)]">{label}</span>
      {children}
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" aria-hidden="true" className="mt-0.5 shrink-0">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
