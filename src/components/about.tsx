"use client";

import { Section } from "@/components/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TextGenerate } from "@/components/ui/text-generate";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import about from "@/content/about.json";

export function About() {
  return (
    <Section id="about" eyebrow={about.eyebrow} title={about.title}>
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {about.paragraphs.map((p, i) => (
            <TextGenerate key={i} text={p} />
          ))}
        </div>
        <div className="md:col-span-2 grid grid-cols-1 gap-3">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <SpotlightCard className="glass glass-hover rounded-xl px-5 py-4">
                <div
                  className="font-display text-2xl font-semibold tracking-tight md:text-3xl"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  <CountUp value={s.value} className="gradient-text" />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.label}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
