"use client";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type Group = { heading: string; bullets: string[] };

type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  current?: boolean;
  groups: Group[];
  tags: string[];
};

const roles: Role[] = [
  {
    company: "Ericsson",
    title: "Software Developer Intern",
    period: "Jan 2026 → Aug 2026",
    location: "Montréal, QC",
    current: true,
    groups: [
      {
        heading: "DevOps & Infrastructure",
        bullets: [
          "Owned daily reliability of 20+ release-critical CI/CD pipelines, driving cross-team RCA and eliminating false positives through pipeline enhancements.",
          "Documented failure patterns to reduce mean resolution time across QA and LSV teams.",
          "Cut performance and stability report generation time by up to 33% by replacing Selenium UI extraction with direct Grafana API calls.",
        ],
      },
      {
        heading: "Software Development & Testing",
        bullets: [
          "Shipped features across a cloud-native IAM platform handling auth for 130M+ users, with unit, component, performance and functional coverage.",
          "Benchmarked 15+ OAuth APIs and Kafka event pipelines using JMeter with controlled pod isolation (HPA limiting, synthetic data, scaled dependencies).",
          "Built internal AI agent skills automating performance testing, report generation, and knowledge-sharing workflows across QA/LSV teams.",
        ],
      },
    ],
    tags: ["Java", "Kubernetes", "Helm", "JMeter", "Grafana", "Kafka", "Jenkins"],
  },
  {
    company: "Novatek International",
    title: "Software Developer Intern",
    period: "Jan 2024 → Jan 2026",
    location: "Montréal, QC",
    groups: [
      {
        heading: "",
        bullets: [
          "Led end-to-end planning and delivery of a mission-critical VCS migration involving IT, QA, and senior VPs.",
          "Rescued 20+ years of source code and 200,000+ files from an unstable legacy VCS.",
          "Engineered an internal migration tool transferring 700,000+ commits with full history, tags, and ACLs by reverse-engineering an undocumented system.",
          "Deployed VisualSVN into CI/CD and built an SVN-to-GitLab CLI tool enabling the company's transition to Git.",
        ],
      },
    ],
    tags: ["Python", "Bash", "PowerShell", "SVN", "GitLab CI", "VisualSVN"],
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="02 / Experience"
      title="Where I've shipped"
    >
      <div className="relative">
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-foreground/30 via-foreground/10 to-foreground/20 md:left-[9px]"
        />
        <ol className="space-y-8">
          {roles.map((role) => (
            <li key={role.company} className="relative pl-10 md:pl-12">
              <span
                aria-hidden
                className="absolute left-0 top-2 grid h-4 w-4 place-items-center rounded-full bg-background md:h-5 md:w-5"
              >
                <span
                  className={
                    "h-2 w-2 rounded-full md:h-2.5 md:w-2.5 " +
                    (role.current
                      ? "bg-foreground shadow-[0_0_0_4px_hsl(var(--foreground)/0.15)]"
                      : "bg-foreground/40")
                  }
                />
              </span>
              <SpotlightCard
                as="article"
                className="glass glass-hover rounded-2xl p-6 md:p-7"
              >
                <header className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight md:text-xl">
                      {role.title}{" "}
                      <span className="text-muted-foreground">
                        @ {role.company}
                      </span>
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {role.location}
                    </p>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {role.period}
                  </span>
                </header>

                <div className="mt-5 space-y-5">
                  {role.groups.map((group) => (
                    <div key={group.heading || "default"}>
                      {group.heading && (
                        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">
                          {group.heading}
                        </div>
                      )}
                      <ul className="space-y-2.5">
                        {group.bullets.map((b) => (
                          <li
                            key={b}
                            className="relative pl-5 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]"
                          >
                            <span
                              aria-hidden
                              className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-foreground/40"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {role.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="border-foreground/10 bg-foreground/[0.03] text-[11px] font-normal text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </SpotlightCard>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
