import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { contact, business } from "@/data/facts";

export const metadata: Metadata = pageMetadata({
  title: "About the Artist — Solo Loc Specialist in Arlington, TX",
  description:
    "Meet Muriel, the solo loc artist behind Lyfe N' Locs Beauty Lounge in Arlington, TX. Healthy locs first, beautiful always — coils to color, retwists to sisterlocs.",
  path: "/about",
});

const values = [
  { title: "Hair health first", body: "Every start and retwist is built to keep your scalp and locs strong." },
  { title: "Solo, personal service", body: "Book me and you get me — my full attention, start to finish." },
  { title: "Real loc expertise", body: "Coils, interlocking, micro, sisterlocs, color, and styles — every stage." },
  { title: "Never rushed", body: "By appointment only, so your hair gets the time it deserves." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="relative overflow-hidden">
        <div className="wash-gold pointer-events-none absolute inset-x-0 top-0 h-72" />
        <div className="container-glam relative grid items-center gap-10 pb-16 pt-16 md:grid-cols-2 md:gap-16 md:pb-24 md:pt-24">
          <div>
            <Eyebrow>Meet the Artist</Eyebrow>
            <h1 className="mt-4 text-display-l">
              Hi, I&apos;m {business.ownerName}.
            </h1>
            <p className="mt-6 text-body-l text-[var(--color-muted)]">
              Lyfe N&apos; Locs started with a simple belief — locs should be healthy first and
              beautiful always. I&apos;m a solo loc artist in {contact.city}, which means when you
              book, you get me: my full attention, my hands, and a plan built for your hair. I
              work across every stage of the loc journey — coils and two-strand starts, retwists
              and interlocking, micro and sisterlocs, color, faux locs, and the styles that make
              people ask where you got your hair done.
            </p>
            <div className="mt-8">
              <Button href="/book?service=loc-consultation">Book a Consultation</Button>
            </div>
          </div>

          <ScrollReveal delay={0.08}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              <SmartImage
                src="artist.jpg"
                alt="Portrait of the loc artist behind Lyfe N' Locs (placeholder — replace with real headshot)"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 400px"
                className="shadow-[var(--shadow-gold)]"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-y" aria-labelledby="values-heading">
        <div className="container-glam">
          <hr className="rule-gold mb-16" />
          <h2 id="values-heading" className="sr-only">
            What I stand for
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.06} className="h-full">
                <div className="h-full rounded-[var(--radius-lg)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-6 hairline-top">
                  <h3 className="text-h3 text-[var(--color-gold)]">{v.title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-muted)]">{v.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
