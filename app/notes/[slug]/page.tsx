import Link from "next/link";
import { notFound } from "next/navigation";

import { notes, getNote } from "@/content/notes";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { noteGraph } from "@/lib/jsonld";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return notes.filter((n) => !n.draft).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};

  return pageMetadata({
    title: note.title,
    description: note.excerpt,
    path: `/notes/${note.slug}`,
    type: "article",
    publishedTime: note.date,
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note || note.draft) notFound();

  // Resolved at build time; the MDX compiles to a server component.
  const { default: Body } = await note.body();

  const index = notes.findIndex((n) => n.slug === note.slug);
  const next = notes[index + 1];

  return (
    <>
      <article className="container-page pt-32 sm:pt-40">
        <Link
          href="/notes"
          className="inline-flex items-center gap-3 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-surface">
            <Icon name="arrowLeft" width={16} height={16} />
          </span>
          All notes
        </Link>

        <header className="mx-auto mt-12 max-w-3xl">
          <div className="flex flex-wrap items-center gap-4">
            <Chip>{note.category}</Chip>
            <time dateTime={note.date} className="text-sm text-muted">
              {formatDate(note.date)}
            </time>
          </div>

          <h1 className="font-display mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-ink sm:text-6xl">
            {note.title}
          </h1>

          <p className="mt-8 text-xl leading-relaxed text-pretty text-muted">
            {note.excerpt}
          </p>
        </header>

        <hr className="mx-auto mt-14 max-w-3xl border-line" />

        <div className="mx-auto mt-14 max-w-3xl">
          <Body />
        </div>

        <footer className="mx-auto mt-20 max-w-3xl border-t border-line pt-10">
          <p className="text-base text-muted">
            Written by{" "}
            <Link
              href="/about"
              className="text-ink underline decoration-accent decoration-2 underline-offset-4"
            >
              {profile.name}
            </Link>
            .
          </p>
        </footer>
      </article>

      {next && (
        <section className="container-page mt-24 border-t border-line pt-16">
          <p className="eyebrow text-muted">Next note</p>
          <Link
            href={`/notes/${next.slug}`}
            className="group mt-5 inline-flex flex-wrap items-baseline gap-x-6 gap-y-3"
          >
            <span className="font-display text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
              {next.title}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors group-hover:text-ink">
              Read it
              <Icon name="arrowRight" width={16} height={16} />
            </span>
          </Link>
        </section>
      )}

      <JsonLd data={noteGraph(note)} />
    </>
  );
}
