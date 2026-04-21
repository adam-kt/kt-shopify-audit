"use client";

import { cn } from "@/lib/utils";
import { Sticker } from "./sticker";
import { type ReactNode } from "react";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface ScatterItem {
  node: ReactNode;
  /** % from left (0-100) */
  x: number;
  /** % from top (0-100) */
  y: number;
  tilt?: number;
  size?: Size;
  float?: boolean;
  /** optional delay (s) for the float animation */
  delay?: number;
}

interface StickerScatterProps {
  items: ScatterItem[];
  className?: string;
  /** If true, stickers don't block pointer events so they can overlay content. */
  passthrough?: boolean;
}

/**
 * Absolute-positions a set of Sticker nodes inside a relatively-positioned parent.
 * Pass percentage coordinates so it scales across viewports.
 */
export function StickerScatter({
  items,
  className,
  passthrough = true,
}: StickerScatterProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        !passthrough && "pointer-events-auto",
        className
      )}
    >
      {items.map((item, i) => (
        <Sticker
          key={i}
          tilt={item.tilt ?? 0}
          size={item.size ?? "md"}
          float={item.float ?? true}
          className={cn("absolute", passthrough && "pointer-events-auto")}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationDelay: item.delay !== undefined ? `${item.delay}s` : undefined,
          }}
        >
          {item.node}
        </Sticker>
      ))}
    </div>
  );
}
