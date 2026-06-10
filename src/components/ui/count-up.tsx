"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Counts a numeric stat up from zero when it scrolls into view, preserving any
 * prefix/suffix in the source string (e.g. "130M+", "20+ yrs"). The real value
 * is exposed via aria-label so screen readers never hear the intermediate count.
 * Honors prefers-reduced-motion by rendering the final value statically.
 */

// "130M+" -> { prefix:"", num:130, suffix:"M+" } · "20+ yrs" -> { num:20, suffix:"+ yrs" }
function parse(value: string) {
  const m = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!m) return { prefix: "", num: NaN, suffix: value };
  return { prefix: m[1], num: parseFloat(m[2].replace(/,/g, "")), suffix: m[3] };
}

export function CountUp({
  value,
  className,
  duration = 2.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { prefix, num, suffix } = parse(value);
  const [display, setDisplay] = useState(
    Number.isNaN(num) ? value : `${prefix}0${suffix}`
  );

  useEffect(() => {
    if (!inView || Number.isNaN(num)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, num, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${prefix}${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, num, prefix, suffix, value, duration]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {Number.isNaN(num) ? value : display}
    </span>
  );
}
