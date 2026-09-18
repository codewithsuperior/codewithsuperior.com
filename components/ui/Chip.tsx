import { cn } from "@/lib/utils";

/** Small pill used for tech tags, skills and categories. */
export function Chip({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "outline" | "accent" | "invert";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center rounded-full px-3 py-1.5 whitespace-nowrap",
        tone === "default" && "bg-surface text-muted",
        tone === "outline" && "border border-line text-muted",
        tone === "accent" && "bg-accent/10 text-accent",
        tone === "invert" && "bg-ink/5 text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
