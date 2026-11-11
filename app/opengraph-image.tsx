import { ImageResponse } from "next/og"

import { OpenGraphArtwork } from "@/components/OpenGraphArtwork"

export const alt =
  "Maksudul Hasan Limon — Full-stack systems and hard problems solved"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(<OpenGraphArtwork />, {
    ...size,
  })
}
