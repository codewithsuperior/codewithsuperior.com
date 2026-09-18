import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { stack } from "@/content/stack";
import type { Note, Project } from "@/lib/types";
import { absolute, siteUrl } from "@/lib/seo";

/**
 * Structured data, derived entirely from the content layer.
 *
 * The reference site this was modelled on maintains its JSON-LD by hand, in a
 * script tag with a comment admitting it is "kept in sync by hand". Generating
 * it from the same arrays the pages render means it cannot drift: add a
 * project and it appears in the graph, the sitemap and the page together.
 */

const ID = {
  person: `${siteUrl}/#person`,
  website: `${siteUrl}/#website`,
  profilePage: `${siteUrl}/#profilepage`,
  faq: `${siteUrl}/#faq`,
};

/**
 * Splits the human-readable `location` into schema.org's separate fields.
 *
 * `profile.location` is written for people ("Lagos, Nigeria") and rendered
 * verbatim on /about. Search engines read `addressLocality` as a single city
 * name, so passing the whole string leaves them looking for a city called
 * "Lagos, Nigeria". Everything after the last comma is treated as the country.
 */
const postalAddress = () => {
  const parts = profile.location.split(",").map((p) => p.trim()).filter(Boolean);
  const country = parts.length > 1 ? parts.pop() : undefined;

  return {
    "@type": "PostalAddress",
    ...(parts.length ? { addressLocality: parts.join(", ") } : {}),
    ...(country ? { addressCountry: country } : {}),
  };
};

const person = () => ({
  "@type": "Person",
  "@id": ID.person,
  name: profile.name,
  url: siteUrl,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: postalAddress(),
  sameAs: profile.socials.map((s) => s.href),
  worksFor: experience
    .filter((r) => r.end === null)
    .map((r) => ({ "@type": "Organization", name: r.company })),
  knowsAbout: [
    ...new Set([
      profile.title,
      ...stack.flatMap((g) => g.items.map((i) => i.name)),
    ]),
  ],
});

const website = () => ({
  "@type": "WebSite",
  "@id": ID.website,
  url: siteUrl,
  name: profile.name,
  description: profile.intro,
  inLanguage: "en",
  publisher: { "@id": ID.person },
});

const faqPage = () => ({
  "@type": "FAQPage",
  "@id": ID.faq,
  isPartOf: { "@id": ID.website },
  mainEntity: profile.faq.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

/** The site-wide graph, emitted once from the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person(),
      website(),
      {
        "@type": "ProfilePage",
        "@id": ID.profilePage,
        url: siteUrl,
        name: `${profile.name} — ${profile.title}`,
        mainEntity: { "@id": ID.person },
        isPartOf: { "@id": ID.website },
        inLanguage: "en",
      },
      faqPage(),
    ],
  };
}

const breadcrumb = (trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: absolute(t.path),
  })),
});

export function projectGraph(project: Project) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": absolute(`/project/${project.slug}`) + "#work",
        name: project.name,
        headline: project.name,
        description: project.summary,
        url: absolute(`/project/${project.slug}`),
        author: { "@id": ID.person },
        creator: { "@id": ID.person },
        keywords: project.tech.join(", "),
        isPartOf: { "@id": ID.website },
        ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: project.name, path: `/project/${project.slug}` },
      ]),
    ],
  };
}

export function noteGraph(note: Note) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": absolute(`/notes/${note.slug}`) + "#post",
        headline: note.title,
        description: note.excerpt,
        datePublished: note.date,
        dateModified: note.date,
        articleSection: note.category,
        url: absolute(`/notes/${note.slug}`),
        author: { "@id": ID.person },
        publisher: { "@id": ID.person },
        isPartOf: { "@id": ID.website },
        mainEntityOfPage: absolute(`/notes/${note.slug}`),
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Notes", path: "/notes" },
        { name: note.title, path: `/notes/${note.slug}` },
      ]),
    ],
  };
}

/** Every project as an ItemList, for the /projects index. */
export function projectListGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Projects by ${profile.name}`,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: absolute(`/project/${p.slug}`),
    })),
  };
}
