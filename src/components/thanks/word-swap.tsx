"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface WordSwapProps {
  /** Flat list of phrases — one line each — that cycle in the same slot. */
  phrases: string[];
  /** How long each phrase stays on screen (ms). Default 2600ms. */
  pauseMs?: number;
  /** Delay before the first swap, on mount (ms). Default 1200ms. */
  initialDelayMs?: number;
  className?: string;
}

/**
 * Two stacked spans that crossfade: the outgoing phrase slides up and blurs
 * out at the same time the incoming phrase slides in and sharpens from below.
 * Roles alternate each cycle so the effect loops seamlessly.
 */
export function WordSwap({
  phrases,
  pauseMs = 2600,
  initialDelayMs = 1200,
  className,
}: WordSwapProps) {
  const aRef = useRef<HTMLSpanElement>(null);
  const bRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b || phrases.length === 0) return;
    let cancelled = false;
    let tl: gsap.core.Timeline | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;

      // Seed initial state: A shows phrase 0, B is parked below with phrase 1.
      a.textContent = phrases[0];
      b.textContent = phrases[1 % phrases.length];
      gsap.set(a, { yPercent: 0, opacity: 1, filter: "blur(0px)" });
      gsap.set(b, { yPercent: 100, opacity: 0, filter: "blur(10px)" });

      const hold = pauseMs / 1000;
      const swap = 0.75;
      const ease = "power3.inOut";

      tl = gsap.timeline({ defaults: { force3D: true } });

      // Shorter delay before the very first swap — runs once on mount.
      tl.to({}, { duration: initialDelayMs / 1000 });

      // Looping body: swap → hold. After phrases.length cycles the state
      // realigns with the seeded state, so repeat is seamless.
      const loop = gsap.timeline({ repeat: -1 });
      for (let i = 0; i < phrases.length; i += 1) {
        const outEl = i % 2 === 0 ? a : b;
        const inEl = i % 2 === 0 ? b : a;
        const nextText = phrases[(i + 2) % phrases.length];

        loop
          .to(outEl, {
            yPercent: -100,
            opacity: 0,
            filter: "blur(10px)",
            duration: swap,
            ease,
          })
          .to(
            inEl,
            { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: swap, ease },
            "<"
          )
          .set(outEl, {
            yPercent: 100,
            opacity: 0,
            filter: "blur(10px)",
            onComplete: () => {
              outEl.textContent = nextText;
            },
          })
          .to({}, { duration: hold });
      }

      tl.add(loop);
    })();

    return () => {
      cancelled = true;
      tl?.kill();
    };
  }, [phrases, pauseMs, initialDelayMs]);

  return (
    <span
      className={cn(
        "relative block w-full leading-[inherit] overflow-hidden",
        className
      )}
      style={{ height: "1em" }}
    >
      <span
        ref={aRef}
        className="absolute inset-0 block whitespace-nowrap will-change-transform text-center"
      />
      <span
        ref={bRef}
        className="absolute inset-0 block whitespace-nowrap will-change-transform text-center"
      />
    </span>
  );
}
