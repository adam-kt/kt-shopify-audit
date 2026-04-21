"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SuperHeadlineProps {
  children: React.ReactNode;
  eyebrow?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Scroll-triggered reveal: each word rises from below with a staggered GSAP
 * timeline. Mirrors the feel of thanks.co's big-headline transitions.
 */
export function SuperHeadline({
  children,
  eyebrow,
  align = "center",
  className,
}: SuperHeadlineProps) {
  const h2Ref = useRef<HTMLHeadingElement>(null);

  const renderContent = () => {
    if (typeof children === "string") {
      return children.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
          <span className="sh-word inline-block will-change-transform">{w}</span>
        </span>
      ));
    }
    return <span className="sh-word inline-block">{children}</span>;
  };

  useEffect(() => {
    const el = h2Ref.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const words = el.querySelectorAll(".sh-word");
        gsap.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
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
    <section
      className={cn(
        "mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 py-20 sm:py-28 lg:py-36",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && <p className="text-caption mb-5 text-ink-600">{eyebrow}</p>}
      <h2
        ref={h2Ref}
        className={`text-mega mx-auto ${align === "center" ? "max-w-[16ch]" : ""}`}
        style={{ color: "var(--color-ink-950)" }}
      >
        {renderContent()}
      </h2>
    </section>
  );
}
