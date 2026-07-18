import { priceNote } from "@/data/services";

/**
 * PriceNote — the pricing-varies banner, shown VERBATIM (docs/SERVICES.md).
 * Reinforces CLAUDE.md rule #4: prices are starting prices / placeholders.
 */
export function PriceNote() {
  return (
    <div
      role="note"
      className="rounded-[var(--radius)] border border-[rgba(229,185,78,0.35)] bg-[rgba(229,185,78,0.06)] p-5 md:p-6"
    >
      <p className="flex items-start gap-3 text-sm text-[var(--color-ivory)] md:text-base">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="mt-0.5 shrink-0"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8h.01M11 12h1v4h1" />
        </svg>
        <span>{priceNote}</span>
      </p>
    </div>
  );
}
