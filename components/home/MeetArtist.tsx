import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SmartImage } from "@/components/ui/SmartImage";
import { Confirm } from "@/components/ui/Confirm";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

/**
 * MeetArtist — short intro (docs/CONTENT.md). Owner name stays a visible
 * 【CONFIRM】 token (FACTS.md / CONFIRM.md — never invent a name).
 */
export function MeetArtist() {
  return (
    <Section divider aria-labelledby="artist-heading">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <ScrollReveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm md:mx-0">
            <SmartImage
              src="artist.jpg"
              alt="Portrait of the loc artist behind Lyfe N' Locs (placeholder — replace with real headshot)"
              fill
              sizes="(max-width: 768px) 90vw, 400px"
              className="shadow-[var(--shadow-card)]"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <Eyebrow>Meet the Artist</Eyebrow>
          <h2 id="artist-heading" className="mt-4 text-h1">
            The hands behind the locs.
          </h2>
          <p className="mt-6 text-body-l text-[var(--color-muted)]">
            I&apos;m <Confirm>name</Confirm> — the hands behind Lyfe N&apos; Locs. I specialize
            in healthy locs from the very first coil to the styles that turn heads. Your hair
            leaves my chair looking intentional, glossy, and cared for.
          </p>
          <Link
            href="/about"
            className="group mt-6 inline-flex items-center gap-2 font-semibold text-[var(--color-gold)]"
          >
            Read my story
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </ScrollReveal>
      </div>
    </Section>
  );
}
