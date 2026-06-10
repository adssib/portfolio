"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Encrypted / decrypt text effect (adapted from Aceternity UI).
 * Decodes left-to-right one character at a time, like an infection spreading:
 * characters behind the "front" are locked to the real text, the rest churn
 * through random cipher glyphs (and keep cycling until the front reaches them).
 * Deliberately slow so each step reads. After it settles, an occasional calm
 * re-run keeps it alive.
 *
 * Accessibility: the real string is exposed via aria-label and the animated
 * glyphs are aria-hidden, so screen readers always read the correct text.
 * Honors prefers-reduced-motion by rendering the final text statically.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/?{}[]=+-";

const randGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

type DecryptTextProps = {
  text: string;
  className?: string;
  as?: React.ElementType;
  /** ms the decode "front" takes to advance one character (lower = faster) */
  charStep?: number;
  /** render in monospace so cipher glyphs line up exactly (no slicing/bleed) */
  mono?: boolean;
  /** ms between cipher-glyph changes for not-yet-decoded characters */
  refresh?: number;
  /** delay before the decode starts; glyphs churn during the wait (ms) */
  startDelay?: number;
  /** keep an occasional re-run going after the decode */
  glitch?: boolean;
  /** gate the decode — flip to true to begin (e.g. when scrolled into view) */
  start?: boolean;
};

export function DecryptText({
  text,
  className,
  as: Tag = "span",
  charStep = 180,
  refresh = 55,
  startDelay = 0,
  glitch = true,
  mono = true,
  start = true,
}: DecryptTextProps) {
  // SSR + first client render show the real text → no hydration mismatch, SEO-safe.
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    // Not started yet (gated until scrolled into view): show real text, wait.
    if (!start) {
      setDisplay(text);
      setDone(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      setDone(true);
      return;
    }

    let active = true;
    const push = (id: number) => timers.current.push(id);

    // Render with the decode front at `front`: chars before it are real, the
    // rest are random cipher glyphs (spaces always stay spaces).
    const render = (front: number) => {
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        out += c === " " ? " " : i < front ? c : randGlyph();
      }
      setDisplay(out);
    };

    const runReveal = (after?: () => void) => {
      const start = performance.now();
      setDone(false);
      const step = () => {
        if (!active) return;
        const front = Math.floor((performance.now() - start) / charStep);
        if (front >= text.length) {
          setDisplay(text);
          setDone(true);
          after?.();
          return;
        }
        render(front);
        push(window.setTimeout(step, refresh));
      };
      step();
    };

    // Occasional calm re-run once settled.
    const scheduleGlitch = () => {
      if (!glitch) return;
      push(
        window.setTimeout(
          () => runReveal(scheduleGlitch),
          6000 + Math.random() * 4000
        )
      );
    };

    if (startDelay > 0) render(0);
    push(window.setTimeout(() => runReveal(scheduleGlitch), startDelay));

    return () => {
      active = false;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [text, charStep, refresh, startDelay, glitch, start]);

  return (
    <Tag
      className={cn("relative inline-block", mono && "font-mono", className)}
      aria-label={text}
    >
      {/* Invisible real text reserves the final width so nothing reflows. */}
      <span className="invisible" aria-hidden>
        {text}
      </span>
      {/* In monospace every glyph is the same width, so the cipher always lines
          up exactly with the real text — no slicing, no bleed into the next word. */}
      <span
        className={cn(
          "absolute inset-0 whitespace-pre",
          !done && "decrypt-scrambling"
        )}
        aria-hidden
      >
        {display}
      </span>
    </Tag>
  );
}
