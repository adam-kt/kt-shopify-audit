"use client";

import { useEffect, useRef } from "react";
import { Sticker } from "@/components/ui/sticker";
import {
  StarSticker,
  SparkleSticker,
  LightningSticker,
  ChartSticker,
  ThanksMascot,
} from "@/components/stickers";

interface Stat {
  value: string;
  label: string;
}

interface StatsBandProps {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  stats: Stat[];
}

export function StatsBand({ eyebrow, headline, subhead, stats }: StatsBandProps) {
  const words = headline.split(" ");
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (headlineRef.current) {
          const hWords = headlineRef.current.querySelectorAll(".sb-word");
          gsap.fromTo(
            hWords,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.055,
              scrollTrigger: { trigger: headlineRef.current, start: "top 85%", once: true },
            }
          );
        }

        if (mascotRef.current) {
          gsap.fromTo(
            mascotRef.current,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 60%", once: true },
            }
          );
        }

        if (gridRef.current) {
          const cards = gridRef.current.querySelectorAll("[data-stat-card]");
          gsap.fromTo(
            cards,
            { y: 24, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
            }
          );

          cards.forEach((card, i) => {
            const hoverTilt = i % 2 === 0 ? -1.5 : 1.5;
            const enter = () =>
              gsap.to(card, { y: -4, rotate: hoverTilt, duration: 0.35, ease: "back.out(2)" });
            const leave = () =>
              gsap.to(card, { y: 0, rotate: 0, duration: 0.35, ease: "power2.out" });
            card.addEventListener("mouseenter", enter);
            card.addEventListener("mouseleave", leave);
          });
        }
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute top-10 right-[8%] hidden md:block">
        <Sticker size="lg" tilt={-10} float hoverBounce={false}>
          <StarSticker />
        </Sticker>
      </div>
      <div className="pointer-events-none absolute top-[42%] left-[5%] hidden md:block">
        <Sticker size="lg" tilt={-4} float hoverBounce={false}>
          <SparkleSticker />
        </Sticker>
      </div>
      <div className="pointer-events-none absolute top-[58%] right-[4%] hidden lg:block">
        <Sticker size="lg" tilt={8} float hoverBounce={false}>
          <LightningSticker />
        </Sticker>
      </div>
      <div className="pointer-events-none absolute top-[18%] left-[14%] hidden lg:block">
        <Sticker size="md" tilt={14} float hoverBounce={false}>
          <ChartSticker />
        </Sticker>
      </div>

      <div
        ref={mascotRef}
        className="pointer-events-none absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-40 sm:w-52 hidden md:block"
      >
        <ThanksMascot />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 text-center">
        {eyebrow && <p className="text-caption mb-5">{eyebrow}</p>}

        <h2
          ref={headlineRef}
          className="mx-auto max-w-[15ch] text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.95] tracking-[-0.02em]"
          style={{
            color: "var(--color-ink-950)",
            fontFamily: "var(--font-zagma), serif",
            fontWeight: 700,
          }}
        >
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.24em] align-top">
              <span className="sb-word inline-block will-change-transform">{w}</span>
            </span>
          ))}
        </h2>

        {subhead && (
          <p className="mt-6 mx-auto max-w-xl text-[15px] sm:text-base font-semibold text-ink-800 leading-relaxed">
            {subhead}
          </p>
        )}

        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-3 gap-3 sm:gap-4 max-w-[640px] mx-auto relative z-10"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              data-stat-card
              className="rounded-[var(--radius-card)] bg-brand-500 p-4 sm:p-5 aspect-[3/4] flex flex-col items-center justify-center shadow-soft"
            >
              <div
                className="text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold tracking-[-0.035em] leading-none text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.value}
              </div>
              <p className="mt-2 text-[11px] sm:text-[12px] font-semibold text-white/95 text-center leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
