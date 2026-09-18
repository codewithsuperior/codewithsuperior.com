import type { Project } from "@/lib/types";

/* ---------------------------------------------------------------------------
 * Order matters: this is the order they appear in the gallery. `featured`
 * projects render as full-bleed alternating rows, the rest as a card grid.
 * A project with no `caseStudy` renders without a case-study link.
 * ------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: "from-nobody-the-goat",
    name: "From Nobody: The GOAT",
    summary:
      "A football life sim where you start unattached in high school with no club, no agent and no reputation, and plan every week — training, work, people, rest — on the way to being the best in the world.",
    kind: "mobile",
    status: "in-progress",
    role: "Solo Developer",
    timeline: "2026 — Present",
    tech: [
      "Flutter",
      "Dart",
      "Android",
      "Game Design",
      "Simulation",
      "Free-to-Play",
      "Unit Testing",
    ],
    featured: true,
    cover: {
      src: "/shots/goat-hero.jpg",
      alt: "From Nobody: The GOAT key art — a footballer lit from behind under stadium floodlights",
    },
    shots: [
      {
        src: "/shots/goat-street.jpg",
        alt: "Street football backdrop, where a career begins before any club has signed the player",
      },
      {
        src: "/shots/goat-academy.jpg",
        alt: "Academy backdrop, used for the youth stage of a player's rise",
      },
      {
        src: "/shots/goat-world-cup.jpg",
        alt: "World cup backdrop, the final stage of the reputation ladder",
      },
    ],
    caseStudy: {
      overview:
        "A mobile-first, free-to-play career sim built in Flutter. A week is seven days and you decide what each one is for; matches play out across four live moments rather than a single dice roll; and every week nets your wage against what it costs to live, which means nothing at all when you are still a street footballer. Reputation carries you up seven stages, from unknown to the best in the world, and the cast around you — clubs, coaches, agents, family — is earned rather than handed over at the start. It runs to roughly 81,000 lines of Dart across 259 files, with 169 test files alongside them.",
      challenges:
        "The hard part was not the football, it was making a long career survive its own save file. Early on, saves carried no format version, so old careers were held together by defaults and by bootstraps firing unawaited writes at the same slot. Randomness came from a single generator drawn in tap order, which meant nothing replayed and a force-quit before a save was a free re-roll — the player could simply retry any outcome he disliked. The match rules lived inside a widget as roughly seven hundred lines of reputation, bans, stress and trust, untested because there was no way to reach them. Fixing it meant stamping a format version on every save and migrating old ones forward, moving to seeded randomness so a career replays identically in a headless test, and lifting the rules out of the UI into services that can be tested on their own. The exit criterion was deliberately concrete: old save fixtures load through the pipeline, and a seeded career replays move for move.",
      features: [
        "A week planner that is the game's only clock — every counter that moves names the cause that moved it",
        "Matches resolved through four live moments: a tactical choice, two timing taps, and the settlement",
        "Hidden player potential that is never shown as a number — coaches, scouts and agents give opinions that can be wrong, so trusting the wrong judge is a real risk",
        "Versioned saves with forward migration, so careers started on older builds keep working",
        "Seeded randomness that makes an entire career deterministic and replayable in tests",
      ],
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
