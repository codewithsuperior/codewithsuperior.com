"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn, formatDate } from "@/lib/utils";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";

/** Only the serialisable part of a Note — the MDX loader stays on the server. */
export interface NoteSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

export function NotesIndex({
  notes,
  categories,
}: {
  notes: NoteSummary[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");
  const reduced = useReducedMotion();

  const filters = useMemo(() => ["All", ...categories], [categories]);
  const visible = useMemo(
    () =>
      active === "All" ? notes : notes.filter((n) => n.category === active),
    [notes, active],
  );

  return (
    <>
      {filters.length > 2 && (
        <div className="mt-14 flex justify-center">
          <div
            role="group"
            aria-label="Filter notes by category"
            className="flex flex-wrap justify-center gap-1 rounded-full border border-line bg-paper p-1.5"
          >
            {filters.map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(c)}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "text-paper" : "text-muted hover:text-ink",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="notes-filter"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {`Showing ${visible.length} note${visible.length === 1 ? "" : "s"}.`}
      </p>

      <ul className="mt-16 grid gap-6 lg:grid-cols-3">
        {visible.map((note) => (
          <li key={note.slug}>
            <article className="group relative flex h-full flex-col rounded-3xl border border-line p-7 transition-colors hover:border-muted/40">
              <div className="flex items-center justify-between gap-4">
                <Chip>{note.category}</Chip>
                <time dateTime={note.date} className="text-sm text-muted">
                  {formatDate(note.date)}
                </time>
              </div>

              <h2 className="font-display mt-6 text-2xl leading-tight font-semibold tracking-tight text-balance text-ink">
                {/* The pseudo-element covers the whole card, so the entire card is
                    clickable while the link text stays the accessible name.
                    It needs both an inset and a positioned ancestor to do
                    anything — `after:absolute` on its own is a no-op. */}
                <Link
                  href={`/notes/${note.slug}`}
                  className="after:absolute after:inset-0"
                >
                  {note.title}
                </Link>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-muted">
                {note.excerpt}
              </p>

              <span className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-medium text-ink">
                <span className="border-b border-accent pb-0.5">Read note</span>
                <Icon
                  name="arrowUpRight"
                  width={16}
                  height={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </article>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="mt-20 text-center text-lg text-muted">
          Nothing filed under {active} yet.
        </p>
      )}
    </>
  );
}
