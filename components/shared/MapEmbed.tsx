import { business, contact } from "@/data/facts";

/**
 * MapEmbed — Google Maps iframe centered on the real NAP (FACTS.md).
 * Uses the keyless embed endpoint (no API key required). Lazy-loaded.
 * Directions/search link helpers live in `lib/maps.ts`.
 */
export function MapEmbed({ className }: { className?: string }) {
  const q = encodeURIComponent(`${business.legalName}, ${contact.fullAddress}`);
  const src = `https://www.google.com/maps?q=${q}&z=15&output=embed`;

  return (
    <div
      className={`overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-smoke)] ${className ?? ""}`}
    >
      <iframe
        title={`Map to ${business.brand}, ${contact.fullAddress}`}
        src={src}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-full min-h-[280px] w-full grayscale-[0.2] contrast-[1.05]"
        style={{ border: 0 }}
      />
    </div>
  );
}
