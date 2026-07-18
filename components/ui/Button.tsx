import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Button — the single button primitive (DESIGN.md §4).
 * primary   = gold gradient fill, dark ink, fuchsia inner-ring on hover (THE CTA)
 * secondary = transparent, gold hairline border, ivory text
 * ghost     = text only (nav)
 * Renders <a> for hrefs (internal via next/link, external with rel), else <button>.
 */

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-bold rounded-[var(--radius)] " +
  "min-h-[44px] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-fuchsia)] " +
  "disabled:opacity-50 disabled:pointer-events-none select-none";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "btn-primary text-[var(--color-gold-ink)] shadow-[var(--shadow-card)] " +
    "hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)] active:translate-y-0",
  secondary:
    "border border-[rgba(229,185,78,0.35)] text-[var(--color-ivory)] " +
    "hover:bg-[rgba(229,185,78,0.08)] hover:-translate-y-0.5",
  ghost: "text-[var(--color-ivory)] hover:text-[var(--color-gold)]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _variant, size: _size, className: _className, children: _children, href: _href, external: _external, ...rest } =
    props as ButtonAsButton & { external?: boolean };
  void [_variant, _size, _className, _children, _href, _external];
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
