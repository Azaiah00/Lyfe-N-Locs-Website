"use client";

import { useEffect, useState } from "react";
import type { Service } from "@/data/services";
import type { Slot } from "@/lib/booking/types";
import { fetchAvailability } from "@/lib/booking/client";
import { groupByDate, formatDateLabel, formatTime, doneByLabel } from "@/lib/booking/format";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";
import { StepHeading } from "./CategoryStep";
import { cn } from "@/lib/cn";

/**
 * Step 4 — real availability from the provider (mock in demo). Respects her
 * hours incl. the Friday split & Monday closed; after-hours slots only appear
 * for retwist services (the engine enforces it). Never invents availability —
 * empty days offer a waitlist. Signature "done by ~X" end-time preview.
 */
export function DateTimeStep({
  service,
  onBack,
  onWaitlist,
  onContinue,
}: {
  service: Service;
  onBack: () => void;
  onWaitlist: () => void;
  onContinue: (slot: Slot) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);
  const [days, setDays] = useState<{ date: string; slots: Slot[] }[]>([]);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [picked, setPicked] = useState<Slot | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAvailability(service.id)
      .then((res) => {
        if (cancelled) return;
        const grouped = groupByDate(res.slots);
        setDemo(res.demo);
        setDays(grouped);
        setActiveDate(grouped[0]?.date ?? null);
      })
      .catch(() => !cancelled && setDays([]))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [service.id]);

  const activeSlots = days.find((d) => d.date === activeDate)?.slots ?? [];

  return (
    <div>
      <StepHeading
        eyebrow="Step 4"
        title="Pick a date & time"
        sub={`${service.name} · about ${Math.round(service.durationMins / 60 * 10) / 10}h in the chair. Times reflect the studio's real hours.`}
      />

      {demo && (
        <p className="mb-5 rounded-[var(--radius-sm)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] px-3 py-2 text-xs text-[var(--color-muted)]">
          Demo availability — sample times generated from real posted hours. Connect Square to
          show live openings.
        </p>
      )}

      {loading ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <LogoMark className="h-12 w-12 animate-pulse opacity-70" />
          <p className="text-caption">Finding open times…</p>
        </div>
      ) : days.length === 0 ? (
        <EmptyState onWaitlist={onWaitlist} onBack={onBack} />
      ) : (
        <>
          {/* Date rail */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {days.map((d) => (
              <button
                key={d.date}
                type="button"
                onClick={() => {
                  setActiveDate(d.date);
                  setPicked(null);
                }}
                aria-pressed={activeDate === d.date}
                className={cn(
                  "shrink-0 rounded-[var(--radius-sm)] border px-4 py-2 text-sm transition-colors",
                  activeDate === d.date
                    ? "border-[rgba(229,185,78,0.6)] bg-[rgba(229,185,78,0.08)] text-[var(--color-ivory)]"
                    : "border-[var(--color-smoke)] text-[var(--color-muted)] hover:text-[var(--color-ivory)]"
                )}
              >
                {formatDateLabel(d.date)}
              </button>
            ))}
          </div>

          {/* Time grid */}
          <div role="radiogroup" aria-label="Available times" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {activeSlots.map((slot) => {
              const isPicked = picked?.start === slot.start;
              return (
                <button
                  key={slot.start}
                  type="button"
                  role="radio"
                  aria-checked={isPicked}
                  onClick={() => setPicked(slot)}
                  className={cn(
                    "flex flex-col items-start rounded-[var(--radius-sm)] border px-3 py-2.5 text-left transition-colors",
                    isPicked
                      ? "border-transparent bg-grad-gold text-[var(--color-gold-ink)]"
                      : "border-[var(--color-smoke)] bg-[var(--color-onyx)] text-[var(--color-ivory)] hover:border-[rgba(229,185,78,0.4)]"
                  )}
                >
                  <span className="font-sans font-bold">{formatTime(slot.start)}</span>
                  <span
                    className={cn(
                      "text-[0.7rem]",
                      isPicked ? "text-[var(--color-gold-ink)]/80" : "text-[var(--color-muted)]"
                    )}
                  >
                    {doneByLabel(slot)}
                  </span>
                  {slot.afterHours && (
                    <span
                      className={cn(
                        "mt-0.5 text-[0.65rem] font-semibold uppercase tracking-wide",
                        isPicked ? "text-[var(--color-gold-ink)]" : "text-[var(--color-fuchsia)]"
                      )}
                    >
                      After-hours
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onWaitlist}
            className="mt-6 text-sm text-[var(--color-muted)] underline underline-offset-2 hover:text-[var(--color-gold)]"
          >
            Don&apos;t see a time that works? Join the waitlist →
          </button>
        </>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={() => picked && onContinue(picked)} disabled={!picked}>
          Continue →
        </Button>
      </div>
    </div>
  );
}

function EmptyState({ onWaitlist, onBack }: { onWaitlist: () => void; onBack: () => void }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-10 text-center hairline-top">
      <LogoMark className="mx-auto h-12 w-12 opacity-70" />
      <h3 className="mt-5 text-h2">No open times in this window</h3>
      <p className="mx-auto mt-3 max-w-md text-[var(--color-muted)]">
        This service is fully booked for now — I never double-book your hair. Join the waitlist
        and I&apos;ll reach out the moment a slot opens.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Button onClick={onWaitlist}>Join the waitlist</Button>
        <Button variant="secondary" onClick={onBack}>
          Pick another service
        </Button>
      </div>
    </div>
  );
}
