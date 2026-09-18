import type { Profile } from "@/lib/types";

/* ---------------------------------------------------------------------------
 * This one file drives the hero, the boot preloader wordmark, the footer,
 * /about, /contact, the page metadata, the sitemap and the JSON-LD. Change it
 * here and it changes everywhere.
 *
 * The stats are counts from the From Nobody: The GOAT repository and are meant
 * to stay checkable. Re-read them from the project rather than rounding them up
 * by hand: `git rev-list --count HEAD`, and the file and line counts under
 * `lib/` and `test/`.
 * ------------------------------------------------------------------------- */

export const profile: Profile = {
  name: "Superior",
  shortName: "Superior",
  title: "Web & Mobile Developer",
  location: "Lagos, Nigeria",

  headline: ["Hi. I'm Superior.", "Web & Mobile."],
  intro:
    "I build mobile games and web products end to end — right now a football life sim in Flutter, and web work in Next.js and TypeScript.",

  ethos: {
    heading:
      "Let's talk if you care about shipping software people can actually rely on.",
    body: "I'd rather build one thing that holds up in real use than five that demo well. If that's how you think about product too, I'd like to hear from you.",
  },

  bio: [
    "I build mobile games and web products, and right now nearly all of that is From Nobody: The GOAT — a football life sim in Flutter that I have been building on my own since August 2026.",
    "I am early in my coding life and direct about saying so. I work with AI tooling as leverage: I scope the thing, drive the tools, read what comes back, and throw out what does not hold up. What I bring is the judgement about what is worth building, the stubbornness to keep at it until it actually ships, and enough understanding to tell working code from merely convincing code.",
    "That approach has to earn its keep, so I hold the work to the standard I would want from anyone. Saves carry a format version and migrate forward, so a career started on an older build keeps working. Randomness is seeded, so an entire career replays identically in a headless test and a force-quit is no longer a free re-roll. The game rules live in services that can be tested on their own rather than inside a widget.",
  ],

  email: "superior3009@gmail.com",
  phone: "+2348131886018",
  phoneDisplay: "+234 813 188 6018",
  available: true,

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/codewithsuperior",
      icon: "github",
    },
    { label: "X", href: "https://x.com/codewithsuperior", icon: "x" },
    { label: "WhatsApp", href: "https://wa.me/2348131886018", icon: "whatsapp" },
  ],

  stats: [
    { value: "1", label: "Game in development" },
    { value: "81K", label: "Lines shipped" },
    { value: "169", label: "Test files" },
    { value: "206", label: "Commits" },
  ],

  process: [
    {
      title: "Get it playable early",
      body: "Something you can actually open and use settles arguments that a description only prolongs. I would rather find out a mechanic is boring in week one than defend it for a month.",
    },
    {
      title: "Write the decision down",
      body: "Every phase of the game has a record saying what was built, where it diverged from the plan, and what was deliberately left alone. It costs an hour and saves the argument you would otherwise have with yourself later.",
    },
    {
      title: "Test what would hurt to lose",
      body: "Not everything needs a test, but the things a player would never forgive — a lost save, a result that should not have happened — need one. That is most of why the test files outnumber a lot of the source.",
    },
    {
      title: "Make it survive its own updates",
      body: "Shipping once is easy. I care more that the version I release next month does not quietly break what someone built up over hours in the version before it.",
    },
  ],

  faq: [
    {
      question: "What do you build?",
      answer:
        "Mobile games and web products. Right now that means a football life sim in Flutter and Dart for Android, and web work in Next.js, React and TypeScript — this site included.",
    },
    {
      question: "How do you work with AI tools?",
      answer:
        "Heavily, and openly. I use tools like Claude Code to move faster than my hand-coding experience alone would allow. What does not change is that I decide what gets built, review what comes back, and I am the one answerable for whether it works. The tooling is leverage, not a substitute for judgement.",
    },
    {
      question: "Are you available for work?",
      answer:
        "Yes. I am open to freelance projects and to roles, and I work remotely with teams in any timezone. Email or WhatsApp is the fastest way to start a conversation.",
    },
  ],

  // Switch to https://codewithsuperior.com once that domain resolves — it is
  // already registered on the Vercel project but its DNS is not yet pointed
  // there, so the vercel.app hostname is the only one that actually serves.
  siteUrl: "https://codewithsuperior-com.vercel.app",
};
