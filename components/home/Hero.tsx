import Link from "next/link";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function Hero() {
  return (
    <section className="container-page flex min-h-[86svh] flex-col justify-center pt-32 pb-16 sm:min-h-[92svh] sm:pt-40">
      <div className="text-center">
        {profile.available && (
          <Reveal>
            <p className="eyebrow mb-8 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for new projects
            </p>
          </Reveal>
        )}

        <h1 className="font-display text-display font-semibold text-balance text-ink">
          <Reveal>
            <span className="block">{profile.headline[0]}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="block">{profile.headline[1]}</span>
          </Reveal>
        </h1>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            {profile.intro}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <Icon name="arrowUpRight" width={16} height={16} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-surface"
            >
              See the work
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
