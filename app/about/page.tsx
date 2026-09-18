import Image from "next/image";
import Link from "next/link";

import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/about/StatCounter";

export const metadata = pageMetadata({
  title: "About",
  description: `${profile.name} is a ${profile.title.toLowerCase()} based in ${profile.location}. Approach, and the work so far.`,
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  return (
    <>
      <section className="container-page pt-32 pb-16 sm:pt-44">
        <Reveal>
          <h1 className="font-display text-display font-semibold text-balance text-ink">
            About me<span className="text-accent">.</span>
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <Reveal as="figure">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] rounded-tl-[8rem] bg-surface">
              <Image
                src="/portrait.svg"
                alt={`${profile.name}, ${profile.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 352px"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-display text-title font-semibold text-balance text-ink">
              I&rsquo;m a {profile.title} working from {profile.location}.
            </p>

            <div className="mt-8 max-w-2xl space-y-6">
              {profile.bio.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <Icon name="arrowUpRight" width={16} height={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="ethos-heading"
        className="container-page mt-24 sm:mt-32"
      >
        <Reveal className="max-w-4xl border-l-2 border-accent pl-6 sm:pl-10">
          <h2
            id="ethos-heading"
            className="font-display text-2xl leading-snug font-semibold text-balance text-ink sm:text-4xl"
          >
            {profile.ethos.heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {profile.ethos.body}
          </p>
        </Reveal>
      </section>

      <section
        aria-labelledby="numbers-heading"
        className="container-page mt-32 sm:mt-40"
      >
        <SectionHeading id="numbers-heading" align="left">
          By the numbers
        </SectionHeading>

        <dl className="mt-14 grid grid-cols-2 gap-10 lg:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              {/* StatCounter renders its own <p> pair; wrapping in dt/dd would
                  duplicate the text for assistive tech, so the list semantics
                  live on the container only. */}
              <StatCounter value={stat.value} label={stat.label} />
            </Reveal>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="process-heading"
        className="container-page mt-32 sm:mt-40"
      >
        <SectionHeading id="process-heading" align="left">
          How I work
        </SectionHeading>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2">
          {profile.process.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.06}>
              <p className="eyebrow text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
