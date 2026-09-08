import { cn } from "@/lib/utils";

/**
 * Circular Knock Twice mark — the "KT" monogram on a filled disc.
 * Carried over from the previous build; repainted onto the shadcn tokens so it
 * inverts correctly in dark mode.
 */
export function CircleLogo({
  className,
  size = 44,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex select-none items-center justify-center rounded-full bg-primary text-primary-foreground",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className="text-center font-extrabold uppercase leading-none tracking-[-0.04em]"
        style={{ fontSize: size * 0.4 }}
      >
        KT
      </span>
    </span>
  );
}
