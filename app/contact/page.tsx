import type { Metadata } from "next"
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"

import { ContactForm } from "@/components/ContactForm"
import { CopyEmail } from "@/components/CopyEmail"
import { GlowCard } from "@/components/GlowCard"
import { Reveal } from "@/components/Reveal"
import { BrandIcon } from "@/components/icons"
import { contactTopics, profile, socials } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Maksudul Hasan Limon for full-stack engineering roles, research collaborations, and product builds. Direct email and a server-validated contact form.",
  alternates: {
    canonical: "/contact",
  },
}

const emailCards = [
  {
    label: "Primary",
    email: profile.emails.primary,
    note: "Best for roles, collaborations, and time-sensitive messages.",
  },
  {
    label: "Academic",
    email: profile.emails.academic,
    note: "University correspondence and research-related threads.",
  },
]

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pt-12 pb-4 sm:px-8 sm:pt-16">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/28 uppercase"
      >
        <Link href="/" className="transition-colors hover:text-white/60">
          Home
        </Link>
        <span className="text-white/15">/</span>
        <span className="text-white/45">Contact</span>
      </nav>

      <header className="mt-6 max-w-2xl">
        <span className="text-mono-label flex items-center gap-2 text-white/35">
          <span className="inline-block size-1 rounded-full bg-emerald-400" />
          Open for conversations
        </span>
        <h1 className="balance mt-4 text-[clamp(2.2rem,5.2vw,3.6rem)] leading-[1.02] font-medium tracking-[-0.045em] text-white">
          Tell me what you&apos;re building.
        </h1>
        <p className="pretty mt-4 text-[14.5px] leading-7 text-white/45">
          Roles, research collaborations, or a specific system that needs a
          careful pair of hands. Include enough context for a real reply — I read
          every serious message.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <Reveal>
          <GlowCard className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-[15px] font-medium text-white/85">
                  Send a message
                </h2>
                <p className="mt-1 text-[11px] text-white/30">
                  Server-validated. Usually answered within 1–2 business days.
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 font-mono text-[8px] tracking-wider text-white/28 uppercase">
                <ShieldCheck className="size-3" aria-hidden="true" />
                Private
              </span>
            </div>

            <div className="mt-5">
              <ContactForm />
            </div>
          </GlowCard>
        </Reveal>

        <div className="flex flex-col gap-3.5">
          <Reveal delay={0.05}>
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-white/28 uppercase">
                <Mail className="size-3" aria-hidden="true" />
                Direct lines
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {emailCards.map((card) => (
                  <div
                    key={card.email}
                    className="rounded-xl border border-white/8 bg-white/[0.018] p-3.5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[8px] tracking-[0.14em] text-white/25 uppercase">
                        {card.label}
                      </span>
                      <CopyEmail email={card.email} />
                    </div>
                    <a
                      href={`mailto:${card.email}`}
                      className="mt-1.5 block truncate text-[12px] font-medium text-[#c9c3ff] transition-colors hover:text-white"
                    >
                      {card.email}
                    </a>
                    <p className="mt-1 text-[9.5px] leading-4 text-white/26">
                      {card.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl border border-white/8 bg-white/[0.018] p-4">
              <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-white/28 uppercase">
                <MessageSquare className="size-3" aria-hidden="true" />
                Good fit
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {contactTopics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-white/8 bg-white/[0.025] px-2.5 py-1 text-[10px] text-white/42"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/8 bg-white/[0.018] p-3.5">
                <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-wider text-white/25 uppercase">
                  <Clock className="size-3" aria-hidden="true" />
                  Response
                </div>
                <div className="mt-1.5 text-[11px] text-white/55">
                  1–2 business days
                </div>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.018] p-3.5">
                <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-wider text-white/25 uppercase">
                  <MapPin className="size-3" aria-hidden="true" />
                  Location
                </div>
                <div className="mt-1.5 text-[11px] text-white/55">
                  {profile.location}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-xl border border-white/8 bg-white/[0.018] p-4">
              <div className="font-mono text-[9px] tracking-[0.16em] text-white/28 uppercase">
                Elsewhere
              </div>
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-2 rounded-lg border border-white/7 bg-black/15 px-2.5 py-2 transition-colors hover:border-white/18 hover:bg-white/[0.03]"
                  >
                    <span className="flex items-center gap-2 text-[10px] text-white/45 transition-colors group-hover:text-white/75">
                      <BrandIcon name={social.icon} className="size-3.5" />
                      {social.label}
                    </span>
                    <ArrowUpRight
                      className="size-3 text-white/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/50"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-white/8 bg-white/[0.018] px-5 py-4">
        <p className="text-[10.5px] leading-5 text-white/28">
          A note on the form: messages are validated on the server, rate-limited
          per network, and delivered through a transactional email provider when
          configured. If the form is unavailable, the direct email addresses
          above are always the fallback.
        </p>
      </div>
    </div>
  )
}
