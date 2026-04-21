"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { WordSwap } from "./word-swap";
import { Sticker } from "@/components/ui/sticker";
import { BigCursorSticker } from "@/components/stickers";
import { ArrowRight } from "lucide-react";
import { useGsapHoverPop } from "@/lib/gsap-hooks";

import brightwood from "@/logos/brightwood.svg";
import al from "@/logos/al.png";
import jh from "@/logos/jh.png";
import omura from "@/logos/omura.png";
import rAndR from "@/logos/r-and-r.png";
import tache from "@/logos/tache.webp";
import madrinas from "@/logos/madrinas.svg";
import brandA from "@/logos/brand-a.png";
import brandB from "@/logos/brand-b.svg";
import brandC from "@/logos/brand-c.svg";
import brandD from "@/logos/brand-d.svg";
import brandE from "@/logos/brand-e.png";
import brandF from "@/logos/brand-f.svg";
import brandG from "@/logos/brand-g.png";
import brandH from "@/logos/brand-h.webp";
import barbaraKatz from "@/logos/barbara-katz.webp";
import chused from "@/logos/chused.webp";

interface LogoItem {
  src: StaticImageData;
  alt: string;
  /** Apply CSS invert to flip white-on-transparent logos to dark so they read on a light pill. */
  invert?: boolean;
}

const logoStrip: LogoItem[] = [
  { src: brightwood, alt: "Brightwood" },
  { src: al, alt: "AL" },
  { src: jh, alt: "JH" },
  { src: omura, alt: "Omura" },
  { src: rAndR, alt: "R&R" },
  { src: tache, alt: "Tache" },
  { src: madrinas, alt: "Madrinas" },
  { src: brandA, alt: "Brand" },
  { src: brandB, alt: "Brand" },
  { src: brandC, alt: "Brand" },
  { src: brandD, alt: "Brand" },
  { src: brandE, alt: "Brand" },
  { src: brandF, alt: "Brand" },
  { src: brandG, alt: "Brand" },
  { src: brandH, alt: "Brand" },
  { src: barbaraKatz, alt: "Barbara Katz", invert: true },
  { src: chused, alt: "Chused & Co", invert: true },
];

const variants: string[] = [
  "that pays for itself",
  "that finds hidden revenue",
  "your competitors wish they had",
  "ranked by ROI",
];

export function ThanksHero() {
  const pillRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const ghostRef = useRef<HTMLAnchorElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGsapHoverPop(ctaRef, { scale: 1.05, rotate: -1.5 });
  useGsapHoverPop(ghostRef, { scale: 1.03, rotate: 0 });

  // GSAP-driven seamless marquee. The strip is rendered twice; we translate
  // the track from 0 to -halfWidth then repeat — because the halves are
  // identical, the reset is invisible. ResizeObserver re-measures when
  // images load or the viewport changes.
  useEffect(() => {
    const track = marqueeRef.current;
    if (!track) return;
    let cancelled = false;
    let tween: gsap.core.Tween | undefined;
    let ro: ResizeObserver | undefined;
    let gsapMod: typeof import("gsap").gsap | undefined;

    const start = () => {
      if (!gsapMod || !track) return;
      tween?.kill();
      gsapMod.set(track, { x: 0 });
      const halfWidth = track.scrollWidth / 2;
      if (!halfWidth) return;
      tween = gsapMod.to(track, {
        x: -halfWidth,
        duration: halfWidth / 60, // ~60 px/sec
        ease: "none",
        repeat: -1,
      });
    };

    const pause = () => tween?.pause();
    const resume = () => tween?.resume();

    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      gsapMod = gsap;
      start();
      ro = new ResizeObserver(() => start());
      ro.observe(track);
      track.addEventListener("mouseenter", pause);
      track.addEventListener("mouseleave", resume);
    })();

    return () => {
      cancelled = true;
      ro?.disconnect();
      tween?.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (pillRef.current) {
          tl.fromTo(
            pillRef.current,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55 }
          );
        }
        if (h1Ref.current) {
          tl.fromTo(
            h1Ref.current,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 },
            "-=0.25"
          );
        }
        if (subheadRef.current) {
          tl.fromTo(
            subheadRef.current,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            "-=0.4"
          );
        }
        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current,
            { scale: 0.92, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2)" },
            "-=0.35"
          );
        }
        if (ghostRef.current) {
          tl.fromTo(
            ghostRef.current,
            { scale: 0.92, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            "-=0.3"
          );
        }
      });
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-48 pb-10 sm:pb-14">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 flex flex-col items-center">
        <span
          ref={pillRef}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sky)] px-5 py-2 text-[14px] font-semibold text-ink-950"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-coral-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-coral-600" />
          </span>
          3 audit slots open this month
        </span>

        <h1
          ref={h1Ref}
          className="relative text-mega mt-8 sm:mt-10 text-center w-full"
          style={{ color: "var(--color-ink-950)" }}
        >
          <span className="block">The Shopify audit</span>
          <span className="block mt-1">
            <WordSwap phrases={variants} />
          </span>

          <Sticker
            size="lg"
            tilt={-10}
            className="absolute bottom-[-10%] right-[20%] sm:right-[26%] lg:right-[30%] z-10 pointer-events-none"
            float
            hoverBounce={false}
          >
            <BigCursorSticker />
          </Sticker>
        </h1>

        <p
          ref={subheadRef}
          className="mt-6 sm:mt-8 max-w-xl text-center text-[15px] sm:text-[17px] font-medium text-ink-800 leading-relaxed"
        >
          A hand-crafted conversion review of your Shopify storefront.
          Prioritized findings, annotated screenshots, and a 30-day rescan —
          delivered in 5 business days.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <a
            ref={ctaRef}
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 text-[15px] font-semibold text-ink-950 hover:bg-brand-600 transition-colors shadow-soft"
          >
            Get my audit — $750
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            ref={ghostRef}
            href="#what-you-get"
            className="inline-flex items-center rounded-full border-2 border-ink-900 bg-transparent px-7 py-3 text-[14px] font-semibold text-ink-900 hover:bg-ink-900 hover:text-white transition-colors"
          >
            See what&rsquo;s included
          </a>
        </div>

        <p className="mt-5 text-[12px] font-semibold text-ink-600 uppercase tracking-[0.12em]">
          Delivered in 5 business days · Hand-reviewed by humans · Free 30-day rescan
        </p>
      </div>

      <div className="mt-14 sm:mt-20">
        <p className="text-center text-[11px] font-bold text-ink-600 uppercase tracking-[0.16em] mb-6">
          A few of the brands we&rsquo;ve worked with
        </p>
        <div className="overflow-hidden py-4">
          <div
            ref={marqueeRef}
            className="flex items-center gap-5 sm:gap-7 whitespace-nowrap w-max will-change-transform"
          >
            {[...logoStrip, ...logoStrip].map((logo, i) => (
              <div
                key={`${logo.alt}-${i}`}
                className="logo-pill flex-shrink-0 h-14 px-7 rounded-full flex items-center justify-center bg-white/70 border border-ink-100 cursor-pointer"
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src.src}
                  alt={logo.alt}
                  className="object-contain"
                  style={{
                    height: "28px",
                    width: "auto",
                    maxWidth: "140px",
                    filter: logo.invert ? "invert(1)" : undefined,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
