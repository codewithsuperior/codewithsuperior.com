"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The single scroll-in animation used across the site.
 *
 * Progressive enhancement, not a JS-driven opacity animation. The hidden
 * starting state is defined in CSS under `.js`, a class the inline head script
 * adds before paint — so the server HTML contains no `opacity: 0`, and if the
 * bundle fails to load or JavaScript is off, every element is simply visible.
 * A reveal animation is not worth a blank page.
 *
 * The observer toggles a class on the node directly rather than setting React
 * state. A long page mounts thirty or more of these, and revealing them through
 * state would mean a render per element on every scroll; the DOM write does the
 * same job for nothing. Because motion lives in CSS, `prefers-reduced-motion`
 * is handled once in globals.css and applies here automatically.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  /** Seconds, to match the rest of the motion vocabulary. */
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver: show the element and stop.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-delay": `${Math.round(delay * 1000)}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
