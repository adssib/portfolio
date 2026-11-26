import about from "@/content/about.json";
import { ExperienceList } from "@/components/experience-list";
import { Section } from "@/components/section";

export function Experience() {
  return (
    <Section id="experience" flush>
      <p className="eyebrow mb-6">{about.experienceLabel}</p>
      <ExperienceList roles={about.roles} />
    </Section>
  );
}
