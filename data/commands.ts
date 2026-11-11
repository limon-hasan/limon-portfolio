import { projects } from "@/data/projects"
import { navItems, profile, socials } from "@/lib/site"
import type { CommandItem } from "@/types/portfolio"

const pageIcons = {
  "/": "home",
  "/projects": "projects",
  "/research": "research",
  "/about": "about",
  "/contact": "contact",
} as const

const socialIcons = {
  github: "github",
  linkedin: "linkedin",
  leetcode: "leetcode",
  codeforces: "codeforces",
  codechef: "codechef",
} as const

export const commandItems: CommandItem[] = [
  ...navItems.map<CommandItem>((item) => ({
    id: `page-${item.href}`,
    title: item.label,
    description: item.description,
    group: "Navigate",
    href: item.href,
    keywords: ["page", "route", item.label.toLowerCase()],
    icon: pageIcons[item.href as keyof typeof pageIcons] ?? "home",
  })),
  ...projects.map<CommandItem>((project) => ({
    id: `project-${project.slug}`,
    title: project.title,
    description: `${String(project.order).padStart(2, "0")} · ${project.category}`,
    group: "Projects",
    href: `/projects/${project.slug}`,
    keywords: [
      "project",
      "case study",
      project.category.toLowerCase(),
      ...project.keywords,
    ],
    icon: "project",
  })),
  ...socials.map<CommandItem>((social) => ({
    id: `social-${social.id}`,
    title: social.label,
    description: `Open ${social.handle} in a new tab`,
    group: "Connect",
    href: social.href,
    keywords: ["social", "profile", "external", social.label.toLowerCase()],
    external: true,
    icon: socialIcons[social.icon],
  })),
  {
    id: "email-primary",
    title: "Email Maksudul",
    description: profile.emails.primary,
    group: "Connect",
    href: `mailto:${profile.emails.primary}`,
    keywords: ["email", "mail", "contact", "hire"],
    icon: "mail",
  },
  {
    id: "resume",
    title: "Download resume",
    description: "PDF · full-stack & problem solving profile",
    group: "Actions",
    href: profile.resumePath,
    keywords: ["resume", "cv", "pdf", "download"],
    download: true,
    icon: "download",
  },
]

export const commandGroups: CommandItem["group"][] = [
  "Navigate",
  "Projects",
  "Connect",
  "Actions",
]
