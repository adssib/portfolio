"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated gradient background (aceternity / shadcn-style).
 * Fixed full-viewport layer behind the page. Purple + violet blobs with a
 * "goo" SVG filter so they merge organically. Cursor-following accent blob.
 */
export function Background() {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let raf = 0;
    const step = () => {
      if (interactiveRef.current) {
        currentRef.current.x +=
          (targetRef.current.x - currentRef.current.x) / 20;
        currentRef.current.y +=
          (targetRef.current.y - currentRef.current.y) / 20;
        interactiveRef.current.style.transform = `translate(${Math.round(
          currentRef.current.x
        )}px, ${Math.round(currentRef.current.y)}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX - window.innerWidth / 2;
      targetRef.current.y = e.clientY - window.innerHeight / 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[linear-gradient(135deg,_#0a0612_0%,_#0e0820_45%,_#070512_100%)]"
    >
      {/* Goo filter for organic blob blending */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 [filter:url(#goo)_blur(28px)]">
        <div className="bg-aurora bg-aurora-1" />
        <div className="bg-aurora bg-aurora-2" />
        <div className="bg-aurora bg-aurora-3" />
        <div className="bg-aurora bg-aurora-4" />
        <div className="bg-aurora bg-aurora-5" />
        {mounted && (
          <div
            ref={interactiveRef}
            className="bg-aurora bg-aurora-cursor"
          />
        )}
      </div>

      {/* Readability layers: dark wash + vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(7, 5, 14, 0.55)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(7,5,14,0) 0%, rgba(7,5,14,0.35) 70%, rgba(5,3,12,0.85) 100%)",
        }}
      />
    </div>
  );
}
