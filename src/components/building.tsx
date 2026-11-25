import { ArrowUpRight } from "lucide-react";

import { asset } from "@/lib/asset";
import { Em } from "@/components/section";

type Venture = {
  name: string;
  logo: string;
  role: string;
  since: string;
  tagline: string;
  text: string;
  tags: string[];
  link?: { label: string; href: string };
};

/** The startups get their own block, ahead of the jobs list. */
export function Building({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: Venture[];
}) {
  return (
    <div>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h3 className="font-serif text-[clamp(2rem,3.5vw,2.75rem)] leading-none tracking-[-0.015em]">
        <Em text={title} />
      </h3>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map((v) => (
          <article key={v.name} className="flex flex-col rounded-2xl bg-surface/70 p-6 ring-1 ring-line/10 md:p-7">
            <div className="flex items-center gap-4">
              {/* These logos are full tiles already, so no white backing */}
              <img src={asset(v.logo)} alt={`${v.name} logo`} className="h-12 w-12 shrink-0 rounded-xl" />
              <div className="min-w-0">
                <h4 className="font-serif text-3xl leading-none">{v.name}</h4>
                <p className="mt-1.5 text-sm text-muted">
                  {v.role} · {v.since}
                </p>
              </div>
            </div>
            <p className="mt-5 font-serif text-xl italic leading-snug text-accent">{v.tagline}</p>
            <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
            {v.link && (
              <a
                href={v.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium"
              >
                {v.link.label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            )}
            <ul className="mt-auto flex flex-wrap gap-2 pt-6">
              {v.tags.map((t) => (
                <li key={t} className="rounded-full border border-line/15 px-3 py-1 text-sm text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
