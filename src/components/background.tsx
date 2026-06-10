"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive monochrome dot-grid background.
 * A fixed grid of faint dots; near the cursor they brighten and grow, and a
 * soft glow trails the pointer. Theme-aware (reads --foreground), GPU-light,
 * and static under prefers-reduced-motion.
 */
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const context = el.getContext("2d");
    if (!context) return;
    // Non-null typed locals so the nested draw/resize closures stay typed.
    const canvas: HTMLCanvasElement = el;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const GAP = 34; // px between dots
    const RADIUS = 210; // cursor influence radius
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Pointer kept off-screen until the user moves, so the idle state is calm.
    const mouse = { x: -9999, y: -9999 };

    const fg = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim() || "0 0% 7%";

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const color = fg();
      ctx.clearRect(0, 0, width, height);

      // soft glow following the cursor
      if (mouse.x > -9000) {
        const g = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          RADIUS * 1.7
        );
        g.addColorStop(0, `hsl(${color} / 0.06)`);
        g.addColorStop(1, `hsl(${color} / 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      for (let x = GAP; x < width; x += GAP) {
        for (let y = GAP; y < height; y += GAP) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const linear = Math.max(0, 1 - dist / RADIUS); // 0..1 closeness
          const t = linear * linear * (3 - 2 * linear); // smootherstep falloff
          const alpha = 0.045 + t * 0.5;
          const size = 1.1 + t * 3.1;
          ctx.beginPath();
          ctx.fillStyle = `hsl(${color} / ${alpha})`;
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    let raf = 0;
    let needsDraw = true;
    function loop() {
      if (needsDraw) {
        draw();
        // keep drawing a few frames after the pointer rests so the glow fades
      }
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      needsDraw = true;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
      needsDraw = true;
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* Soft accent glows in the corners — theme-aware via --brand. Very faint
          in light mode (so the off-white stays clean), fuller in dark mode. */}
      <div
        className="absolute inset-0 opacity-50 dark:opacity-100"
        style={{
          background:
            "radial-gradient(65% 55% at 10% 2%, hsl(var(--brand) / 0.22) 0%, transparent 62%), radial-gradient(60% 52% at 92% 100%, hsl(var(--brand) / 0.18) 0%, transparent 62%)",
        }}
      />
      {/* Static CSS grid lines, very faint, under the canvas dots */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground) / 0.035) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.035) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          // Vertical-only fade → perfectly uniform across the width (no corner
          // or edge darkening near the header/logo).
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
        }}
      />
      {/* Fade the interactive dots out of the top nav strip so hovering the
          header never lights up a cluster next to the logo. */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0, transparent 76px, black 128px)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, transparent 76px, black 128px)",
        }}
      />
    </div>
  );
}
