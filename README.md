# Portfolio

A portfolio site for a web and mobile developer. Next.js App Router, TypeScript,
Tailwind v4, and a typed content layer.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Status

The site is live at <https://codewithsuperior-com.vercel.app> and deploys on
every push to `main`.

The content in `content/` is real. It describes one project — *From Nobody: The
GOAT*, a Flutter football life sim — and the stats on `/about` are counts taken
from that project's repository, so they are meant to stay checkable rather than
be rounded up by hand.

Still outstanding:

- `public/shots/goat-*.jpg` — real key art from the game, but backdrops rather
  than in-game screenshots. Captures of the actual UI would be stronger.
- `codewithsuperior.com` — registered on the Vercel project but not registered
  as a domain, so it does not resolve. `siteUrl` in `content/profile.ts` points
  at the `vercel.app` hostname until it does.

`siteUrl` in `content/profile.ts` sets the canonical URLs, the Open Graph tags,
the sitemap and the JSON-LD together. It is the one value worth checking after
any change of domain.

## How it is put together

**The content layer is the contract.** Components never hardcode a name, a phone
number or a project — they read from `content/`, typed against `lib/types.ts`.
That means the page, the metadata, the sitemap and the structured data are all
generated from the same source and cannot drift apart. Adding a project puts it
in the gallery, gives it a case study route, adds it to the sitemap and adds it
to the JSON-LD graph, with no other edits.

**The design lives in one file.** Six colour tokens at the top of
`app/globals.css` define the entire palette, in both light and dark. Change them
and the whole site re-skins. Fonts are set in `app/layout.tsx`.

**Motion is progressive enhancement.** The hidden "before reveal" state is scoped
to a `.js` class that an inline script adds before paint, so with JavaScript off
or a bundle that fails to load, everything renders plainly visible instead of
transparent. `prefers-reduced-motion` is handled once, in CSS.

**The boot preloader is an overlay, not a gate.** It is capped at 1200 ms,
dismisses as soon as the document and fonts are actually ready, runs once per
session, and is skipped entirely under reduced motion. The page renders
underneath it from the first byte.

### Routes

```
/                      hero, filterable projects, tech stack, contact CTA
/about                 bio, ethos, stats, experience timeline, process
/projects              full project gallery
/project/[slug]        case study        (static, from content/projects.ts)
/contact               quick-contact cards, form, socials
/sitemap.xml /robots.txt
```

Every route is prerendered to static HTML at build time.

## Contact form

Posts to a server action (`app/actions/send-message.ts`) backed by Resend, with
Zod validation, a honeypot field and a per-IP rate limit — all server-side, so
none of it can be edited by the sender.

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` to enable delivery.
Without a key the action reports `unconfigured` and the form opens the visitor's
mail client with their message prefilled, so it still works undeployed.

The rate limiter holds state in module memory. It resets on redeploy and is
per-instance — a speed bump, not a guarantee. Move it to Vercel KV or Upstash if
you ever need it to hold across instances.

## Deploying

Push to a Git remote and import the repo on Vercel; the defaults are correct. Set
`RESEND_API_KEY` (and `CONTACT_FROM` / `CONTACT_TO` if you are not using the
defaults) in the project's environment variables.

Security headers — CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy` — are set in `next.config.ts`. `script-src` allows
`'unsafe-inline'` because Next inlines its hydration bootstrap; the strict
alternative is per-request nonces via middleware, which would force every page to
render dynamically.

## Notes on the stack

- `simple-icons` supplies the brand logos. `TechLogo` is a server component, so
  the package never reaches the browser — only the resolved SVG path does. An
  unknown slug renders a lettered tile instead of throwing.
- The dark tech-stack band uses literal colours rather than theme tokens, on
  purpose. Built from tokens it inverts to near-white in dark mode, where the
  white logo tiles disappear — and tinting the tiles is not an option because
  many of these marks are near-black. See the comment in `TechStack.tsx`.
- `robots.ts` explicitly allows AI crawlers. Remove any agent from the list there
  to opt out of it.
