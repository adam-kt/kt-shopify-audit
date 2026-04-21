"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useGsapIn } from "@/lib/gsap-hooks";

export interface NewsItem {
  title: string;
  author: string;
  date: string;
  tone: "sky" | "peach" | "mint" | "lilac";
}

const toneStyles = {
  sky: "bg-[var(--color-sky)]",
  peach: "bg-[var(--color-peach)]",
  mint: "bg-[var(--color-mint)]",
  lilac: "bg-[var(--color-lilac)]",
};

interface NewsProps {
  eyebrow?: string;
  headline?: string;
  items: NewsItem[];
}

export function News({ headline = "News", items }: NewsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGsapIn(headlineRef, {
    from: { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" },
    scroll: true,
  });

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2
            ref={headlineRef}
            className="text-display"
            style={{ color: "var(--color-ink-950)" }}
          >
            {headline}
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-400)}
              aria-label="Previous"
              className="h-11 w-11 rounded-full bg-ink-100 hover:bg-ink-200 flex items-center justify-center transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </button>
            <button
              onClick={() => scrollBy(400)}
              aria-label="Next"
              className="h-11 w-11 rounded-full bg-brand-500 hover:bg-brand-600 flex items-center justify-center transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>

        <div ref={scrollerRef} className="snap-scroller flex gap-5 overflow-x-auto pb-4">
          {items.map((n, i) => (
            <article
              key={i}
              className="flex-shrink-0 w-[85vw] sm:w-[420px] rounded-[var(--radius-card)] overflow-hidden"
            >
              <div className={cn("aspect-[4/3] flex items-center justify-center", toneStyles[n.tone])}>
                <span className="text-caption text-ink-700">Article image</span>
              </div>
              <div className="pt-5">
                <h3 className="text-[18px] font-extrabold tracking-tight text-ink-950 leading-snug">
                  {n.title}
                </h3>
                <p className="mt-3 text-[13px] text-ink-700">
                  By <span className="underline">{n.author}</span>
                </p>
                <p className="text-[13px] text-ink-700">{n.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
