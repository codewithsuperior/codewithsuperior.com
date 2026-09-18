import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70svh] flex-col justify-center pt-32 text-center">
      <p className="eyebrow text-accent">404</p>
      <h1 className="font-display text-section mt-6 font-semibold text-balance text-ink">
        This page doesn&rsquo;t exist
      </h1>
      <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted">
        The link may be out of date, or the page may have moved. The work is all
        still here.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper"
        >
          Back home
          <Icon name="arrowRight" width={16} height={16} />
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-surface"
        >
          See the projects
        </Link>
      </div>
    </section>
  );
}
