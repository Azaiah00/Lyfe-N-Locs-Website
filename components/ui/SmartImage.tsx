"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/ui/LogoMark";

/**
 * SmartImage — next/image wrapper with a branded gold-dust fallback.
 * If the source image is missing (placeholders not yet dropped into
 * /public/images), it renders an on-brand gold-dust panel with the loc-bun
 * line-mark — never a broken image (CLAUDE.md / DESIGN.md §6).
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  sizes,
  className,
  rounded = true,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  rounded?: boolean;
}) {
  const [errored, setErrored] = useState(false);
  const radius = rounded ? "rounded-[var(--radius-lg)]" : "";

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-[var(--color-onyx)]",
          "border border-[rgba(229,185,78,0.25)]",
          radius,
          fill ? "absolute inset-0 h-full w-full" : "",
          className
        )}
        style={!fill && width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
      >
        <div className="absolute inset-0 wash-gold" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20% 30%, #E5B94E 50%, transparent), radial-gradient(1px 1px at 70% 60%, #F6E1A3 50%, transparent), radial-gradient(1px 1px at 40% 80%, #E5B94E 50%, transparent), radial-gradient(1.5px 1.5px at 85% 25%, #F6E1A3 50%, transparent), radial-gradient(1px 1px at 55% 45%, #E5B94E 50%, transparent)",
          }}
        />
        <LogoMark className="relative h-16 w-16 opacity-70" />
      </div>
    );
  }

  const commonProps = {
    src: `/images/${src}`,
    alt,
    priority,
    sizes,
    onError: () => setErrored(true),
    className: cn("object-cover", radius, className),
  };

  if (fill) {
    return <Image {...commonProps} fill alt={alt} />;
  }

  return <Image {...commonProps} width={width!} height={height!} alt={alt} />;
}
