import { cn } from "@/lib/cn";

/**
 * LogoMark — the signature loc-bun woman line-mark (DESIGN.md §6).
 * Single-color gold line-icon used for the favicon, loaders, section markers,
 * and image fallbacks. PLACEHOLDER: replace with the vectorized real logo
 * (docs/IMAGE-PROMPTS.md / docs/CONFIRM.md) before launch.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("text-[var(--color-gold)]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title && <title>{title}</title>}
      {/* loc bun updo */}
      <path d="M20 22c-2-8 4-15 13-15 7 0 12 4 13 10" />
      <path d="M46 17c4 1 7 4 7 8 0 5-4 7-8 7" />
      <path d="M45 12c3-1 6 0 7 3" />
      <path d="M50 24c3 1 5 3 5 6" />
      {/* face profile */}
      <path d="M20 22c-1 4-1 8 1 12 1 3 3 5 3 8v10" />
      <path d="M24 34c2 1 4 1 6 0" />
      {/* neck + shoulder */}
      <path d="M24 52c6 3 13 3 20 0" />
      {/* gold hoop earring */}
      <circle cx="27" cy="40" r="3.2" />
    </svg>
  );
}
