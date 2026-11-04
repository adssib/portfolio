import about from "@/content/about.json";
import profile from "@/content/profile.json";
import { Building } from "@/components/building";
import { ExperienceList } from "@/components/experience-list";
import { Heading, Section } from "@/components/section";
import { PhotoCard } from "@/components/photo-card";

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:gap-16">
        <div>
          <Heading eyebrow={about.eyebrow} title={about.title} />
          <p className="mt-5 font-serif text-2xl italic text-muted">{about.subtitle}</p>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted">{about.footnote}</p>
        </div>

        <div className="mx-auto w-full max-w-xs md:max-w-none">
          <PhotoCard {...profile.photo} />
        </div>
      </div>

      <div className="mt-20">
        <Building {...about.building} />
      </div>

      <div className="mt-20">
        <p className="eyebrow mb-6">{about.experienceLabel}</p>
        <ExperienceList roles={about.roles} />
      </div>
    </Section>
  );
}
