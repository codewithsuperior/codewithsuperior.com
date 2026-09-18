import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.title}`;

/**
 * The social card, rendered at build time.
 *
 * Uses system fonts rather than fetching a webfont: next/og needs the font as
 * a buffer, and a network fetch during the build is a failure waiting to
 * happen for a card almost nobody inspects closely.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fafaf9",
        padding: 80,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            background: "#e8442b",
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#55555a",
          }}
        >
          {profile.title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 104,
          fontWeight: 700,
          letterSpacing: -4,
          lineHeight: 1.05,
          color: "#0b0b0c",
        }}
      >
        {profile.name}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 30,
          lineHeight: 1.4,
          color: "#55555a",
          maxWidth: 900,
        }}
      >
        {profile.intro}
      </div>
    </div>,
    size,
  );
}
