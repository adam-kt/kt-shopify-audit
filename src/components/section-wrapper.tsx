"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

type Background =
  | "default"
  | "cream"
  | "coral-soft"
  | "mauve-soft"
  | "mint-soft"
  | "butter-soft"
  | "lavender-soft"
  | "sky-soft"
  | "ink";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: Background;
  padding?: "default" | "narrow" | "wide";
}

const bgStyles: Record<Background, string> = {
  default: "",
  cream: "bg-[var(--color-cream)]",
  "coral-soft": "bg-coral-50",
  "mauve-soft": "bg-[var(--color-mauve-100)]",
  "mint-soft": "bg-[var(--color-mint-soft)]",
  "butter-soft": "bg-[var(--color-butter-soft)]",
  "lavender-soft": "bg-[var(--color-lavender-soft)]",
  "sky-soft": "bg-[var(--color-sky-soft)]",
  ink: "bg-ink-950 text-ink-50",
};

const paddingStyles = {
  narrow: "py-16 sm:py-20 lg:py-24",
  default: "py-20 sm:py-28 lg:py-36",
  wide: "py-24 sm:py-36 lg:py-44",
};

export function SectionWrapper({
  children,
  className,
  id,
  background = "default",
  padding = "default",
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(bgStyles[background], paddingStyles[padding], className)}
    >
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-12">
        {children}
      </div>
    </motion.section>
  );
}
