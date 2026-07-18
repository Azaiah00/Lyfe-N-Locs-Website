"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { portfolioFilters, portfolioItems } from "@/data/portfolio";
import type { PortfolioFilter } from "@/data/portfolio";
import { cn } from "@/lib/cn";

/**
 * Gallery — filterable portfolio grid (docs/CONTENT.md Portfolio).
 * Filter tabs: All · Locs · Styles · Braids · Color · Men's. Tab list is
 * keyboard-operable; items animate in (reduced-motion → instant).
 */
export function Gallery() {
  const [active, setActive] = useState<(typeof portfolioFilters)[number]>("All");
  const reduce = useReducedMotion();

  const items = useMemo(
    () =>
      active === "All"
        ? portfolioItems
        : portfolioItems.filter((i) => i.filter === (active as PortfolioFilter)),
    [active]
  );

  return (
    <div>
      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="Filter portfolio by category"
        className="mb-10 flex flex-wrap gap-2"
      >
        {portfolioFilters.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(f)}
              className={cn(
                "min-h-[44px] rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-transparent bg-grad-gold text-[var(--color-gold-ink)]"
                  : "border-[var(--color-smoke)] text-[var(--color-muted)] hover:border-[rgba(229,185,78,0.5)] hover:text-[var(--color-ivory)]"
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.figure
              key={item.id}
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.03 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-smoke)] hairline-top"
            >
              <SmartImage
                src={item.src}
                alt={item.alt}
                fill
                rounded={false}
                sizes="(max-width: 768px) 46vw, 380px"
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 wash-gold" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-[rgba(11,11,13,0.9)] to-transparent p-4 text-xs text-[var(--color-ivory)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-eyebrow text-[var(--color-gold)]">{item.filter}</span>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <p className="py-16 text-center text-[var(--color-muted)]">
          No work in this category yet.
        </p>
      )}
    </div>
  );
}
