import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CategoryNav } from "@/components/services/CategoryNav";
import { PriceNote } from "@/components/services/PriceNote";
import { AddOns } from "@/components/services/AddOns";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { categories, servicesByCategory } from "@/data/services";

export const metadata: Metadata = pageMetadata({
  title: "Loc Services & Pricing — Starter Locs, Retwist, Microlocs",
  description:
    "Full loc & braid menu in Arlington, TX: consultations, starter locs, retwist & maintenance, micro/sisterlocs, styling, faux locs & braids, color, men's, and more. Starting prices shown.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="wash-gold pointer-events-none absolute inset-x-0 top-0 h-64" />
        <div className="container-glam relative pb-12 pt-16 md:pb-16 md:pt-24">
          <div className="max-w-3xl">
            <Eyebrow>The Menu</Eyebrow>
            <h1 className="mt-4 text-display-l">Every loc, every stage, every style.</h1>
            <p className="mt-6 text-body-l text-[var(--color-muted)]">
              From your first starter set to microloc maintenance, color, and statement styles.
              Not sure which to pick? Book a $25 consultation and I&apos;ll map it out with you.
            </p>
            <div className="mt-8">
              <Button href="/book?service=loc-consultation" variant="secondary">
                Book a Consultation ($25)
              </Button>
            </div>
          </div>

          <div className="mt-10">
            <PriceNote />
          </div>
        </div>
      </section>

      {/* Menu grid + sticky nav */}
      <div className="container-glam pb-24">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
          {/* min-w-0 lets this grid track shrink below the horizontal rail's
              content width on mobile/tablet, so the rail scrolls instead of
              pushing the whole page wider than the viewport. */}
          <div className="min-w-0 lg:pt-2">
            <CategoryNav />
          </div>

          <div className="min-w-0 space-y-20">
            {categories.map((cat) => {
              const items = servicesByCategory(cat.id);
              const headingId = `${cat.id}-heading`;
              return (
                <section
                  key={cat.id}
                  id={cat.id}
                  aria-labelledby={headingId}
                  className="scroll-mt-24"
                >
                  <div className="mb-6 border-b border-[var(--color-smoke)] pb-4">
                    <p className="text-eyebrow text-[var(--color-gold)]">
                      {String(cat.index).padStart(2, "0")}
                    </p>
                    <h2 id={headingId} className="mt-2 text-h1">
                      {cat.label}
                    </h2>
                    <p className="mt-2 max-w-2xl text-[var(--color-muted)]">{cat.blurb}</p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    {items.map((s) => (
                      <ServiceCard key={s.id} service={s} />
                    ))}
                  </div>
                </section>
              );
            })}

            <AddOns />
          </div>
        </div>
      </div>
    </>
  );
}
