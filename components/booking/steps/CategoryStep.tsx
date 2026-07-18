import { categories } from "@/data/services";
import type { CategoryId } from "@/data/services";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { cn } from "@/lib/cn";

/**
 * Step 1 — "What are you here for?" 10 category tiles (NOT one giant list) plus
 * a persistent new-client gate that routes straight to the $25 consultation
 * (docs/BOOKING-ARCHITECTURE.md flow steps 1–2).
 */
export function CategoryStep({
  onPick,
  onConsultation,
}: {
  onPick: (id: CategoryId) => void;
  onConsultation: () => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 1"
        title="What are you here for?"
        sub="Pick a category and I'll show only the services that fit. New or unsure? Start with a consultation."
      />

      {/* New-client gate */}
      <button
        type="button"
        onClick={onConsultation}
        className="mb-6 flex w-full items-center gap-4 rounded-[var(--radius-lg)] border border-[rgba(255,46,136,0.4)] bg-[rgba(255,46,136,0.06)] p-5 text-left transition-colors hover:bg-[rgba(255,46,136,0.1)]"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(255,46,136,0.15)] text-[var(--color-fuchsia)]">
          ✦
        </span>
        <span className="flex-1">
          <span className="block font-sans font-bold text-[var(--color-ivory)]">
            New to locs, or not sure what to book?
          </span>
          <span className="block text-sm text-[var(--color-muted)]">
            Start with a $25 consultation — we&apos;ll plan the right service together.
          </span>
        </span>
        <span aria-hidden className="text-[var(--color-fuchsia)]">
          →
        </span>
      </button>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <SpotlightCard key={cat.id} className="p-0">
            <button
              type="button"
              onClick={() => onPick(cat.id)}
              className="flex h-full w-full flex-col p-5 text-left"
            >
              <span className="text-eyebrow text-[var(--color-gold)]">
                {String(cat.index).padStart(2, "0")}
              </span>
              <span className="mt-2 text-h3 text-[var(--color-ivory)]">{cat.short}</span>
              <span className="mt-1 text-sm text-[var(--color-muted)]">{cat.blurb}</span>
            </button>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}

export function StepHeading({
  eyebrow,
  title,
  sub,
  className,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8", className)}>
      <p className="text-eyebrow text-[var(--color-gold)]">{eyebrow}</p>
      <h2 className="mt-3 text-h1">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{sub}</p>}
    </div>
  );
}
