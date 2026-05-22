"use client";

import { Section } from "@/components/section";

const certs = [
  {
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI · Coursera",
    date: "Jan 2026",
  },
  {
    name: "Anthropic Developer Certifications",
    issuer: "Claude Code · Subagents · Skills · MCP",
    date: "Apr 2026",
  },
];

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="05 — Certifications"
      title="Continued learning"
    >
      <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
        {certs.map((c) => (
          <li
            key={c.name}
            className="flex flex-col gap-1 px-6 py-5 transition-colors hover:bg-white/[0.03] md:flex-row md:items-center md:justify-between md:gap-6"
          >
            <div>
              <div className="text-base font-medium tracking-tight md:text-lg">
                {c.name}
              </div>
              <div className="text-sm text-muted-foreground">{c.issuer}</div>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {c.date}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
