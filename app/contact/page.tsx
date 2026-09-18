import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { waNumber } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${profile.name} — ${profile.title}. Available for freelance contracts, full-time roles and collaborations.`,
  path: "/contact",
});

function QuickCard({
  eyebrow,
  title,
  detail,
  href,
  icon,
  external,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  href: string;
  icon: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative flex flex-col rounded-3xl border border-line p-7 transition-colors hover:border-muted/40"
    >
      <span className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink">
          <Icon name={icon} width={19} height={19} />
        </span>
        <Icon
          name="arrowUpRight"
          width={17}
          height={17}
          className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>

      <span className="eyebrow mt-8 text-muted">{eyebrow}</span>
      <span className="font-display mt-2 text-xl font-semibold tracking-tight text-ink">
        {title}
      </span>
      <span className="mt-1 text-base text-muted">{detail}</span>
    </a>
  );
}

export default function ContactPage() {
  return (
    <section className="container-page pt-32 pb-16 sm:pt-44">
      <SectionHeading
        as="h1"
        align="left"
        sub="Have a project to discuss, a role to fill, or just want to say hello? Fill in the form and I will get back to you. WhatsApp is fastest."
      >
        Get in touch
      </SectionHeading>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <Reveal>
          <QuickCard
            eyebrow="Fastest reply"
            title="WhatsApp"
            detail={profile.phoneDisplay}
            href={`https://wa.me/${waNumber(profile.phone)}`}
            icon="whatsapp"
            external
          />
        </Reveal>
        <Reveal delay={0.06}>
          <QuickCard
            eyebrow="Prefer to talk"
            title="Call me"
            detail={profile.phoneDisplay}
            href={`tel:${profile.phone}`}
            icon="phone"
          />
        </Reveal>
      </div>

      <div className="mt-4 max-w-3xl">
        <ContactForm mailto={`mailto:${profile.email}`} />
      </div>

      <Reveal className="mt-24 border-t border-line pt-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Prefer social?
        </h2>

        <ul className="mt-8 flex flex-wrap gap-3">
          {profile.socials.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
              >
                <Icon name={s.icon} width={17} height={17} />
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <CopyEmail email={profile.email} />
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
