"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Annotation = {
  x: number; // 0-100 (% of container width)
  y: number; // 0-100 (% of container height)
  label: string;
  severity?: "high" | "medium" | "positive";
};

const markerColors: Record<NonNullable<Annotation["severity"]>, string> = {
  high: "bg-coral-600",
  medium: "bg-[var(--color-butter)]",
  positive: "bg-[var(--color-mint)]",
};

interface AnnotatedScreenshotProps {
  src: StaticImageData;
  alt: string;
  annotations: Annotation[];
  aspect?: "wide" | "video";
  objectPosition?: string;
  className?: string;
}

const aspects = {
  wide: "aspect-[2/1]",
  video: "aspect-[16/9]",
};

export function AnnotatedScreenshot({
  src,
  alt,
  annotations,
  aspect = "wide",
  objectPosition = "top",
  className,
}: AnnotatedScreenshotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative rounded-[var(--radius-card)] border border-ink-100 overflow-hidden bg-ink-50 shadow-soft",
        aspects[aspect],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 80vw"
        className="object-cover"
        style={{ objectPosition }}
        placeholder="blur"
        priority={false}
      />

      {/* Subtle overlay to make annotations readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950/10 via-transparent to-ink-950/10 pointer-events-none" />

      {annotations.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4 + i * 0.25,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${a.x}%`, top: `${a.y}%` }}
        >
          <div className="flex items-center gap-2">
            {/* Marker dot with pulse */}
            <span className="relative flex h-3 w-3 flex-shrink-0">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping",
                  markerColors[a.severity ?? "medium"]
                )}
              />
              <span
                className={cn(
                  "relative inline-flex h-3 w-3 rounded-full ring-2 ring-white",
                  markerColors[a.severity ?? "medium"]
                )}
              />
            </span>
            {/* Callout label */}
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.55 + i * 0.25,
              }}
              className="rounded-full bg-ink-950/90 backdrop-blur-sm border border-white/10 px-3 py-1 text-[11px] font-medium text-white whitespace-nowrap shadow-lg"
            >
              {a.label}
            </motion.span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
