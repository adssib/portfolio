import services from "@/content/services.json";
import { Heading, Section, Status } from "@/components/section";

export function Services() {
  return (
    <Section id="services" className="md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Heading eyebrow={services.eyebrow} title={services.title} />
        <p className="text-muted">{services.intro}</p>
      </div>

      {/* What I do: four short columns */}
      <ul className="mt-10 grid border-t border-line/10 sm:grid-cols-2 lg:grid-cols-4">
        {services.services.map((s) => (
          <li key={s.name} className="border-b border-line/10 py-4 pr-6 lg:border-b-0">
            <h3 className="font-medium">{s.name}</h3>
            <p className="mt-1 text-sm text-muted">{s.text}</p>
          </li>
        ))}
      </ul>

      {/* Recent jobs: one line each */}
      <p className="eyebrow mt-10">{services.jobsTitle}</p>
      <ul className="mt-4 grid gap-3 md:grid-cols-3">
        {services.jobs.map((job) => (
          <li key={job.name} className="rounded-md border border-line/10 bg-surface/60 px-4 py-3.5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-serif text-xl leading-tight">{job.name}</h3>
              <Status label={job.status} />
            </div>
            <p className="mt-1 text-sm text-muted">{job.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
