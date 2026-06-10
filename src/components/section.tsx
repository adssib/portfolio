"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DecryptText } from "@/components/ui/decrypt-text";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, className, children }: SectionProps) {
  // Gate the heading decode until the section scrolls into view, so the
  // "infection" decode reads as the section arrives rather than off-screen.
  const [entered, setEntered] = useState(false);

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      onViewportEnter={() => setEntered(true)}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative mx-auto w-full max-w-5xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20 md:py-28 lg:py-32",
        className
      )}
    >
      {(eyebrow || title) && (
        <div className="mb-12 flex flex-col gap-2">
          {eyebrow && (
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              <DecryptText
                text={title}
                start={entered}
                glitch={false}
                className="text-foreground"
              />
            </h2>
          )}
          <div className="accent-divider mt-4" />
        </div>
      )}
      {children}
    </motion.section>
  );
}
