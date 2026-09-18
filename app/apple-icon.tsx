import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * The iOS home-screen icon.
 *
 * Same mark as `icon.tsx`, drawn at the size iOS actually asks for — without
 * this it upscales the 32px favicon and the letter goes soft. iOS applies its
 * own rounded mask, so this stays a full-bleed square and keeps the letter well
 * inside the corners it will cut.
 */
export default function AppleIcon() {
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
        fontSize: 132,
        fontWeight: 700,
        fontFamily: "sans-serif",
        paddingTop: 8,
      }}
    >
      {profile.shortName.charAt(0)}
    </div>,
    size,
  );
}
