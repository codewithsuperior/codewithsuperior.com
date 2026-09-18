/**
 * Generates the placeholder screenshots in `public/shots` and the portrait in
 * `public/`.
 *
 * These exist so the site renders end to end before you have real artwork.
 * Replace the files with real screenshots (PNG or WebP) and update the `src`
 * values in `content/projects.ts` — then delete this script.
 *
 *   node scripts/gen-placeholders.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(resolve(root, "public/shots"), { recursive: true });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/** A phone screen: status bar, title, hero card, tile row, list rows. */
function phone({ title, label, accent, ink = "#12121a", paper = "#ffffff" }) {
  const rows = [0, 1, 2, 3]
    .map(
      (i) => `
    <rect x="28" y="${560 + i * 74}" width="42" height="42" rx="12" fill="${accent}" opacity="0.14"/>
    <rect x="86" y="${570 + i * 74}" width="${170 - i * 22}" height="11" rx="5.5" fill="${ink}" opacity="0.5"/>
    <rect x="86" y="${589 + i * 74}" width="${118 - i * 14}" height="9" rx="4.5" fill="${ink}" opacity="0.22"/>
    <rect x="330" y="${576 + i * 74}" width="58" height="11" rx="5.5" fill="${ink}" opacity="0.35"/>`,
    )
    .join("");

  const tiles = [0, 1, 2]
    .map(
      (i) => `
    <rect x="${28 + i * 124}" y="404" width="112" height="104" rx="20" fill="${accent}" opacity="0.10"/>
    <circle cx="${64 + i * 124}" cy="440" r="15" fill="${accent}" opacity="0.55"/>
    <rect x="${46 + i * 124}" y="472" width="${74 - i * 10}" height="9" rx="4.5" fill="${ink}" opacity="0.35"/>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="910" viewBox="0 0 420 910" role="img" aria-label="${esc(title)} placeholder screen">
  <rect width="420" height="910" fill="${paper}"/>
  <rect x="28" y="44" width="60" height="10" rx="5" fill="${ink}" opacity="0.45"/>
  <rect x="330" y="44" width="62" height="10" rx="5" fill="${ink}" opacity="0.28"/>

  <text x="28" y="118" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="500" fill="${ink}" opacity="0.45">${esc(label)}</text>
  <text x="28" y="158" font-family="Inter, system-ui, sans-serif" font-size="30" font-weight="700" fill="${ink}">${esc(title)}</text>

  <rect x="28" y="196" width="364" height="180" rx="26" fill="${accent}"/>
  <rect x="56" y="234" width="120" height="11" rx="5.5" fill="#ffffff" opacity="0.65"/>
  <rect x="56" y="266" width="196" height="30" rx="8" fill="#ffffff" opacity="0.95"/>
  <rect x="56" y="318" width="112" height="34" rx="17" fill="#ffffff" opacity="0.28"/>

  ${tiles}

  <rect x="28" y="536" width="96" height="11" rx="5.5" fill="${ink}" opacity="0.6"/>
  ${rows}

  <rect x="28" y="868" width="364" height="4" rx="2" fill="${ink}" opacity="0.18"/>
</svg>`;
}

/** A browser screen: nav, headline block, hero panel, card row. */
function browser({ title, label, accent, ink = "#12121a", paper = "#ffffff" }) {
  const links = ["Work", "About", "Pricing", "Contact"]
    .map(
      (l, i) =>
        `<text x="${520 + i * 96}" y="66" font-family="Inter, system-ui, sans-serif" font-size="14" fill="${ink}" opacity="0.45">${l}</text>`,
    )
    .join("");

  const cards = [0, 1, 2]
    .map(
      (i) => `
    <rect x="${80 + i * 384}" y="556" width="352" height="180" rx="20" fill="${ink}" opacity="0.045"/>
    <rect x="112" y="0" width="0" height="0"/>
    <circle cx="${118 + i * 384}" cy="596" r="16" fill="${accent}" opacity="0.5"/>
    <rect x="${146 + i * 384}" y="588" width="${132 - i * 16}" height="12" rx="6" fill="${ink}" opacity="0.45"/>
    <rect x="${112 + i * 384}" y="638" width="288" height="10" rx="5" fill="${ink}" opacity="0.18"/>
    <rect x="${112 + i * 384}" y="662" width="${240 - i * 30}" height="10" rx="5" fill="${ink}" opacity="0.18"/>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800" role="img" aria-label="${esc(title)} placeholder screen">
  <rect width="1280" height="800" fill="${paper}"/>

  <circle cx="80" cy="60" r="7" fill="${accent}"/>
  <text x="102" y="66" font-family="Inter, system-ui, sans-serif" font-size="17" font-weight="700" fill="${ink}">${esc(title)}</text>
  ${links}
  <rect x="1064" y="44" width="136" height="36" rx="18" fill="${ink}"/>

  <text x="80" y="188" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="2" fill="${accent}">${esc(label.toUpperCase())}</text>
  <rect x="80" y="212" width="620" height="34" rx="8" fill="${ink}" opacity="0.85"/>
  <rect x="80" y="262" width="470" height="34" rx="8" fill="${ink}" opacity="0.85"/>
  <rect x="80" y="326" width="440" height="12" rx="6" fill="${ink}" opacity="0.25"/>
  <rect x="80" y="352" width="360" height="12" rx="6" fill="${ink}" opacity="0.25"/>
  <rect x="80" y="398" width="170" height="46" rx="23" fill="${accent}"/>

  <rect x="748" y="180" width="452" height="292" rx="24" fill="${accent}" opacity="0.10"/>
  <rect x="784" y="220" width="180" height="12" rx="6" fill="${ink}" opacity="0.3"/>
  <rect x="784" y="252" width="380" height="184" rx="16" fill="${accent}" opacity="0.28"/>

  ${cards}
</svg>`;
}

/** An abstract portrait stand-in — a figure, not a person. */
function portrait({ accent, ink = "#12121a" }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="900" viewBox="0 0 720 900" role="img" aria-label="Portrait placeholder">
  <rect width="720" height="900" rx="0" fill="${accent}" opacity="0.10"/>
  <circle cx="360" cy="330" r="132" fill="${ink}" opacity="0.16"/>
  <path d="M132 900c0-126 102-228 228-228s228 102 228 228z" fill="${ink}" opacity="0.16"/>
  <text x="360" y="856" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="17" font-weight="600" letter-spacing="2" fill="${ink}" opacity="0.4">YOUR PHOTO HERE</text>
</svg>`;
}

const ACCENT = "#e8442b";

const files = {
  "public/shots/ledger-1.svg": phone({ title: "Ledger", label: "Good afternoon", accent: "#e8442b" }),
  "public/shots/ledger-2.svg": phone({ title: "Send money", label: "Transfer", accent: "#e8442b" }),
  "public/shots/ledger-3.svg": phone({ title: "Activity", label: "This month", accent: "#e8442b" }),
  "public/shots/trailmark-1.svg": phone({ title: "Tracking", label: "Current trail", accent: "#1f7a4d" }),
  "public/shots/trailmark-2.svg": phone({ title: "Routes", label: "Saved", accent: "#1f7a4d" }),
  "public/shots/verse-1.svg": phone({ title: "Translate", label: "100+ languages", accent: "#3457d5" }),
  "public/shots/atlas-1.svg": browser({ title: "Atlas", label: "New collection", accent: "#b3123f" }),
  "public/shots/atlas-2.svg": browser({ title: "Atlas Admin", label: "Overview", accent: "#b3123f" }),
  "public/shots/signal-1.svg": browser({ title: "Signal", label: "Live now", accent: "#6528c4" }),
  "public/shots/northwind-1.svg": browser({ title: "Northwind", label: "Design studio", accent: "#0f766e" }),
  "public/portrait.svg": portrait({ accent: ACCENT }),
};

for (const [path, contents] of Object.entries(files)) {
  writeFileSync(resolve(root, path), contents, "utf8");
  console.log("wrote", path);
}
