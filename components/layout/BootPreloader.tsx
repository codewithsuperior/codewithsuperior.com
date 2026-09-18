"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

/**
 * The boot sequence overlay — `Portfolio.exe`, a progress bar, `INITIALIZING`.
 *
 * Deliberately built to avoid the failure mode this pattern usually has. On the
 * site this was modelled on, the preloader is a wrapper that renders nothing
 * until a flag flips, and it sat at "100% — INITIALIZING" for six seconds on a
 * cold load. So here:
 *
 *   - It is an OVERLAY. The page renders underneath from the first byte, so a
 *     crawler, a failed bundle or disabled JavaScript all still get the site.
 *   - It is capped at `DURATION`, and dismisses early once the document and its
 *     fonts are actually ready. The bar tracks real readiness rather than
 *     counting to 100 and then waiting.
 *   - It runs once per session, and never under `prefers-reduced-motion`. Both
 *     decisions are taken by the inline script in `app/layout.tsx` BEFORE
 *     paint, so a returning visitor never sees a flash of it.
 *
 * Whether to show it lives in a `data-boot` attribute on <html>, read through
 * `useSyncExternalStore`. That is the sanctioned way to render from an external
 * source that only exists on the client: the server snapshot is `false`, so
 * hydration matches, and React re-renders once with the real value. Progress
 * then updates the DOM directly, because ticking React state every animation
 * frame to move a bar would be needless work during the one moment the page is
 * trying to become interactive.
 */

const DURATION = 1200; // hard ceiling, ms
const FADE = 320;

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-boot"],
  });
  return () => observer.disconnect();
};

const getSnapshot = () =>
  document.documentElement.getAttribute("data-boot") === "1";

const getServerSnapshot = () => false;

export function BootPreloader({ wordmark }: { wordmark: string }) {
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  const paint = useCallback((pct: number) => {
    if (barRef.current) barRef.current.style.width = `${pct}%`;
    if (labelRef.current)
      labelRef.current.textContent = `${pct}% — Initializing`;
  }, []);

  useEffect(() => {
    if (!active) return;

    try {
      sessionStorage.setItem("boot-shown", "1");
    } catch {
      // Private mode or blocked storage: the cap below still ends the sequence.
    }

    const start = performance.now();
    let ready = false;
    let frame = 0;
    let timer = 0;

    // Real readiness signals, not a timer pretending to be one.
    const markReady = () => {
      ready = true;
    };
    if (document.readyState === "complete") markReady();
    else window.addEventListener("load", markReady, { once: true });
    document.fonts?.ready.then(markReady).catch(markReady);

    const finish = () => {
      const overlay = overlayRef.current;
      if (overlay) overlay.style.opacity = "0";
      timer = window.setTimeout(() => {
        document.documentElement.removeAttribute("data-boot");
      }, FADE);
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      // Ease towards 100%, but never claim to be finished before we are.
      const byTime = Math.min(1, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - byTime, 3);
      paint(Math.round((ready ? 1 : Math.min(eased, 0.92)) * 100));

      if ((ready && elapsed > 320) || elapsed >= DURATION) {
        paint(100);
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("load", markReady);
    };
  }, [active, paint]);

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-100 grid place-items-center bg-paper transition-opacity duration-300 ease-out"
    >
      <div className="w-[min(78vw,22rem)] text-center">
        <p className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {wordmark}
          <span className="text-muted">.exe</span>
        </p>

        <div className="mt-6 h-px w-full overflow-hidden bg-line">
          <div
            ref={barRef}
            className="h-full w-0 bg-ink"
            style={{ transition: "width 120ms linear" }}
          />
        </div>

        <p ref={labelRef} className="eyebrow mt-4 text-muted">
          0% — Initializing
        </p>
      </div>
    </div>
  );
}

/**
 * Runs before paint, and does two things.
 *
 * 1. Marks the document as JavaScript-capable. Every hidden-until-revealed
 *    starting state in globals.css is scoped to `.js`, so when this script does
 *    not run the content renders plainly visible instead of transparent.
 * 2. Decides whether this visit gets a boot sequence at all, so the overlay is
 *    never rendered — and never flashes — for a returning visitor or someone
 *    who has asked for reduced motion.
 */
export const bootDecisionScript = `
(function(){try{
  var root = document.documentElement;
  root.classList.add('js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var seen = false;
  try { seen = sessionStorage.getItem('boot-shown') === '1'; } catch (e) {}
  if (!reduced && !seen) root.setAttribute('data-boot','1');
}catch(e){}})();
`;
