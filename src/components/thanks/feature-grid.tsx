"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useGsapIn } from "@/lib/gsap-hooks";

type Tone = "brand" | "peach" | "tan" | "mint" | "sky" | "lilac" | "golden";

interface Feature {
  tone: Tone;
  title: string;
  body?: string;
  visual?: ReactNode;
}

const toneStyles: Record<Tone, string> = {
  brand: "bg-brand-500",
  peach: "bg-[var(--color-peach)]",
  tan: "bg-[var(--color-tan)]",
  mint: "bg-[var(--color-mint)]",
  sky: "bg-[var(--color-sky)]",
  lilac: "bg-[var(--color-lilac)]",
  golden: "bg-[var(--color-golden-soft)]",
};

interface FeatureGridProps {
  features: Feature[];
  className?: string;
}

/**
 * Smaller, portrait-oriented cards: grid is 2 cols on mobile, 4 cols on
 * desktop, each card uses a 3:4 aspect and tighter padding so the visual
 * sits on top and the copy anchors at the bottom.
 */
export function FeatureGrid({ features, className }: FeatureGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  useGsapIn(gridRef, {
    from: { y: 28, opacity: 0, duration: 0.65, ease: "power3.out" },
    scroll: true,
    selector: "[data-fg-card]",
    stagger: 0.08,
  });

  return (
    <section className={cn("mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 py-10 sm:py-14", className)}>
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mx-auto max-w-[980px]"
      >
        {features.map((f, i) => (
          <article
            key={i}
            data-fg-card
            className={cn(
              "group relative overflow-hidden rounded-[var(--radius-card)] aspect-[4/5]",
              "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(20,20,15,0.35)]",
              toneStyles[f.tone]
            )}
          >
            {f.visual && (
              <div
                className={cn(
                  "absolute inset-0",
                  "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "group-hover:scale-[1.06]"
                )}
              >
                {f.visual}
              </div>
            )}
            {/* Full-height scrim so the image never fights the copy for contrast.
                Stacks a strong bottom gradient on top of a subtle all-card darken. */}
            <div
              aria-hidden
              className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/10 via-black/20 to-black/80"
            />
            <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8 transition-transform duration-500 ease-out group-hover:-translate-y-1">
              <h3 className="text-[18px] sm:text-[22px] font-extrabold tracking-[-0.015em] leading-[1.1] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                {f.title}
              </h3>
              {f.body && (
                <p className="mt-2.5 text-[13px] sm:text-[14px] font-semibold text-white/90 leading-relaxed max-w-[34ch] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  {f.body}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
