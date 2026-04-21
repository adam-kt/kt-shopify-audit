"use client";

import { useEffect, useRef } from "react";

export function ScrollVelocityText() {
  const contentRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLParagraphElement>(null);
  const gsapRef = useRef<typeof import("gsap").gsap | null>(null);
  const tickerRef = useRef<((time: number, dt: number) => void) | null>(null);

  useEffect(() => {
    let wheelHandler: ((e: WheelEvent) => void) | undefined;

    (async () => {
      const mod = await import("gsap");
      const gsap = mod.gsap;
      gsapRef.current = gsap;

      if (!contentRef.current || !phraseRef.current) return;

      const half = phraseRef.current.clientWidth;
      const wrap = gsap.utils.wrap(-half, 0);

      let wheel = 0;
      let total = 0;

      const xTo = gsap.quickTo(contentRef.current, "x", {
        duration: 0.5,
        ease: "power3",
        modifiers: {
          x: gsap.utils.unitize(wrap),
        },
      });

      const tick = (_time: number, dt: number) => {
        total -= wheel + dt / 5;
        xTo(total);
      };
      tickerRef.current = tick;
      gsap.ticker.add(tick);

      let isWheeling: ReturnType<typeof setTimeout>;
      wheelHandler = (e: WheelEvent) => {
        wheel = e.deltaY;
        clearTimeout(isWheeling);
        isWheeling = setTimeout(() => {
          wheel = 0;
        }, 66);
      };
      window.addEventListener("wheel", wheelHandler, { passive: true });
    })();

    return () => {
      if (wheelHandler) window.removeEventListener("wheel", wheelHandler);
      if (gsapRef.current && tickerRef.current) {
        gsapRef.current.ticker.remove(tickerRef.current);
      }
    };
  }, []);

  const phrase =
    "Trusted by growing Shopify brands \u00A0★\u00A0 Conversion-first \u00A0★\u00A0 5-day turnaround \u00A0★\u00A0 Prioritized fixes \u00A0★\u00A0 Real humans \u00A0★\u00A0 ";

  return (
    <section className="overflow-hidden border-y-2 border-ink-900 bg-coral-600 text-white">
      <div
        className="flex items-center py-5 sm:py-7"
        style={{ transform: "rotate(-2deg)", margin: "-1.25rem -2rem" }}
      >
        <div
          ref={contentRef}
          className="flex will-change-transform whitespace-nowrap"
        >
          <p
            ref={phraseRef}
            className="text-[clamp(2.5rem,7vw,6rem)] font-extrabold uppercase tracking-[-0.03em] whitespace-nowrap leading-none"
          >
            {phrase}
          </p>
          <p className="text-[clamp(2.5rem,7vw,6rem)] font-extrabold uppercase tracking-[-0.03em] whitespace-nowrap leading-none">
            {phrase}
          </p>
        </div>
      </div>
    </section>
  );
}
