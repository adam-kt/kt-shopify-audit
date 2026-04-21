"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useGsapIn } from "@/lib/gsap-hooks";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  eyebrow?: string;
  headline?: string;
}

function FAQRow({ question, answer, index }: FAQItem & { index: number }) {
  const [open, setOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={rowRef}
      data-faq-row
      className={cn(
        "rounded-[var(--radius-card)] border bg-white transition-colors",
        open ? "border-brand-500" : "border-ink-200"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 px-5 sm:px-7 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-[var(--radius-card)] cursor-pointer"
      >
        <span className="text-[15px] sm:text-[17px] font-extrabold tracking-tight text-ink-950">
          {question}
        </span>
        <span
          className={cn(
            "flex items-center justify-center h-9 w-9 rounded-full text-base font-bold transition-all duration-300 flex-shrink-0",
            open ? "bg-brand-500 text-ink-950 rotate-45" : "bg-ink-100 text-ink-700"
          )}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-7 pb-6 pr-10 text-[14px] sm:text-[15px] text-ink-700 font-medium leading-relaxed max-w-2xl">
            {answer}
          </p>
        </div>
      </div>
      {/* placeholder for stagger ref attribute */}
      <span className="hidden" data-row-idx={index} />
    </div>
  );
}

export function ThanksFAQ({ items, eyebrow = "FAQ", headline = "Common questions" }: FAQProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGsapIn(headlineRef, {
    from: { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" },
    scroll: true,
  });
  useGsapIn(gridRef, {
    from: { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" },
    scroll: true,
    selector: "[data-faq-row]",
    stagger: 0.05,
  });

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[900px] px-6 sm:px-10 lg:px-14 text-center">
        <p className="text-caption mb-4 text-ink-600">{eyebrow}</p>
        <h2
          ref={headlineRef}
          className="text-display mx-auto max-w-[14ch]"
          style={{ color: "var(--color-ink-950)" }}
        >
          {headline}
        </h2>
      </div>

      <div
        ref={gridRef}
        className="mt-12 sm:mt-14 mx-auto max-w-[820px] px-6 sm:px-10 lg:px-14 space-y-3"
      >
        {items.map((item, i) => (
          <FAQRow key={item.question} {...item} index={i} />
        ))}
      </div>
    </section>
  );
}
