import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { projectListGraph } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { ContactCta } from "@/components/home/ContactCta";

export const metadata = pageMetadata({
  title: "Projects",
  description: `Web and mobile projects designed and built by ${profile.name} — case studies, tech stacks and what each one solved.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <section className="container-page pt-32 pb-8 sm:pt-44">
        <SectionHeading
          as="h1"
          sub="Everything worth showing, newest first. Each case study covers what the problem was, what I built, and what broke along the way."
        >
          Projects
        </SectionHeading>
        <ProjectGallery projects={projects} titleAs="h2" />
      </section>

      <ContactCta />
      <JsonLd data={projectListGraph()} />
    </>
  );
}
