"use client";

import { useEffect, useRef } from "react";

/**
 * Effect 014 — Playful card stack: cards spawn at random positions on wheel scroll.
 * Uses inline styles because the DOM is created dynamically.
 */

const cardPlaceholders = [
  { label: "Homepage audit", tone: "#c9ecd5" },
  { label: "Product page", tone: "#ffd6da" },
  { label: "Mobile UX", tone: "#dcd4ff" },
  { label: "Cart review", tone: "#fff0b8" },
  { label: "Navigation", tone: "#cfe7ff" },
  { label: "Collection page", tone: "#ffd3b6" },
  { label: "Checkout flow", tone: "#f5e8f7" },
  { label: "Trust signals", tone: "#c9ecd5" },
];

const sizes = ["28vw", "26vw", "24vw", "22vw", "20vw"];

export function StackingImages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const incrRef = useRef(0);
  const indexRef = useRef(0);
  const gsapRef = useRef<typeof import("gsap").gsap | null>(null);

  useEffect(() => {
    let wheelHandler: ((e: WheelEvent) => void) | undefined;

    (async () => {
      const mod = await import("gsap");
      gsapRef.current = mod.gsap;

      if (!sectionRef.current) return;

      wheelHandler = (e: WheelEvent) => {
        if (!sectionRef.current || !gsapRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        incrRef.current += Math.abs(e.deltaY);

        if (incrRef.current > 600) {
          spawnCard();
          incrRef.current = 0;
        }
      };

      window.addEventListener("wheel", wheelHandler, { passive: true });
    })();

    return () => {
      if (wheelHandler) window.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  function spawnCard() {
    const gsap = gsapRef.current;
    const root = sectionRef.current;
    if (!gsap || !root) return;

    const sizeIndex = Math.floor(Math.random() * sizes.length);
    const data = cardPlaceholders[indexRef.current];

    const el = document.createElement("div");
    el.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${sizes[sizeIndex]};
      aspect-ratio: 4/3;
      border-radius: 24px;
      background: ${data.tone};
      border: 2px solid #141414;
      display: flex;
      align-items: center;
      justify-content: center;
      will-change: transform;
      box-shadow: 0 12px 28px -12px rgba(20,20,20,0.3);
    `;
    el.innerHTML = `<span style="font-family:var(--font-sans);font-size:14px;font-weight:700;color:#141414;letter-spacing:-0.01em">${data.label}</span>`;

    root.appendChild(el);

    gsap.fromTo(
      el,
      {
        xPercent: -50 + (Math.random() - 0.5) * 150,
        yPercent: -50 + (Math.random() - 0.5) * 30,
        rotation: (Math.random() - 0.5) * 20,
        scaleX: 1.05,
        scaleY: 1.2,
      },
      {
        scaleX: 1,
        scaleY: 1,
        ease: "power4.out",
        duration: 0.15,
      }
    );

    gsap.to(el, {
      scaleX: 0.9,
      scaleY: 0.9,
      opacity: 0,
      ease: "power4.in",
      duration: 0.25,
      delay: 2,
      onComplete: () => {
        if (root.contains(el)) root.removeChild(el);
      },
    });

    indexRef.current = (indexRef.current + 1) % cardPlaceholders.length;
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[var(--color-cream)]"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-0 pointer-events-none max-w-md px-6">
        <p className="text-caption text-coral-600 mb-4">Scroll to explore</p>
        <h2 className="text-headline text-ink-900">
          Every page. Every screen. <span className="text-coral-600">Every friction point.</span>
        </h2>
      </div>
    </section>
  );
}
