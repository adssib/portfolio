import { ArrowRight } from "lucide-react";

import profile from "@/content/profile.json";
import services from "@/content/services.json";
import { Heading, Section } from "@/components/section";

/** What I work on: each area links to the work that proves it. */
export function Services() {
  return (
    <Section id="services" className="pt-0 md:pt-0">
      <Heading eyebrow={services.eyebrow} title={services.title} />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((s) => (
          <li key={s.name} className="flex flex-col gap-3 rounded-2xl bg-surface/60 p-6 ring-1 ring-line/10">
            <h3 className="font-serif text-2xl leading-tight">{s.name}</h3>
            <p className="leading-relaxed text-muted">{s.text}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {s.evidence.map((e) => (
                <a
                  key={e.label}
                  href={e.href}
                  {...(e.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="rounded-full border border-line/15 px-3 py-1 text-sm text-muted transition-colors hover:border-line/40 hover:text-ink"
                >
                  {e.label}
                </a>
              ))}
            </div>
          </li>
        ))}
        <li className="flex flex-col gap-3 rounded-2xl border border-dashed border-line/25 p-6">
          <h3 className="font-serif text-2xl leading-tight">{services.consulting.name}</h3>
          <p className="leading-relaxed text-muted">{services.consulting.text}</p>
          <a href={`mailto:${profile.email}`} className="link mt-auto inline-flex w-fit items-center gap-1.5 pt-2 font-medium">
            {services.consulting.cta}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </li>
      </ul>
    </Section>
  );
}
