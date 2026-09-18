import { projects } from "@/content/projects";
import { Hero } from "@/components/home/Hero";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { TechStack } from "@/components/home/TechStack";
import { ContactCta } from "@/components/home/ContactCta";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section
        id="work"
        aria-labelledby="work-heading"
        className="container-page mt-16 sm:mt-24"
      >
        <SectionHeading
          id="work-heading"
          sub="A selection of the things I have designed, built and shipped."
        >
          Projects
        </SectionHeading>
        <ProjectGallery projects={projects} />
      </section>

      <TechStack />
      <ContactCta />
    </>
  );
}
