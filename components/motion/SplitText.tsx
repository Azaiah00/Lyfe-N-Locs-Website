"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * SplitText — blur + rise word-stagger reveal for the hero headline (MOTION.md).
 * On prefers-reduced-motion it renders the text instantly (no transform/blur).
 */
export function SplitText({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      aria-label={text}
      variants={{
        visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "0.5em", opacity: 0, filter: "blur(8px)" },
              visible: {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
