import {
  Atom,
  Binary,
  Braces,
  Code2,
  Coffee,
  Database,
  GitBranch,
  Hexagon,
  KeyRound,
  Layers,
  Lock,
  Network,
  ScanEye,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react"

import type { SkillIconKey } from "@/types/portfolio"

const iconMap: Record<SkillIconKey, LucideIcon> = {
  cpp: Binary,
  c: Binary,
  java: Coffee,
  typescript: Braces,
  javascript: Braces,
  python: Code2,
  nextjs: Layers,
  express: Server,
  mongodb: Database,
  mysql: Database,
  redis: Zap,
  react: Atom,
  node: Hexagon,
  tailwind: Wind,
  framer: Sparkles,
  flower: Network,
  yolo: ScanEye,
  betterauth: ShieldCheck,
  jwt: KeyRound,
  lock: Lock,
  git: GitBranch,
  linux: Terminal,
  vscode: Code2,
}

export function TechIcon({
  name,
  className,
}: {
  name: SkillIconKey
  className?: string
}) {
  const Icon = iconMap[name]
  return <Icon className={className} aria-hidden="true" />
}
