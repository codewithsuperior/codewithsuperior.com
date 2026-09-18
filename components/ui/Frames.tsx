import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Shot } from "@/lib/types";
import { Icon } from "./Icon";

/**
 * Device chrome for project screenshots.
 *
 * Raw screenshots on a page read as flat rectangles. Wrapping them in a phone
 * or browser frame tells the viewer what kind of product they are looking at
 * before they read a word of the description.
 */

/** A single phone body. Aspect ratio matches a modern handset (9:19.5). */
export function PhoneMockup({
  shot,
  className,
  priority = false,
  sizes = "(max-width: 768px) 45vw, 260px",
}: {
  shot: Shot;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] border border-line bg-paper p-1.5 shadow-[0_18px_50px_-20px_rgb(0_0_0/0.35)]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-surface">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
      {/* Notch */}
      <div
        aria-hidden="true"
        className="absolute top-[7px] left-1/2 h-[14px] w-[68px] -translate-x-1/2 rounded-full bg-ink/85"
      />
    </div>
  );
}

/**
 * Up to three phones, staggered so the middle one sits proudest — the
 * arrangement the reference site uses for its mobile work, and the clearest
 * way to show three screens without three separate figures.
 */
export function PhoneCluster({
  shots,
  moreCount,
  priority = false,
}: {
  shots: Shot[];
  moreCount?: number;
  priority?: boolean;
}) {
  const visible = shots.slice(0, 3);
  if (visible.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {visible.map((shot, i) => (
          <div
            key={shot.src}
            className={cn(
              "w-[28%] max-w-[210px] shrink-0 transition-transform duration-500",
              // The centre phone lifts; the outer two sit back and scale down.
              visible.length === 3 && i === 1 && "z-10 w-[32%] -translate-y-4",
              visible.length === 3 && i !== 1 && "opacity-90",
              visible.length === 2 && i === 0 && "-translate-y-2",
            )}
          >
            <PhoneMockup shot={shot} priority={priority && i === 0} />
          </div>
        ))}
      </div>

      {moreCount && moreCount > 0 ? (
        <p className="eyebrow mt-5 flex items-center justify-center gap-2 text-muted">
          <Icon name="images" width={14} height={14} />
          {`+${moreCount} more screens`}
        </p>
      ) : null}
    </div>
  );
}

/** Browser chrome for web projects. */
export function BrowserFrame({
  shot,
  className,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 640px",
}: {
  shot: Shot;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_18px_50px_-24px_rgb(0_0_0/0.3)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-1.5 border-b border-line bg-surface px-4 py-3"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
      </div>
      <div className="relative aspect-[16/10] w-full bg-surface">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}
