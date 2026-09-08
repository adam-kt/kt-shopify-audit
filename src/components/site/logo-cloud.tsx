"use client";

/**
 * Client logo cloud — sits inside the hero, in the slot the upstream hero block
 * used for its avatar cluster: right of the CTAs, bottom-aligned on desktop,
 * above the browser window.
 *
 * Adapted from @aceternity/single-row-logo-cloud (src/block/single-row-logo-cloud.tsx,
 * pristine). Kept: the rotating set with the blur/slide transition.
 *
 * Changed from upstream:
 *  - Upstream ships ten remote logos — Spotify, Netflix, Microsoft, OpenAI,
 *    Y Combinator and others — under the heading "Trusted by the best". That is
 *    fabricated social proof and none of it may ship. Replaced with the nine
 *    real client logos, served locally.
 *  - Laid out as a compact column rather than a full-width band, so it fits the
 *    hero slot instead of occupying its own section.
 *  - Logos render monochrome, per-logo and theme-aware. Upstream's blanket
 *    `dark:invert` is wrong twice over: two of our marks are already
 *    white-on-transparent, so inverting them on a dark ground turns them black;
 *    and several of the rest are full-colour (Madrinas, Táche), where invert
 *    hue-shifts rather than lightens — red becomes cyan. `brightness-0` flattens
 *    a mark to black first, so the following `invert` yields clean white
 *    regardless of its original colour.
 *  - LOGOS_PER_ROW is 3, giving three even sets of three. At upstream's 5 our
 *    nine logos would rotate 5 then 4, leaving a visible gap on the second set.
 *  - Honours prefers-reduced-motion: the rotation stops and the first set holds.
 */

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
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

const LOGOS_PER_ROW = 3;
/** Slow hold — 2.6s cycled faster than the eye settles on a mark. */
const ROTATE_MS = 6000;
const FADE_S = 0.55;

interface Logo {
  title: string;
  src: StaticImageData;
  /**
   * True when the mark itself is light (white-on-transparent). Such a mark
   * needs inverting on a light ground and none on a dark one; a dark mark
   * needs exactly the opposite.
   */
  lightMark?: boolean;
  /**
   * True when the source file has no alpha channel. A filter cannot rescue an
   * opaque mark — `brightness-0 invert` fills its entire rectangle white — so
   * these render unfiltered on a light chip instead. jh.png is the only one;
   * `sips -g hasAlpha` confirms the rest are transparent.
   */
  opaque?: boolean;
}

const LOGOS: Logo[] = [
  { title: "Brightwood", src: brightwood },
  { title: "Alexis Lauren", src: al },
  { title: "Jack Henry", src: jh, opaque: true },
  { title: "Omura", src: omura },
  { title: "R&R", src: rAndR },
  { title: "Táche", src: tache },
  { title: "Madrinas", src: madrinas },
  { title: "Barbara Katz", src: barbaraKatz, lightMark: true },
  { title: "Chused & Co", src: chused, lightMark: true },
];

export function LogoCloud({ className }: { className?: string }) {
  const setCount = Math.ceil(LOGOS.length / LOGOS_PER_ROW);
  const [setIndex, setSetIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setSetIndex((i) => (i + 1) % setCount),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [setCount, reduceMotion]);

  const visible = LOGOS.slice(
    setIndex * LOGOS_PER_ROW,
    setIndex * LOGOS_PER_ROW + LOGOS_PER_ROW
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="text-muted-foreground text-xs font-medium tracking-wide">
        Brands we&rsquo;ve done this work for
      </p>
      <div className="flex min-h-9 items-center gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {visible.map((logo, index) => (
            <motion.div
              key={logo.title}
              initial={{ opacity: 0, x: -14, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 14, filter: "blur(8px)" }}
              transition={{
                duration: FADE_S,
                ease: "easeInOut",
                delay: index * 0.12,
              }}
              className="flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.title}
                className={cn(
                  "w-auto object-contain",
                  logo.opaque
                    ? "h-6 max-w-[104px] rounded bg-white px-1.5 py-1"
                    : "h-7 max-w-[112px]",
                  // Light marks are already white: blacken them on a light
                  // ground, leave them alone on a dark one. Everything else is
                  // flattened to black then inverted to clean white.
                  !logo.opaque &&
                    (logo.lightMark
                      ? "brightness-0 dark:brightness-100"
                      : "dark:brightness-0 dark:invert")
                )}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
