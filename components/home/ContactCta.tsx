import Link from "next/link";
import { profile } from "@/content/profile";
import { waNumber } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function ContactCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="container-page mt-32 sm:mt-40"
    >
      <Reveal className="rounded-3xl border border-line bg-surface/60 px-6 py-16 text-center sm:px-12 sm:py-24">
        {profile.available && (
          <p className="eyebrow inline-flex items-center gap-2.5 text-muted">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Available for new projects
          </p>
        )}

        <h2
          id="cta-heading"
          className="font-display text-title mt-6 font-semibold text-balance text-ink"
        >
          Let&rsquo;s build something together
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">
          I take freelance contracts, full-time roles and the occasional
          interesting collaboration. If you have something in mind, I would like
          to hear about it.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            Get in touch
            <Icon name="arrowUpRight" width={16} height={16} />
          </Link>
          <a
            href={`https://wa.me/${waNumber(profile.phone)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-surface"
          >
            <Icon name="whatsapp" width={16} height={16} />
            Chat on WhatsApp
          </a>
        </div>

        <p className="mt-8 text-sm text-muted">
          Or call{" "}
          <a
            href={`tel:${profile.phone}`}
            className="text-ink underline decoration-accent decoration-2 underline-offset-4"
          >
            {profile.phoneDisplay}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
