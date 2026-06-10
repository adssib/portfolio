"use client";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import experience from "@/content/experience.json";

export function Experience() {
  return (
    <Section id="experience" eyebrow={experience.eyebrow} title={experience.title}>
      <div className="relative">
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-foreground/30 via-foreground/10 to-foreground/20 md:left-[9px]"
        />
        <ol className="space-y-8">
          {experience.roles.map((role, i) => (
            <li key={role.company} className="relative pl-10 md:pl-12">
              <span
                aria-hidden
                className="absolute left-0 top-2 grid h-4 w-4 place-items-center rounded-full bg-background md:h-5 md:w-5"
              >
                <span
                  className={
                    "h-2 w-2 rounded-full md:h-2.5 md:w-2.5 " +
                    (role.current
                      ? "bg-brand shadow-[0_0_0_4px_hsl(var(--brand)/0.22)]"
                      : "bg-foreground/40")
                  }
                />
              </span>
              <Reveal delay={i * 0.08}>
              <SpotlightCard
                as="article"
                className="glass glass-hover rounded-2xl p-6 md:p-7"
              >
                <header className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight md:text-xl">
                      <span className="text-brand">{role.title}</span>{" "}
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
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
