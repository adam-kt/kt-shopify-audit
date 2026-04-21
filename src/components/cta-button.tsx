"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "outline";
type Size = "default" | "lg" | "sm";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-coral-600 text-white shadow-soft hover:bg-coral-700 active:bg-coral-700",
  outline:
    "bg-white text-ink-900 border-2 border-ink-900 hover:bg-ink-900 hover:text-white",
  ghost:
    "text-ink-700 hover:text-coral-700 underline underline-offset-4 decoration-ink-300 hover:decoration-coral-400",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[13px]",
  default: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

export function CTAButton({
  children,
  variant = "primary",
  size = "default",
  href,
  className,
  loading,
  disabled,
  ...props
}: CTAButtonProps) {
  const isGhost = variant === "ghost";
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2",
    "disabled:opacity-40 disabled:pointer-events-none",
    "cursor-pointer",
    !isGhost && "rounded-full",
    variantStyles[variant],
    !isGhost && sizeStyles[size],
    isGhost && "text-sm",
    className
  );

  const motionProps = isGhost
    ? {}
    : {
        whileHover: { scale: 1.04, rotate: -1.2 },
        whileTap: { scale: 0.97, rotate: 0 },
        transition: { type: "spring" as const, stiffness: 360, damping: 18 },
      };

  if (href) {
    return (
      <motion.a href={href} className={classes} role="button" {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      {...motionProps}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
