import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

import { Background } from "@/components/Background"
import { CommandMenuProvider } from "@/components/CommandMenu"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ScrollProgress } from "@/components/ScrollProgress"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/lib/site"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const title = `${profile.name} — CSE Student | Full-Stack Developer`
const description =
  "Portfolio of Maksudul Hasan Limon, an undergraduate CSE student and full-stack developer in Dhaka. Production-grade full-stack systems with Next.js, Node.js, and TypeScript, plus 770+ competitive programming solutions."

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: "Maksudul Hasan Limon — Portfolio",
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    "Maksudul Hasan Limon",
    "full-stack developer",
    "CSE student",
    "competitive programming",
    "Next.js developer",
    "TypeScript",
    "Node.js",
    "problem solving",
    "Dhaka Bangladesh developer",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profile.url,
    siteName: profile.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: profile.emails.primary,
  url: profile.url,
  sameAs: [profile.github, "https://linkedin.com/in/limonhasan23"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.university,
  },
  knowsAbout: [
    "Full-stack engineering",
    "Next.js",
    "TypeScript",
    "Applied machine learning",
    "Federated learning",
    "Computer vision",
    "Natural language processing",
  ],
}

const themeNoFlashScript = `(function(){try{var t=localStorage.getItem("theme")||"dark";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){document.documentElement.classList.add("dark")}})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="relative min-h-svh overflow-x-clip bg-zinc-50 font-sans text-white antialiased dark:bg-[#08080a]">
        <script
          id="theme-no-flash"
          dangerouslySetInnerHTML={{ __html: themeNoFlashScript }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>

        <ThemeProvider>
          <Background />
          <ScrollProgress />
          <CommandMenuProvider>
            <div className="relative z-10 flex min-h-svh flex-col">
              <Navbar />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </CommandMenuProvider>
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replaceAll("<", "\\u003c"),
          }}
        />
      </body>
    </html>
  )
}
