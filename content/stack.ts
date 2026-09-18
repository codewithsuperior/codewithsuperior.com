import type { StackGroup } from "@/lib/types";

/* ---------------------------------------------------------------------------
 * PLACEHOLDER TECH STACK — replace with what you actually use.
 *
 * `logo` is a simple-icons slug. To find one, check the icon name at
 * https://simpleicons.org and lowercase it, replacing "." with "dot" —
 * Node.js is `nodedotjs`, Next.js is `nextdotjs`. An unknown slug renders a
 * lettered tile instead of crashing, so a typo degrades rather than breaks.
 * ------------------------------------------------------------------------- */

export const stack: StackGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "HTML5", logo: "html5" },
      { name: "CSS", logo: "css" },
      { name: "JavaScript", logo: "javascript" },
      { name: "TypeScript", logo: "typescript" },
      { name: "React", logo: "react" },
      { name: "Next.js", logo: "nextdotjs" },
      { name: "Tailwind", logo: "tailwindcss" },
      { name: "Astro", logo: "astro" },
    ],
  },
  {
    title: "Mobile",
    items: [
      { name: "React Native", logo: "react" },
      { name: "Expo", logo: "expo" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", logo: "nodedotjs" },
      { name: "Express", logo: "express" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "MongoDB", logo: "mongodb" },
      { name: "Prisma", logo: "prisma" },
      { name: "Redis", logo: "redis" },
      { name: "Supabase", logo: "supabase" },
      { name: "Firebase", logo: "firebase" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", logo: "git" },
      { name: "GitHub", logo: "github" },
      { name: "Docker", logo: "docker" },
      { name: "Jest", logo: "jest" },
      { name: "Figma", logo: "figma" },
      { name: "Postman", logo: "postman" },
      { name: "Vercel", logo: "vercel" },
    ],
  },
];
