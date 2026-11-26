import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { MoreProjects, Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Services } from "@/components/services";
import { WritingSection } from "@/components/writing-section";
import { Outside } from "@/components/outside";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Services />
        <WritingSection />
        <MoreProjects />
        <Outside />
        <Contact />
      </main>
    </>
  );
}
