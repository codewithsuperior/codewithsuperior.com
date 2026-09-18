import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const siteUrl = profile.siteUrl.replace(/\/$/, "");

export const absolute = (path = "/") => new URL(path, siteUrl).toString();

/**
 * Per-route metadata.
 *
 * Every page calls this rather than assembling its own object, so canonical
 * URLs, Open Graph and Twitter cards stay consistent and cannot be forgotten
 * on a new page.
 */
export function pageMetadata({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
}): Metadata {
  const url = absolute(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${profile.name} — ${profile.title}`,
      type:
        type === "article"
          ? "article"
          : type === "profile"
            ? "profile"
            : "website",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
