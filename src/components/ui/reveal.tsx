"use client";

import { motion } from "framer-motion";

/**
 * Lightweight scroll-reveal: fades + lifts its children when they enter the
 * viewport, once. Pass an incremental `delay` across siblings for a stagger.
 * No-ops under prefers-reduced-motion (Framer reads it via MotionConfig).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
