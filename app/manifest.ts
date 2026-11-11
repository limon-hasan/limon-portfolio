import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maksudul Hasan Limon — CSE Student | Full-Stack Developer",
    short_name: "M. H. Limon",
    description:
      "Portfolio of Maksudul Hasan Limon: full-stack systems, competitive programming, and research.",
    start_url: "/",
    display: "standalone",
    background_color: "#08080a",
    theme_color: "#08080a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
