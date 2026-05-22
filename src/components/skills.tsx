"use client";

import type { ComponentType, SVGProps } from "react";
import {
  SiPython,
  SiOpenjdk,
  SiTypescript,
  SiGnubash,
  SiPytorch,
  SiHuggingface,
  SiApachejmeter,
  SiSelenium,
  SiGrafana,
  SiJunit5,
  SiDocker,
  SiKubernetes,
  SiHelm,
  SiJenkins,
  SiJfrog,
  SiGitlab,
  SiMysql,
  SiMongodb,
  SiApachecassandra,
  SiNeo4J,
  SiRedis,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { Database, Sparkles, Brain } from "lucide-react";

import { Section } from "@/components/section";
import { PowerShellIcon } from "@/components/brand-icons";

type Skill = {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
};

type Group = { label: string; items: Skill[] };

const groups: Group[] = [
  {
    label: "Languages",
    items: [
      { label: "Python", Icon: SiPython, color: "#3776AB" },
      { label: "Java", Icon: SiOpenjdk, color: "#ED8B00" },
      { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { label: "Bash", Icon: SiGnubash, color: "#4EAA25" },
      { label: "PowerShell", Icon: PowerShellIcon, color: "#5391FE" },
      { label: "SQL", Icon: Database, color: "#A78BFA" },
    ],
  },
  {
    label: "AI / ML",
    items: [
      { label: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
      { label: "Hugging Face", Icon: SiHuggingface, color: "#FFD21E" },
      { label: "LoRA / QLoRA", Icon: Sparkles, color: "#C084FC" },
      { label: "LLM fine-tuning", Icon: Brain, color: "#A78BFA" },
    ],
  },
  {
    label: "Testing",
    items: [
      { label: "JMeter", Icon: SiApachejmeter, color: "#D22128" },
      { label: "Selenium", Icon: SiSelenium, color: "#43B02A" },
      { label: "Grafana", Icon: SiGrafana, color: "#F46800" },
      { label: "JUnit", Icon: SiJunit5, color: "#25A162" },
    ],
  },
  {
    label: "Cloud / DevOps",
    items: [
      { label: "AWS", Icon: FaAws, color: "#FF9900" },
      { label: "Docker", Icon: SiDocker, color: "#2496ED" },
      { label: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
      { label: "Helm", Icon: SiHelm, color: "#7CB6FF" },
      { label: "Jenkins", Icon: SiJenkins, color: "#D24939" },
      { label: "JFrog", Icon: SiJfrog, color: "#41BF47" },
      { label: "GitLab CI", Icon: SiGitlab, color: "#FC6D26" },
    ],
  },
  {
    label: "Databases",
    items: [
      { label: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { label: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { label: "Cassandra", Icon: SiApachecassandra, color: "#1287B1" },
      { label: "Neo4j", Icon: SiNeo4J, color: "#4581C3" },
      { label: "Redis", Icon: SiRedis, color: "#FF4438" },
    ],
  },
];

export function Skills() {
  return (
    <Section id="skills" eyebrow="05 / Skills" title="Stack & tools">
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((g) => (
          <div
            key={g.label}
            className="glass glass-hover flex flex-col gap-4 rounded-2xl p-6"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {g.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map(({ label, Icon, color }) => (
                <span
                  key={label}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm transition-colors hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <Icon
                    aria-hidden
                    className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110"
                    style={{ color }}
                  />
                  <span className="text-foreground/90">{label}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
