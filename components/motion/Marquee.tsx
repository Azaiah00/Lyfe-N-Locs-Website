import { cn } from "@/lib/cn";

/**
 * Marquee — slow gold trust bar (MOTION.md). CSS animation (.marquee-track),
 * pauses on hover, halts on prefers-reduced-motion (globals.css). Content is
 * duplicated for a seamless -50% loop; the duplicate is aria-hidden.
 */
function MarqueeRow({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul
      className="marquee-track flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className="text-eyebrow text-[var(--color-gold)]">{item}</span>
          <span className="text-[var(--color-gold-lo)]" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden border-y border-[var(--color-smoke)] py-4",
        className
      )}
      role="marquee"
      aria-label="Services offered"
    >
      <div className="flex">
        <MarqueeRow items={items} />
        <MarqueeRow items={items} hidden />
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-noir)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-noir)] to-transparent" />
    </div>
  );
}
