"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * CountUp — animates a number up when scrolled into view (MOTION.md, stat bar).
 * On prefers-reduced-motion it shows the final value immediately.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(reduce ? value : 0);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setDisplay(value * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
