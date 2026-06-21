"use client";

import dynamic from "next/dynamic";

/**
 * Client boundary that lazy-loads the (heavy, ~600-line) Terminal as a separate
 * chunk instead of shipping it in the initial page bundle. It's an on-demand
 * overlay — not needed for first paint — so this trims initial JS / TTI. The
 * docked launcher + backtick key listener attach once the chunk loads after
 * hydration. `ssr: false` is required (and fine: the terminal is purely
 * interactive, nothing to prerender) and is only allowed inside a Client
 * Component like this one.
 */
const Terminal = dynamic(
  () => import("@/components/terminal").then((m) => m.Terminal),
  { ssr: false }
);

export function TerminalLoader() {
  return <Terminal />;
}
