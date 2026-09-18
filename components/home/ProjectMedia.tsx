import type { Project } from "@/lib/types";
import { PhoneCluster, BrowserFrame } from "@/components/ui/Frames";

/**
 * Picks the right frame for a project.
 *
 * Mobile work gets a cluster of phones; web work gets browser chrome. Deciding
 * this from `project.kind` rather than per-call-site means every gallery,
 * card and case study presents a project consistently.
 */
export function ProjectMedia({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  if (project.kind === "mobile") {
    const shots = [project.cover, ...project.shots];
    const shown = Math.min(shots.length, 3);
    const remaining = project.totalScreens
      ? Math.max(0, project.totalScreens - shown)
      : 0;

    return (
      <PhoneCluster shots={shots} moreCount={remaining} priority={priority} />
    );
  }

  return <BrowserFrame shot={project.cover} priority={priority} />;
}
