import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

import { profile } from "@/content/profile";
import { siteGraph } from "@/lib/jsonld";
import { siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { PillNav } from "@/components/layout/PillNav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import {
  BootPreloader,
  bootDecisionScript,
} from "@/components/layout/BootPreloader";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.intro,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "profile",
    locale: "en",
    url: siteUrl,
    siteName: `${profile.name} — ${profile.title}`,
    title: `${profile.name} — ${profile.title}`,
    description: profile.intro,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable}`}
    >
      <head>
        {/* Decides whether this visit shows the boot sequence, before paint.
            See the note in BootPreloader.tsx. */}
        <script dangerouslySetInnerHTML={{ __html: bootDecisionScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-paper"
          >
            Skip to content
          </a>

          <PillNav />

          {/* Bottom padding on small screens clears the bottom-anchored nav. */}
          <main id="main" className="pb-28 sm:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>

          <Footer />

          <BootPreloader wordmark={profile.shortName} />
        </ThemeProvider>

        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
