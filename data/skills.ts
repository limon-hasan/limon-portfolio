import type {
  CompetitiveProfile,
  Skill,
  SkillGroup,
  TopicMastery,
} from "@/types/portfolio"

export const skills: Skill[] = [
  {
    name: "C++",
    icon: "cpp",
    category: "Languages",
    level: "Core",
    blurb: "Competitive programming, STL, fast I/O, algorithmic problem solving.",
    dock: true,
  },
  {
    name: "Java",
    icon: "java",
    category: "Languages",
    level: "Core",
    blurb: "OOP foundations, data structures, and object-oriented design.",
  },
  {
    name: "C",
    icon: "c",
    category: "Languages",
    level: "Core",
    blurb: "Systems fundamentals, the memory model, and low-level problem solving.",
  },
  {
    name: "TypeScript",
    icon: "typescript",
    category: "Languages",
    level: "Core",
    blurb: "Strict application code, typed API contracts, discriminated unions.",
    dock: true,
  },
  {
    name: "JavaScript",
    icon: "javascript",
    category: "Languages",
    level: "Production",
    blurb: "Browser-first interfaces, async flows, and ecosystem tooling.",
  },
  {
    name: "Python",
    icon: "python",
    category: "Languages",
    level: "Working",
    blurb: "Offline NLP pipelines, model evaluation, and research scripts.",
    dock: true,
  },
  {
    name: "Next.js",
    icon: "nextjs",
    category: "Frontend",
    level: "Production",
    blurb: "App Router, server components, server actions, static generation.",
    dock: true,
  },
  {
    name: "React",
    icon: "react",
    category: "Frontend",
    level: "Production",
    blurb: "Composable interfaces, state boundaries, accessible interactions.",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwind",
    category: "Frontend",
    level: "Production",
    blurb: "Token-driven design systems, responsive layouts, dark surfaces.",
  },
  {
    name: "Framer Motion",
    icon: "framer",
    category: "Frontend",
    level: "Working",
    blurb: "Route transitions, layout animation, reduced-motion-safe motion.",
  },
  {
    name: "Node.js",
    icon: "node",
    category: "Backend & APIs",
    level: "Production",
    blurb: "REST services, middleware, auth boundaries, and API pipelines.",
    dock: true,
  },
  {
    name: "Express.js",
    icon: "express",
    category: "Backend & APIs",
    level: "Production",
    blurb: "Route design, validation layers, normalized API responses.",
    dock: true,
  },
  {
    name: "RESTful APIs",
    icon: "express",
    category: "Backend & APIs",
    level: "Production",
    blurb: "Resource modelling, status semantics, and response envelopes.",
  },
  {
    name: "MongoDB",
    icon: "mongodb",
    category: "Backend & APIs",
    level: "Production",
    blurb: "Document modelling, indexed queries, reservation data.",
    dock: true,
  },
  {
    name: "MySQL",
    icon: "mysql",
    category: "Backend & APIs",
    level: "Working",
    blurb: "Relational schema design, joins, and constraint-backed data.",
  },
  {
    name: "Redis",
    icon: "redis",
    category: "Backend & APIs",
    level: "Working",
    blurb: "Caching, rate limits, short-lived state, queue-style workflows.",
    dock: true,
  },
  {
    name: "Better-Auth",
    icon: "betterauth",
    category: "Auth & Security",
    level: "Production",
    blurb: "Session management, credential flows, and plugin-based auth.",
  },
  {
    name: "JWT / JWKS",
    icon: "jwt",
    category: "Auth & Security",
    level: "Production",
    blurb: "Asymmetric token verification with cached signing key sets.",
  },
  {
    name: "Protected Route Pipelines",
    icon: "lock",
    category: "Auth & Security",
    level: "Production",
    blurb: "Server-side guards that treat every client claim as untrusted.",
  },
  {
    name: "Flower FL",
    icon: "flower",
    category: "AI / ML",
    level: "Research",
    blurb: "Federated orchestration, client sampling, aggregation strategies.",
  },
  {
    name: "YOLOv8",
    icon: "yolo",
    category: "AI / ML",
    level: "Research",
    blurb: "Object detection, satellite imagery, evaluation at IoU thresholds.",
  },
  {
    name: "Git",
    icon: "git",
    category: "Tooling",
    level: "Production",
    blurb: "Repository hygiene, reviewable changes, separated deployments.",
  },
  {
    name: "GitHub",
    icon: "git",
    category: "Tooling",
    level: "Production",
    blurb: "Open-source workflows, pull requests, and project boards.",
  },
  {
    name: "Linux / WSL",
    icon: "linux",
    category: "Tooling",
    level: "Working",
    blurb: "Ubuntu shell workflows, process inspection, dev environments.",
  },
  {
    name: "VS Code",
    icon: "vscode",
    category: "Tooling",
    level: "Production",
    blurb: "Primary editor: debugging, extensions, and typed workflows.",
  },
]

/**
 * Primary toolkit, in display order. The dock is an explicit, curated list
 * so reordering the master `skills` array never changes the dock sequence.
 */
const techDockOrder = [
  "C++",
  "Java",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Redis",
  "Python",
] as const

export const techDock: Skill[] = techDockOrder
  .map((name) => skills.find((skill) => skill.name === name))
  .filter((skill): skill is Skill => Boolean(skill))

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    caption: "The base layer: typed application code, systems fundamentals, research scripts.",
    items: skills.filter((skill) => skill.category === "Languages"),
  },
  {
    category: "Frontend",
    caption: "Interfaces that stay legible under real data and real network conditions.",
    items: skills.filter((skill) => skill.category === "Frontend"),
  },
  {
    category: "Backend & APIs",
    caption: "Service boundaries, validation, and contracts that both sides can trust.",
    items: skills.filter((skill) => skill.category === "Backend & APIs"),
  },
  {
    category: "Auth & Security",
    caption: "The auth boundary: sessions, tokens, and routes that never trust the client.",
    items: skills.filter((skill) => skill.category === "Auth & Security"),
  },
  {
    category: "AI / ML",
    caption: "Applied research translated into trainable, evaluable, servable systems.",
    items: skills.filter((skill) => skill.category === "AI / ML"),
  },
  {
    category: "Tooling",
    caption: "Reproducibility, version control, and environments that outlive a demo.",
    items: skills.filter((skill) => skill.category === "Tooling"),
  },
]

export const competitiveProfiles: CompetitiveProfile[] = [
  {
    platform: "Codeforces",
    handle: "limon23",
    href: "https://codeforces.com/profile/limon23",
    focus: "383 problems solved · max rating 899",
    note: "Timed contest practice with a C++17 fast I/O template.",
    accent: "#60a5fa",
  },
  {
    platform: "CodeChef",
    handle: "limon23",
    href: "https://www.codechef.com/users/limon23",
    focus: "140 problems solved · max rating 1407",
    note: "2-Star coder with Div 3 contest experience.",
    accent: "#a3e635",
  },
  {
    platform: "LeetCode",
    handle: "limon23",
    href: "https://leetcode.com/u/limon23/",
    focus: "27 problems solved · core DSA patterns",
    note: "Pattern-first practice across arrays, trees, graphs, and DP.",
    accent: "#f6c177",
  },
]

export const topicMastery: TopicMastery[] = [
  { topic: "Arrays & strings", level: 4, track: "Data structures" },
  { topic: "Binary search", level: 4, track: "Algorithms" },
  { topic: "Two pointers", level: 4, track: "Problem solving" },
  { topic: "Trees & BST", level: 3, track: "Data structures" },
  { topic: "Graphs", level: 3, track: "Data structures" },
  { topic: "Dynamic programming", level: 3, track: "Algorithms" },
  { topic: "Greedy", level: 3, track: "Algorithms" },
  { topic: "Heaps", level: 3, track: "Data structures" },
  { topic: "Number theory", level: 3, track: "Problem solving" },
  { topic: "Bit manipulation", level: 3, track: "Problem solving" },
  { topic: "Backtracking", level: 2, track: "Algorithms" },
  { topic: "Segment trees", level: 2, track: "Data structures" },
]

export const competitiveEnvironment = [
  { label: "Total solved", value: "770+ problems" },
  { label: "Platforms", value: "CF · CC · LC · LightOJ · VJudge" },
  { label: "Language", value: "C++17" },
  { label: "Contest ranks", value: "7th NUBCC UPC · 6th BotB" },
]
