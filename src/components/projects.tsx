"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { Database, Construction, Rocket, ArrowUpRight } from "lucide-react";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon } from "@/components/brand-icons";
import projects from "@/content/projects.json";

const TEASER_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  rocket: Rocket,
  github: GithubIcon,
};

const constructionBadge =
  "inline-flex items-center gap-1.5 rounded-full border border-dashed border-foreground/25 bg-foreground/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground";

export function Projects() {
  const f = projects.featured;
  return (
    <Section id="projects" eyebrow={projects.eyebrow} title={projects.title}>
      <SpotlightCard className="glass glass-hover relative overflow-hidden rounded-2xl">
        <div
          aria-hidden
          className={`pointer-events-none absolute right-4 top-4 z-10 hidden md:inline-flex ${constructionBadge}`}
        >
          <Construction className="h-3 w-3" />
          {f.status}
        </div>
        <div className="grid md:grid-cols-5">
          {/* Screenshot placeholder — a dark terminal mockup (decorative) */}
          <div className="relative md:col-span-3 md:border-r md:border-border">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 80% at 20% 0%, hsl(var(--foreground) / 0.12) 0%, transparent 60%), radial-gradient(60% 80% at 100% 100%, hsl(var(--foreground) / 0.10) 0%, transparent 60%), linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--muted)) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.10]"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage:
                    "radial-gradient(ellipse at center, black 50%, transparent 80%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 50%, transparent 80%)",
                }}
              />

              <div className="relative flex h-full w-full items-center justify-center p-8">
                <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0b0b0d]/90 p-4 shadow-2xl backdrop-blur">
                  <div className="mb-3 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="ml-2 font-mono text-[10px] text-white/45">
                      askdb · query
                    </span>
                  </div>
                  <div className="font-mono text-[11px] leading-relaxed text-white/85">
                    <p className="text-white/45">
                      &gt; show me top 5 customers by revenue this quarter
                    </p>
                    <p className="mt-2 text-white">SELECT</p>
                    <p className="pl-3">
                      c.name, <span className="text-white/60">SUM(o.total) AS revenue</span>
                    </p>
                    <p className="text-white">FROM</p>
                    <p className="pl-3">
                      customers c <span className="text-white">JOIN</span> orders o{" "}
                      <span className="text-white">ON</span> o.customer_id = c.id
                    </p>
                    <p className="text-white">WHERE</p>
                    <p className="pl-3">
                      o.created_at &gt;= date_trunc(&apos;quarter&apos;, now())
                    </p>
                    <p className="text-white">
                      GROUP BY <span className="text-white/60">c.name</span>
                    </p>
                    <p className="text-white">
                      ORDER BY <span className="text-white/60">revenue DESC</span>
                    </p>
                    <p className="text-white">
                      LIMIT <span className="text-white/60">5</span>;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-6 md:col-span-2 md:p-8">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Database className="h-3.5 w-3.5" />
              {f.date}
            </div>
            <h3 className="gradient-text font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {f.name}
            </h3>
            <p className="text-sm text-muted-foreground md:text-[0.95rem]">
              {f.description}
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {f.bullets.map((b) => (
                <li key={b} className="relative pl-5">
                  <span className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-foreground/40" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {f.tech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="border-foreground/10 bg-foreground/[0.03] text-[11px] font-normal text-muted-foreground"
                >
                  {t}
                </Badge>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Magnetic>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full bg-foreground text-background hover:bg-foreground/90"
                >
                  <Link href={f.repo} target="_blank" rel="noreferrer">
                    <GithubIcon className="h-4 w-4" />
                    View on GitHub
                  </Link>
                </Button>
              </Magnetic>
              <span className={`md:hidden ${constructionBadge}`}>
                <Construction className="h-3 w-3" />
                {f.status}
              </span>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Up-next teaser cards */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {projects.teasers.map((teaser) => {
          const Icon = TEASER_ICONS[teaser.icon] ?? Rocket;
          return (
            <SpotlightCard
              as={Link}
              key={teaser.title}
              href={teaser.href}
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover group flex flex-col justify-between gap-4 rounded-2xl p-6"
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
          );
        })}
      </div>
    </Section>
  );
}
