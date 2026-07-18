import { cn } from "@/lib/cn";

/**
 * ShinyText — gold shimmer sweep (MOTION.md). CSS-driven (.shiny-text), ~3s loop.
 * Disables itself on prefers-reduced-motion via globals.css. Use on the wordmark
 * and ONE hero word only.
 */
export function ShinyText({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "strong" | "em";
}) {
  return <Tag className={cn("shiny-text", className)}>{children}</Tag>;
}
