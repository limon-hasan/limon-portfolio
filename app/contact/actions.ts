"use server"

import { headers } from "next/headers"
import { z } from "zod"

import { profile } from "@/lib/site"
import type { ContactField, ContactFormState } from "@/types/portfolio"

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 3

type RateLimitEntry = {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z.email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(4, "Add a short subject.")
    .max(120, "Subject must be 120 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(20, "A little more context would help — at least 20 characters.")
    .max(4000, "Message must be 4,000 characters or fewer."),
  company: z.string().max(0).optional(),
})

const fieldOrder: ContactField[] = ["name", "email", "subject", "message"]

function getClientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for")
  const realIp = headerList.get("x-real-ip")
  const ip = forwarded?.split(",")[0]?.trim() || realIp || "unknown"
  return ip
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count += 1
  return true
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

async function deliverEmail(input: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<{ ok: true } | { ok: false; reason: "not-configured" | "provider" }> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, reason: "not-configured" }
    }

    console.info("[contact] RESEND_API_KEY not set; message logged locally.", {
      name: input.name,
      email: input.email,
      subject: input.subject,
    })
    return { ok: true }
  }

  const to = process.env.CONTACT_TO_EMAIL ?? profile.emails.primary
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Portfolio <onboarding@resend.dev>"

  const text = [
    `New portfolio message`,
    ``,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    ``,
    input.message,
  ].join("\n")

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 16px">New portfolio message</h2>
      <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p style="margin:0 0 16px"><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
      <pre style="white-space:pre-wrap;font-family:inherit;background:#f4f4f5;padding:16px;border-radius:8px">${escapeHtml(input.message)}</pre>
    </div>
  `.trim()

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `[Portfolio] ${input.subject}`,
        text,
        html,
      }),
    })

    if (!response.ok) {
      console.error("[contact] Resend delivery failed", response.status)
      return { ok: false, reason: "provider" }
    }

    return { ok: true }
  } catch (error) {
    console.error("[contact] Resend request threw", error)
    return { ok: false, reason: "provider" }
  }
}

export async function submitContact(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company"),
  }

  const parsed = contactSchema.safeParse({
    name: typeof raw.name === "string" ? raw.name : "",
    email: typeof raw.email === "string" ? raw.email : "",
    subject: typeof raw.subject === "string" ? raw.subject : "",
    message: typeof raw.message === "string" ? raw.message : "",
    company: typeof raw.company === "string" ? raw.company : "",
  })

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors
    const fieldErrors: Partial<Record<ContactField, string[]>> = {}

    for (const field of fieldOrder) {
      const messages = flattened[field]
      if (messages && messages.length > 0) {
        fieldErrors[field] = messages
      }
    }

    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    }
  }

  // Honeypot: real users never fill this hidden field.
  if (parsed.data.company) {
    return {
      status: "success",
      message: "Thanks — your message is in.",
    }
  }

  const headerList = await headers()
  const clientKey = getClientKey(headerList)

  if (!checkRateLimit(clientKey)) {
    return {
      status: "error",
      message:
        "Too many messages from this network. Please wait a few minutes or email me directly.",
    }
  }

  const delivery = await deliverEmail({
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
  })

  if (!delivery.ok) {
    return {
      status: "error",
      message:
        delivery.reason === "not-configured"
          ? `Contact delivery is not configured yet. Please email ${profile.emails.primary} directly.`
          : `The message could not be delivered. Please email ${profile.emails.primary} directly.`,
    }
  }

  return {
    status: "success",
    message:
      "Thanks — your message is in. I usually reply within one to two business days.",
  }
}
