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
import { Database, Sparkles, Brain, Box } from "lucide-react";

import { PowerShellIcon } from "@/components/brand-icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Maps the `icon` keys used in src/content/skills.json to components. To add a
 * skill, give it one of these keys; an unknown key falls back to a generic box
 * so the site never breaks on a new entry.
 */
const ICONS: Record<string, IconComponent> = {
  python: SiPython,
  java: SiOpenjdk,
  typescript: SiTypescript,
  bash: SiGnubash,
  powershell: PowerShellIcon,
  sql: Database,
  pytorch: SiPytorch,
  huggingface: SiHuggingface,
  lora: Sparkles,
  llm: Brain,
  jmeter: SiApachejmeter,
  selenium: SiSelenium,
  grafana: SiGrafana,
  junit: SiJunit5,
  aws: FaAws,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  helm: SiHelm,
  jenkins: SiJenkins,
  jfrog: SiJfrog,
  gitlabci: SiGitlab,
  mysql: SiMysql,
  mongodb: SiMongodb,
  cassandra: SiApachecassandra,
  neo4j: SiNeo4J,
  redis: SiRedis,
};

export function skillIcon(key: string): IconComponent {
  return ICONS[key] ?? Box;
}
