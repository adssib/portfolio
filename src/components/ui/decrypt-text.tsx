"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Encrypted / decrypt text effect (adapted from Aceternity UI).
 * Resolves one word at a time, left to right ("train" cadence): every word
 * stays scrambled until its turn, then locks to the real text while the
 * remaining words keep churning. The glyph churn is deliberately slow so each
 * change is readable, not a blur. After it settles, an occasional, calm
 * re-run keeps it alive.
 *
 * Accessibility: the real string is exposed via aria-label and the animated
 * glyphs are aria-hidden, so screen readers always read the correct text.
 * Honors prefers-reduced-motion by rendering the final text statically.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/?{}[]=+-";

const randGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const scrambleWord = (word: string) =>
  word
    .split("")
    .map(() => randGlyph())
    .join("");

type DecryptTextProps = {
  text: string;
  className?: string;
  as?: React.ElementType;
  /** ms each word stays scrambling before it locks (train cadence) */
  wordDelay?: number;
  /** ms between glyph changes while scrambling — higher = slower/calmer */
  refresh?: number;
  /** delay before the reveal starts; glyphs scramble during the wait (ms) */
  startDelay?: number;
  /** keep an occasional re-run going after the reveal */
  glitch?: boolean;
};

export function DecryptText({
  text,
  className,
  as: Tag = "span",
  wordDelay = 420,
  refresh = 120,
  startDelay = 0,
  glitch = true,
}: DecryptTextProps) {
  // SSR + first client render show the real text → no hydration mismatch, SEO-safe.
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      setDone(true);
      return;
    }

    const words = text.split(" ");
    let active = true;
    const push = (id: number) => timers.current.push(id);

    const render = (lockedWords: number) =>
      setDisplay(
        words
          .map((w, i) => (i < lockedWords ? w : scrambleWord(w)))
          .join(" ")
      );

    // Lock one word every `wordDelay`, churning the rest every `refresh`.
    const runReveal = (after?: () => void) => {
      const start = performance.now();
      setDone(false);
      const step = () => {
        if (!active) return;
        const locked = Math.floor((performance.now() - start) / wordDelay);
        if (locked >= words.length) {
          setDisplay(text);
          setDone(true);
          after?.();
          return;
        }
        render(locked);
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
  }, [text, wordDelay, refresh, startDelay, glitch]);

  return (
    <Tag className={cn("relative inline-block", className)} aria-label={text}>
      {/* Invisible real text reserves the final width so nothing reflows. */}
      <span className="invisible" aria-hidden>
        {text}
      </span>
      {/* overflow-hidden clips wide scramble glyphs to the word's box so they
          can't spill into the next word. (On the absolute layer only, so the
          element's baseline is unaffected.) */}
      <span
        className={cn(
          "absolute inset-0 overflow-hidden whitespace-pre",
          !done && "decrypt-scrambling"
        )}
        aria-hidden
      >
        {display}
      </span>
    </Tag>
  );
}
