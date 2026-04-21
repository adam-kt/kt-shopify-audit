"use client";

import { motion } from "framer-motion";

const logos = [
  "Brand One",
  "Brand Two",
  "Brand Three",
  "Brand Four",
  "Brand Five",
  "Brand Six",
  "Brand Seven",
  "Brand Eight",
];

export function TrustStrip() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="border-y border-ink-100 bg-white py-10 sm:py-12 overflow-hidden"
    >
      <p className="text-center text-caption mb-8">
        Experience across ecommerce &amp; digital product
      </p>

      <div className="relative">
        <div className="animate-marquee flex items-center gap-12 sm:gap-16 whitespace-nowrap w-max">
          {[...logos, ...logos].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-9 w-32 rounded-full bg-ink-100 flex items-center justify-center group hover:bg-coral-100 transition-all duration-300"
              aria-label={`${name} logo placeholder`}
            >
              <span className="text-[11px] text-ink-600 group-hover:text-coral-700 font-bold tracking-tight truncate px-2 transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      <p className="mt-8 text-center text-[13px] text-ink-500 max-w-md mx-auto leading-relaxed px-6">
        A focused service from{" "}
        <a
          href="https://knocktwice.io"
          className="text-coral-600 hover:text-coral-700 transition-colors underline underline-offset-2 decoration-coral-200 font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Knock Twice
        </a>{" "}
        — experts in ecommerce UX and digital product design.
      </p>
    </motion.section>
  );
}
