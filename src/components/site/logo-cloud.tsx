"use client";

/**
 * B2 — client logo cloud.
 *
 * Adapted from @aceternity/single-row-logo-cloud (src/block/single-row-logo-cloud.tsx,
 * pristine). Kept: the rotating set with the blur/slide transition.
 *
 * Changed from upstream:
 *  - Upstream ships ten remote logos — Spotify, Netflix, Microsoft, OpenAI,
 *    Y Combinator and others — under the heading "Trusted by the best". That is
 *    fabricated social proof and none of it may ship. Replaced with the nine
 *    real client logos, served locally.
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
const ROTATE_MS = 2600;

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

export function LogoCloud() {
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
    <section className="mx-auto flex w-full max-w-4xl items-center justify-center px-4 py-12">
      <div className="flex w-full flex-col items-center gap-6 md:flex-row md:gap-8">
        <h2 className="text-muted-foreground shrink-0 text-center text-sm font-medium tracking-tight md:text-left">
          A few of the brands we&rsquo;ve worked with
        </h2>
        <div className="grid min-h-10 w-full grid-cols-3 items-center justify-items-center gap-x-4 md:flex md:flex-1 md:justify-between">
          <AnimatePresence mode="popLayout">
            {visible.map((logo, index) => (
              <motion.div
                key={logo.title}
                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                transition={{ duration: 0.2, ease: "easeInOut", delay: index * 0.1 }}
                className="flex w-full items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.title}
                  className={cn(
                    "w-auto max-w-[130px] object-contain",
                    logo.opaque
                      ? "h-7 rounded bg-white px-1.5 py-1 md:h-8"
                      : "h-8 md:h-9",
                    // Light marks are already white: blacken them on a light
                    // ground, leave them alone on a dark one. Everything else
                    // is flattened to black then inverted to clean white.
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
    </section>
  );
}
