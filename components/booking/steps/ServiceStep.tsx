"use client";

import { useMemo, useState } from "react";
import { servicesByCategory, getCategory, priceNote } from "@/data/services";
import type { CategoryId } from "@/data/services";
import { ADDON_LIST } from "@/lib/booking/addons";
import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/PriceTag";
import { DurationChip } from "@/components/ui/DurationChip";
import { Tag } from "@/components/ui/Chip";
import { StepHeading } from "./CategoryStep";
import { cn } from "@/lib/cn";

type SortBy = "recommended" | "price" | "time";

/**
 * Step 3 — service select within a category. Real "from $" price, duration,
 * condensed note, and a complex-service nudge to the consultation. Relevant
 * add-ons appear as optional checkboxes. Sort by price/time (beats Square).
 */
export function ServiceStep({
  categoryId,
  onBack,
  onConsultation,
  onContinue,
}: {
  categoryId: CategoryId;
  onBack: () => void;
  onConsultation: () => void;
  onContinue: (serviceId: string, addOnIds: string[]) => void;
}) {
  const category = getCategory(categoryId);
  const [selected, setSelected] = useState<string | null>(null);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [sort, setSort] = useState<SortBy>("recommended");

  const items = useMemo(() => {
    const base = servicesByCategory(categoryId);
    if (sort === "price") return [...base].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === "time") return [...base].sort((a, b) => a.durationMins - b.durationMins);
    return base;
  }, [categoryId, sort]);

  const hasComplex = items.some((s) => s.tags?.includes("advised-only"));

  const toggleAddOn = (id: string) =>
    setAddOnIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <div>
      <StepHeading
        eyebrow={`Step 3 · ${category?.short ?? ""}`}
        title={category?.label ?? "Choose a service"}
        sub={category?.blurb}
      />

      {hasComplex && (
        <div className="mb-6 rounded-[var(--radius)] border border-[rgba(255,46,136,0.35)] bg-[rgba(255,46,136,0.06)] p-4 text-sm text-[var(--color-ivory)]">
          Some services here are best booked after a quick consult so we get your size and
          count right.{" "}
          <button
            type="button"
            onClick={onConsultation}
            className="font-semibold text-[var(--color-fuchsia)] underline underline-offset-2"
          >
            Book a $25 consultation instead
          </button>
          .
        </div>
      )}

      {/* Sort */}
      <div className="mb-5 flex items-center gap-2">
        <span className="text-caption">Sort</span>
        {(["recommended", "price", "time"] as SortBy[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSort(s)}
            aria-pressed={sort === s}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors",
              sort === s
                ? "border-[rgba(229,185,78,0.5)] text-[var(--color-gold)]"
                : "border-[var(--color-smoke)] text-[var(--color-muted)] hover:text-[var(--color-ivory)]"
            )}
          >
            {s === "time" ? "Duration" : s}
          </button>
        ))}
      </div>

      <fieldset>
        <legend className="sr-only">Select a service</legend>
        <ul className="space-y-3">
          {items.map((s) => {
            const isSel = selected === s.id;
            return (
              <li key={s.id}>
                <label
                  className={cn(
                    "flex cursor-pointer flex-col gap-3 rounded-[var(--radius)] border p-4 transition-colors",
                    isSel
                      ? "border-[rgba(229,185,78,0.6)] bg-[rgba(229,185,78,0.06)]"
                      : "border-[var(--color-smoke)] bg-[var(--color-onyx)] hover:border-[rgba(229,185,78,0.3)]"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="service"
                      value={s.id}
                      checked={isSel}
                      onChange={() => setSelected(s.id)}
                      className="mt-1.5 h-4 w-4 shrink-0 accent-[var(--color-fuchsia)]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-h3 text-[var(--color-ivory)]">{s.name}</span>
                        {s.tags?.map((t) => (
                          <Tag key={t} tag={t} />
                        ))}
                      </div>
                      {s.note && (
                        <p className="mt-1 text-sm text-[var(--color-muted)]">{s.note}</p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        <PriceTag amount={s.priceFrom} />
                        <DurationChip minutes={s.durationMins} />
                      </div>
                    </div>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {/* Add-ons */}
      {selected && (
        <div className="mt-6 rounded-[var(--radius)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-5">
          <p className="text-eyebrow text-[var(--color-gold)]">Optional add-ons</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Add these if they apply — final add-on pricing is confirmed in the chair.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {ADDON_LIST.map((a) => (
              <label
                key={a.id}
                className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--color-smoke)] p-3 text-sm transition-colors hover:border-[rgba(229,185,78,0.3)]"
              >
                <input
                  type="checkbox"
                  checked={addOnIds.includes(a.id)}
                  onChange={() => toggleAddOn(a.id)}
                  className="h-4 w-4 accent-[var(--color-fuchsia)]"
                />
                <span className="flex-1 text-[var(--color-ivory)]">{a.label}</span>
                <span className="font-semibold text-[var(--color-gold)]">{a.price}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price explainer */}
      <p className="mt-5 flex items-start gap-2 text-xs text-[var(--color-muted)]">
        <span aria-hidden className="text-[var(--color-gold)]">
          ⓘ
        </span>
        {priceNote}
      </p>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button
          onClick={() => selected && onContinue(selected, addOnIds)}
          disabled={!selected}
        >
          Choose date &amp; time →
        </Button>
      </div>
    </div>
  );
}

