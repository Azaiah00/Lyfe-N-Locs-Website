import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

/**
 * StartHere — the 3-card finder that routes clients to the right first step
 * (docs/CONTENT.md Home > "Start here"). Copy verbatim.
 */
const cards = [
  {
    kicker: "New to locs?",
    body: "Start with a $25 consultation. We'll plan your loc journey and pick the right start method.",
    cta: "Book a Consultation",
    href: "/book?service=loc-consultation",
  },
  {
    kicker: "Already locked?",
    body: "Retwist, interlock, color, or restyle — find your size and count.",
    cta: "See Retwist Menu",
    href: "/services#retwist",
  },
  {
    kicker: "Want a style?",
    body: "Updos, loc bobs, faux locs, braids, and crochet.",
    cta: "See Styles",
    href: "/services#styling",
  },
];

export function StartHere() {
  return (
    <Section aria-labelledby="start-here-heading">
      <div className="mb-12 max-w-2xl">
        <Eyebrow>Start Here</Eyebrow>
        <h2 id="start-here-heading" className="mt-4 text-h1">
          Not sure where to begin?
        </h2>
        <p className="mt-4 text-body-l text-[var(--color-muted)]">
          Three ways in — tell me where you are and I&apos;ll take it from there.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card, i) => (
          <ScrollReveal key={card.kicker} delay={i * 0.08} className="h-full">
            <SpotlightCard className="flex h-full flex-col p-7">
              <h3 className="text-h2">{card.kicker}</h3>
              <p className="mt-3 flex-1 text-[var(--color-muted)]">{card.body}</p>
              <Link
                href={card.href}
                className="group mt-6 inline-flex items-center gap-2 font-semibold text-[var(--color-gold)]"
              >
                {card.cta}
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
