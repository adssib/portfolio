"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Section } from "@/components/section";
import certifications from "@/content/certifications.json";

export function Certifications() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="certifications"
      eyebrow={certifications.eyebrow}
      title={certifications.title}
    >
      <ul className="flex flex-col gap-3">
        {certifications.certs.map((c, i) => {
          const isOpen = open === i;
          return (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.07,
              }}
              className="glass overflow-hidden rounded-2xl border-border"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-foreground/[0.03]"
              >
                <div className="min-w-0">
                  <div className="font-display text-base font-medium tracking-tight md:text-lg">
                    {c.name}
                  </div>
                  <div className="mt-0.5 truncate text-sm text-muted-foreground">
                    {c.issuer}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="hidden font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground md:inline">
                    {c.date}
                  </span>
                  <ChevronDown
                    className={
                      "h-4 w-4 text-muted-foreground transition-transform duration-300 " +
                      (isOpen ? "rotate-180" : "")
                    }
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border px-6 py-5">
                      <ol className="space-y-3">
                        {c.courses.map((course, idx) => (
                          <li key={course.title} className="flex gap-4">
                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-foreground/10 bg-foreground/[0.04] font-mono text-[11px] text-brand">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-foreground md:text-[0.95rem]">
                                {course.title}
                              </div>
                              {course.subtitle && (
                                <div className="mt-0.5 text-xs text-muted-foreground md:text-sm">
                                  {course.subtitle}
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
