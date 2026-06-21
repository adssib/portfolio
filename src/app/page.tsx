import { Nav } from "@/components/nav";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SocialRail } from "@/components/social-rail";
import { TerminalLoader } from "@/components/terminal-loader";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main id="main" className="relative z-10">
      <ScrollProgress />
      <Nav />
      <SocialRail />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <Skills />
      <Contact />
      <TerminalLoader />
    </main>
  );
}
