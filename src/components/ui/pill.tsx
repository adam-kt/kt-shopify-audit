"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type Tone = "coral" | "mauve" | "mint" | "butter" | "lavender" | "sky" | "ink" | "white";

const toneStyles: Record<Tone, string> = {
  coral: "bg-coral-100 text-coral-700",
  mauve: "bg-[var(--color-mauve-100)] text-[var(--color-mauve-600)]",
  mint: "bg-[var(--color-mint-soft)] text-emerald-700",
  butter: "bg-[var(--color-butter-soft)] text-amber-800",
  lavender: "bg-[var(--color-lavender-soft)] text-indigo-700",
  sky: "bg-[var(--color-sky-soft)] text-sky-800",
  ink: "bg-ink-900 text-white",
  white: "bg-white text-ink-900 border border-ink-200",
};

interface PillProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

export function Pill({ children, tone = "coral", className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
