import { notes, noteCategories } from "@/content/notes";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NotesIndex } from "@/components/notes/NotesIndex";

export const metadata = pageMetadata({
  title: "Notes",
  description: `Writing on code, craft and building software, by ${profile.name}.`,
  path: "/notes",
});

export default function NotesPage() {
  // Strip the MDX loader before handing data to a client component — a
  // function is not serialisable across the server/client boundary.
  const summaries = notes
    .filter((n) => !n.draft)
    .map(({ slug, title, excerpt, category, date }) => ({
      slug,
      title,
      excerpt,
      category,
      date,
    }));

  return (
    <section className="container-page pt-32 pb-24 sm:pt-44">
      <SectionHeading
        as="h1"
        sub="Notes on code, craft, and the parts of building software that nobody puts in the tutorial."
      >
        Notes
      </SectionHeading>

      <NotesIndex notes={summaries} categories={noteCategories} />
    </section>
  );
}
