"use client";

import { useEffect, useState } from "react";
import { categories } from "@/data/services";
import { cn } from "@/lib/cn";

/**
 * CategoryNav — sticky category jump-nav with scroll-spy (docs/CONTENT.md
 * Services). Horizontal on mobile, vertical rail on desktop. Active category
 * gets a fuchsia marker. Uses IntersectionObserver, honors reduced-motion for
 * scroll behavior via CSS.
 */
export function CategoryNav() {
  const [active, setActive] = useState<string>(categories[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        // pick the top-most visible section
        let best: string | null = null;
        let bestTop = Infinity;
        for (const id of visible.keys()) {
          const top = document.getElementById(id)?.getBoundingClientRect().top ?? Infinity;
          if (top < bestTop) {
            bestTop = top;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );

    for (const c of categories) {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    }
    observers.push(io);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav aria-label="Service categories" className="lg:sticky lg:top-[88px]">
      <p className="mb-3 hidden text-eyebrow text-[var(--color-muted)] lg:block">Categories</p>
      <ul
        className={cn(
          "flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
        )}
      >
        {categories.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors lg:rounded-[var(--radius-sm)]",
                  isActive
                    ? "bg-[rgba(229,185,78,0.1)] text-[var(--color-ivory)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ivory)]"
                )}
              >
                <span
                  className={cn(
                    "hidden h-1.5 w-1.5 rounded-full transition-colors lg:inline-block",
                    isActive ? "bg-[var(--color-fuchsia)]" : "bg-[var(--color-smoke)]"
                  )}
                />
                {c.short}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
