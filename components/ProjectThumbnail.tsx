"use client"

import Image from "next/image"
import { useState, type ReactNode } from "react"

interface ProjectThumbnailProps {
  src: string
  alt: string
  priority?: boolean
  fallback: ReactNode
}

/**
 * Renders the project screenshot, but swaps in the generated visual if the
 * asset is missing or fails to load. Keeps the catalog presentable when a
 * screenshot has not been dropped into `public/projects` yet.
 */
export function ProjectThumbnail({
  src,
  alt,
  priority = false,
  fallback,
}: ProjectThumbnailProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <>{fallback}</>
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
    />
  )
}
