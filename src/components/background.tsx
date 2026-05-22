"use client";

import { useMemo } from "react";

const STAR_COUNT = 90;

function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Low-cost animated background: static dark-purple base, twinkling starfield,
 * and a handful of shooting stars. No SVG filters, no RAF loops, no big blurs.
 * Roughly 95% cheaper on CPU/GPU than the goo aurora version.
 */
export function Background() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        x: rand(i + 1) * 100,
        y: rand(i + 100) * 100,
        size: 0.6 + rand(i + 200) * 1.4,
        delay: rand(i + 300) * 6,
        duration: 2.5 + rand(i + 400) * 3.5,
        opacity: 0.3 + rand(i + 500) * 0.55,
      })),
    []
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[linear-gradient(160deg,_#0a0612_0%,_#0e0820_50%,_#060410_100%)]"
    >
      {/* Subtle violet wash at the top so the page still feels purple */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.16) 0%, rgba(139,92,246,0) 60%)",
        }}
      />

      {/* Starfield */}
      <div className="absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
              willChange: "opacity, transform",
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <span className="shooting-star shooting-star-1" />
      <span className="shooting-star shooting-star-2" />
      <span className="shooting-star shooting-star-3" />

      {/* Soft bottom darken so content has more contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(7,5,14,0) 40%, rgba(5,3,12,0.55) 100%)",
        }}
      />
    </div>
  );
}
