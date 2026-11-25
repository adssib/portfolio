import about from "@/content/about.json";
import profile from "@/content/profile.json";
import { Heading, Section } from "@/components/section";
import { PhotoCard } from "@/components/photo-card";

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:gap-20">
        <div>
          <Heading eyebrow={about.eyebrow} title={about.title} />
          <p className="mt-6 max-w-3xl font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] italic leading-snug text-muted">
            {about.subtitle}
          </p>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">{about.footnote}</p>
        </div>

        <div className="mx-auto w-full max-w-xs md:max-w-none">
          <PhotoCard {...profile.photo} />
        </div>
      </div>
    </Section>
  );
}
