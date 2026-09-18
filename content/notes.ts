import type { Note } from "@/lib/types";

/* ---------------------------------------------------------------------------
 * PLACEHOLDER NOTES — replace with your own.
 *
 * Metadata lives here; the body lives in `content/notes/<slug>.mdx`. Keeping
 * them together means one entry fully describes one note, and the index page,
 * the sitemap and the JSON-LD can all be built without compiling any MDX.
 *
 * To add a note: create the .mdx file, then add an entry here. Newest first.
 * ------------------------------------------------------------------------- */

export const notes: Note[] = [
  {
    slug: "the-cost-of-a-loading-screen",
    title: "The real cost of a loading screen",
    excerpt:
      "Every portfolio has a preloader now. Most of them are taxing the visitor to show off an animation nobody asked for.",
    category: "Craft",
    date: "2026-08-14",
    body: () => import("./notes/the-cost-of-a-loading-screen.mdx"),
  },
  {
    slug: "typed-content-layers",
    title: "Put your content in a typed layer, not your components",
    excerpt:
      "The fastest way to make a site painful to update is to spread its copy across forty components. Here is the alternative.",
    category: "Craft",
    date: "2026-06-02",
    body: () => import("./notes/typed-content-layers.mdx"),
  },
  {
    slug: "shipping-a-react-native-app-alone",
    title: "What shipping a React Native app alone actually involves",
    excerpt:
      "The code was the easy part. Store review, provisioning profiles and update pipelines were where the weeks went.",
    category: "Mobile",
    date: "2026-03-19",
    body: () => import("./notes/shipping-a-react-native-app-alone.mdx"),
  },
];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);

/** Categories present in the published notes, in first-seen order. */
export const noteCategories = Array.from(new Set(notes.map((n) => n.category)));
