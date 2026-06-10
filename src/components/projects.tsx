"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { Rocket, ArrowUpRight } from "lucide-react";

import { Section } from "@/components/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { GithubIcon } from "@/components/brand-icons";
import projects from "@/content/projects.json";

const TEASER_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  rocket: Rocket,
  github: GithubIcon,
};

export function Projects() {
  return (
    <Section id="projects" eyebrow={projects.eyebrow} title={projects.title}>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.teasers.map((teaser, i) => {
          const Icon = TEASER_ICONS[teaser.icon] ?? Rocket;
          return (
            <Reveal key={teaser.title} delay={i * 0.08} className="h-full">
              <SpotlightCard
                as={Link}
                href={teaser.href}
                target="_blank"
                rel="noreferrer"
                className="glass glass-hover group flex h-full flex-col justify-between gap-4 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/[0.06] text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-brand">
                    {teaser.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {teaser.description}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
