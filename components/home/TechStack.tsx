import { stack } from "@/content/stack";
import { Reveal } from "@/components/ui/Reveal";
import { TechLogo } from "@/components/ui/TechLogo";

/**
 * The dark stack section — a full-bleed band of near-black with white logo
 * tiles, giving the long scroll a hard break.
 *
 * This is the one section that does NOT follow the theme, and the colours here
 * are literals rather than tokens on purpose. Built from `bg-ink`/`text-paper`
 * it inverts correctly in light mode but flips to a near-white band in dark
 * mode, at which point the white tiles disappear into their own background.
 * Tinting the tiles instead is not an option either: a good third of these
 * brand marks are near-black (Next.js, Vercel, GitHub, Express), so they need
 * a light tile in every theme. A band that is always dark satisfies both.
 */
const BAND = "#0b0b0c";
const TILE_LABEL = "#55555a";

export function TechStack() {
  return (
    <section
      aria-labelledby="stack-heading"
      className="mt-32 py-24 sm:mt-40 sm:py-32"
      style={{ backgroundColor: BAND }}
    >
      <div className="container-page">
        <Reveal>
          <h2
            id="stack-heading"
            className="font-display text-section font-semibold text-white"
          >
            Tech stack<span className="text-accent">.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
            What I reach for. Not everything I have touched — the tools I am
            actually productive in.
          </p>
        </Reveal>

        <div className="mt-20 space-y-16">
          {stack.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 0.05}>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {group.title}
              </h3>

              <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-6 lg:grid-cols-8">
                {group.items.map((item) => (
                  <li
                    key={`${group.title}-${item.name}`}
                    className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl bg-white p-3 text-center transition-transform duration-300 hover:-translate-y-1"
                  >
                    <TechLogo slug={item.logo} name={item.name} size={30} />
                    <span
                      className="text-[0.7rem] leading-tight font-medium"
                      style={{ color: TILE_LABEL }}
                    >
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
