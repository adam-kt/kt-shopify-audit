"use client";

import { useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useGsapFloat, useGsapHoverPop } from "@/lib/gsap-hooks";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

const sizeStyles: Record<Size, string> = {
  xs: "w-8 h-8",
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
};

interface StickerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tilt?: number;
  size?: Size;
  float?: boolean;
  hoverBounce?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * GSAP-powered sticker wrapper: initial tilt via style, optional idle float
 * (yoyo y-tween) and optional hover pop (scale + rotate).
 */
export function Sticker({
  children,
  tilt = 0,
  size = "md",
  float = false,
  hoverBounce = true,
  className,
  style,
  ...rest
}: StickerProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Outer element carries the stable rotation + float y-bob.
  useGsapFloat(innerRef, float ? { y: 6, duration: 2.8 } : { y: 0, duration: 0 });
  // Hover pop lives on the outer ref so the float tween isn't interrupted.
  useGsapHoverPop(outerRef, hoverBounce ? { scale: 1.12, rotate: tilt + (tilt >= 0 ? -6 : 6) } : { scale: 1 });

  return (
    <div
      ref={outerRef}
      style={{ rotate: `${tilt}deg`, ...style }}
      className={cn(
        "drop-shadow-[0_4px_0_rgba(20,20,20,0.08)] select-none",
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      <div ref={innerRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
