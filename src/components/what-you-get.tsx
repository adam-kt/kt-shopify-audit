"use client";

import Image from "next/image";
import { SectionWrapper } from "./section-wrapper";
import { PlaceholderImage } from "./placeholder-image";
import { motion } from "framer-motion";
import { Pill } from "./ui/pill";
import { Card } from "./ui/card";
import { Sticker } from "./ui/sticker";
import {
  ChartSticker,
  StarSticker,
  SparkleSticker,
  HeartSticker,
  LightningSticker,
  CursorSticker,
  MailSticker,
} from "./stickers";
import macbook7 from "@/images/macbook-7.png";
import iphone4 from "@/images/iphone-4.png";
import iphone5 from "@/images/iphone-5.png";
import iphone7 from "@/images/iphone-7.png";
import auditPreview from "@/images/shopify_audit_deliverable_knocktwice_styled.svg";

const brandsReviewed = [
  { src: macbook7, label: "Apparel" },
  { src: iphone4, label: "Wellness" },
  { src: iphone5, label: "Beauty" },
  { src: iphone7, label: "Lifestyle" },
];

const deliverables = [
  {
    sticker: <ChartSticker />,
    tone: "mint" as const,
    title: "Complete storefront review",
    description:
      "Page-by-page analysis of your homepage, collections, PDPs, cart, navigation, and mobile experience.",
  },
  {
    sticker: <StarSticker />,
    tone: "butter" as const,
    title: "Prioritized findings",
    description:
      "Every issue ranked by revenue impact so you know exactly where to focus first.",
  },
  {
    sticker: <SparkleSticker />,
    tone: "mauve" as const,
    title: "30-day automated re-scan",
    description:
      "One month after delivery, we run an automated re-scan of your store to verify fixes and flag any new issues.",
  },
  {
    sticker: <HeartSticker />,
    tone: "coral" as const,
    title: "Actionable recommendations",
    description:
      "Specific, practical fixes — not vague advice. Every recommendation is something your team can implement.",
  },
  {
    sticker: <CursorSticker />,
    tone: "lavender" as const,
    title: "Page-level annotations",
    description:
      "Annotated screenshots highlighting exactly what to change and why it matters for conversion.",
  },
  {
    sticker: <LightningSticker />,
    tone: "sky" as const,
    title: "Next-step roadmap",
    description:
      "A clear recommendation on what to tackle first, second, and third — plus an optional implementation estimate.",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function WhatYouGet() {
  return (
    <SectionWrapper id="what-you-get" background="cream">
      <div className="max-w-xl mb-14 sm:mb-16">
        <Pill tone="mint" className="mb-4">What you get</Pill>
        <h2 className="text-headline text-ink-900">
          A clear picture of what&rsquo;s{" "}
          <span className="text-coral-600">holding your store back.</span>
        </h2>
        <p className="mt-5 text-body-lg max-w-lg">
          Not a generic checklist. A thorough, expert analysis tailored to your
          store with prioritized, revenue-focused recommendations.
        </p>
      </div>

      {/* Audit preview image */}
      <div className="mb-14 sm:mb-16 relative">
        <Sticker
          size="lg"
          tilt={14}
          className="absolute -top-8 -right-4 z-10 hidden sm:block"
          float
        >
          <MailSticker />
        </Sticker>
        <PlaceholderImage
          src={auditPreview}
          alt="Preview of the Knock Twice Shopify conversion audit deliverable"
          label="Audit deliverable preview"
          aspect="video"
        />
      </div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {deliverables.map((d, i) => (
          <motion.div key={d.title} variants={item}>
            <Card tone={d.tone} tilt={i % 2 === 0 ? -1 : 1} interactive className="h-full">
              <div className="mb-4 w-14 h-14">
                <Sticker size="md" tilt={i % 2 === 0 ? -8 : 8}>
                  {d.sticker}
                </Sticker>
              </div>
              <h3 className="text-[17px] font-bold tracking-tight text-ink-900">
                {d.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {d.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Brands we've audited */}
      <div className="mt-20 pt-12 border-t border-ink-200">
        <p className="text-caption text-ink-400 mb-6">
          Brands we&rsquo;ve reviewed
        </p>
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {brandsReviewed.map((b) => (
            <motion.div
              key={b.label}
              variants={item}
              className="relative aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden border border-ink-100 bg-ink-50 shadow-soft"
            >
              <Image
                src={b.src}
                alt={`${b.label} storefront Knock Twice has reviewed`}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
                placeholder="blur"
              />
              <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-ink-900 font-semibold text-[10px] tracking-wide uppercase shadow-soft">
                {b.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
