"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * A short crossfade between routes.
 *
 * Deliberately CSS rather than a JS-driven opacity animation. A `motion.div`
 * with `initial={{ opacity: 0 }}` writes `opacity: 0` into the server HTML,
 * so if the bundle fails to load the page stays permanently invisible. A CSS
 * keyframe animates *from* transparent without ever committing the element to
 * being hidden, so the failure mode is a page that simply appears.
 *
 * Remounting on `pathname` replays the animation on each navigation. The
 * global `prefers-reduced-motion` rule in globals.css collapses it to nothing.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter">
      {children}
      <style>{`
        @keyframes page-enter {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: none; }
        }
        .page-enter {
          animation: page-enter 200ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  );
}
