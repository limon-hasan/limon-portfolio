export type ProjectCategory = "Web & Full-Stack Systems" | "AI & Machine Learning"

export type ProjectCategoryFilter = "all" | "web" | "ai"

export type ProjectLinkKind =
  | "live"
  | "frontend"
  | "backend"
  | "github"
  | "paper"
  | "dataset"

export interface ProjectLink {
  kind: ProjectLinkKind
  label: string
  href: string
}

export interface ProjectMetric {
  label: string
  value: string
  hint: string
}

export type ArchitectureLayerId =
  | "client"
  | "gateway"
  | "service"
  | "data"
  | "intelligence"
  | "external"

export interface ArchitectureNode {
  id: string
  label: string
  detail: string
  layer: ArchitectureLayerId
}

export interface Architecture {
  overview: string
  nodes: ArchitectureNode[]
  flow: string[]
}

export interface ProjectChallenge {
  title: string
  problem: string
  solution: string
  impact: string
}

export interface ProjectResearchNote {
  question: string
  method: string
  evaluation: string
}

export interface Project {
  order: number
  slug: string
  title: string
  category: ProjectCategory
  year: string
  role: string
  status: "Live" | "Case study" | "Research"
  featured: boolean
  accent: string
  image?: string
  tagline: string
  summary: string
  problem: string
  approach: string[]
  tech: string[]
  highlights: string[]
  metrics: ProjectMetric[]
  architecture: Architecture
  challenges: ProjectChallenge[]
  links: ProjectLink[]
  datasets?: string[]
  research?: ProjectResearchNote
  keywords: string[]
}

export type SkillIconKey =
  | "cpp"
  | "c"
  | "java"
  | "typescript"
  | "javascript"
  | "python"
  | "nextjs"
  | "express"
  | "mongodb"
  | "mysql"
  | "redis"
  | "react"
  | "node"
  | "tailwind"
  | "framer"
  | "flower"
  | "yolo"
  | "betterauth"
  | "jwt"
  | "lock"
  | "git"
  | "linux"
  | "vscode"

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend & APIs"
  | "Auth & Security"
  | "AI / ML"
  | "Tooling"

export type SkillLevel = "Core" | "Production" | "Research" | "Working"

export interface Skill {
  name: string
  icon: SkillIconKey
  category: SkillCategory
  level: SkillLevel
  blurb: string
  dock?: boolean
}

export interface SkillGroup {
  category: SkillCategory
  caption: string
  items: Skill[]
}

export interface CompetitiveProfile {
  platform: "LeetCode" | "Codeforces" | "CodeChef"
  handle: string
  href: string
  focus: string
  note: string
  accent: string
}

export type TopicLevel = 1 | 2 | 3 | 4

export interface TopicMastery {
  topic: string
  level: TopicLevel
  track: "Data structures" | "Algorithms" | "Problem solving"
}

export type SocialLink = {
  id: string
  label: string
  handle: string
  href: string
  icon: "github" | "linkedin" | "leetcode" | "codeforces" | "codechef"
}

export interface NavItem {
  label: string
  href: string
  description: string
}

export interface ProfileStat {
  value: string
  label: string
  detail: string
}

export interface TimelineEntry {
  period: string
  title: string
  institution: string
  location: string
  description: string
  highlights: string[]
}

export interface Principle {
  title: string
  description: string
  icon: "layers" | "gauge" | "shield" | "brain"
}

export type ContactField = "name" | "email" | "subject" | "message"

export interface ContactFormState {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: Partial<Record<ContactField, string[]>>
}

export interface CommandItem {
  id: string
  title: string
  description: string
  group: "Navigate" | "Projects" | "Connect" | "Actions"
  href: string
  keywords: string[]
  external?: boolean
  download?: boolean
  icon:
    | "home"
    | "projects"
    | "research"
    | "about"
    | "contact"
    | "project"
    | "github"
    | "linkedin"
    | "leetcode"
    | "codeforces"
    | "codechef"
    | "download"
    | "mail"
}
