"use client";

import { Section } from "@/components/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { skillIcon } from "@/lib/skill-icons";
import skills from "@/content/skills.json";

export function Skills() {
  return (
    <Section id="skills" eyebrow={skills.eyebrow} title={skills.title}>
      <div className="grid gap-4 md:grid-cols-2">
        {skills.groups.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.08} className="h-full">
          <SpotlightCard
            className="glass glass-hover flex h-full flex-col gap-4 rounded-2xl p-6"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
              {g.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => {
                const Icon = skillIcon(item.icon);
                return (
                  <span
                    key={item.label}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5 text-sm transition-colors hover:border-foreground/25 hover:bg-foreground/[0.06]"
                  >
                    <Icon
                      aria-hidden
                      className="h-4 w-4 shrink-0 opacity-80 grayscale transition-all duration-200 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                      style={{ color: item.color }}
                    />
                    <span className="text-foreground/90">{item.label}</span>
                  </span>
                );
              })}
            </div>
          </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
