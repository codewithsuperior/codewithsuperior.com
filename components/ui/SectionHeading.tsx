import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * The oversized section title used on every page — "Projects.", "Notes.",
 * "Get in Touch." The trailing full stop is part of the design, so it is added
 * here rather than typed into each call site.
 *
 * `as` exists because the same visual treatment is a page title on /projects
 * and /notes but a section title on the home page. Every page needs exactly
 * one h1, and heading level is a document-structure decision, not a styling
 * one — so the call site states it rather than inheriting whatever looks right.
 */
export function SectionHeading({
  children,
  sub,
  align = "center",
  as: Tag = "h2",
  id,
  className,
}: {
  children: React.ReactNode;
  sub?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <Tag id={id} className="font-display text-section font-semibold text-ink">
        {children}
        <span className="text-accent">.</span>
      </Tag>
      {sub && (
        <p
          className={cn(
            "mt-6 text-lg leading-relaxed text-muted",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
