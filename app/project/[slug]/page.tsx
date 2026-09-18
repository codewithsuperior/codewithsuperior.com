import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { projects, getProject } from "@/content/projects";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { projectGraph } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { ProjectMedia } from "@/components/home/ProjectMedia";

type Params = { slug: string };

/** Every case study is generated at build time, so each has real HTML. */
export function generateStaticParams(): Params[] {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: `${project.name} — Case study`,
    description: project.summary,
    path: `/project/${project.slug}`,
    type: "article",
  });
}

function MetaBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="eyebrow text-muted">{label}</dt>
      <dd className="mt-3 text-base text-ink">{children}</dd>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.caseStudy) notFound();

  const { caseStudy } = project;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next =
    projects.slice(index + 1).find((p) => p.caseStudy) ??
    projects.find((p) => p.caseStudy && p.slug !== project.slug);

  return (
    <>
      <article className="container-page pt-32 sm:pt-40">
        <Reveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-surface">
              <Icon name="arrowLeft" width={16} height={16} />
            </span>
            Back to projects
          </Link>
        </Reveal>

        <header className="mt-12 max-w-4xl">
          <Reveal>
            <h1 className="font-display text-display font-semibold text-balance text-ink">
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-pretty text-muted">
              {project.summary}
            </p>
          </Reveal>
        </header>

        <Reveal delay={0.12} className="mt-16">
          <ProjectMedia project={project} priority />
        </Reveal>

        <Reveal className="mt-20">
          <dl className="grid gap-10 border-y border-line py-10 sm:grid-cols-3">
            <MetaBlock label="Role">{project.role}</MetaBlock>
            <MetaBlock label="Timeline">{project.timeline}</MetaBlock>
            <MetaBlock label="Tech stack">
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t}>
                    <Chip>{t}</Chip>
                  </li>
                ))}
              </ul>
            </MetaBlock>
          </dl>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Overview
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {caseStudy.overview}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Challenges &amp; solutions
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {caseStudy.challenges}
            </p>
          </Reveal>
        </div>

        <section aria-labelledby="features-heading" className="mt-24">
          <Reveal>
            <h2
              id="features-heading"
              className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            >
              Key features
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudy.features.map((feature, i) => (
              <Reveal
                as="li"
                key={feature}
                delay={i * 0.04}
                className="flex items-start gap-4 rounded-2xl bg-surface/60 p-6"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                  <Icon name="check" width={14} height={14} />
                </span>
                <span className="text-base leading-relaxed text-ink">
                  {feature}
                </span>
              </Reveal>
            ))}
          </ul>
        </section>

        {project.shots.length > 0 && (
          <section aria-labelledby="shots-heading" className="mt-24">
            <Reveal>
              <h2
                id="shots-heading"
                className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              >
                Screens
              </h2>
            </Reveal>

            <ul
              className={
                project.kind === "mobile"
                  ? "mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
                  : "mt-10 grid gap-8 lg:grid-cols-2"
              }
            >
              {project.shots.map((shot, i) => (
                <Reveal as="li" key={shot.src} delay={i * 0.05}>
                  <figure
                    className={
                      "relative w-full overflow-hidden rounded-2xl border border-line bg-surface " +
                      (project.kind === "mobile"
                        ? "aspect-[9/19.5]"
                        : "aspect-[16/10]")
                    }
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
                      className="object-cover object-top"
                    />
                  </figure>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {(project.liveUrl || project.repoUrl) && (
          <Reveal className="mt-20 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper"
              >
                Visit the site
                <Icon name="arrowUpRight" width={16} height={16} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-sm font-medium text-ink"
              >
                <Icon name="github" width={16} height={16} />
                View the code
              </a>
            )}
          </Reveal>
        )}
      </article>

      {next && (
        <Reveal
          as="section"
          className="container-page mt-32 border-t border-line pt-16 sm:mt-40"
        >
          <p className="eyebrow text-muted">Next project</p>
          <Link
            href={`/project/${next.slug}`}
            className="group mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-3"
          >
            <span className="font-display text-title font-semibold text-ink">
              {next.name}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors group-hover:text-ink">
              Read the case study
              <Icon name="arrowRight" width={16} height={16} />
            </span>
          </Link>
          <p className="mt-4 max-w-2xl text-base text-muted">{next.summary}</p>
        </Reveal>
      )}

      <Reveal className="container-page mt-24 text-sm text-muted">
        Built by {profile.name}.
      </Reveal>

      <JsonLd data={projectGraph(project)} />
    </>
  );
}
