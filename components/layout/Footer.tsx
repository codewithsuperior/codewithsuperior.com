import Link from "next/link";
import { profile } from "@/content/profile";
import { Icon } from "@/components/ui/Icon";
import { waNumber } from "@/lib/utils";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-semibold tracking-tight text-ink">
            {profile.shortName}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {profile.title} building mobile games and web products — from the
            first idea to something that actually ships.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-ink">Quick links</h2>
          <ul className="mt-4 space-y-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-ink">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-muted transition-colors hover:text-ink"
              >
                <Icon name="mail" width={16} height={16} />
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-3 text-muted transition-colors hover:text-ink"
              >
                <Icon name="phone" width={16} height={16} />
                {profile.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${waNumber(profile.phone)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted transition-colors hover:text-ink"
              >
                <Icon name="whatsapp" width={16} height={16} />
                Message on WhatsApp
              </a>
            </li>
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-surface text-muted transition-colors hover:text-ink"
                >
                  <Icon name={s.icon} width={17} height={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page border-t border-line py-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
