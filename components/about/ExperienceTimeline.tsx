"use client";

import { useState } from "react";
import type { ExperienceRole } from "@/lib/types";
import { cn, formatRolePeriod } from "@/lib/utils";
import { Chip } from "@/components/ui/Chip";

const TYPE_LABEL: Record<ExperienceRole["type"], string> = {
  "full-time": "Full-time",
  contract: "Contract",
  "on-call": "On-call",
  internship: "Internship",
};

/**
 * The numbered experience timeline.
 *
 * Each role is a real disclosure: a `<button>` with `aria-expanded` controlling
 * a panel by id, so it is reachable by keyboard, announced correctly, and
 * toggles on Enter and Space without any key handling of our own. The first
 * role starts open — the most recent job is the one people came to read.
 */
export function ExperienceTimeline({ roles }: { roles: ExperienceRole[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ol className="mt-16 divide-y divide-line border-y border-line">
      {roles.map((role, i) => {
        const isOpen = open === i;
        const panelId = `role-panel-${i}`;
        const buttonId = `role-button-${i}`;
        const current = role.end === null;

        return (
          <li key={`${role.company}-${role.start}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-5 py-8 text-left sm:gap-8"
              >
                <span className="eyebrow mt-2 shrink-0 text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="mb-3 flex flex-wrap items-center gap-2">
                    <Chip tone="outline">{TYPE_LABEL[role.type]}</Chip>
                    {current && <Chip tone="accent">Now</Chip>}
                  </span>

                  <span className="font-display block text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {role.title}
                  </span>

                  <span className="mt-1.5 block text-base text-muted">
                    {role.company}
                    <span aria-hidden="true" className="mx-2 opacity-50">
                      ·
                    </span>
                    {role.location}
                  </span>

                  <span className="mt-2 block text-sm text-muted">
                    {formatRolePeriod(role.start, role.end)}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="mt-2 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-muted/50 group-hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      d="M12 5v14M5 12h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      className={cn(
                        "origin-center transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                    />
                  </svg>
                </span>
              </button>
            </h3>

            {/* Hidden with `hidden` rather than a height animation: a panel of
                unknown height is the classic place where an animated accordion
                clips its own content. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-10 sm:pl-[3.75rem]"
            >
              <p className="max-w-2xl text-lg leading-relaxed text-muted">
                {role.summary}
              </p>

              <ul className="mt-6 max-w-2xl space-y-3">
                {role.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-base text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    {h}
                  </li>
                ))}
              </ul>

              {role.ways.length > 0 && (
                <>
                  <p className="eyebrow mt-8 text-muted">How I work</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {role.ways.map((w) => (
                      <li key={w}>
                        <Chip tone="outline">{w}</Chip>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <ul className="mt-6 flex flex-wrap gap-2">
                {role.tech.map((t) => (
                  <li key={t}>
                    <Chip>{t}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
