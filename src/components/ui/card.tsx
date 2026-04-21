"use client";

import { forwardRef, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useGsapHoverPop } from "@/lib/gsap-hooks";

type Tone = "white" | "cream" | "coral" | "mauve" | "mint" | "butter" | "lavender" | "sky" | "ink";

const toneStyles: Record<Tone, string> = {
  white: "bg-white text-ink-900 border border-ink-100",
  cream: "bg-[var(--color-cream)] text-ink-900",
  coral: "bg-coral-100 text-ink-900",
  mauve: "bg-[var(--color-mauve-100)] text-ink-900",
  mint: "bg-[var(--color-mint-soft)] text-ink-900",
  butter: "bg-[var(--color-butter-soft)] text-ink-900",
  lavender: "bg-[var(--color-lavender-soft)] text-ink-900",
  sky: "bg-[var(--color-sky-soft)] text-ink-900",
  ink: "bg-ink-950 text-white",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: Tone;
  tilt?: number;
  interactive?: boolean;
  padded?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    children,
    tone = "white",
    tilt = 0,
    interactive = false,
    padded = true,
    className,
    style,
    ...rest
  },
  ref
) {
  const localRef = useRef<HTMLDivElement>(null);
  // Merge refs: keep the forwarded ref callable and also use our local one for GSAP hover.
  const setRef = (node: HTMLDivElement | null) => {
    localRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };
  useGsapHoverPop(localRef, interactive ? { scale: 1.02, rotate: 0 } : { scale: 1 });

  return (
    <div
      ref={setRef}
      style={{ rotate: `${tilt}deg`, ...style }}
      className={cn(
        "rounded-[var(--radius-card)] shadow-soft transition-shadow",
        padded && "p-6 sm:p-8",
        toneStyles[tone],
        interactive && "cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
