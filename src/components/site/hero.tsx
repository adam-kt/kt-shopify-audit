"use client";

/**
 * B2 — hero.
 *
 * Adapted from @aceternity/minimal-hero-section-with-parallax-images
 * (src/block/minimal-hero-section-with-parallax-images.tsx, pristine).
 *
 * Chosen over hero-section-with-images-grid-and-navbar and
 * hero-with-framed-image-and-logos: at ~3k it is the smallest of the candidates,
 * depends only on motion, and its parallax image stack is exactly where the
 * local device shots go. The 59k alternative was two-thirds inline SVG path data
 * for eight other companies' logos, all of which would have been deleted.
 *
 * Changed from upstream:
 *  - Copy replaced with the B2 text from docs/aceternity-migration.md.
 *  - Both remote images (assets.aceternity.com) replaced with local shots.
 *  - Buttons wrapping anchors replaced with real links to the live anchors.
 *  - Added the availability pill, the rotating headline and the trust line.
 *  - Rotating headline honours prefers-reduced-motion.
 */

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import shotA from "@/images/macbook-3.png";
import shotB from "@/images/macbook-4.png";

const HEADLINE_VARIANTS = [
  "that pays for itself",
  "that finds hidden revenue",
  "your competitors wish they had",
  "ranked by ROI",
];

export function SiteHero() {
  return (
    // overflow-x-clip: the parallax shots are rotated in 3D and translated past
    // the container edge by design. Without clipping they push the document
    // wider than the viewport and the whole page scrolls sideways on mobile.
    <section className="w-full overflow-x-clip pt-28 md:pt-36 lg:pt-44">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <span className="bg-muted inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
          </span>
          3 audit slots open this month
        </span>

        <h1 className="mt-6 text-2xl font-bold tracking-tight md:text-4xl lg:text-6xl">
          The Shopify audit <RotatingHeadline />
        </h1>

        <p className="text-muted-foreground max-w-xl py-8 text-base md:text-lg">
          A conversion review of your Shopify storefront, verified against your
          live store data. Prioritized findings, annotated screenshots, and a
          30-day rescan &mdash; delivered in 5 business days.
        </p>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="#pricing"
            className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold shadow-2xl transition-opacity hover:opacity-90"
          >
            Get my audit &mdash; $750
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="#what-you-get"
            className="hover:bg-muted rounded-sm border px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            See what&rsquo;s included
          </Link>
        </div>

        <p className="text-muted-foreground mt-6 text-xs font-semibold uppercase tracking-[0.12em]">
          Delivered in 5 business days &middot; Every claim verified &middot; Free
          30-day rescan
        </p>

        <ParallaxShots />
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
      2800
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

const SHOT_TRANSFORM = "rotateY(20deg) rotateX(40deg) rotateZ(-20deg)";

const ParallaxShots = () => {
  return (
    <div className="perspective-distant relative min-h-40 w-full pt-20 sm:min-h-80 md:min-h-100 lg:min-h-200">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="perspective-[4000px] shadow-2xl"
      >
        <Image
          src={shotA}
          alt="Storefront conversion review on desktop"
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 1200px"
          className={cn(
            "absolute inset-0 rounded-lg shadow-xl mask-r-from-20% mask-b-from-20%"
          )}
          style={{ transform: SHOT_TRANSFORM }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="perspective-[4000px] -translate-y-10 translate-x-20 md:-translate-y-20 lg:-translate-y-40"
      >
        <Image
          src={shotB}
          alt="Prioritized findings and action plan"
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 1200px"
          className={cn(
            "absolute inset-0 -translate-x-10 rounded-lg shadow-xl mask-r-from-50% mask-b-from-50%"
          )}
          style={{ transform: SHOT_TRANSFORM }}
        />
      </motion.div>
    </div>
  );
};
