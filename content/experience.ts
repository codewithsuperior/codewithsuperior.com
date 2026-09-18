import type { ExperienceRole } from "@/lib/types";

/* ---------------------------------------------------------------------------
 * PLACEHOLDER EXPERIENCE — replace with your own.
 *
 * Durations are computed from `start` and `end`, so a current role keeps
 * counting on its own and never needs editing. Newest first.
 * ------------------------------------------------------------------------- */

export const experience: ExperienceRole[] = [
  {
    company: "Acme Software",
    title: "Full Stack Developer",
    location: "Remote",
    type: "full-time",
    start: "2024-05",
    end: null,
    summary:
      "Maintaining and shipping two production products end to end — new features, performance work, and keeping both codebases healthy as they grow.",
    highlights: [
      "Own features from ticket to production across two live products",
      "Cut render-blocking work and trimmed bundle weight on the main app",
      "Refactored legacy screens into typed, reusable components",
      "Design and consume REST APIs, and handle auth flows end to end",
    ],
    ways: [
      "On-call incident response",
      "Debugging live production issues",
      "Working to a deadline",
      "Code review and feedback",
      "Clear async communication",
    ],
    tech: [
      "React",
      "TypeScript",
      "Tailwind",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST APIs",
      "Git",
      "Figma",
    ],
  },
  {
    company: "Northgate Labs",
    title: "Mobile Developer",
    location: "Hybrid",
    type: "contract",
    start: "2023-01",
    end: "2024-04",
    summary:
      "Built and shipped two React Native applications to the App Store and Play Store, from first commit through review to release.",
    highlights: [
      "Shipped two apps through App Store and Play Store review",
      "Set up EAS build and over-the-air update pipelines",
      "Brought cold start time down by roughly half on mid-range Android",
      "Added end-to-end tests around the checkout and auth flows",
    ],
    ways: [
      "Release management",
      "Working directly with clients",
      "Writing handover documentation",
      "Estimating and scoping",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Zustand", "Jest", "Detox"],
  },
  {
    company: "Independent",
    title: "Freelance Developer",
    location: "Remote / Worldwide",
    type: "contract",
    start: "2021-06",
    end: null,
    summary:
      "Scoping, building and handing over software that clients can run themselves — mostly marketing sites, internal tools and small commerce builds.",
    highlights: [
      "Delivered 20+ projects for clients across four countries",
      "Handled scoping, pricing and delivery end to end",
      "Built CMS-backed sites non-technical teams still maintain today",
    ],
    ways: [
      "Client communication",
      "Scoping and pricing",
      "Handover and training",
    ],
    tech: ["Next.js", "React", "Tailwind", "Node.js", "PostgreSQL", "Vercel"],
  },
];
