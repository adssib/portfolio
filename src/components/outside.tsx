import outside from "@/content/outside.json";
import { asset } from "@/lib/asset";
import { Heading, Section } from "@/components/section";

export function Outside() {
  return (
    <Section id="outside">
      <Heading eyebrow={outside.eyebrow} title={outside.title} />

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {outside.photos.map((p) => (
          <div key={p.src} className="aspect-[8/7] overflow-hidden rounded-md">
            <img
              src={asset(p.src)}
              alt={p.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>

      <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {outside.hobbies.map((h) => (
          <li key={h.name}>
            <h3 className="font-serif text-2xl">{h.name}</h3>
            <p className="mt-2 leading-relaxed text-muted">{h.text}</p>
            {h.link && (
              <a href={h.link.href} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-block">
                {h.link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
