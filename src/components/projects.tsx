import { ArrowUpRight } from "lucide-react";

import work from "@/content/projects.json";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { Em, Section } from "@/components/section";

type Link = { label: string; href: string };

function Links({ links }: { links: Link[] }) {
  if (!links.length) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-2 text-sm">
          {l.label}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      ))}
    </div>
  );
}

/** GameFarm's fleet: 72 phones, a few busy at any moment. Seeded so it never changes between builds. */
function DevicesVisual() {
  let seed = 7;
  const cells = Array.from({ length: 72 }, () => {
    seed = (seed * 16807) % 2147483647;
    const r = seed / 2147483647;
    return r < 0.28 ? "bg-accent" : r < 0.4 ? "bg-green" : "bg-ink/15";
  });
  return (
    <div aria-hidden className="rounded-md bg-surface ring-1 ring-line/10">
      <div className="grid grid-cols-12 gap-1.5 p-5 lg:grid-cols-[repeat(18,minmax(0,1fr))]">
        {cells.map((c, i) => (
          <span key={i} className={cn("aspect-[9/16] rounded-[3px]", c)} />
        ))}
      </div>
      <div className="flex flex-wrap justify-between gap-2 px-5 pb-4 text-sm text-muted">
        <span>72 devices · 6 countries</span>
        <span>one loop per device</span>
      </div>
    </div>
  );
}

function KnoltVisual() {
  return (
    <div className="flex items-center gap-6 rounded-md bg-surface p-8 ring-1 ring-line/10">
      <img src={asset("/logos/knolt.svg")} alt="Knolt logo" className="h-20 w-20 shrink-0 rounded-2xl" />
      <div>
        <p className="font-serif text-6xl leading-none text-green">83%</p>
        <p className="mt-2 text-sm text-muted">
          correct incident calls on
          <br />
          Knolt&apos;s internal Security-Bench 1.3
        </p>
      </div>
    </div>
  );
}

function Shot({ img }: { img: { src: string; alt: string } }) {
  return (
    <div className="aspect-[2/1] overflow-hidden rounded-md bg-white p-2 ring-1 ring-line/10">
      <img src={asset(img.src)} alt={img.alt} loading="lazy" className="h-full w-full object-contain" />
    </div>
  );
}

/** patch-it has no screenshot yet, so it gets an illustration
 *  of what the product does: spot the breaking change, then draft the fix. */
function PatchVisual() {
  return (
    <div
      aria-hidden
      className="rounded-md bg-surface p-5 font-mono text-xs leading-relaxed ring-1 ring-line/10"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent">
          Breaking change
        </p>
        <p className="text-muted">GET /v2/orders/:id</p>
      </div>
      <div className="mt-3 space-y-1">
        <p className="rounded bg-[#e5534b]/15 px-2 py-0.5 text-[#e5534b]">- &quot;total&quot;: 1999</p>
        <p className="rounded bg-green/15 px-2 py-0.5 text-green">
          + &quot;total&quot;: {"{"} &quot;amount&quot;: 1999, &quot;currency&quot;: &quot;usd&quot; {"}"}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line/10 pt-4">
        <div className="min-w-0">
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] text-green">
            Pull request drafted
          </p>
          <p className="mt-1 truncate font-sans text-sm font-medium text-ink">fix: read order total as an object</p>
          <p className="text-muted">
            <span className="text-green">+12</span> <span className="text-[#e5534b]">−4</span> · tests pass
          </p>
        </div>
        <p className="shrink-0 rounded-full border border-accent/40 px-2.5 py-0.5 font-sans text-accent">
          Needs review
        </p>
      </div>
    </div>
  );
}

type Project = (typeof work.projects)[number];

function Visual({ p }: { p: Project }) {
  if (p.visual === "devices") return <DevicesVisual />;
  if (p.visual === "knolt") return <KnoltVisual />;
  if (p.visual === "patch") return <PatchVisual />;
  return "image" in p && p.image ? <Shot img={p.image} /> : null;
}

export function Projects() {
  return (
    <Section id="work">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line/10 pb-8">
        <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.25rem)] leading-none tracking-[-0.02em]">{work.title}</h2>
        <p className="text-muted">{work.count}</p>
      </div>

      {work.projects.map((p, i) => (
        <article
          key={p.name}
          className={cn(
            "grid items-center gap-8 border-b border-line/10 py-12 md:gap-16",
            // Visuals alternate sides, like a photo album
            "md:grid-cols-2"
          )}
        >
          <div className={cn(i % 2 === 1 && "md:order-2")}>
            <Visual p={p} />
          </div>
          <div>
            <p className="eyebrow">{p.eyebrow}</p>
            <h3 className="mt-4 font-serif text-[clamp(2rem,3.5vw,3rem)] leading-none tracking-[-0.015em]">
              <Em text={p.name} />
            </h3>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">{p.text}</p>
            {p.metrics.length > 0 && (
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="font-serif text-3xl leading-tight text-green">{m.value}</dd>
                    <dd className="text-sm text-muted">{m.label}</dd>
                  </div>
                ))}
              </dl>
            )}
            <Links links={p.links} />
          </div>
        </article>
      ))}
    </Section>
  );
}

export function MoreProjects() {
  return (
    <Section id="more" className="pt-0 md:pt-0">
      <p className="eyebrow mb-6">{work.moreTitle}</p>
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        {work.more.map((p) => (
          <div key={p.name} className="border-t border-line/10 pt-5">
            <h3 className="font-serif text-3xl leading-tight">{p.name}</h3>
            <p className="mt-2 max-w-xl leading-relaxed text-muted">{p.text}</p>
            <Links links={p.links} />
          </div>
        ))}
      </div>
    </Section>
  );
}
