"use client";

import { useEffect, useRef } from "react";

/**
 * Effect 049 — Letters pinned and falling into place at different speeds.
 *
 * Structure matches the original:
 * - Each "movie" section has a 100vh .container holding ONLY the title
 * - The title is pinned inside the container
 * - Bottom content sits OUTSIDE the container, scrolling in naturally
 * - Letters each have a random y-offset and travel to 0 on scrub
 */

interface GravitySection {
  title: string;
  description: string;
  info: string;
}

const sections: GravitySection[] = [
  {
    title: "Find the friction",
    description:
      "We analyze every page of your Shopify storefront — homepage, collections, PDPs, cart, mobile — identifying the UX issues that are quietly costing you conversion and revenue.",
    info: "Storefront analysis\n2025\nKnock Twice",
  },
  {
    title: "Fix the revenue",
    description:
      "You receive prioritized, actionable recommendations with annotated screenshots and a 30-day automated re-scan. Not vague strategy — specific fixes your team can implement immediately.",
    info: "Audit deliverable\n2025\nKnock Twice",
  },
];

export function GravityText() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!rootRef.current) return;

      ctx = gsap.context(() => {
        // Each .gt-box is 100vh and holds just the title
        const boxes =
          rootRef.current!.querySelectorAll<HTMLElement>(".gt-box");

        boxes.forEach((box) => {
          const title = box.querySelector(".gt-title") as HTMLElement;
          if (!title) return;

          const dist = box.clientHeight - title.clientHeight;

          // Pin the title inside the 100vh box
          ScrollTrigger.create({
            trigger: box,
            pin: title,
            start: "top top",
            end: "+=" + dist,
          });

          // Animate each letter
          const letters = title.querySelectorAll("span");
          letters.forEach((letter) => {
            const randomDistance = Math.random() * dist;

            gsap.from(letter, {
              y: randomDistance,
              ease: "none",
              scrollTrigger: {
                trigger: title,
                start: "top top",
                end: "+=" + randomDistance,
                scrub: true,
              },
            });
          });
        });
      }, rootRef.current);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={rootRef} style={{ paddingTop: "100vh" }}>
      {sections.map((section, si) => (
        <section key={si} className="gt-movie">
          {/* 100vh container — holds ONLY the title */}
          <div className="gt-box uppercase" style={{ height: "100vh" }}>
            <h2
              className="gt-title text-ink-900 px-6 sm:px-10 lg:px-12"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 10vw, 10rem)",
                lineHeight: 1,
                letterSpacing: "-0.045em",
              }}
            >
              {section.title.split("").map((char, ci) =>
                char === " " ? (
                  <span
                    key={ci}
                    className="inline-block will-change-transform"
                  >
                    &nbsp;
                  </span>
                ) : (
                  <span
                    key={ci}
                    className="inline-block will-change-transform"
                  >
                    {char}
                  </span>
                )
              )}
            </h2>
          </div>

          {/* Bottom content — OUTSIDE the pinned container, scrolls naturally */}
          <div className="flex flex-col sm:flex-row justify-between w-full px-6 sm:px-10 lg:px-12 py-6 gap-6">
            <p className="text-[11px] font-bold text-ink-500 tracking-[0.14em] uppercase whitespace-pre-line">
              {section.info}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <p
                className="max-w-md text-[15px] text-ink-700 leading-relaxed"
                style={{ textIndent: "6vw", letterSpacing: "-0.005em" }}
              >
                {section.description}
              </p>
              <div
                className="flex-shrink-0 rounded-[var(--radius-card)] bg-coral-100 border border-coral-200 flex items-center justify-center"
                style={{ width: "min(28vw, 400px)", aspectRatio: "1.6" }}
              >
                <p className="text-caption text-coral-700">
                  Audit preview
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
