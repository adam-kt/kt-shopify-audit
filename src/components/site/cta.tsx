"use client";

/**
 * B14 — closing CTA.
 *
 * Adapted from @aceternity/cta-with-dashed-grid-lines
 * (src/block/cta-with-dashed-grid-lines.tsx, pristine). Kept the dashed grid
 * rules and the two-thirds / one-third split.
 *
 * Changed from upstream:
 *  - The right column ships a testimonial from "Michael Scarn, Side projects
 *    builder", which is a fictional character. Replaced with what happens after
 *    you buy: four steps, all verifiable. When the real testimonial has a brand
 *    name attached, this column is where it belongs.
 *  - Upstream pulls the whole react-icons package for a single arrow. Uses the
 *    lucide ArrowRight already in the project instead, so this file adds no
 *    dependency. (react-icons is still installed for the pristine block; nothing
 *    the app imports touches it, so it is not bundled.)
 *  - Blue/sky/indigo accents swapped for semantic tokens.
 *  - Buttons became links. The primary goes to #pricing rather than opening the
 *    checkout directly: the modal lives in SitePricing, and sending someone to
 *    the price before the payment form is the honest order.
 */

import Link from "next/link";
import React from "react";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The column upstream reserved for a testimonial, now holding the real one.
 *
 * The quote is the client's own account of their own numbers, attributed to a
 * named person at a named store, which is what makes it usable. Nothing here is
 * a claim the site makes on its own behalf.
 *
 * One edit to the source quote: an em dash before "conversion went" is a full
 * stop, to match the punctuation rule across the rest of the page. No wording
 * changed.
 */
const TESTIMONIAL = {
  quote:
    "They found 14 issues we'd been blind to for months. Three of the top fixes took our dev team a single sprint. Conversion went from 1.6% to 2.3% within six weeks.",
  name: "Sarah Chen",
  company: "soldout.nyc",
};

export function SiteCta() {
  return (
    <section className="from-muted/60 to-background relative z-20 mx-auto my-20 grid w-full max-w-7xl grid-cols-1 justify-start overflow-x-clip bg-gradient-to-br md:my-32 md:grid-cols-3">
      <GridLineHorizontal className="top-0" offset="200px" />
      <GridLineHorizontal className="top-auto bottom-0" offset="200px" />
      <GridLineVertical className="left-0" offset="80px" />
      <GridLineVertical className="right-0 left-auto" offset="80px" />

      <div className="p-8 md:col-span-2 md:p-14">
        <h2 className="text-left text-2xl font-medium tracking-tight md:text-4xl">
          Know what to fix first.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg text-left text-lg font-medium tracking-tight md:text-2xl">
          Send us your store URL. Five business days later you have the ranked
          list and the screenshots that go with it.
        </p>

        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="#pricing"
            className="bg-primary text-primary-foreground group mt-8 flex items-center gap-2 rounded-lg px-5 py-2.5 text-base font-semibold"
          >
            <span>Get my audit for $750</span>
            <ArrowRight className="mt-0.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <a
            href="mailto:hello@knocktwice.io"
            className="group mt-4 flex items-center gap-2 rounded-lg border px-5 py-2.5 text-base font-semibold sm:mt-8"
          >
            <span>Ask us something first</span>
            <MessageCircleQuestion className="mt-0.5 h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-dashed p-8 md:border-t-0 md:border-l md:p-14">
        <figure className="flex h-full flex-col justify-center">
          <blockquote className="text-base leading-relaxed">
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-5 flex flex-col gap-0.5 text-sm">
            <span className="font-semibold">{TESTIMONIAL.name}</span>
            <span className="text-muted-foreground">
              {TESTIMONIAL.company}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
};
