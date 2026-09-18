"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Project, ProjectKind } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FeatureRow, ProjectCard } from "./ProjectCard";

type Filter = "all" | ProjectKind;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
];

/**
 * The filterable project gallery.
 *
 * Featured projects render as full-bleed alternating rows, everything else as
 * a two-column grid. Filtering re-partitions both, so a filter that leaves no
 * featured work still produces a sensible layout rather than an empty band.
 */
export function ProjectGallery({
  projects,
  showFilter = true,
  // On /projects the gallery sits directly under the page h1, so its cards are
  // h2. On the home page they sit under a "Projects." h2, so they are h3.
  titleAs = "h3",
}: {
  projects: Project[];
  showFilter?: boolean;
  titleAs?: "h2" | "h3";
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();

  const { featured, rest } = useMemo(() => {
    const visible =
      filter === "all" ? projects : projects.filter((p) => p.kind === filter);
    return {
      featured: visible.filter((p) => p.featured),
      rest: visible.filter((p) => !p.featured),
    };
  }, [projects, filter]);

  const counts = useMemo(
    () => ({
      all: projects.length,
      web: projects.filter((p) => p.kind === "web").length,
      mobile: projects.filter((p) => p.kind === "mobile").length,
    }),
    [projects],
  );

  return (
    <div>
      {showFilter && (
        <div className="mt-14 flex justify-center">
          <div
            role="group"
            aria-label="Filter projects by platform"
            className="flex gap-1 rounded-full border border-line bg-paper p-1.5"
          >
            {FILTERS.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors sm:px-7",
                    active ? "text-paper" : "text-muted hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  <span className="relative z-10">
                    {f.label}
                    <span className="ml-1.5 text-xs opacity-55">
                      {counts[f.value]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Announce the result of filtering to screen readers, which otherwise
          get no feedback that the list below changed. */}
      <p aria-live="polite" className="sr-only">
        {`Showing ${featured.length + rest.length} ${
          filter === "all" ? "" : filter + " "
        }project${featured.length + rest.length === 1 ? "" : "s"}.`}
      </p>

      <div className="mt-14 space-y-8 sm:space-y-10">
        {featured.map((project, i) => (
          <FeatureRow
            key={project.slug}
            project={project}
            flipped={i % 2 === 1}
            priority={i === 0}
            titleAs={titleAs}
          />
        ))}
      </div>

      {rest.length > 0 && (
        <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              titleAs={titleAs}
            />
          ))}
        </div>
      )}

      {featured.length + rest.length === 0 && (
        <p className="mt-20 text-center text-lg text-muted">
          Nothing here yet — try another filter.
        </p>
      )}
    </div>
  );
}
