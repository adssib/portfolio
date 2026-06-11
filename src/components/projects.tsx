"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { Rocket, ArrowUpRight, Calendar, Globe, FileText } from "lucide-react";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { GithubIcon } from "@/components/brand-icons";
import projects from "@/content/projects.json";

const TEASER_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  rocket: Rocket,
  github: GithubIcon,
};

const LINK_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  live: Globe,
  github: GithubIcon,
  pdf: FileText,
};

export function Projects() {
  return (
    <Section id="projects" eyebrow={projects.eyebrow} title={projects.title}>
      <div className="flex flex-col gap-4">
        {projects.spotlights.map((p, idx) => (
          <Reveal key={p.name} delay={idx * 0.08}>
            <SpotlightCard className="glass glass-hover relative overflow-hidden rounded-2xl p-6 md:p-8">
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {p.date}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-brand">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                    {p.status}
                  </span>
                </div>

                <div>
                  <h3 className="gradient-text font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {p.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {p.tagline}
                  </p>
                </div>

                <p className="max-w-3xl text-sm text-muted-foreground md:text-[0.95rem]">
                  {p.description}
                </p>

                <ul className="max-w-3xl space-y-2 text-sm text-muted-foreground">
                  {p.bullets.map((b) => (
                    <li key={b} className="relative pl-5">
                      <span className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-foreground/40" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="border-foreground/10 bg-foreground/[0.03] text-[11px] font-normal text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {p.links.map((link, i) => {
                    const Icon = LINK_ICONS[link.type] ?? Globe;
                    return (
                      <Magnetic key={link.href}>
                        <Button
                          asChild
                          size="sm"
                          variant={i === 0 ? "default" : "outline"}
                          className={
                            i === 0
                              ? "rounded-full bg-foreground text-background hover:bg-foreground/90"
                              : "rounded-full border-foreground/15"
                          }
                        >
                          <Link href={link.href} target="_blank" rel="noreferrer">
                            <Icon className="h-4 w-4" />
                            {link.label}
                          </Link>
                        </Button>
                      </Magnetic>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      {/* Up-next teaser cards */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
