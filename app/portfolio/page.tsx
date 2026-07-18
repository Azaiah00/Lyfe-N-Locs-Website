import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Confirm } from "@/components/ui/Confirm";
import { Button } from "@/components/ui/Button";
import { Gallery } from "@/components/portfolio/Gallery";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio — Locs, Styles, Braids & Color",
  description:
    "A look at recent locs, styles, color, and braids by Lyfe N' Locs in Arlington, TX. Filter by locs, styles, braids, color, and men's.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ])}
      />

      <section className="relative overflow-hidden">
        <div className="wash-gold pointer-events-none absolute inset-x-0 top-0 h-64" />
        <div className="container-glam relative pb-12 pt-16 md:pb-16 md:pt-24">
          <div className="max-w-3xl">
            <Eyebrow>The Work</Eyebrow>
            <h1 className="mt-4 text-display-l">Proof is in the parts.</h1>
            <p className="mt-6 text-body-l text-[var(--color-muted)]">
              A look at recent locs, styles, color, and braids.{" "}
              <Confirm>swap AI placeholders for her real photos before launch</Confirm>
            </p>
          </div>
        </div>
      </section>

      <div className="container-glam pb-24">
        <Gallery />

        <div className="mt-16 flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-10 text-center hairline-top">
          <h2 className="text-h2">See something you love?</h2>
          <p className="max-w-md text-[var(--color-muted)]">
            Book your service or start with a $25 consultation and we&apos;ll plan your look.
          </p>
          <Button href="/book">Book Now</Button>
        </div>
      </div>
    </>
  );
}
