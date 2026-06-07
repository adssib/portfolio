"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Text generate effect (adapted from Aceternity UI). Reveals the text word by
 * word with a soft blur-in as it scrolls into view. MotionConfig handles
 * reduced-motion globally, so this collapses to a plain fade there.
 */
export function TextGenerate({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <motion.p
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.03 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, filter: "blur(6px)", y: 6 },
            show: { opacity: 1, filter: "blur(0px)", y: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}
