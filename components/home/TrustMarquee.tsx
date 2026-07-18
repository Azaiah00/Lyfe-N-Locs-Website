import { Marquee } from "@/components/motion/Marquee";

/** Slow gold trust bar (MOTION.md). */
export function TrustMarquee() {
  return (
    <Marquee
      items={[
        "Starter Locs",
        "Retwists",
        "Microlocs",
        "Sisterlocs",
        "Faux Locs",
        "Color",
        "Braids",
        "Loc Styling",
      ]}
    />
  );
}
