/**
 * The shape of every piece of content on this site.
 *
 * Components never hardcode a name, a phone number or a project — they read
 * from `content/*`, which is typed against these. Editing the content layer
 * updates the pages, the metadata, the sitemap and the JSON-LD together.
 */

export type ProjectKind = "web" | "mobile";

export type ProjectStatus = "live" | "in-progress" | "archived";

/** A screenshot, plus the alt text it must always carry. */
export interface Shot {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  name: string;
  /** One line, used on cards and as the case-study standfirst. */
  summary: string;
  kind: ProjectKind;
  status: ProjectStatus;
  /** Your role, e.g. "Full Stack Developer". Shown next to the kind on cards. */
  role: string;
  /** Freeform, e.g. "Completed", "2025 — Present". */
  timeline: string;
  /** Chips on the card. Keep to ~7; the card wraps them onto two rows. */
  tech: string[];
  /** Featured projects render as full-bleed alternating rows on the home page. */
  featured: boolean;
  /** Card art. Web projects get a browser frame, mobile projects phone frames. */
  cover: Shot;
  /** Extra screens shown on the case study. Mobile cards show a "+N more" badge. */
  shots: Shot[];
  /** Total screens designed, when it exceeds what you're showing. Drives "+N more screens". */
  totalScreens?: number;
  liveUrl?: string;
  repoUrl?: string;
  /** Case-study prose. Omit `caseStudy` to render a card with no "View Case Study" link. */
  caseStudy?: {
    overview: string;
    challenges: string;
    features: string[];
  };
}

export interface StackGroup {
  title: string;
  items: { name: string; logo: string }[];
}

export type NoteCategory = string;

export interface Note {
  slug: string;
  title: string;
  excerpt: string;
  category: NoteCategory;
  /** ISO `YYYY-MM-DD`. */
  date: string;
  /** Loads the MDX body. Kept beside the metadata so one entry describes one note. */
  body: () => Promise<{ default: React.ComponentType }>;
  draft?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  /** Key into the icon map in `components/ui/Icon.tsx`. */
  icon: string;
}

export interface Profile {
  name: string;
  /** Short form used for the boot preloader wordmark and the footer brand. */
  shortName: string;
  title: string;
  location: string;
  /** Hero headline, rendered as two oversized lines. */
  headline: [string, string];
  /** Hero sub-paragraph. */
  intro: string;
  /** The "what I care about" pull quote on /about. */
  ethos: { heading: string; body: string };
  /** Longer bio paragraphs on /about. */
  bio: string[];
  email: string;
  /** E.164, e.g. "+2349156015252". Used for tel: and wa.me links. */
  phone: string;
  /** Human-readable form of the same number. */
  phoneDisplay: string;
  available: boolean;
  socials: SocialLink[];
  stats: { value: string; label: string }[];
  process: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
  /** Canonical origin, no trailing slash. Drives metadata, sitemap and JSON-LD. */
  siteUrl: string;
}
