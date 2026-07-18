"use client";

import { useRef, type ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * SpotlightCard — onyx card with a cursor-follow gold sheen (DESIGN.md §4 / MOTION.md).
 * Desktop pointer only (pointer:fine); no work on touch. The sheen is a pure CSS
 * radial driven by two CSS custom props, so no re-render per mouse move.
 * Renders the shared card surface: onyx bg, hairline gold top edge, lift on hover.
 */
export function SpotlightCard({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  const onMove = (e: React.MouseEvent) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={cn("spotlight-card hairline-top", className)}
    >
      {children}
    </Tag>
  );
}
