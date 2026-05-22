"use client";

import { Section } from "@/components/section";

const groups = [
  {
    label: "Languages",
    items: ["Python", "Java", "TypeScript", "Bash", "PowerShell", "SQL"],
  },
  {
    label: "AI / ML",
    items: ["PyTorch", "Hugging Face", "LoRA / QLoRA", "LLM fine-tuning"],
  },
  {
    label: "Testing",
    items: ["JMeter", "Selenium", "Grafana", "JUnit"],
  },
  {
    label: "Cloud / DevOps",
    items: ["AWS", "Docker", "Kubernetes", "Helm", "Jenkins", "JFrog", "GitLab CI"],
  },
  {
    label: "Databases",
    items: ["MySQL", "MongoDB", "Cassandra", "Neo4j", "Redis"],
  },
];

export function Skills() {
  return (
    <Section id="skills" eyebrow="04 — Skills" title="Stack & tools">
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((g) => (
          <div
            key={g.label}
            className="glass glass-hover flex flex-col gap-3 rounded-2xl p-6"
          >
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {g.label}
            </div>
            <p className="text-base leading-relaxed text-foreground/90">
              {g.items.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
