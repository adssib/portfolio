import { Briefcase, Sparkles } from "lucide-react";

import about from "@/content/about.json";
import profile from "@/content/profile.json";
import { asset } from "@/lib/asset";
import { Heading, Section } from "@/components/section";
import { PhotoCard } from "@/components/photo-card";

const icons = { sparkles: Sparkles, briefcase: Briefcase } as const;

function Mark({ logo, icon, org }: { logo?: string; icon?: string; org: string }) {
  if (logo) {
    return (
      // Logos sit on a light tile so black marks stay visible in dark mode
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-line/10">
        <img src={asset(logo)} alt={`${org} logo`} className="h-full w-full object-contain" />
      </span>
    );
  }
  const Icon = icons[icon as keyof typeof icons] ?? Briefcase;
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/25">
      <Icon className="h-5 w-5" aria-hidden />
    </span>
  );
}

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-16">
        <div>
          <Heading eyebrow={about.eyebrow} title={about.title} />
          <p className="mt-5 font-serif text-2xl italic text-muted">{about.subtitle}</p>

          <ul className="mt-10 border-t border-line/10">
            {about.roles.map((r) => (
              <li key={r.org} className="flex items-center gap-4 border-b border-line/10 py-4">
                <Mark logo={r.logo} icon={r.icon} org={r.org} />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{r.org}</span>
                  <span className="block text-sm text-muted">{r.role}</span>
                </span>
                <span className="shrink-0 text-right text-sm text-muted">{r.period}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted">{about.footnote}</p>
        </div>

        <PhotoCard {...profile.photo} />
      </div>
    </Section>
  );
}
