import Link from "next/link";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { ProjectMedia } from "./ProjectMedia";

const STATUS_LABEL: Record<Project["status"], string | null> = {
  live: null,
  "in-progress": "In progress",
  archived: "Archived",
};

/** The `WEB APP · Full Stack Developer` line above every project title. */
function Meta({ project }: { project: Project }) {
  const status = STATUS_LABEL[project.status];

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
      <span className="eyebrow inline-flex items-center gap-2 text-muted">
        <Icon
          name={project.kind === "mobile" ? "device" : "globe"}
          width={14}
          height={14}
        />
        {project.kind === "mobile" ? "Mobile app" : "Web app"}
      </span>
      <span aria-hidden="true" className="text-muted/50">
        ·
      </span>
      <span className="eyebrow text-muted">{project.role}</span>
      {status && (
        <Chip tone="accent" className="ml-1">
          {status}
        </Chip>
      )}
    </div>
  );
}

function CaseStudyLink({ project }: { project: Project }) {
  if (!project.caseStudy) return null;

  return (
    <Link
      href={`/project/${project.slug}`}
      className="group/link mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink"
    >
      <span className="border-b border-accent pb-0.5">View case study</span>
      <Icon
        name="arrowUpRight"
        width={16}
        height={16}
        className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      />
    </Link>
  );
}

/**
 * A featured project: full-bleed media on one side, copy on the other,
 * alternating sides down the page.
 */
export function FeatureRow({
  project,
  flipped,
  priority,
  titleAs: Title = "h3",
}: {
  project: Project;
  flipped: boolean;
  priority?: boolean;
  titleAs?: "h2" | "h3";
}) {
  return (
    <article className="grid items-center gap-10 rounded-3xl bg-surface/60 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
      <div className={cn(flipped && "lg:order-2")}>
        <ProjectMedia project={project} priority={priority} />
      </div>

      <div className={cn(flipped && "lg:order-1")}>
        <Meta project={project} />
        <Title className="font-display text-title mt-4 font-semibold text-ink">
          {project.name}
        </Title>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">
          {project.summary}
        </p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
        </ul>

        <CaseStudyLink project={project} />
      </div>
    </article>
  );
}

/** A secondary project, in the two-column grid below the featured rows. */
export function ProjectCard({
  project,
  titleAs: Title = "h3",
}: {
  project: Project;
  titleAs?: "h2" | "h3";
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-line bg-paper p-6 transition-colors hover:border-muted/40 sm:p-8">
      <div className="mb-8">
        <ProjectMedia project={project} />
      </div>

      <Meta project={project} />
      <Title className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {project.name}
      </Title>
      <p className="mt-4 text-base leading-relaxed text-pretty text-muted">
        {project.summary}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li key={t}>
            <Chip>{t}</Chip>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <CaseStudyLink project={project} />
      </div>
    </article>
  );
}
