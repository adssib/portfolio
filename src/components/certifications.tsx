"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Section } from "@/components/section";

type Cert = {
  name: string;
  issuer: string;
  date: string;
  courses: { title: string; subtitle?: string }[];
};

const certs: Cert[] = [
  {
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI · Coursera · Andrew Ng",
    date: "Jan 2026",
    courses: [
      {
        title: "Neural Networks and Deep Learning",
        subtitle: "Forward/back-prop, activations, foundations of DNNs.",
      },
      {
        title: "Improving Deep Neural Networks",
        subtitle:
          "Hyperparameter tuning, regularization, optimization (Adam, batch norm).",
      },
      {
        title: "Structuring Machine Learning Projects",
        subtitle: "Error analysis, train/dev/test strategy, transfer learning.",
      },
      {
        title: "Convolutional Neural Networks",
        subtitle: "Conv layers, ResNets, object detection, neural style transfer.",
      },
      {
        title: "Sequence Models",
        subtitle:
          "RNNs, LSTMs, attention, transformers, word embeddings.",
      },
    ],
  },
  {
    name: "Anthropic Developer Certifications",
    issuer: "Anthropic · 4 modules",
    date: "Apr 2026",
    courses: [
      {
        title: "Claude Code",
        subtitle:
          "Agentic CLI workflows, project context, slash commands, hooks.",
      },
      {
        title: "Subagents",
        subtitle: "Delegated agents, parallelism, isolation, tool scoping.",
      },
      {
        title: "Claude Skills",
        subtitle:
          "Authoring reusable skills, structured outputs, prompt patterns.",
      },
      {
        title: "Model Context Protocol (MCP)",
        subtitle:
          "Building servers, exposing tools/resources, client integration.",
      },
    ],
  },
];

export function Certifications() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="certifications"
      eyebrow="04 / Certifications"
      title="Continued learning"
    >
      <ul className="flex flex-col gap-3">
        {certs.map((c, i) => {
          const isOpen = open === i;
          return (
            <li
              key={c.name}
              className="glass overflow-hidden rounded-2xl border-white/10"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.03]"
              >
                <div className="min-w-0">
                  <div className="text-base font-medium tracking-tight md:text-lg">
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
                    <div className="border-t border-white/10 px-6 py-5">
                      <ol className="space-y-3">
                        {c.courses.map((course, idx) => (
                          <li key={course.title} className="flex gap-4">
                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] font-mono text-[11px] text-violet-300/90">
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
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
