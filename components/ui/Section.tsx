import { cn } from "@/lib/cn";

/**
 * Section — vertical rhythm wrapper (DESIGN.md §3: 96px mobile / 128px desktop).
 * `container` wraps children in the 1200px container. `divider` adds a top gold hairline.
 */
export function Section({
  children,
  className,
  id,
  container = true,
  divider = false,
  as: Tag = "section",
  "aria-labelledby": labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  container?: boolean;
  divider?: boolean;
  as?: "section" | "div";
  "aria-labelledby"?: string;
}) {
  return (
    <Tag id={id} aria-labelledby={labelledBy} className={cn("section-y", className)}>
      {divider && (
        <div className="container-glam">
          <hr className="rule-gold mb-16 md:mb-24" />
        </div>
      )}
      {container ? <div className="container-glam">{children}</div> : children}
    </Tag>
  );
}
