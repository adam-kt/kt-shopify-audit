"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ShowcaseImageProps {
  src?: StaticImageData | string;
  alt?: string;
  tone?: "peach" | "tan" | "cream";
  className?: string;
}

const toneStyles = {
  peach: "bg-[var(--color-peach)]",
  tan: "bg-[var(--color-tan)]",
  cream: "bg-[var(--color-cream-soft)]",
};

/**
 * Full-bleed rounded image band. GSAP ScrollTrigger shrinks it slightly as
 * you scroll past — the effect is subtle and uses `scrub` for smoothness.
 */
export function ShowcaseImage({ src, alt = "", tone = "peach", className }: ShowcaseImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { scale: 1, borderRadius: "40px" },
          {
            scale: 0.93,
            borderRadius: "56px",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 10%",
              end: "bottom top",
              scrub: 0.4,
            },
          }
        );
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div
        ref={wrapRef}
        className={cn(
          "mx-auto max-w-[1600px] overflow-hidden relative aspect-[16/9] sm:aspect-[21/9] origin-top will-change-transform",
          toneStyles[tone],
          className
        )}
        style={{ borderRadius: "40px" }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 1600px"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-caption">Product showcase image</span>
          </div>
        )}
      </div>
    </section>
  );
}
