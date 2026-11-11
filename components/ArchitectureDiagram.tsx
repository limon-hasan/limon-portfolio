import {
  ArrowRight,
  Boxes,
  Cpu,
  Database,
  Globe,
  Network,
  Server,
  type LucideIcon,
} from "lucide-react"

import type { Architecture, ArchitectureLayerId } from "@/types/portfolio"

const layers: {
  id: ArchitectureLayerId
  label: string
  short: string
  icon: LucideIcon
  accent: string
}[] = [
  { id: "client", label: "Client surface", short: "CLIENT", icon: Globe, accent: "#4fd1c5" },
  { id: "gateway", label: "Edge & routing", short: "EDGE", icon: Network, accent: "#8b7cff" },
  { id: "service", label: "Service layer", short: "SERVICE", icon: Server, accent: "#60a5fa" },
  { id: "data", label: "Data layer", short: "DATA", icon: Database, accent: "#f6c177" },
  { id: "intelligence", label: "Model layer", short: "MODEL", icon: Cpu, accent: "#a78bfa" },
  { id: "external", label: "External", short: "EXT", icon: Boxes, accent: "#f97362" },
]

export function ArchitectureDiagram({
  architecture,
}: {
  architecture: Architecture
}) {
  const activeLayers = layers.filter((layer) =>
    architecture.nodes.some((node) => node.layer === layer.id)
  )

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0c0c10]/60 p-4 sm:p-5">
      <p className="pretty max-w-3xl text-[13px] leading-6 text-white/45">
        {architecture.overview}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {activeLayers.map((layer, layerIndex) => {
          const Icon = layer.icon
          const nodes = architecture.nodes.filter(
            (node) => node.layer === layer.id
          )

          return (
            <div
              key={layer.id}
              className="relative flex min-w-0 flex-col rounded-xl border border-white/8 bg-white/[0.018] p-3"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="flex size-5 items-center justify-center rounded-md border border-white/8"
                  style={{ color: layer.accent }}
                >
                  <Icon className="size-3" aria-hidden="true" />
                </span>
                <span className="font-mono text-[8px] tracking-[0.14em] text-white/30 uppercase">
                  {layer.short}
                </span>
              </div>
              <div className="mt-2.5 flex flex-col gap-1.5">
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    className="rounded-lg border border-white/7 bg-[#0a0a0d]/70 px-2 py-1.5"
                  >
                    <div className="text-[10px] font-medium text-white/70">
                      {node.label}
                    </div>
                    <div className="mt-0.5 text-[9px] leading-3.5 text-white/30">
                      {node.detail}
                    </div>
                  </div>
                ))}
              </div>
              {layerIndex < activeLayers.length - 1 ? (
                <ArrowRight
                  className="absolute top-1/2 -right-[9px] z-10 hidden size-3 -translate-y-1/2 text-white/18 lg:block"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="mt-5 border-t border-white/8 pt-4">
        <div className="text-mono-label text-white/28">Request lifecycle</div>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2">
          {architecture.flow.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-2.5 rounded-lg border border-white/6 bg-white/[0.015] px-2.5 py-2"
            >
              <span className="mt-px flex size-4 shrink-0 items-center justify-center rounded border border-[#8b7cff]/25 bg-[#5b4df5]/10 font-mono text-[8px] text-[#b7adff]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[10.5px] leading-4 text-white/40">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
