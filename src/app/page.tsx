import { Nav } from "@/components/nav";
import { SocialRail } from "@/components/social-rail";
import { Terminal } from "@/components/terminal";
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
      <Nav />
      <SocialRail />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <Skills />
      <Contact />
      <Terminal />
    </main>
  );
}
