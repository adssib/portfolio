import { ArrowRight } from "lucide-react";

import services from "@/content/services.json";
import { Heading, Section } from "@/components/section";

export function Services() {
  return (
    <Section id="services" className="md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Heading eyebrow={services.eyebrow} title={services.title} />
        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="text-muted">{services.intro}</p>
          <a href="#contact" className="btn-primary">
            {services.cta}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>

      {/* Each service carries the work that backs it up */}
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.services.map((s) => (
          <li
            key={s.name}
            className="flex flex-col rounded-2xl bg-surface/60 p-6 ring-1 ring-line/10"
          >
            <h3 className="font-serif text-2xl leading-tight">{s.name}</h3>
            <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            <div className="mt-auto pt-5">
              <div className="border-t border-line/10 pt-4">
                <p className="eyebrow text-accent">{services.proofLabel}</p>
                <p className="mt-1.5 text-sm">{s.proof}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
