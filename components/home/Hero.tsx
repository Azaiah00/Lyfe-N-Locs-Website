import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SmartImage } from "@/components/ui/SmartImage";
import { GoldDust } from "@/components/motion/GoldDust";
import { SplitText } from "@/components/motion/SplitText";
import { ShinyText } from "@/components/motion/ShinyText";
import { business } from "@/data/facts";

/**
 * Hero — "magazine cover meets neon salon window" (DESIGN.md §0).
 * Gold-dust drift behind, Split/Blur reveal on the headline, ShinyText on the
 * word "expensive", one primary CTA + one secondary. Hero image is priority/LCP.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <GoldDust className="opacity-90" />
      <div className="wash-gold pointer-events-none absolute inset-x-0 top-0 h-[60%]" />
      <div className="wash-fuchsia pointer-events-none absolute inset-0" />

      <div className="container-glam relative grid items-center gap-10 pb-20 pt-16 md:grid-cols-2 md:gap-12 md:pb-28 md:pt-24">
        <div>
          <Eyebrow>Arlington, TX · Loc &amp; Braid Studio</Eyebrow>

          <h1 id="hero-heading" className="mt-5 text-display-xl">
            <SplitText as="p" text="Locs that look" className="text-[var(--color-ivory)]" />
            <ShinyText className="text-display-xl">expensive.</ShinyText>
          </h1>

          <p className="mt-6 max-w-xl text-body-l text-[var(--color-muted)]">
            Starter locs, retwists, microlocs, faux locs, color, and braids — crafted by
            hand, built to grow healthy. Book the artist who treats your hair like the
            investment it is.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/book" size="lg">
              Book Now
            </Button>
            <Button href="/book?service=loc-consultation" variant="secondary" size="lg">
              Book a Consultation ($25)
            </Button>
          </div>

          <p className="mt-6 text-caption">
            {business.rating}★ · Solo master loc artist · By appointment
          </p>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <SmartImage
              src="hero.jpg"
              alt="Editorial close-up of immaculate medium locs styled in a sculptural updo — Lyfe N' Locs, Arlington TX"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 440px"
              className="shadow-[var(--shadow-gold)]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] ring-1 ring-inset ring-[rgba(229,185,78,0.25)]" />
          </div>
        </div>
      </div>

      <hr className="rule-gold container-glam" />
    </section>
  );
}
