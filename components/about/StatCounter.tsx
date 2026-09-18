"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a stat up when it scrolls into view.
 *
 * Values in the content layer are strings like "5+", "40+" or "2", so the
 * numeric part is animated and any prefix or suffix is preserved. A value with
 * no digits at all is rendered as-is rather than being mangled into "0".
 *
 * The count is written straight to the DOM node rather than through React
 * state: this ticks every animation frame, and re-rendering the component sixty
 * times a second to change one text node would be pure waste.
 */
export function StatCounter({
  value,
  label,
  duration = 1100,
}: {
  value: string;
  label: string;
  duration?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const match = value.match(/^(\D*)(\d+)(.*)$/);
    const target = match ? Number(match[2]) : null;
    const node = numberRef.current;
    const el = wrapRef.current;
    if (target === null || !node || !el) return;

    const render = (n: number) => {
      node.textContent = `${match![1]}${n}${match![3]}`;
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      render(target);
      return;
    }

    render(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          render(Math.round((1 - Math.pow(1 - t, 3)) * target));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <div ref={wrapRef}>
      <p className="font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
        {/* Server-rendered as the final value, so it is correct with no
            JavaScript. The effect resets it to zero before animating. */}
        <span ref={numberRef} aria-hidden="true">
          {value}
        </span>
        {/* The full value stays in the accessible tree, so a screen reader
            announces "5+" once rather than every intermediate number. */}
        <span className="sr-only">{value}</span>
      </p>
      <p className="eyebrow mt-3 text-muted">{label}</p>
    </div>
  );
}
