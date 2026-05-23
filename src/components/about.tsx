"use client";

import { Section } from "@/components/section";

const stats = [
  { value: "130M+", label: "Users served by IAM platform" },
  { value: "700K+", label: "Commits migrated with full history" },
  { value: "20+ yrs", label: "Of source code rescued" },
];

export function About() {
  return (
    <Section id="about" eyebrow="01 / About" title="A pragmatic builder">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            Software Engineering student at Concordia, interning at Ericsson. I
            ship AI systems end-to-end: data pipelines, fine-tuning, APIs, and
            the UI that ties it all together.
          </p>
          <p>
            I like problems where the legacy is messier than the spec.
            Reverse-engineering an undocumented VCS. Replacing brittle Selenium
            scrapers with direct API calls. Wiring a QLoRA fine-tuning run into
            a Next.js app so anyone can query their database in plain English.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass glass-hover rounded-xl px-5 py-4"
            >
              <div
                className="text-2xl font-semibold tracking-tight md:text-3xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
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
