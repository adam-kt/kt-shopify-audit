"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Reusable GSAP hooks. Each hook lazily imports gsap and cleans up on
 * unmount. We use `fromTo` (not `from`) so the target state is explicit —
 * this survives React strict-mode's double-invocation gracefully.
 */

interface UseGsapInOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  scroll?: boolean | { start?: string; once?: boolean };
  delay?: number;
  /** If set, tween these children instead of the ref element itself. */
  selector?: string;
  stagger?: number;
}

const defaultFrom: gsap.TweenVars = { opacity: 0, y: 28 };
const defaultTo: gsap.TweenVars = {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power3.out",
};

export function useGsapIn<T extends HTMLElement>(
  ref: RefObject<T | null>,
  opts: UseGsapInOptions = {}
) {
  const optsRef = useRef(opts);
  optsRef.current = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const o = optsRef.current;
      const target = o.selector ? el.querySelectorAll(o.selector) : el;
      if (o.selector && (target as NodeList).length === 0) return;

      ctx = gsap.context(() => {
        const fromVars: gsap.TweenVars = { ...defaultFrom, ...(o.from ?? {}) };
        const toVars: gsap.TweenVars = { ...defaultTo, ...(o.to ?? {}) };
        if (o.delay) toVars.delay = o.delay;
        if (o.stagger && o.selector) toVars.stagger = o.stagger;

        if (o.scroll) {
          const scrollCfg =
            typeof o.scroll === "object" ? o.scroll : { start: "top 85%", once: true };
          toVars.scrollTrigger = {
            trigger: el,
            start: scrollCfg.start ?? "top 85%",
            toggleActions:
              scrollCfg.once === false ? "play none none reverse" : "play none none none",
            once: scrollCfg.once !== false,
          };
        }
        gsap.fromTo(target, fromVars, toVars);
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ref]);
}

/**
 * Continuously float a target up-and-down via a yoyo tween. Idempotent.
 */
export function useGsapFloat<T extends HTMLElement>(
  ref: RefObject<T | null>,
  opts: { y?: number; duration?: number; delay?: number; rotate?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.to(el, {
          y: -(opts.y ?? 6),
          rotate: opts.rotate,
          duration: opts.duration ?? 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: opts.delay ?? 0,
        });
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ref, opts.y, opts.duration, opts.delay, opts.rotate]);
}

/**
 * Pop/scale hover effect for an interactive element.
 */
export function useGsapHoverPop<T extends HTMLElement>(
  ref: RefObject<T | null>,
  opts: { scale?: number; rotate?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let gsapMod: typeof import("gsap").gsap | undefined;
    let cancelled = false;
    const cleanupFns: Array<() => void> = [];

    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      gsapMod = gsap;
      const scale = opts.scale ?? 1.04;
      const rotate = opts.rotate ?? 0;

      const enter = () =>
        gsap.to(el, { scale, rotate, duration: 0.35, ease: "back.out(2)" });
      const leave = () =>
        gsap.to(el, { scale: 1, rotate: 0, duration: 0.35, ease: "power2.out" });
      const down = () =>
        gsap.to(el, { scale: scale * 0.95, duration: 0.12, ease: "power2.out" });
      const up = () =>
        gsap.to(el, { scale, duration: 0.2, ease: "back.out(2)" });

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointerup", up);

      cleanupFns.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointerup", up);
      });
    })();

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
      gsapMod?.killTweensOf(el);
    };
  }, [ref, opts.scale, opts.rotate]);
}
