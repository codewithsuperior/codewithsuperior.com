import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * The favicon, rendered at build time from the design tokens.
 *
 * Generated rather than shipped as a binary so it cannot drift from the rest
 * of the identity: the accent here is the same `--color-accent` the site uses,
 * and the letter is the first of `profile.shortName`.
 *
 * A full-bleed accent ground with a paper-coloured letter, because at 16px a
 * tab favicon has to survive being shown against both light and dark browser
 * chrome, and an outlined or mostly-white mark disappears into one of them.
 * The token values are inlined because next/og resolves no CSS variables.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#e8442b",
        color: "#fafaf9",
        fontSize: 24,
        fontWeight: 700,
        fontFamily: "sans-serif",
        // Optical centring: the cap sits marginally high in the em box, so a
        // nudge down reads as centred where a mathematical centre does not.
        paddingTop: 2,
      }}
    >
      {profile.shortName.charAt(0)}
    </div>,
    size,
  );
}
