"use client";

import { Section } from "@/components/section";

const stats = [
  { value: "130M+", label: "Users served by IAM platform" },
  { value: "700K+", label: "Commits migrated with full history" },
  { value: "20+ yrs", label: "Of source code rescued" },
];

export function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="A pragmatic builder">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            I&apos;m a final-year Software Engineering student at Concordia,
            currently interning at Ericsson. My focus is on shipping AI systems
            end-to-end — from data pipelines and fine-tuning, through APIs and
            infra, to the UI a user actually clicks on.
          </p>
          <p>
            I like problems where the legacy is messier than the spec. Reverse
            engineering an undocumented VCS to migrate two decades of source
            code. Replacing a brittle Selenium scraper with direct Grafana API
            calls to cut report times by a third. Wiring a QLoRA fine-tuning run
            into a Next.js app so anyone can query their database in plain
            English.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass glass-hover rounded-xl px-5 py-4"
            >
              <div className="text-2xl font-semibold tracking-tight md:text-3xl">
                <span className="gradient-text">{s.value}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
