"use client";

import { useRef, type ReactNode } from "react";
import { Sticker } from "@/components/ui/sticker";
import { useGsapIn } from "@/lib/gsap-hooks";

export interface TrioItem {
  title: string;
  body: string;
  sticker: ReactNode;
}

interface FeatureTrioProps {
  items: TrioItem[];
}

export function FeatureTrio({ items }: FeatureTrioProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  useGsapIn(gridRef, {
    from: { y: 24, opacity: 0, duration: 0.6, ease: "power3.out" },
    scroll: true,
    selector: "[data-trio-item]",
    stagger: 0.1,
  });

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-14">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {items.map((f, i) => (
            <div
              key={i}
              data-trio-item
              className="rounded-[var(--radius-card)] bg-[var(--color-tan-soft)] p-8 sm:p-10 min-h-[280px] flex flex-col"
            >
              <Sticker size="lg" tilt={i % 2 === 0 ? -6 : 8} className="mb-6">
                {f.sticker}
              </Sticker>
              <h3 className="text-[20px] font-extrabold tracking-tight text-ink-950">
                {f.title}
              </h3>
              <p className="mt-3 text-[14px] font-medium text-ink-700 leading-relaxed max-w-[28ch]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
