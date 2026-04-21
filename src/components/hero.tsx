"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "./cta-button";
import { ArrowRight } from "lucide-react";
import { Pill } from "./ui/pill";
import { Sticker } from "./ui/sticker";
import {
  HeartSticker,
  CoinSticker,
  SparkleSticker,
  LightningSticker,
  ChartSticker,
  SmileySticker,
  SquiggleUnderline,
} from "./stickers";
import annotatedPdp from "@/images/annotated-pdp.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-cream)] pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-28">
      {/* Decorative stickers scattered around the hero */}
      <Sticker
        size="lg"
        tilt={-14}
        float
        className="absolute top-[18%] left-[6%] hidden md:block"
        style={{ animationDelay: "0s" }}
      >
        <HeartSticker />
      </Sticker>
      <Sticker
        size="md"
        tilt={18}
        float
        className="absolute top-[14%] right-[8%] hidden md:block"
        style={{ animationDelay: "0.8s" }}
      >
        <CoinSticker />
      </Sticker>
      <Sticker
        size="sm"
        tilt={-8}
        float
        className="absolute top-[58%] left-[12%] hidden lg:block"
        style={{ animationDelay: "1.4s" }}
      >
        <SparkleSticker />
      </Sticker>
      <Sticker
        size="md"
        tilt={12}
        float
        className="absolute bottom-[14%] right-[6%] hidden md:block"
        style={{ animationDelay: "0.4s" }}
      >
        <LightningSticker />
      </Sticker>
      <Sticker
        size="xs"
        tilt={-20}
        float
        className="absolute top-[8%] left-[44%] hidden lg:block"
        style={{ animationDelay: "1.8s" }}
      >
        <SmileySticker />
      </Sticker>

      <div className="relative mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Pill tone="coral">Shopify conversion audit</Pill>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-display text-ink-900"
            >
              Turn browsers{" "}
              <span className="relative inline-block">
                into
                <span className="absolute left-0 right-0 -bottom-2 sm:-bottom-3 h-3 sm:h-4">
                  <SquiggleUnderline />
                </span>
              </span>{" "}
              <span className="text-coral-600">buyers.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-body-lg"
            >
              We hand-review your Shopify storefront and deliver the
              highest-impact fixes to lift conversion, build trust, and grow
              revenue. No dashboards, no fluff — just prioritized findings you
              can ship.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
            >
              <CTAButton href="#pricing" size="lg">
                Get my audit — $750
                <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <CTAButton href="#what-you-get" variant="outline" size="lg">
                See what&rsquo;s included
              </CTAButton>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-caption"
            >
              Secure payment via Square · Delivered in 5 business days
            </motion.p>
          </div>

          {/* Right: tilted card with annotated screenshot + sticker accents */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -4, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, rotate: -2.5, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="relative rounded-[var(--radius-card-lg)] bg-white p-4 shadow-soft-lg border border-ink-100">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-card)-4px)] bg-ink-50">
                <Image
                  src={annotatedPdp}
                  alt="Annotated Shopify product page showing conversion issues"
                  fill
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover"
                  style={{ objectPosition: "top" }}
                  placeholder="blur"
                  priority
                />
                {/* Callout annotations */}
                <div className="absolute top-[12%] left-[8%]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-3 py-1 text-[11px] font-semibold text-white shadow-soft">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-mint)]" />
                    Trust strong
                  </span>
                </div>
                <div className="absolute top-[44%] right-[6%]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-3 py-1 text-[11px] font-semibold text-white shadow-soft">
                    <span className="h-2 w-2 rounded-full bg-coral-600" />
                    CTA weak
                  </span>
                </div>
                <div className="absolute bottom-[12%] left-[10%]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-3 py-1 text-[11px] font-semibold text-white shadow-soft">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-butter)]" />
                    Missing reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Sticker accents on card */}
            <Sticker size="lg" tilt={18} className="absolute -top-8 -right-6 z-10">
              <ChartSticker />
            </Sticker>
            <Sticker size="md" tilt={-16} className="absolute -bottom-6 -left-6 z-10" float>
              <SparkleSticker />
            </Sticker>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
