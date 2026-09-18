import type { Project } from "@/lib/types";

/* ---------------------------------------------------------------------------
 * PLACEHOLDER PROJECTS — replace with your own.
 *
 * Order matters: this is the order they appear in the gallery. `featured`
 * projects render as full-bleed alternating rows, the rest as a card grid.
 * A project with no `caseStudy` renders without a case-study link.
 * ------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: "ledger-wallet",
    name: "Ledger",
    summary:
      "A mobile payments wallet built on a double-entry ledger, with idempotent transfers that stay balanced even when a provider drops the connection mid-request.",
    kind: "mobile",
    status: "live",
    role: "Lead Full-Stack Engineer",
    timeline: "Completed",
    tech: [
      "React Native",
      "Expo",
      "Node.js",
      "PostgreSQL",
      "Zustand",
      "Fintech",
    ],
    featured: true,
    cover: {
      src: "/shots/ledger-1.svg",
      alt: "Ledger wallet home screen showing an account balance and recent activity",
    },
    shots: [
      {
        src: "/shots/ledger-2.svg",
        alt: "Ledger transfer screen with an amount keypad",
      },
      {
        src: "/shots/ledger-3.svg",
        alt: "Ledger transaction history grouped by day",
      },
    ],
    totalScreens: 24,
    caseStudy: {
      overview:
        "Ledger is a mobile-first payments wallet handling the full lifecycle of a transfer — funding, authorisation, settlement and reconciliation. The client is React Native on Expo; the backend is Node and PostgreSQL. Rather than storing a single mutable balance column, every movement of money is written as a pair of ledger entries, so an account balance is always a derived sum that cannot silently drift.",
      challenges:
        "The hard part was never the happy path — it was third-party providers timing out halfway through a transfer. I made the transaction engine idempotent: every request carries a client-generated key, and a replay returns the original result instead of moving money twice. Paired with a strict double-entry schema and database-level constraints, a dropped connection could no longer leave an account debited for a transfer that never completed.",
      features: [
        "Idempotent transfer engine keyed on client-supplied request IDs",
        "Double-entry ledger with balance enforced by database constraints",
        "Optimistic UI updates that reconcile against the server",
        "Encrypted transaction PINs, never stored in plaintext",
        "Automated reconciliation against provider webhooks",
        "Offline-tolerant queue for transfers started without signal",
      ],
    },
  },
  {
    slug: "atlas-commerce",
    name: "Atlas",
    summary:
      "A storefront and admin dashboard for a small retailer, built to be run by people who do not work in tech.",
    kind: "web",
    status: "live",
    role: "Full Stack Developer",
    timeline: "Completed",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind"],
    featured: true,
    cover: {
      src: "/shots/atlas-1.svg",
      alt: "Atlas storefront homepage with a product grid",
    },
    shots: [
      {
        src: "/shots/atlas-2.svg",
        alt: "Atlas admin dashboard showing orders and revenue",
      },
    ],
    caseStudy: {
      overview:
        "Atlas is a complete commerce stack — catalogue, cart, checkout and an admin dashboard — built for a retailer with no technical staff. The brief was less about features than about handover: everything the owner might need to change had to be editable without a developer.",
      challenges:
        "Product data had to be flexible enough for wildly different item types without becoming a free-for-all. I settled on a typed variant model with per-category attribute schemas validated at the edge, so the admin UI could generate the right form for each category while the database still rejected malformed data.",
      features: [
        "Typed product variants with per-category attribute schemas",
        "Stripe checkout with webhook-driven order state",
        "Role-based admin with a full audit trail",
        "Image pipeline producing responsive AVIF and WebP",
        "Search with typo tolerance and faceted filtering",
      ],
    },
  },
  {
    slug: "trailmark",
    name: "Trailmark",
    summary:
      "An offline-first hiking tracker that records routes without a signal and syncs when you are back in range.",
    kind: "mobile",
    status: "in-progress",
    role: "Solo Developer",
    timeline: "2025 — Present",
    tech: ["React Native", "Expo", "SQLite", "MapLibre", "TypeScript"],
    featured: false,
    cover: {
      src: "/shots/trailmark-1.svg",
      alt: "Trailmark route tracking screen with an elevation chart",
    },
    shots: [
      {
        src: "/shots/trailmark-2.svg",
        alt: "Trailmark map view showing a recorded trail",
      },
    ],
    totalScreens: 12,
    caseStudy: {
      overview:
        "Trailmark records GPS traces, elevation and pace on trails where there is no network at all. Everything is written to on-device SQLite first and treated as the source of truth; the server is a sync target, not a dependency.",
      challenges:
        "Background location on both platforms is unforgiving — aggressive OS power management will silently stop your task. I moved to a batched write strategy with a foreground service on Android and significant-change monitoring on iOS, then built a conflict-resolution pass so a trail edited on two devices merges rather than overwrites.",
      features: [
        "Offline-first capture with SQLite as the source of truth",
        "Battery-aware background location batching",
        "Vector map tiles cached for offline regions",
        "Per-field conflict resolution on sync",
        "GPX import and export",
      ],
    },
  },
  {
    slug: "signal-board",
    name: "Signal",
    summary:
      "A real-time team status board with live presence, optimistic updates and a moderation queue.",
    kind: "web",
    status: "live",
    role: "Full Stack Developer",
    timeline: "Completed",
    tech: ["React", "Node.js", "WebSocket", "Redis", "PostgreSQL"],
    featured: false,
    cover: {
      src: "/shots/signal-1.svg",
      alt: "Signal board showing live status cards for a team",
    },
    shots: [],
    caseStudy: {
      overview:
        "Signal shows what a distributed team is working on right now, updating live for everyone connected. It is a small product with a disproportionately interesting concurrency problem.",
      challenges:
        "Naive broadcast-on-write fell over once rooms grew past a few dozen people. I introduced a Redis pub/sub fan-out with per-room debouncing, and moved presence to a heartbeat with a grace period so a flaky connection no longer made someone flicker in and out of the room.",
      features: [
        "Redis pub/sub fan-out across multiple server instances",
        "Presence heartbeats with reconnection grace periods",
        "Optimistic updates that roll back cleanly on failure",
        "Moderation queue with soft deletes",
      ],
    },
  },
  {
    slug: "verse-translate",
    name: "Verse",
    summary:
      "A cross-platform translator covering 100+ languages, with an offline phrasebook for the ones you need most.",
    kind: "mobile",
    status: "live",
    role: "Solo Developer",
    timeline: "Completed",
    tech: ["React Native", "Expo", "REST API", "TypeScript"],
    featured: false,
    cover: {
      src: "/shots/verse-1.svg",
      alt: "Verse translator screen with source and target language panes",
    },
    shots: [],
    totalScreens: 9,
  },
  {
    slug: "northwind-studio",
    name: "Northwind",
    summary:
      "A marketing site for a design studio — static, fast, and editable by the team without touching code.",
    kind: "web",
    status: "live",
    role: "Front End Developer",
    timeline: "Completed",
    tech: ["Astro", "TypeScript", "Tailwind", "CMS"],
    featured: false,
    cover: {
      src: "/shots/northwind-1.svg",
      alt: "Northwind studio homepage with a large typographic hero",
    },
    shots: [],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
