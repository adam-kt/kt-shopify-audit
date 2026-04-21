"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useGsapIn, useGsapHoverPop } from "@/lib/gsap-hooks";

const trustChips = [
  "Square secure checkout",
  "5-day turnaround",
  "30-day rescan",
  "Full refund",
];

interface FinalCTAProps {
  headline: string;
  tagline?: string;
}

export function ThanksFinalCTA({ headline, tagline }: FinalCTAProps) {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const ghostRef = useRef<HTMLAnchorElement>(null);

  useGsapIn(h2Ref, {
    from: { y: 22, opacity: 0, duration: 0.7, ease: "power3.out" },
    scroll: true,
  });
  useGsapHoverPop(ctaRef, { scale: 1.04, rotate: -1 });
  useGsapHoverPop(ghostRef, { scale: 1.02, rotate: 0 });

  return (
    <section className="relative mx-4 sm:mx-6 lg:mx-10 mb-10 rounded-[var(--radius-card-lg)] bg-brand-500 overflow-hidden">
      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-14 py-20 sm:py-28 text-center">
        <h2
          ref={h2Ref}
          className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-[-0.01em] leading-tight text-ink-950 mx-auto max-w-[32ch]"
        >
          {headline}
        </h2>
        {tagline && (
          <p className="mt-4 mx-auto max-w-xl text-[16px] sm:text-[18px] font-semibold text-ink-900/80 leading-relaxed">
            {tagline}
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            ref={ctaRef}
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-ink-800 transition-colors shadow-soft"
          >
            Get my audit — $750
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            ref={ghostRef}
            href="mailto:hello@knocktwice.io"
            className="inline-flex items-center rounded-full border-2 border-ink-950 bg-transparent px-7 py-3 text-[14px] font-semibold text-ink-950 hover:bg-ink-950 hover:text-white transition-colors"
          >
            Questions? Email us
          </a>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-2 sm:gap-3">
          {trustChips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center h-9 px-4 rounded-full bg-white/80 text-[12px] font-bold text-ink-800 tracking-tight"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
