"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { useGsapIn } from "@/lib/gsap-hooks";

type BandTone = "golden" | "brand" | "lilac" | "mint";

const bandStyles: Record<BandTone, string> = {
  golden: "bg-[var(--color-golden)]",
  brand: "bg-brand-500",
  lilac: "bg-[var(--color-lilac)]",
  mint: "bg-[var(--color-mint)]",
};

export interface CarouselSlide {
  label: string;
  title: string;
  body: string;
  tone?: "brand" | "peach" | "tan" | "mint" | "sky" | "lilac";
  image?: StaticImageData;
  imageAlt?: string;
  /** Optional floating accent rendered outside the card edges. */
  sticker?: React.ReactNode;
}

export interface TabBandProps {
  id?: string;
  tone: BandTone;
  eyebrow?: string;
  headline: React.ReactNode;
  subhead?: string;
  slides: CarouselSlide[];
}

// The accent class is the colored strip across the top of every card — it
// mirrors the pricing card's h-2 brand bar so these carousels feel like the
// same family of paper-card deliverables.
const slideAccentClass: Record<NonNullable<CarouselSlide["tone"]>, string> = {
  brand: "bg-brand-500",
  peach: "bg-[var(--color-peach)]",
  tan: "bg-[var(--color-tan)]",
  mint: "bg-[var(--color-mint)]",
  sky: "bg-[var(--color-sky)]",
  lilac: "bg-[var(--color-lilac)]",
};

// Shared GSAP singleton so subsequent carousels don't re-trigger the dynamic
// import — first mount pays the cost once, every click after is synchronous.
let gsapSingleton: typeof import("gsap").gsap | null = null;
let gsapPromise: Promise<typeof import("gsap").gsap> | null = null;
function loadGsap() {
  if (gsapSingleton) return Promise.resolve(gsapSingleton);
  if (!gsapPromise) {
    gsapPromise = import("gsap").then((m) => {
      gsapSingleton = m.gsap;
      return m.gsap;
    });
  }
  return gsapPromise;
}

/**
 * Peek carousel — neighbouring slides partially visible, driven by a single
 * GSAP timeline per transition so every element (strip x, slide opacity/scale/blur)
 * moves together with the same ease. `overwrite: "auto"` handles rapid clicks
 * gracefully; `force3D: true` keeps the strip on the GPU compositor.
 */
export function TabBand({ id, tone, eyebrow, headline, subhead, slides }: TabBandProps) {
  const [active, setActive] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useGsapIn(headlineRef, {
    from: { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
    scroll: true,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const strip = stripRef.current;
    if (!wrap || !strip) return;

    let cancelled = false;
    let gsap: typeof import("gsap").gsap | undefined;

    const runTween = (instant: boolean) => {
      if (!gsap || !wrap || !strip) return;
      const slideEls = strip.querySelectorAll<HTMLElement>("[data-slide]");
      const activeIdx = activeRef.current;
      const activeEl = slideEls[activeIdx];
      if (!activeEl) return;

      const wrapW = wrap.getBoundingClientRect().width;
      const slideW = activeEl.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(strip).columnGap || "0") || 0;
      const stride = slideW + gap;
      const x = (wrapW - slideW) / 2 - activeIdx * stride;

      const duration = instant ? 0 : 0.8;
      const tl = gsap.timeline({
        defaults: {
          duration,
          ease: "expo.out",
          overwrite: "auto",
          force3D: true,
        },
      });

      tl.to(strip, { x }, 0);
      slideEls.forEach((el, i) => {
        const isActive = i === activeIdx;
        tl.to(
          el,
          {
            opacity: isActive ? 1 : 0.4,
            scale: isActive ? 1 : 0.92,
            filter: isActive ? "blur(0px)" : "blur(2px)",
          },
          0
        );
      });
    };

    (async () => {
      gsap = await loadGsap();
      if (cancelled) return;
      // Snap to initial position instantly so first paint has no jump.
      runTween(true);
    })();

    const onResize = () => runTween(true);
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Animate on active change.
  useEffect(() => {
    if (!gsapSingleton || !wrapRef.current || !stripRef.current) return;
    const gsap = gsapSingleton;
    const wrap = wrapRef.current;
    const strip = stripRef.current;

    const slideEls = strip.querySelectorAll<HTMLElement>("[data-slide]");
    const activeEl = slideEls[active];
    if (!activeEl) return;

    const wrapW = wrap.getBoundingClientRect().width;
    const slideW = activeEl.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(strip).columnGap || "0") || 0;
    const x = (wrapW - slideW) / 2 - active * (slideW + gap);

    const tl = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: "expo.out",
        overwrite: "auto",
        force3D: true,
      },
    });
    tl.to(strip, { x }, 0);
    slideEls.forEach((el, i) => {
      const isActive = i === active;
      tl.to(
        el,
        {
          opacity: isActive ? 1 : 0.4,
          scale: isActive ? 1 : 0.92,
          filter: isActive ? "blur(0px)" : "blur(2px)",
        },
        0
      );
    });
  }, [active]);

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card-lg)] mx-4 sm:mx-6 lg:mx-10",
        bandStyles[tone],
        "py-16 sm:py-24"
      )}
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 text-center">
        {eyebrow && <p className="text-caption mb-5 text-ink-950/70">{eyebrow}</p>}
        <h2
          ref={headlineRef}
          className="text-display mx-auto max-w-[18ch]"
          style={{ color: "var(--color-ink-950)" }}
        >
          {headline}
        </h2>
        {subhead && (
          <p className="mt-6 mx-auto max-w-xl text-[15px] sm:text-base font-semibold text-ink-900 leading-relaxed">
            {subhead}
          </p>
        )}
      </div>

      {/* Peek carousel stage. py-10 gives the stickers (-top-6/-bottom-6)
          room inside the overflow-hidden clip so they don't get trimmed. */}
      <div ref={wrapRef} className="relative mt-12 sm:mt-14 py-10 overflow-hidden">
        <div
          ref={stripRef}
          className="flex gap-6 sm:gap-8"
          style={{ willChange: "transform" }}
        >
          {slides.map((slide, i) => {
            const accent = slideAccentClass[slide.tone ?? "brand"];
            return (
              <div
                key={i}
                data-slide
                onClick={() => setActive(i)}
                className="relative flex-shrink-0 basis-[min(72vw,760px)] aspect-[5/3] cursor-pointer"
                style={{
                  opacity: i === 0 ? 1 : 0.4,
                  transform: "scale(1)",
                  willChange: "transform, opacity, filter",
                }}
                aria-hidden={i !== active}
              >
                {/* Sticker peeks outside the card edge — rendered on the
                    wrapper (not the card) so the card's overflow-hidden
                    doesn't clip it. */}
                {slide.sticker}

                <article className="relative h-full rounded-[var(--radius-card-lg)] bg-white border-2 border-ink-950 shadow-soft-lg overflow-hidden flex">
                  {/* Thick colored accent strip across the top — matches the
                      pricing card's h-2 brand bar. */}
                  <div className={cn("absolute top-0 left-0 right-0 h-2 z-10", accent)} />

                  {slide.image && (
                    <div className="relative w-1/2 h-full bg-ink-50 border-r-2 border-ink-950">
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt ?? ""}
                        fill
                        sizes="(max-width: 768px) 36vw, 380px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={cn(
                      "flex flex-col justify-center p-8 sm:p-12",
                      slide.image ? "w-1/2" : "w-full"
                    )}
                  >
                    <span className="text-caption text-ink-600 mb-3 self-start">
                      {slide.label}
                    </span>
                    <h3 className="text-[clamp(1.25rem,2.2vw,2rem)] font-extrabold tracking-[-0.015em] leading-[1.08] text-ink-950">
                      {slide.title}
                    </h3>
                    <p className="mt-3 text-[13px] sm:text-[14px] font-medium leading-relaxed text-ink-700 max-w-md">
                      {slide.body}
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pill navigation */}
      {slides.length > 1 && (
        <div className="mt-10 flex justify-center px-6">
          <div
            className="inline-flex items-center rounded-full bg-white/30 p-1.5"
            role="tablist"
            aria-label="Carousel navigation"
          >
            {slides.map((s, i) => (
              <button
                key={s.label}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "px-5 sm:px-8 py-2.5 rounded-full text-[13px] sm:text-sm font-semibold transition-colors",
                  i === active
                    ? "bg-white text-ink-950 shadow-soft"
                    : "text-ink-900 hover:bg-white/30"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
