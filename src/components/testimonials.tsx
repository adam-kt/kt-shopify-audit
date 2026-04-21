"use client";

import { SectionWrapper } from "./section-wrapper";
import { motion } from "framer-motion";
import { Pill } from "./ui/pill";
import { Card } from "./ui/card";
import { Sticker } from "./ui/sticker";
import { HeartSticker, SparkleSticker, StarSticker } from "./stickers";

const testimonials = [
  {
    quote:
      "They found 14 issues we'd been blind to for months. Three of the top fixes took our dev team a single sprint — conversion went from 1.6% to 2.3% within six weeks.",
    name: "Sarah Chen",
    role: "Head of Ecommerce",
    brand: "Placeholder Brand",
    metric: "+44% conversion",
    tone: "mint" as const,
    sticker: <StarSticker />,
    tilt: -1.5,
  },
  {
    quote:
      "We'd spent $20K on a CRO agency that gave us a 60-page deck of generalities. This $750 audit had more actionable detail in the first three pages than that entire engagement.",
    name: "Marcus Webb",
    role: "Founder & CEO",
    brand: "Placeholder Brand",
    metric: "12 fixes identified",
    tone: "butter" as const,
    sticker: <HeartSticker />,
    tilt: 1.5,
  },
  {
    quote:
      "The 30-day re-scan caught two new issues our dev team introduced during the fix sprint. That alone saved us from shipping a broken mobile cart to production.",
    name: "Priya Sharma",
    role: "Growth Lead",
    brand: "Placeholder Brand",
    metric: "5-day turnaround",
    tone: "lavender" as const,
    sticker: <SparkleSticker />,
    tilt: -1.2,
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials" background="default">
      <div className="max-w-xl mb-14 sm:mb-16">
        <Pill tone="coral" className="mb-4">What clients say</Pill>
        <h2 className="text-headline text-ink-900">
          Brands that found what they{" "}
          <span className="text-coral-600">were missing.</span>
        </h2>
      </div>

      <motion.div
        className="grid lg:grid-cols-3 gap-6"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {testimonials.map((t) => (
          <motion.div key={t.name} variants={item}>
            <Card tone={t.tone} tilt={t.tilt} interactive className="relative h-full flex flex-col">
              <Sticker
                size="sm"
                tilt={-t.tilt * 6}
                className="absolute -top-4 -right-4"
              >
                {t.sticker}
              </Sticker>
              <div className="flex-1">
                <span className="inline-block rounded-full bg-ink-900 text-white text-[10px] font-bold tracking-[0.08em] uppercase px-3 py-1 mb-5">
                  {t.metric}
                </span>
                <p className="text-[16px] text-ink-800 leading-relaxed font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-ink-900/10">
                <p className="text-sm font-bold text-ink-900">{t.name}</p>
                <p className="text-[13px] text-ink-600">
                  {t.role}, {t.brand}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
