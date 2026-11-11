import type {
  NavItem,
  Principle,
  ProfileStat,
  SocialLink,
  TimelineEntry,
} from "@/types/portfolio"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://limonhasan.dev"

export const profile = {
  name: "Maksudul Hasan Limon",
  shortName: "Maksudul Limon",
  initials: "ML",
  role: "Undergraduate CSE Student | Full-Stack & Problem Solving",
  kicker: "Full-stack systems · Problem solving",
  headline: "I build full-stack systems and solve hard problems.",
  intro:
    "I'm Maksudul Hasan Limon, an undergraduate Computer Science and Engineering (CSE) student at Northern University Bangladesh in Dhaka. I build production-grade full-stack systems with Next.js, Node.js, and TypeScript, and solve algorithmic problems with 770+ competitive programming solutions.",
  location: "Dhaka, Bangladesh",
  availability: "Open to full-stack engineering roles",
  university: "Northern University Bangladesh",
  degree: "B.Sc. in Computer Science and Engineering",
  semester: "11th semester (out of 12)",
  cgpa: "3.86 / 4.00",
  credits: "143+ credits completed",
  college: "Dhaka College, Dhaka",
  emails: {
    primary: "maksudulhasanlimon@gmail.com",
    academic: "limonhasan.nub@gmail.com",
  },
  github: "https://github.com/limon-hasan",
  githubHandle: "@limon-hasan",
  resumePath: "/Limon_SWE_Resume.pdf",
  resumeFileName: "Maksudul_Hasan_Limon_Resume.pdf",
  url: siteUrl,
} as const

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "@limon-hasan",
    href: profile.github,
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/limonhasan23",
    href: "https://linkedin.com/in/limonhasan23",
    icon: "linkedin",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    handle: "limon23",
    href: "https://leetcode.com/u/limon23/",
    icon: "leetcode",
  },
  {
    id: "codeforces",
    label: "Codeforces",
    handle: "limon23",
    href: "https://codeforces.com/profile/limon23",
    icon: "codeforces",
  },
  {
    id: "codechef",
    label: "CodeChef",
    handle: "limon23",
    href: "https://www.codechef.com/users/limon23",
    icon: "codechef",
  },
]

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    description: "Profile, flagship work, and the engineering stack",
  },
  {
    label: "Projects",
    href: "/projects",
    description: "Eight systems across web engineering and applied ML",
  },
  {
    label: "Research",
    href: "/research",
    description: "Federated learning, satellite vision, and Bengali NLP",
  },
  {
    label: "About",
    href: "/about",
    description: "Academic background, principles, and the journey",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Start a conversation about a role or collaboration",
  },
]

export const stats: ProfileStat[] = [
  {
    value: "08",
    label: "Systems shipped",
    detail: "Six full-stack products, two applied ML systems",
  },
  {
    value: "3.86",
    label: "CGPA / 4.00",
    detail: "B.Sc. in CSE, 11th semester (out of 12)",
  },
  {
    value: "143+",
    label: "Credits completed",
    detail: "Northern University Bangladesh",
  },
  {
    value: "04",
    label: "Research datasets",
    detail: "HRSC2016, ShipRSImageNet, Airbus, DOTA",
  },
]

export const principles: Principle[] = [
  {
    title: "Boundaries before features",
    description:
      "Auth, validation, and data ownership get designed first. A clean seam between client, service, and model is what makes features safe to add later.",
    icon: "shield",
  },
  {
    title: "Measure the real path",
    description:
      "Latency, load behavior, and evaluation metrics are part of the product. If a claim cannot be measured, it does not belong in the case study.",
    icon: "gauge",
  },
  {
    title: "Interfaces earn trust",
    description:
      "Dense information still deserves hierarchy, motion that explains state, and keyboard access. Craft is a reliability signal, not decoration.",
    icon: "layers",
  },
  {
    title: "Research with constraints",
    description:
      "Low-resource language, non-IID clients, limited compute. The interesting engineering lives inside the constraint, not around it.",
    icon: "brain",
  },
]

export const timeline: TimelineEntry[] = [
  {
    period: "Final year · 11th semester (out of 12)",
    title: "B.Sc. in Computer Science and Engineering",
    institution: "Northern University Bangladesh",
    location: "Dhaka, Bangladesh",
    description:
      "Coursework across software architecture, databases, distributed systems, algorithms, and machine learning, paired with a thesis on personalized federated learning for satellite object detection.",
    highlights: [
      "CGPA 3.86 / 4.00 with 143+ credits completed",
      "Undergraduate thesis: Personalized Federated Learning on Satellite Vision",
      "Applied NLP project: Bengali fake news detection",
    ],
  },
  {
    period: "HSC Science · 2019–2021",
    title: "Higher Secondary Certificate",
    institution: "Dhaka College",
    location: "Dhaka, Bangladesh",
    description:
      "Built the analytical foundation and competitive study habits that later translated into algorithm practice, systems coursework, and research.",
    highlights: [
      "Science track",
      "Early foundation in mathematics and problem solving",
    ],
  },
]

export const contactTopics = [
  "Full-stack engineering roles",
  "Research collaborations (NLP & computer vision)",
  "Competitive programming & problem solving",
  "Freelance product builds",
] as const
