"use client";

/**
 * B6 — what you get.
 *
 * Adapted from @aceternity/feature-section-bento-skeletons
 * (src/block/feature-section-bento-skeletons.tsx, pristine).
 *
 * Kept: the 3x2 bento grid and its span pattern — two square cards, one tall,
 * one wide — plus the card shell.
 *
 * Changed from upstream:
 *  - Added the section headline and sub, which the block does not ship.
 *  - Copy replaced. Upstream is a messaging product (real-time messaging,
 *    secure file sharing, team collaboration).
 *  - All four skeleton illustrations dropped, ~480 lines of them. They depict
 *    chat bubbles, file transfers and an avatar cluster, and the last pulls
 *    remote portraits from assets.aceternity.com. Replaced with the graphics in
 *    card-graphics.tsx, two of which render real findings from shared data.
 *  - Neutral/zinc colours swapped for semantic tokens so the card themes with
 *    the rest of the site.
 *
 * The pricing card itemises what is included; this section exists to SHOW what
 * those bullets can only tell. Keep the two from restating each other.
 */

import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PageSilhouettes,
  RankedList,
  AnnotatedStack,
  RescanTimeline,
} from "./card-graphics";

interface FeatureCard {
  title: string;
  description: string;
  /** Decorative. The card heading and body carry the meaning. */
  graphic: React.ReactNode;
  className: string;
}

const CARDS: FeatureCard[] = [
  {
    title: "Every page, not just the obvious ones",
    description:
      "Homepage, collections, product pages, cart, checkout, navigation. Desktop and phone.",
    graphic: <PageSilhouettes />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Ranked by what's worth doing",
    description:
      "Start at the top and stop when the sprint runs out. Nothing else needs deciding.",
    graphic: <RankedList />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "A screenshot for every finding",
    description:
      "Marked up on your own store, with the change written next to it. Nobody has to guess what we meant.",
    graphic: <AnnotatedStack />,
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "We check back after you ship",
    description:
      "Thirty days later we rescan, confirm the fixes landed, and flag anything new. No extra cost.",
    graphic: <RescanTimeline />,
    className: "md:col-span-2 md:row-span-1",
  },
];

export function SiteFeatures() {
  return (
    <section
      id="what-you-get-detail"
      className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
          What you actually get
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-base text-balance md:text-lg">
          One document, five business days after you send us your URL.
          Everything ranked, everything shown on your own pages.
        </p>

        <div className="mt-10 grid w-full grid-cols-1 gap-1 md:mt-14 md:grid-cols-3 md:grid-rows-2">
          {CARDS.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>

        {/* Without this the page runs three viewports between the hero CTA and
            the pricing section with no way to act. */}
        <div className="mt-10 flex justify-center">
          <Link
            href="#pricing"
            className="bg-primary text-primary-foreground inline-flex min-h-11 items-center gap-2 rounded-lg px-6 text-sm font-semibold"
          >
            Get my audit for $750
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const Card = ({ title, description, graphic, className }: FeatureCard) => {
  return (
    <div
      className={cn(
        "bg-card flex h-full flex-col justify-between rounded-xl p-6 shadow-sm ring-1 ring-black/5 md:p-8 dark:ring-white/5",
        className
      )}
    >
      <div className="h-48 w-full overflow-hidden rounded-md md:h-full md:min-h-48">
        {graphic}
      </div>
      <div className="mt-6 shrink-0">
        <h3 className="text-base font-bold tracking-tight">{title}</h3>
        <p className="text-muted-foreground mt-2 text-sm tracking-tight">
          {description}
        </p>
      </div>
    </div>
  );
};
