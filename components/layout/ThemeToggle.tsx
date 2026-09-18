"use client";

import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * Light/dark toggle.
 *
 * Both icons are rendered and CSS picks which one shows, rather than the usual
 * `mounted` state flag. The server cannot know the visitor's theme, so choosing
 * the icon in JavaScript means either a hydration mismatch or an effect that
 * sets state on mount purely to re-render. Letting the existing `.dark` class
 * do it costs nothing, shows the right icon before hydration, and needs no
 * state at all.
 *
 * `resolvedTheme` is only read inside the click handler, which runs after
 * mount, so it is never part of the server/client render comparison.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Switch colour theme"
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink",
        className,
      )}
    >
      <Icon name="moon" width={17} height={17} className="dark:hidden" />
      <Icon name="sun" width={17} height={17} className="hidden dark:block" />
    </button>
  );
}
