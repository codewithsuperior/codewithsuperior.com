import type { Profile } from "@/lib/types";

/* ---------------------------------------------------------------------------
 * This one file drives the hero, the boot preloader wordmark, the footer,
 * /about, /contact, the page metadata, the sitemap and the JSON-LD. Change it
 * here and it changes everywhere.
 * ------------------------------------------------------------------------- */

export const profile: Profile = {
  name: "Superior",
  shortName: "Superior",
  title: "Web & Mobile Developer",
  location: "Lagos, Nigeria",

  headline: ["Hi. I'm Superior.", "Web & Mobile."],
  intro:
    "I design and build web and mobile products end to end — from the interface people touch to the API and database behind it.",

  ethos: {
    heading:
      "Let's talk if you care about shipping software people can actually rely on.",
    body: "I'd rather build one thing that holds up under real traffic than five that demo well. If that's how you think about product too, I'd like to hear from you.",
  },

  bio: [
    "I started out fixing other people's websites — small tickets, broken layouts, forms that silently dropped submissions. It was unglamorous, and it taught me more about how the web actually works than any tutorial did.",
    "These days I work across the whole stack. On the front end that means React and TypeScript on the web, React Native and Expo on mobile. On the back end it means Node, REST APIs, and relational data modelling that survives contact with real users.",
    "Away from the editor I'm usually cooking something ambitious, reading about systems design, or taking apart a product I admire to work out how it was put together.",
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
    { value: "5+", label: "Years building" },
    { value: "3", label: "Roles held" },
    { value: "40+", label: "Projects shipped" },
    { value: "2", label: "Apps in stores" },
  ],

  process: [
    {
      title: "Prototype early",
      body: "I get something clickable in a browser fast. A real link a team can poke at settles arguments that a static mockup only prolongs.",
    },
    {
      title: "Build in the open",
      body: "Short feedback loops, visible work in progress, decisions written down. Nobody should be surprised by what lands at the end of a sprint.",
    },
    {
      title: "Make it fast",
      body: "Performance is a requirement, not a feature. I watch bundle weight, keep the main thread free, and treat a slow page as a bug worth filing.",
    },
    {
      title: "Leave it maintainable",
      body: "Typed interfaces, small components, tests around the parts that would hurt to break. The next person to open the file should not need me to explain it.",
    },
  ],

  faq: [
    {
      question: "What do you build?",
      answer:
        "Full-stack web applications and cross-platform mobile apps — interface work in React and TypeScript, mobile in React Native and Expo, APIs in Node, and the relational data modelling behind both.",
    },
    {
      question: "Are you available for work?",
      answer:
        "Yes. I take freelance contracts and full-time roles, and I work remotely with teams in any timezone. Email or WhatsApp is the fastest way to start a conversation.",
    },
    {
      question: "How do you charge for freelance projects?",
      answer:
        "Fixed price for well-scoped work, day rate for open-ended engagements. Either way you get a written scope before anything starts.",
    },
  ],

  // TODO: unverified. Vercel derives this from the repo name; confirm the real
  // URL after the first deploy, or switch to https://codewithsuperior.com once
  // the custom domain is pointed at Vercel.
  siteUrl: "https://codewithsuperior-com.vercel.app",
};
