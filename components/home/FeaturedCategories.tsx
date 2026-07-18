import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SmartImage } from "@/components/ui/SmartImage";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { featuredCategories } from "@/data/services";

/**
 * FeaturedCategories — 6 image tiles → /services anchors (docs/CONTENT.md).
 * Image zoom + gold vignette on hover (DESIGN.md §4 portfolio-style tiles).
 */
export function FeaturedCategories() {
  return (
    <Section divider aria-labelledby="cats-heading">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Eyebrow>The Menu</Eyebrow>
          <h2 id="cats-heading" className="mt-4 text-h1">
            Every loc, every stage, every style.
          </h2>
        </div>
        <Link
          href="/services"
          className="font-semibold text-[var(--color-gold)] hover:underline"
        >
          View full menu →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCategories.map((cat, i) => (
          <ScrollReveal key={cat.id} delay={(i % 3) * 0.06} className="h-full">
            <Link
              href={`/services#${cat.id}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-smoke)] hairline-top"
            >
              <SmartImage
                src={cat.image ?? "hero.png"}
                alt={`${cat.label} — Lyfe N' Locs, Arlington TX`}
                fill
                rounded={false}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,13,0.92)] via-[rgba(11,11,13,0.35)] to-transparent" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 wash-gold" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-h3 text-[var(--color-ivory)]">{cat.short}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-[var(--color-muted)]">
                  {cat.blurb}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
