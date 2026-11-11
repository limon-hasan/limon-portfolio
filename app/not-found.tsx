import type { Metadata } from "next"
import { ArrowLeft, ArrowRight, Compass } from "lucide-react"
import Link from "next/link"

import { ActionLink } from "@/components/ui/action-link"

export const metadata: Metadata = {
  title: "404 — Page not found",
  description:
    "This route does not exist. Return to the portfolio, browse the projects, or open the research dossier.",
}

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] w-full max-w-6xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <div className="relative">
        <div className="pointer-events-none absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(91,77,245,0.22),transparent_70%)] blur-2xl" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
          Error · 404
        </span>
        <div className="mt-4 font-mono text-[clamp(5rem,18vw,10rem)] leading-none font-semibold tracking-[-0.08em] text-white/[0.08]">
          404
        </div>
      </div>

      <div className="mt-2 flex size-10 items-center justify-center rounded-xl border border-[#8b7cff]/25 bg-[#5b4df5]/10 text-[#b7adff]">
        <Compass className="size-5" aria-hidden="true" />
      </div>

      <h1 className="balance mt-5 text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">
        This route fell out of the graph.
      </h1>
      <p className="pretty mt-2 max-w-md text-[13px] leading-6 text-white/38">
        The page may have moved, or the URL is slightly off. The catalog and the
        research dossier are the best places to pick the thread back up.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
        <ActionLink
          href="/"
          variant="primary"
          size="md"
          icon={<ArrowLeft className="size-3.5" aria-hidden="true" />}
        >
          Back home
        </ActionLink>
        <ActionLink href="/projects" variant="secondary" size="md">
          Browse projects
        </ActionLink>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-wider text-white/25 uppercase">
        {[
          { href: "/research", label: "Research" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex items-center gap-1 transition-colors hover:text-white/60"
          >
            {item.label}
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  )
}
