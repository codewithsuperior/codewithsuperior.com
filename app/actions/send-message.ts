"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { profile } from "@/content/profile";

/**
 * Contact form submission.
 *
 * Deliberately a server action rather than a client-side email service. The
 * reference site posts to EmailJS from the browser, which means its public key
 * ships in the bundle and validation is advisory — anyone can post whatever
 * they like straight to the endpoint. Here the key never leaves the server,
 * and validation and rate limiting run somewhere the sender cannot edit.
 *
 * With no RESEND_API_KEY configured the action reports `unconfigured`, and the
 * form falls back to opening the visitor's mail client. The form is therefore
 * never a dead end, even before deployment.
 */

const schema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(80),
  lastName: z.string().trim().max(80).optional().default(""),
  email: z.string().trim().email("Enter a valid email address").max(200),
  subject: z.string().trim().min(2, "Add a subject").max(150),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a little more — at least 20 characters")
    .max(5000),
  // Honeypot: a real person never sees this field, so anything in it is a bot.
  company: z.string().max(0).optional().default(""),
});

export type ContactState = {
  status: "idle" | "success" | "error" | "unconfigured";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

/**
 * Per-IP rate limit, held in module memory.
 *
 * This resets on redeploy and is per-instance, so it is a speed bump rather
 * than a guarantee — enough to stop a script hammering the form. Move to a
 * shared store (Upstash, Vercel KV) if this ever needs to hold across
 * instances.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup, so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof z.infer<typeof schema>;
      errors[field] ??= issue.message;
    }
    // The honeypot is invisible, so its failure is never a real user's fault.
    if (errors.company) {
      return {
        status: "success",
        message: "Thanks — your message is on its way.",
      };
    }
    return {
      status: "error",
      message: "Please check the fields below.",
      errors,
    };
  }

  const data = parsed.data;

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "That is a lot of messages at once. Try again in a minute.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "unconfigured",
      message:
        "Email delivery is not configured yet. Opening your mail app instead.",
    };
  }

  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Must be a domain you have verified with Resend.
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? profile.email,
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      text: `From: ${name} <${data.email}>\n\n${data.message}`,
    });

    if (error) {
      console.error("Resend rejected the message:", error);
      return {
        status: "error",
        message:
          "Something went wrong sending that. Try WhatsApp or email instead.",
      };
    }

    return {
      status: "success",
      message: "Thanks — your message is on its way. I will reply soon.",
    };
  } catch (err) {
    console.error("Contact form failed:", err);
    return {
      status: "error",
      message:
        "Something went wrong sending that. Try WhatsApp or email instead.",
    };
  }
}
