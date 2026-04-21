"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  label: string;
  sublabel?: string;
  aspect?: "video" | "wide" | "square" | "tall";
  className?: string;
  src?: StaticImageData;
  alt?: string;
}

const aspects = {
  video: "aspect-[16/9]",
  wide: "aspect-[2/1]",
  square: "aspect-square",
  tall: "aspect-[3/4]",
};

export function PlaceholderImage({
  label,
  sublabel,
  aspect = "video",
  className,
  src,
  alt,
}: PlaceholderImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-[var(--radius-card)] border border-ink-100 overflow-hidden relative shadow-soft bg-white",
        !src && "bg-ink-50 flex items-center justify-center",
        aspects[aspect],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          placeholder={src.blurDataURL ? "blur" : "empty"}
        />
      ) : (
        <div className="text-center px-6">
          <p className="text-caption text-ink-400">
            {label}
          </p>
          {sublabel && (
            <p className="mt-1 text-[13px] text-ink-400">{sublabel}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}
