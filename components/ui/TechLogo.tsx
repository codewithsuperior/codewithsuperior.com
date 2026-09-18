import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

/**
 * A brand logo tile, resolved from a simple-icons slug at build time.
 *
 * This is a server component, so the whole simple-icons module stays out of
 * the client bundle — only the single resolved path string is serialised into
 * the HTML. An unknown slug degrades to a lettered tile rather than throwing,
 * so a typo in `content/stack.ts` never takes the page down.
 */

const toKey = (slug: string) =>
  "si" + slug.charAt(0).toUpperCase() + slug.slice(1);

function resolve(slug: string): SimpleIcon | undefined {
  return (simpleIcons as unknown as Record<string, SimpleIcon>)[toKey(slug)];
}

export function TechLogo({
  slug,
  name,
  size = 34,
}: {
  slug: string;
  name: string;
  size?: number;
}) {
  const icon = resolve(slug);

  if (!icon) {
    // Literal colours, not theme tokens: this sits on the always-white tile in
    // the dark stack band, so a token that inverts would make it invisible.
    return (
      <span
        aria-hidden="true"
        className="font-display grid place-items-center rounded-lg font-semibold"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.45,
          backgroundColor: "#e8e7e4",
          color: "#55555a",
        }}
      >
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ color: `#${icon.hex}` }}
    >
      <path fill="currentColor" d={icon.path} />
    </svg>
  );
}
