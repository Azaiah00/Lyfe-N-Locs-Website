"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * GoldDust — THE brand motion (DESIGN.md §5 / MOTION.md).
 * A low-density canvas of ~50 slow gold specks drifting behind the hero and one
 * mid-page band. Cheap (single rAF, DPR-capped), pauses off-screen, and fully
 * disables on prefers-reduced-motion. Purely decorative → aria-hidden.
 */
export function GoldDust({
  className,
  density = 52,
  opacity = 0.35,
}: {
  className?: string;
  density?: number;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GOLD = ["#E5B94E", "#F6E1A3", "#B8862F"];
    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; c: string };
    let particles: P[] = [];

    const seed = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? 600;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((density * width) / 1200);
      particles = Array.from({ length: Math.max(18, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.25 + 0.05),
        a: Math.random() * opacity + 0.05,
        c: GOLD[Math.floor(Math.random() * GOLD.length)],
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = height + 4;
          p.x = Math.random() * width;
        }
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    seed();
    draw();

    const onResize = () => {
      cancelAnimationFrame(raf);
      seed();
      draw();
    };
    window.addEventListener("resize", onResize);

    // Pause when scrolled out of view (perf).
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          cancelAnimationFrame(raf);
          draw();
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [density, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
