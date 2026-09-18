"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { sendMessage, type ContactState } from "@/app/actions/send-message";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

const initial: ContactState = { status: "idle" };

function Field({
  name,
  label,
  type = "text",
  error,
  required = true,
  rows,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  autoComplete?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    required,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cn(
      "mt-3 w-full rounded-2xl border bg-surface px-5 py-4 text-base text-ink transition-colors",
      "placeholder:text-muted/60",
      error ? "border-accent" : "border-line focus:border-muted/50",
    ),
  };

  return (
    <div>
      <label htmlFor={id} className="eyebrow text-muted">
        {label}
        {!required && (
          <span className="ml-2 normal-case opacity-70">(optional)</span>
        )}
      </label>

      {rows ? (
        <textarea {...shared} rows={rows} />
      ) : (
        <input {...shared} type={type} />
      )}

      {error && (
        <p id={errorId} className="mt-2 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
    >
      {pending ? "Sending…" : "Send message"}
      {!pending && <Icon name="arrowUpRight" width={16} height={16} />}
    </button>
  );
}

export function ContactForm({ mailto }: { mailto: string }) {
  const [state, formAction] = useActionState(sendMessage, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }

    // Delivery is not configured, so hand the visitor off to their own mail
    // client with what they typed rather than losing the message.
    if (state.status === "unconfigured") {
      const form = formRef.current;
      if (!form) return;
      const data = new FormData(form);
      const body = [
        `From: ${data.get("firstName")} ${data.get("lastName")}`.trim(),
        `Email: ${data.get("email")}`,
        "",
        String(data.get("message") ?? ""),
      ].join("\n");

      // `mailto:` is an external protocol handler, not an app route, so the
      // router cannot express this. The lint rule only fires because it cannot
      // prove the destination is non-relative from the prop.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href =
        `${mailto}?subject=${encodeURIComponent(String(data.get("subject") ?? ""))}` +
        `&body=${encodeURIComponent(body)}`;
    }
  }, [state, mailto]);

  return (
    <form ref={formRef} action={formAction} className="mt-14" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="firstName"
          label="First name"
          autoComplete="given-name"
          error={state.errors?.firstName}
        />
        <Field
          name="lastName"
          label="Last name"
          required={false}
          autoComplete="family-name"
          error={state.errors?.lastName}
        />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={state.errors?.email}
        />
        <Field name="subject" label="Subject" error={state.errors?.subject} />
      </div>

      <div className="mt-6">
        <Field
          name="message"
          label="Message"
          rows={7}
          error={state.errors?.message}
        />
      </div>

      {/* Honeypot. Hidden from sight and from assistive tech, and skipped in
          the tab order — only an automated submitter will ever fill it in. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <SubmitButton />

        {/* Announced when it appears, so a screen-reader user learns the
            outcome without having to go looking for it. */}
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            state.status === "success" ? "text-ink" : "text-accent",
          )}
        >
          {state.status !== "idle" && state.message}
        </p>
      </div>
    </form>
  );
}
