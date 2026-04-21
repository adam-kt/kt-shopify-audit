"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CircleLogo } from "./circle-logo";
import { useGsapHoverPop } from "@/lib/gsap-hooks";

// Use root-prefixed fragments so the nav returns to the landing page and
// scrolls to the section, regardless of which route is active.
const navLinks = [
  { href: "/#what-you-get", label: "What we review" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function ThanksHeader() {
  const navRef = useRef<HTMLElement>(null);
  const logoLinkRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useGsapHoverPop(ctaRef, { scale: 1.04, rotate: -1.2 });

  useEffect(() => {
    let cancelled = false;
    let gsapMod: typeof import("gsap").gsap | undefined;

    const onScroll = () => {
      if (!gsapMod || !navRef.current || !logoLinkRef.current) return;
      const scrolled = window.scrollY > 20;
      gsapMod.to(navRef.current, {
        backgroundColor: scrolled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0)",
        boxShadow: scrolled
          ? "0 10px 30px -18px rgba(0,0,0,0.15)"
          : "0 0 0 0 rgba(0,0,0,0)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsapMod.to(logoLinkRef.current, {
        scale: scrolled ? 0.82 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      gsapMod = gsap;
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    })();

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:px-14 pt-4 sm:pt-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link ref={logoLinkRef} href="/" className="origin-center inline-block" aria-label="Home">
            <CircleLogo size={76} />
          </Link>

          <nav
            ref={navRef}
            aria-label="Main navigation"
            className={cn(
              "hidden lg:flex items-center gap-1 rounded-full backdrop-blur-md px-2 py-1.5"
            )}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[14px] font-semibold text-ink-900 rounded-full hover:bg-ink-900/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            ref={ctaRef}
            href="/#pricing"
            className="inline-flex items-center rounded-full bg-ink-950 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold text-white hover:bg-ink-800 transition-colors shadow-soft"
          >
            Get my audit
          </a>
          <button
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/70 backdrop-blur-md text-ink-900 hover:bg-ink-100 transition-colors shadow-soft"
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
