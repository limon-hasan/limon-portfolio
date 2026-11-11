import type { MetadataRoute } from "next"

import { profile } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${profile.url}/sitemap.xml`,
    host: profile.url,
  }
}
