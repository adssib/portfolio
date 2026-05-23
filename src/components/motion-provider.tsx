"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wraps the app in a MotionConfig that honors prefers-reduced-motion.
 * `reducedMotion="user"` makes Framer Motion read the OS setting and
 * disable transforms/transitions when the user has it enabled.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
