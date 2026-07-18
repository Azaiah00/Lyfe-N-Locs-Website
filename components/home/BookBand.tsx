import { Button } from "@/components/ui/Button";
import { GoldDust } from "@/components/motion/GoldDust";
import { business } from "@/data/facts";

/**
 * BookBand — full-width closing CTA band with gold-dust drift (docs/CONTENT.md).
 * The second (and last) place the gold-particle motion appears per MOTION.md.
 */
export function BookBand() {
  return (
    <section
      className="relative overflow-hidden border-y border-[rgba(229,185,78,0.35)] bg-[var(--color-onyx)]"
      aria-labelledby="bookband-heading"
    >
      <GoldDust density={40} opacity={0.3} />
      <div className="wash-gold pointer-events-none absolute inset-0" />

      <div className="container-glam relative flex flex-col items-center gap-6 py-24 text-center md:py-32">
        <h2 id="bookband-heading" className="text-display-l">
          Ready for your <span className="text-gold-metal">best hair</span> yet?
        </h2>
        <p className="max-w-xl text-body-l text-[var(--color-muted)]">
          {business.tagline} in Arlington, TX. New or unsure? Start with a $25 consultation and
          I&apos;ll map out your loc journey.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/book" size="lg">
            Book Now
          </Button>
          <Button href="/book?service=loc-consultation" variant="secondary" size="lg">
            Book a Consultation ($25)
          </Button>
        </div>
      </div>
    </section>
  );
}
