import { ArrowUpRight } from "lucide-react";

import work from "@/content/projects.json";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { Em, Section } from "@/components/section";

type Image = { src: string; alt: string; fit: string; position?: string };

function Shot({ img }: { img: Image }) {
  // Charts keep their full frame on a white card; screenshots fill the tile.
  const chart = img.fit === "contain";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md ring-1 ring-line/10",
        chart ? "aspect-[2/1] bg-white p-2" : "aspect-[16/10]"
      )}
    >
      <img
        src={asset(img.src)}
        alt={img.alt}
        loading="lazy"
        className={cn("h-full w-full", chart ? "object-contain" : "object-cover")}
        style={img.position ? { objectPosition: img.position } : undefined}
      />
    </div>
  );
}

export function Projects() {
  return (
    <Section id="work">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line/10 pb-8">
        <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.25rem)] leading-none tracking-[-0.02em]">
          {work.title}
        </h2>
        <p className="text-muted">{work.count}</p>
      </div>

      {work.projects.map((p, i) => (
        <article
          key={p.name}
          className={cn(
            "grid items-center gap-8 border-b border-line/10 py-10 md:gap-12",
            // Visuals take the smaller share and alternate sides, like a photo album
            i % 2 === 1
              ? "md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
              : "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          )}
        >
          <div className={cn(i % 2 === 1 && "md:order-2")}>
            <Shot img={p.images[0]} />
          </div>
          <div>
            <p className="eyebrow">{p.eyebrow}</p>
            <h3 className="mt-4 font-serif text-[clamp(2rem,3.5vw,2.75rem)] leading-none tracking-[-0.015em]">
              <Em text={p.name} />
            </h3>
            <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-muted">{p.text}</p>
            <p className="mt-5 text-sm text-muted">{p.tech.join(" · ")}</p>
            {p.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost px-4 py-2 text-sm"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </Section>
  );
}
