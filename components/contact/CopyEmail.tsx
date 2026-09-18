"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
        } catch {
          // Clipboard blocked (insecure context, or permission denied) — the
          // mailto link beside this button still works.
        }
      }}
      className="inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
    >
      <Icon name="mail" width={17} height={17} />
      {email}
      <Icon
        name={copied ? "check" : "copy"}
        width={15}
        height={15}
        className={copied ? "text-accent" : "text-muted"}
      />
      <span className="sr-only" role="status">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}
