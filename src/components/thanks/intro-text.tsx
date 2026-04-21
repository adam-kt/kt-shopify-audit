"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface IntroTextProps {
  children: ReactNode;
}

/**
 * Centered, thanks.co-style intro text. Each word starts dim (ink-300) and
 * fills in to solid ink-950 as the section scrolls through the viewport.
 * The fill is a GSAP ScrollTrigger scrub so it tracks the scroll position 1:1.
 */
export function IntroText({ children }: IntroTextProps) {
  const pRef = useRef<HTMLParagraphElement>(null);

  // Turn string children into per-word spans for the fill animation.
  const renderContent = () => {
    if (typeof children === "string") {
      return children.split(/\s+/).map((w, i) => (
        <span key={i} className="inline-block mr-[0.26em]">
          <span data-fill-word className="inline-block">
            {w}
          </span>
        </span>
      ));
    }
    return (
      <span data-fill-word className="inline-block">
        {children}
      </span>
    );
  };

  useEffect(() => {
    const el = pRef.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const words = el.querySelectorAll("[data-fill-word]");
        gsap.fromTo(
          words,
          { color: "#d4d4d4" },
          {
            color: "#0a0a0a",
            ease: "none",
            stagger: 0.4,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 40%",
              scrub: true,
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
    <section className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 py-20 sm:py-28 lg:py-36">
      <p
        ref={pRef}
        className="mx-auto max-w-3xl text-center text-[22px] sm:text-[30px] lg:text-[34px] font-extrabold leading-[1.25] tracking-[-0.015em]"
      >
        {renderContent()}
      </p>
    </section>
  );
}
