import { cn } from "@/lib/utils";

interface CircleLogoProps {
  className?: string;
  size?: number;
}

/**
 * Circular Knock Twice mark — green disc with the inner "KT" wordmark
 * rendered in the chunky display font. Sits in the header the same way
 * thanks.co's circle logo does.
 */
export function CircleLogo({ className, size = 76 }: CircleLogoProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-brand-500 text-ink-950 select-none",
        className
      )}
      style={{ width: size, height: size }}
      aria-label="Knock Twice"
    >
      <span
        className="font-extrabold uppercase text-center leading-[0.9] tracking-[-0.04em]"
        style={{ fontFamily: "var(--font-display)", fontSize: size * 0.44 }}
      >
        KT
      </span>
    </div>
  );
}
