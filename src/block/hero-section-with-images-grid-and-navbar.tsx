"use client";

/**
 * Adapted from the Aceternity `hero-section-with-images-grid-and-navbar` block.
 *
 * Kept: the centred headline stack, the marquee logo cloud and the staggered
 * images grid.
 *
 * Removed:
 *  - `Navbar` / `DesktopNav` / `MobileNav` / `Logo` — the site navbar now lives in
 *    `simple-navbar-with-hover-effects.tsx`. Keeping both would ship two navs.
 *  - `FeaturedImages` — six Unsplash portraits of real people rendered as an
 *    avatar cluster, i.e. fabricated social proof.
 *  - All 19 remote images (`assets.aceternity.com`, `images.unsplash.com`),
 *    including a "Trusted by famous brands" marquee of Aceternity's own logos.
 *
 * Every asset here is local and every claim is the site's own. See
 * docs/aceternity-migration.md §B2. Diff against aafff94 for the upstream delta.
 */

import React, { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Marquee from "react-fast-marquee";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import brightwood from "@/logos/brightwood.svg";
import al from "@/logos/al.png";
import jh from "@/logos/jh.png";
import omura from "@/logos/omura.png";
import rAndR from "@/logos/r-and-r.png";
import tache from "@/logos/tache.webp";
import madrinas from "@/logos/madrinas.svg";
import barbaraKatz from "@/logos/barbara-katz.webp";
import chused from "@/logos/chused.webp";

import shot1 from "@/images/macbook-3.png";
import shot2 from "@/images/iphone-4.png";
import shot3 from "@/images/macbook-4.png";
import shot4 from "@/images/iphone-5.png";
import shot5 from "@/images/macbook-5.png";

/** Rotating second line of the H1. */
const HEADLINE_VARIANTS = [
  "that pays for itself",
  "that finds hidden revenue",
  "your competitors wish they had",
  "ranked by ROI",
];

export function SiteHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative flex flex-col items-center justify-center px-6 pb-4 sm:px-10">
        <div className="relative mt-32 flex flex-col items-center justify-center sm:mt-40">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-neutral-100)] px-5 py-2 text-[14px] font-semibold text-neutral-950">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-600" />
            </span>
            3 audit slots open this month
          </span>

          <h1 className="text-mega relative mx-auto mt-8 w-full max-w-6xl text-center sm:mt-10">
            <span className="block">The Shopify audit</span>
            <RotatingHeadline />
          </h1>

          <p className="relative mx-auto mt-6 max-w-xl text-center text-[15px] font-medium leading-relaxed text-neutral-800 sm:mt-8 sm:text-[17px]">
            A conversion review of your Shopify storefront, verified against your
            live store data. Prioritized findings, annotated screenshots, and a
            30-day rescan &mdash; delivered in 5 business days.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-colors hover:bg-indigo-700"
          >
            Get my audit &mdash; $750
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#what-you-get"
            className="inline-flex items-center rounded-full border-2 border-neutral-900 bg-transparent px-7 py-3 text-[14px] font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            See what&rsquo;s included
          </Link>
        </div>

        <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-600">
          Delivered in 5 business days &middot; Every claim verified &middot; Free
          30-day rescan
        </p>

        <LogoCloudMarquee />
      </div>

      <ImagesGrid />
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

  // Reduced motion: render the first phrase statically rather than cycling.
  if (reduceMotion) {
    return <span className="mt-1 block">{HEADLINE_VARIANTS[0]}</span>;
  }

  return (
    <span className="mt-1 block overflow-hidden">
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

interface LogoItem {
  src: StaticImageData;
  alt: string;
  /** White-on-transparent marks need inverting to read on the light ground. */
  invert?: boolean;
}

const logos: LogoItem[] = [
  { src: brightwood, alt: "Brightwood" },
  { src: al, alt: "Alexis Lauren" },
  { src: jh, alt: "Jack Henry" },
  { src: omura, alt: "Omura" },
  { src: rAndR, alt: "R&R" },
  { src: tache, alt: "Táche" },
  { src: madrinas, alt: "Madrinas" },
  { src: barbaraKatz, alt: "Barbara Katz", invert: true },
  { src: chused, alt: "Chused & Co", invert: true },
];

export function LogoCloudMarquee() {
  return (
    <div className="relative mt-14 w-full sm:mt-20">
      <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-600">
        A few of the brands we&rsquo;ve worked with
      </p>

      <div className="relative mx-auto flex w-full max-w-5xl justify-center [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <Marquee pauseOnHover direction="left" speed={30} autoFill>
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="mx-3 flex h-14 flex-shrink-0 items-center justify-center rounded-full border border-neutral-100 bg-white/70 px-7"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                className="h-7 w-auto max-w-[140px] object-contain"
                style={{ filter: logo.invert ? "invert(1)" : undefined }}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

const gridImages: { src: StaticImageData; alt: string; className: string }[] = [
  { src: shot1, alt: "Storefront review on desktop", className: "translate-y-10" },
  { src: shot2, alt: "Annotated mobile findings", className: "translate-y-20" },
  { src: shot3, alt: "Prioritized action plan", className: "translate-y-4" },
  { src: shot4, alt: "Mobile funnel review", className: "translate-y-10" },
  { src: shot5, alt: "Findings register", className: "translate-y-20" },
];

export const ImagesGrid = () => {
  return (
    <div className="relative mt-10 h-[20rem] w-full overflow-hidden border-b border-neutral-100 md:h-[30rem]">
      <div className="absolute inset-0 flex h-full w-full flex-shrink-0 justify-center gap-5">
        {gridImages.map((image) => (
          <div
            key={image.alt}
            className={cn(
              "relative mt-0 rounded-2xl border border-neutral-100 bg-white p-2 shadow-soft",
              image.className
            )}
          >
            <div className="relative h-full w-[15rem] overflow-hidden rounded-xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="240px"
                placeholder="blur"
                className="object-cover object-top"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
