"use client";

import Link from "next/link";
import { useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SmartImage } from "@/components/ui/SmartImage";
import { portfolioItems } from "@/data/portfolio";
import { cn } from "@/lib/cn";

/**
 * PortfolioStrip — a draggable, scroll-snap carousel of best work
 * (MOTION.md "Circular Gallery / Carousel", drag on mobile). Keyboard: the
 * scroller is focusable and arrow-scrolls; each tile links to the full gallery.
 */
export function PortfolioStrip() {
  const scroller = useRef<HTMLDivElement>(null);
  const items = portfolioItems.slice(0, 8);

  const nudge = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="section-y" aria-labelledby="strip-heading">
      <div className="container-glam mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>The Work</Eyebrow>
          <h2 id="strip-heading" className="mt-4 text-h1">
            Proof is in the parts.
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden gap-2 sm:flex">
            <CarouselButton label="Previous" onClick={() => nudge(-1)} dir="left" />
            <CarouselButton label="Next" onClick={() => nudge(1)} dir="right" />
          </div>
          <Link
            href="/portfolio"
            className="font-semibold text-[var(--color-gold)] hover:underline"
          >
            View Full Portfolio →
          </Link>
        </div>
      </div>

      <div
        ref={scroller}
        tabIndex={0}
        aria-label="Portfolio carousel — scroll or drag to browse"
        className={cn(
          "flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-[max(2rem,calc((100vw-1200px)/2+2rem))]",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none"
        )}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href="/portfolio"
            className="group relative aspect-[3/4] w-[240px] shrink-0 snap-start overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-smoke)] hairline-top sm:w-[280px]"
          >
            <SmartImage
              src={item.src}
              alt={item.alt}
              fill
              rounded={false}
              sizes="280px"
              className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 wash-gold" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  dir,
}: {
  label: string;
  onClick: () => void;
  dir: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-smoke)] text-[var(--color-ivory)] transition-colors hover:border-[rgba(229,185,78,0.5)] hover:text-[var(--color-gold)]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
