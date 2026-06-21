"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card spotlight (adapted from Aceternity UI). A soft radial glow follows the
 * cursor across the card surface on hover. Pure CSS glow driven by --mx/--my
 * custom properties (see `.spotlight-card` in globals.css).
 *
 * Renders a <div> by default; pass `as` (e.g. Link, "article") to change the
 * element, and any extra props (href, target…) are forwarded.
 */
type SpotlightCardProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function SpotlightCard<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: SpotlightCardProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  const Tag = (as || "div") as React.ElementType;

  // Throttle to one layout read + write per animation frame (avoids reflow
  // thrash from firing getBoundingClientRect on every mousemove event).
  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (frame.current !== null) return;
    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      className={cn("spotlight-card", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
