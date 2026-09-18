import type { MetadataRoute } from "next";
import { absolute } from "@/lib/seo";

/**
 * AI crawlers are allowed explicitly.
 *
 * They are not covered by the wildcard in practice — several check for their
 * own user-agent — and for a personal portfolio being citable when someone
 * asks an assistant "who is X, and what do they build?" is worth as much as
 * ranking in a search engine. Remove any agent below to opt out of it.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "cohere-ai",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: absolute("/sitemap.xml"),
    host: absolute("/"),
  };
}
