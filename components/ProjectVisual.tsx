import type { CSSProperties, ReactNode } from "react"
import {
  Check,
  CircleDot,
  GitBranch,
  Globe2,
  Search,
  Sparkles,
} from "lucide-react"

import type { Project } from "@/types/portfolio"

interface ProjectVisualProps {
  project: Project
  className?: string
}

const shellStyle = (accent: string) =>
  ({ "--project-accent": accent }) as CSSProperties

function BrowserFrame({
  children,
  address,
  accent,
}: {
  children: ReactNode
  address: string
  accent: string
}) {
  return (
    <div
      className="dark-fixed relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0d]"
      style={shellStyle(accent)}
    >
      <div
        className="pointer-events-none absolute -top-20 -right-16 size-48 rounded-full opacity-20 blur-3xl"
        style={{ background: accent }}
      />
      <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-white/18" />
          <span className="size-1.5 rounded-full bg-white/12" />
          <span className="size-1.5 rounded-full bg-white/8" />
        </div>
        <div className="ml-1 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-white/6 bg-white/[0.025] px-2 py-1">
          <Globe2 className="size-2.5 shrink-0 text-white/25" aria-hidden="true" />
          <span className="truncate font-mono text-[8px] text-white/30">
            {address}
          </span>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 p-3">{children}</div>
    </div>
  )
}

function StudioSpaceVisual() {
  const dates = ["12", "13", "14", "15", "16"]
  return (
    <BrowserFrame address="studiospace.app/studios" accent="#8b7cff">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[8px] tracking-[0.14em] text-white/30 uppercase">
            Find a space
          </div>
          <div className="mt-0.5 text-[11px] font-medium text-white/85">
            Dhaka · Available today
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-md border border-white/8 bg-white/[0.03] px-1.5 py-1">
          <Search className="size-2.5 text-white/30" aria-hidden="true" />
          <span className="font-mono text-[8px] text-white/35">Search</span>
        </div>
      </div>

      <div className="mt-2.5 flex gap-1">
        {dates.map((date, index) => (
          <div
            key={date}
            className={
              index === 2
                ? "flex flex-1 flex-col items-center rounded-md border border-[#8b7cff]/40 bg-[#5b4df5]/18 py-1 text-[#d9d6ff]"
                : "flex flex-1 flex-col items-center rounded-md border border-white/6 bg-white/[0.02] py-1 text-white/35"
            }
          >
            <span className="font-mono text-[7px]">
              {["MON", "TUE", "WED", "THU", "FRI"][index]}
            </span>
            <span className="text-[9px] font-medium">{date}</span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {[
          { name: "The Light Room", price: "৳ 1,800 / hr", tone: "from-[#5b4df5]/40" },
          { name: "North Loft", price: "৳ 2,400 / hr", tone: "from-[#22d3ee]/30" },
        ].map((studio) => (
          <div
            key={studio.name}
            className="overflow-hidden rounded-lg border border-white/8 bg-white/[0.02]"
          >
            <div
              className={`h-9 bg-gradient-to-br ${studio.tone} to-white/[0.02]`}
            >
              <div className="flex h-full items-end justify-end p-1">
                <span className="rounded bg-black/35 px-1 py-0.5 font-mono text-[6px] text-white/70">
                  VERIFIED
                </span>
              </div>
            </div>
            <div className="p-1.5">
              <div className="truncate text-[8px] font-medium text-white/75">
                {studio.name}
              </div>
              <div className="mt-0.5 flex items-center justify-between">
                <span className="font-mono text-[7px] text-white/32">
                  {studio.price}
                </span>
                <span className="rounded bg-[#5b4df5]/25 px-1 py-0.5 text-[6px] text-[#c9c3ff]">
                  Book
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute right-3 bottom-2 flex items-center gap-1 rounded-md border border-emerald-400/25 bg-emerald-400/10 px-1.5 py-1">
        <Check className="size-2.5 text-emerald-300" aria-hidden="true" />
        <span className="text-[7px] text-emerald-200">JWT verified</span>
      </div>
    </BrowserFrame>
  )
}

function WanderlustVisual() {
  return (
    <BrowserFrame address="wanderlust.app/explore" accent="#4fd1c5">
      <div className="flex items-center gap-1.5 rounded-md border border-white/8 bg-white/[0.03] px-2 py-1">
        <Search className="size-2.5 text-white/30" aria-hidden="true" />
        <span className="font-mono text-[8px] text-white/30">
          Where to next?
        </span>
        <span className="ml-auto rounded bg-[#4fd1c5]/18 px-1.5 py-0.5 text-[7px] text-[#a7f3ea]">
          Explore
        </span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        <div className="col-span-2 overflow-hidden rounded-lg border border-white/8">
          <div className="relative h-[74px] bg-[linear-gradient(150deg,#12343a,#1d5b55_45%,#0b1d22)]">
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
              <div className="text-[9px] font-medium text-white/90">
                Cox&apos;s Bazar
              </div>
              <div className="mt-0.5 flex items-center gap-1 font-mono text-[7px] text-white/45">
                <CircleDot className="size-2" aria-hidden="true" />
                Beach · 4.8
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-[35px] rounded-lg border border-white/8 bg-[linear-gradient(135deg,#2b2537,#16131f)] p-1.5">
            <div className="text-[7px] text-white/60">Sajek</div>
            <div className="font-mono text-[6px] text-white/28">Hill · 4.7</div>
          </div>
          <div className="h-[35px] rounded-lg border border-white/8 bg-[linear-gradient(135deg,#1a2f2c,#101c1a)] p-1.5">
            <div className="text-[7px] text-white/60">Sylhet</div>
            <div className="font-mono text-[6px] text-white/28">Tea · 4.6</div>
          </div>
        </div>
      </div>
      <div className="mt-1.5 flex items-center justify-between rounded-md border border-white/6 bg-white/[0.02] px-2 py-1">
        <span className="font-mono text-[7px] text-white/30">
          3 nights · 2 guests
        </span>
        <span className="text-[7px] text-[#a7f3ea]">Reserve →</span>
      </div>
    </BrowserFrame>
  )
}

function BazarDorVisual() {
  const rows = [
    { name: "Rice (Miniket)", price: "৳ 72/kg", delta: "+2.4%", up: true },
    { name: "Potato", price: "৳ 34/kg", delta: "-1.1%", up: false },
    { name: "Onion", price: "৳ 58/kg", delta: "+4.8%", up: true },
  ]
  return (
    <BrowserFrame address="bazar-dor.app/market" accent="#f6c177">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[8px] tracking-[0.14em] text-white/30 uppercase">
            Market pulse
          </div>
          <div className="mt-0.5 text-[11px] font-medium text-white/85">
            Dhaka retail index
          </div>
        </div>
        <span className="rounded-md border border-[#f6c177]/25 bg-[#f6c177]/10 px-1.5 py-0.5 font-mono text-[7px] text-[#f6c177]">
          LIVE
        </span>
      </div>

      <div className="mt-2 rounded-lg border border-white/6 bg-white/[0.02] p-2">
        <svg viewBox="0 0 160 38" className="h-9 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="bazar-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f6c177" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f6c177" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 30 L18 26 L36 28 L54 19 L72 22 L90 13 L108 16 L126 9 L144 12 L160 5 L160 38 L0 38 Z"
            fill="url(#bazar-fill)"
          />
          <polyline
            points="0,30 18,26 36,28 54,19 72,22 90,13 108,16 126,9 144,12 160,5"
            fill="none"
            stroke="#f6c177"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mt-1.5 space-y-1">
        {rows.map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.018] px-2 py-1"
          >
            <span className="text-[8px] text-white/60">{row.name}</span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono text-[8px] text-white/55">
                {row.price}
              </span>
              <span
                className={
                  row.up
                    ? "font-mono text-[7px] text-[#f6c177]"
                    : "font-mono text-[7px] text-emerald-300"
                }
              >
                {row.delta}
              </span>
            </span>
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

function BanglaNewsVisual() {
  return (
    <BrowserFrame address="banglanews24.app" accent="#f97362">
      <div className="flex items-end justify-between border-b border-white/8 pb-1.5">
        <div className="text-[13px] leading-none font-semibold text-white/90">
          বাংলা নিউজ ২৪
        </div>
        <div className="font-mono text-[6px] tracking-wider text-white/28 uppercase">
          Dhaka · Live
        </div>
      </div>
      <div className="mt-1.5 flex gap-2 overflow-hidden font-mono text-[6px] tracking-wider text-white/35 uppercase">
        {["Bangladesh", "World", "Tech", "Sports", "Opinion"].map((item) => (
          <span key={item} className="whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        <div className="col-span-2 overflow-hidden rounded-md border border-white/8">
          <div className="h-10 bg-[linear-gradient(135deg,#3c1717,#1b0d0d)]" />
          <div className="p-1.5">
            <div className="text-[8px] leading-[1.4] font-medium text-white/80">
              ঢাকায় নতুন মেট্রো রেল স্টেশন উদ্বোধন
            </div>
            <div className="mt-1 font-mono text-[6px] text-white/28">
              5 min read · 2 hours ago
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {["বিশ্ব বাজার", "প্রযুক্তি"].map((label) => (
            <div
              key={label}
              className="flex-1 rounded-md border border-white/7 bg-white/[0.02] p-1.5"
            >
              <div className="text-[7px] leading-tight text-white/65">
                {label}ে নতুন পরিবর্তন
              </div>
              <div className="mt-1 h-0.5 w-6 rounded bg-[#f97362]/50" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1.5 grid grid-cols-3 gap-1.5">
        {["খেলা", "বিনোদন", "শিক্ষা"].map((label) => (
          <div
            key={label}
            className="rounded border border-white/6 bg-white/[0.018] px-1.5 py-1"
          >
            <div className="text-[7px] text-white/55">{label}</div>
            <div className="mt-0.5 h-0.5 w-full rounded bg-white/6" />
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

function FitLogVisual() {
  return (
    <BrowserFrame address="fitlog.app/today" accent="#a3e635">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[7px] tracking-[0.16em] text-white/30 uppercase">
            Today · Push
          </div>
          <div className="mt-0.5 text-[15px] leading-none font-semibold tracking-tight text-white/90">
            04 / 06
          </div>
          <div className="mt-0.5 text-[7px] text-white/30">exercises complete</div>
        </div>
        <div
          className="flex size-11 items-center justify-center rounded-full"
          style={{
            background:
              "conic-gradient(#a3e635 0deg 240deg, rgba(255,255,255,0.07) 240deg 360deg)",
          }}
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-[#0a0a0d] text-[8px] font-medium text-[#a3e635]">
            67%
          </div>
        </div>
      </div>

      <div className="mt-2 space-y-1">
        {[
          { name: "Bench press", sets: "5 × 5", load: "80 kg" },
          { name: "Overhead press", sets: "4 × 6", load: "45 kg" },
          { name: "Incline press", sets: "3 × 8", load: "60 kg" },
        ].map((exercise, index) => (
          <div
            key={exercise.name}
            className="flex items-center gap-2 rounded-md border border-white/8 bg-white/[0.02] px-2 py-1.5"
          >
            <span
              className={
                index === 0
                  ? "flex size-3 items-center justify-center rounded-sm bg-[#a3e635] text-[6px] text-black"
                  : "flex size-3 items-center justify-center rounded-sm border border-white/15"
              }
            >
              {index === 0 ? <Check className="size-2" /> : null}
            </span>
            <span className="flex-1 text-[8px] text-white/65">
              {exercise.name}
            </span>
            <span className="font-mono text-[7px] text-white/30">
              {exercise.sets}
            </span>
            <span className="font-mono text-[7px] text-[#a3e635]/80">
              {exercise.load}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-1.5 font-mono text-[6px] tracking-wider text-white/25 uppercase">
        <span>Volume 6,420 kg</span>
        <span>12-day streak</span>
      </div>
    </BrowserFrame>
  )
}

function DevStackVisual() {
  const rows = [
    { label: "Rendering", values: ["SSR", "SSR", "Islands"] },
    { label: "Data", values: ["RSC", "Loaders", "Islands"] },
    { label: "Deploy", values: ["Vercel", "Node", "Static"] },
  ]
  return (
    <BrowserFrame address="devstack.app/compare" accent="#60a5fa">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[8px] tracking-[0.14em] text-white/30 uppercase">
            Decision matrix
          </div>
          <div className="mt-0.5 text-[11px] font-medium text-white/85">
            Frameworks · 2026
          </div>
        </div>
        <span className="rounded-md border border-[#60a5fa]/25 bg-[#60a5fa]/10 px-1.5 py-0.5 font-mono text-[7px] text-[#93c5fd]">
          3 selected
        </span>
      </div>

      <div className="mt-2 overflow-hidden rounded-lg border border-white/8">
        <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr] border-b border-white/8 bg-white/[0.03]">
          <div className="p-1.5 font-mono text-[6px] text-white/25">DIM</div>
          {["Next.js", "Remix", "Astro"].map((name) => (
            <div
              key={name}
              className="p-1.5 text-[7px] font-medium text-white/65"
            >
              {name}
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[1.1fr_1fr_1fr_1fr] border-b border-white/5 last:border-0"
          >
            <div className="p-1.5 font-mono text-[6px] text-white/28">
              {row.label}
            </div>
            {row.values.map((value, index) => (
              <div
                key={`${row.label}-${index}`}
                className="flex items-center gap-1 p-1.5"
              >
                <span
                  className={
                    index === 0
                      ? "size-1 rounded-full bg-[#60a5fa]"
                      : "size-1 rounded-full bg-white/15"
                  }
                />
                <span className="text-[6px] text-white/45">{value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-1.5 flex items-center gap-2">
        <div className="flex-1 rounded-md border border-white/6 bg-white/[0.02] px-2 py-1">
          <span className="font-mono text-[6px] text-white/25">FILTER</span>
          <span className="ml-1 text-[7px] text-white/50">App Router</span>
        </div>
        <div className="flex-1 rounded-md border border-white/6 bg-white/[0.02] px-2 py-1">
          <span className="font-mono text-[6px] text-white/25">SORT</span>
          <span className="ml-1 text-[7px] text-white/50">Ecosystem</span>
        </div>
      </div>
    </BrowserFrame>
  )
}

function BengaliNlpVisual() {
  return (
    <BrowserFrame address="nlp.vercel.app/classify" accent="#22d3ee">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="flex size-4 items-center justify-center rounded border border-[#22d3ee]/30 bg-[#22d3ee]/10">
            <Sparkles className="size-2.5 text-[#67e8f9]" aria-hidden="true" />
          </span>
          <span className="font-mono text-[7px] tracking-[0.14em] text-white/35 uppercase">
            Bengali classifier
          </span>
        </div>
        <span className="rounded border border-white/8 px-1.5 py-0.5 font-mono text-[6px] text-white/30">
          DistilBERT
        </span>
      </div>

      <div className="mt-2 rounded-lg border border-white/8 bg-white/[0.02] p-2">
        <div className="font-mono text-[6px] tracking-wider text-white/25 uppercase">
          Input headline
        </div>
        <p className="mt-1 text-[9px] leading-[1.6] text-white/70">
          দাবিটি কোনো নির্ভরযোগ্য সূত্র ছাড়াই ছড়িয়ে পড়েছে
        </p>
      </div>

      <div className="mt-1.5 grid grid-cols-[1.3fr_1fr] gap-1.5">
        <div className="rounded-lg border border-[#f97362]/20 bg-[#f97362]/6 p-2">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-medium text-[#fca5a5]">
              Misleading
            </span>
            <span className="font-mono text-[9px] text-[#fca5a5]">87%</span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/8">
            <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-[#f97362] to-[#f6c177]" />
          </div>
          <div className="mt-1.5 flex items-center justify-between font-mono text-[6px] text-white/30">
            <span>Credible 13%</span>
            <span>macro-F1</span>
          </div>
        </div>
        <div className="rounded-lg border border-white/8 bg-white/[0.02] p-2">
          <div className="font-mono text-[6px] text-white/25">TOKENS</div>
          <div className="mt-1 flex flex-wrap gap-1">
            {["দাবি", "সূত্র", "নির্ভরযোগ্য", "ছড়িয়ে"].map((token) => (
              <span
                key={token}
                className="rounded border border-white/8 bg-white/[0.03] px-1 py-0.5 text-[6px] text-white/45"
              >
                {token}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-1.5 flex items-center justify-between rounded-md border border-white/6 bg-white/[0.02] px-2 py-1 font-mono text-[6px] text-white/28">
        <span>SMOTE balanced</span>
        <span>TF-IDF · RF · DistilBERT</span>
      </div>
    </BrowserFrame>
  )
}

function FederatedVisual() {
  return (
    <BrowserFrame address="fl-lab/research" accent="#a78bfa">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[7px] tracking-[0.14em] text-white/30 uppercase">
            Federated round 24
          </div>
          <div className="mt-0.5 text-[10px] font-medium text-white/80">
            Satellite ship detection
          </div>
        </div>
        <span className="rounded border border-[#a78bfa]/25 bg-[#a78bfa]/10 px-1.5 py-0.5 font-mono text-[6px] text-[#c4b5fd]">
          YOLOv8
        </span>
      </div>

      <div className="relative mt-2 h-[92px] overflow-hidden rounded-lg border border-white/8 bg-[linear-gradient(160deg,#131a2c,#0b0e18_60%,#0a0a0d)]">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.15)_50%,transparent_51%),linear-gradient(0deg,transparent_49%,rgba(255,255,255,0.15)_50%,transparent_51%)] [background-size:22px_22px]" />
        <svg
          viewBox="0 0 220 92"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <g stroke="#a78bfa" strokeOpacity="0.35" strokeWidth="0.6" strokeDasharray="3 3">
            <line x1="110" y1="46" x2="35" y2="22" />
            <line x1="110" y1="46" x2="185" y2="20" />
            <line x1="110" y1="46" x2="38" y2="72" />
            <line x1="110" y1="46" x2="186" y2="74" />
          </g>
          <g fill="#a78bfa">
            <circle cx="110" cy="46" r="4" />
            <circle cx="35" cy="22" r="2.4" />
            <circle cx="185" cy="20" r="2.4" />
            <circle cx="38" cy="72" r="2.4" />
            <circle cx="186" cy="74" r="2.4" />
          </g>
        </svg>
        <div className="absolute top-2 left-2 rounded border border-white/10 bg-black/40 px-1 py-0.5 font-mono text-[6px] text-white/45">
          HRSC2016
        </div>
        <div className="absolute bottom-2 left-2 rounded border border-white/10 bg-black/40 px-1 py-0.5 font-mono text-[6px] text-white/45">
          DOTA
        </div>
        <div className="absolute right-2 bottom-2 rounded border border-[#a78bfa]/30 bg-[#a78bfa]/12 px-1 py-0.5 font-mono text-[6px] text-[#ddd6fe]">
          non-IID
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#a78bfa]/40 bg-[#1a1430]/90 px-2 py-1 text-[7px] font-medium text-[#ddd6fe]">
          Flower server
        </div>
        <div className="absolute top-[15%] left-[30%] size-7 rounded border border-[#22d3ee]/50" />
        <div className="absolute top-[26%] right-[14%] size-6 rounded border border-[#22d3ee]/40" />
      </div>

      <div className="mt-1.5 grid grid-cols-3 gap-1.5">
        {[
          { label: "Datasets", value: "4" },
          { label: "Clients", value: "Non-IID" },
          { label: "Round", value: "24" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded border border-white/6 bg-white/[0.02] px-1.5 py-1"
          >
            <div className="font-mono text-[6px] tracking-wider text-white/22 uppercase">
              {item.label}
            </div>
            <div className="mt-0.5 text-[7px] text-white/55">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="absolute right-2 bottom-1 flex items-center gap-1 font-mono text-[6px] text-white/25">
        <GitBranch className="size-2" aria-hidden="true" />
        aggregate
      </div>
    </BrowserFrame>
  )
}

export function ProjectVisual({ project, className }: ProjectVisualProps) {
  let visual: ReactNode

  if (project.image) {
    visual = (
      <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl border border-white/10 bg-black/40 group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    )
  } else {
    switch (project.slug) {
      case "studiospace":
        visual = <StudioSpaceVisual />
        break
      case "wanderlust":
        visual = <WanderlustVisual />
        break
      case "bazar-dor":
        visual = <BazarDorVisual />
        break
      case "bangla-news-24":
        visual = <BanglaNewsVisual />
        break
      case "fitlog":
        visual = <FitLogVisual />
        break
      case "devstack":
        visual = <DevStackVisual />
        break
      case "bengali-fake-news-detection":
        visual = <BengaliNlpVisual />
        break
      default:
        visual = <FederatedVisual />
        break
    }
  }

  return (
    <div className={className} aria-hidden="true">
      {visual}
    </div>
  )
}
