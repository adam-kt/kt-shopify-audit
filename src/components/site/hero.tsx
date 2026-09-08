"use client";

/**
 * B2 — hero, with the storefront-review browser window.
 *
 * Adapted from @aceternity/hero-section-with-tabs (src/block/hero-section-with-tabs.tsx,
 * pristine). The browser chrome is thematically right for this product: the tabs
 * are the surfaces we audit, and the panel shows the actual review of each. That
 * also lets the hero absorb B7's "what we review" content, so `#what-you-get`
 * anchors here.
 *
 * Changed from upstream:
 *  - Ten template-preview tabs replaced with the four audit surfaces, using the
 *    local review screenshots.
 *  - `FEATURED_AVATARS` / `FeaturedImagesSimple` deleted outright — five remote
 *    portraits presented as customers, the same fabricated social proof as the
 *    Unsplash cluster in the block we rejected earlier.
 *  - All 13 remote images gone; every asset is local.
 *  - Copy is short and blunt by intent, and scoped to what this product can
 *    actually know. It reviews the interface and checks claims against live
 *    catalog data; it has no access to the merchant's analytics, session
 *    recordings or funnel. So the copy speaks to friction and opportunity
 *    ("what to make easier") and never to observed behaviour ("where people
 *    give up", "where buyers drop off") — that would need data we do not have.
 *    Same rule as the numbers: no outcome promises, no statistics. The upstream
 *    scarcity pill is gone; "3 slots open this month" was hardcoded.
 *  - Auto-rotation honours prefers-reduced-motion, and the tablist has proper
 *    tab/tabpanel semantics with arrow-key navigation, which upstream omits.
 */

import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoCloud } from "./logo-cloud";

import homepageTrust from "@/images/review/homepage-trust.png";
import productEvidence from "@/images/review/product-evidence.png";
import cartFunnel from "@/images/review/cart-funnel.png";
import mobileThumb from "@/images/review/mobile-thumb.png";

const HEADLINE_VARIANTS = [
  "loses sales.",
  "loses buyers.",
  "leaks money.",
  "breaks down.",
];

const TAB_ITEMS: { title: string; image: StaticImageData; alt: string }[] = [
  { title: "Homepage", image: homepageTrust, alt: "Homepage trust and clarity review" },
  { title: "Product pages", image: productEvidence, alt: "Product page evidence review" },
  { title: "Cart & checkout", image: cartFunnel, alt: "Cart and checkout funnel review" },
  { title: "Mobile", image: mobileThumb, alt: "Mobile experience review" },
];

const ROTATE_MS = 10000;
/** Long enough to read the whole sentence before it changes. */
const HEADLINE_MS = 4200;

export function SiteHero() {
  return (
    <section className="mx-auto w-full max-w-7xl min-w-0 px-4 pt-28 pb-8 md:px-8 md:pt-36 md:pb-12 lg:px-12">
      <div className="flex w-full min-w-0 flex-col items-start">
        <p className="text-muted-foreground mb-4 text-sm font-semibold tracking-[0.14em] uppercase">
          Shopify conversion audit
        </p>

        <h1 className="relative max-w-5xl text-left text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl xl:text-7xl">
          Where your store <RotatingHeadline />
        </h1>

        <div className="mt-6 flex w-full flex-col items-start justify-between gap-4 md:mt-10 md:flex-row md:items-end md:gap-10">
          <div>
            <p className="text-muted-foreground relative mb-8 max-w-2xl text-left text-sm tracking-wide antialiased sm:text-base md:text-lg">
              Most stores have more worth fixing than there&rsquo;s time to fix.
              We go through every page, then tell you which handful actually
              matters and show you exactly where each one is.
            </p>

            <div className="relative mb-4 flex w-full flex-col justify-center gap-y-2 sm:flex-row sm:justify-start sm:space-y-0 sm:space-x-4">
              <Link
                href="#pricing"
                className="bg-primary text-primary-foreground flex h-14 w-full items-center justify-center gap-2 rounded-lg text-center text-base font-medium shadow-sm transition duration-150 active:scale-98 sm:w-52"
              >
                Get my audit for $750
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#what-you-get"
                className="bg-card flex h-14 w-full items-center justify-center rounded-lg border text-base font-medium shadow-sm transition duration-150 active:scale-98 sm:w-52"
              >
                See what you get
              </Link>
            </div>

            <p className="text-muted-foreground mt-6 text-xs font-semibold uppercase tracking-[0.12em]">
              Five business days &middot; Every number checked against your
              store &middot; Free rescan
            </p>
          </div>

          {/* Upstream put its avatar cluster here. Client logos carry the same
              weight without inventing customers. */}
          <LogoCloud className="shrink-0" />
        </div>

        <ReviewWindow />
      </div>
    </section>
  );
}

const RotatingHeadline = () => {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % HEADLINE_VARIANTS.length),
      HEADLINE_MS
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  if (reduceMotion) {
    return <span className="block">{HEADLINE_VARIANTS[0]}</span>;
  }

  return (
    <span className="block overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ y: "0.6em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.6em", opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="inline-block"
        >
          {HEADLINE_VARIANTS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export const ReviewWindow = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedItem = TAB_ITEMS[selectedIndex];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const reduceMotion = useReducedMotion();

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (reduceMotion) return;
    intervalRef.current = setInterval(
      () => setSelectedIndex((i) => (i + 1) % TAB_ITEMS.length),
      ROTATE_MS
    );
  }, [reduceMotion]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const select = (index: number) => {
    setSelectedIndex(index);
    startInterval();
  };

  // Arrow-key navigation, per the WAI-ARIA tabs pattern.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") select((selectedIndex + 1) % TAB_ITEMS.length);
    if (e.key === "ArrowLeft")
      select((selectedIndex - 1 + TAB_ITEMS.length) % TAB_ITEMS.length);
  };

  return (
    <div
      id="what-you-get"
      className="relative my-8 flex w-full scroll-mt-28 flex-col items-start justify-start overflow-hidden rounded-2xl shadow-2xl md:my-12"
    >
      <div className="bg-muted flex w-full items-center justify-start overflow-hidden py-4 pl-4">
        <div className="mr-6 flex items-center gap-2" aria-hidden>
          <div className="size-3 rounded-full bg-red-500" />
          <div className="size-3 rounded-full bg-yellow-500" />
          <div className="size-3 rounded-full bg-green-500" />
        </div>
        <div
          role="tablist"
          aria-label="Surfaces we review"
          onKeyDown={onKeyDown}
          className="no-visible-scrollbar flex min-w-0 shrink flex-row items-center justify-start gap-2 overflow-x-auto py-0.5 pr-2 pl-2 md:pl-4"
        >
          {TAB_ITEMS.map((item, index) => (
            <React.Fragment key={item.title}>
              <button
                role="tab"
                id={`review-tab-${index}`}
                aria-selected={selectedIndex === index}
                aria-controls="review-panel"
                tabIndex={selectedIndex === index ? 0 : -1}
                onClick={() => select(index)}
                className={cn(
                  "hover:bg-background flex min-h-11 shrink-0 items-center gap-1 rounded-md px-3 text-xs transition duration-150 sm:text-sm",
                  selectedIndex === index && "bg-background shadow ring-1 ring-black/10"
                )}
              >
                {item.title}
              </button>
              {index !== TAB_ITEMS.length - 1 && (
                <div className="bg-border h-4 w-px shrink-0 rounded-full" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-card perspective-distant w-full overflow-hidden px-4 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedItem.title}
            id="review-panel"
            role="tabpanel"
            aria-labelledby={`review-tab-${selectedIndex}`}
            initial={{ opacity: 0, scale: 0.99, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-background relative h-100 overflow-hidden rounded-tl-xl rounded-tr-xl shadow-sm ring-1 shadow-black/10 ring-black/10 will-change-transform sm:h-140 md:h-180"
          >
            <Image
              src={selectedItem.image}
              alt={selectedItem.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              placeholder="blur"
              className="object-cover object-top"
              priority={selectedIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
