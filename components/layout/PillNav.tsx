"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/notes", label: "Notes" },
  { href: "/contact", label: "Contact" },
] as const;

/** `/notes/some-post` should still light up "Notes". */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/project");
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * The floating pill navigation.
 *
 * On desktop it sits at the top; below `sm` it moves to the bottom of the
 * viewport, within thumb reach. A portfolio for a mobile developer should not
 * put its own navigation in the hardest place on the screen to tap.
 */
export function PillNav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 flex justify-center px-4",
        "bottom-[max(1rem,env(safe-area-inset-bottom))] top-auto",
        "sm:bottom-auto sm:top-6",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "flex items-center gap-1 rounded-full border border-line p-1.5",
          "bg-paper/80 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.22)] backdrop-blur-xl",
        )}
      >
        {LINKS.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5",
                active ? "text-paper" : "text-muted hover:text-ink",
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 32 }
                  }
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          );
        })}

        <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
