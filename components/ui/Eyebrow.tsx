import { cn } from "@/lib/cn";

/** Eyebrow — uppercase gold kicker (DESIGN.md §2). */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "h2";
}) {
  return (
    <Tag className={cn("text-eyebrow text-[var(--color-gold)]", className)}>
      {children}
    </Tag>
  );
}
