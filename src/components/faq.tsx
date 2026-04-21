"use client";

import { useState } from "react";
import { SectionWrapper } from "./section-wrapper";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Pill } from "./ui/pill";

const faqs = [
  {
    question: "Who is this for?",
    answer:
      "This audit is for Shopify brands that want to improve conversion, trust, and revenue. Whether you're a founder, operator, ecommerce manager, or growth lead — if you know your store could be performing better, this is for you.",
  },
  {
    question: "Is this only for Shopify stores?",
    answer:
      "Yes. This audit is specifically built for Shopify storefronts. Our review process, benchmarks, and recommendations are all calibrated for the Shopify ecosystem.",
  },
  {
    question: "What exactly do I receive?",
    answer:
      "You receive a comprehensive audit document with prioritized findings, annotated screenshots, and a next-step action plan. Thirty days later, you get an automated re-scan report showing what's been fixed and what's new. Everything is specific to your store.",
  },
  {
    question: "How long does it take?",
    answer:
      "We deliver your audit within 5 business days of receiving your store details. The intake form takes under 5 minutes to complete.",
  },
  {
    question: "Do you implement the recommendations?",
    answer:
      "This audit focuses on analysis and recommendations. If you'd like implementation support afterward, we can provide a separate quote. Many clients use the audit to brief their internal team or existing agency.",
  },
  {
    question: "Is this a generic template audit?",
    answer:
      "No. Every audit is conducted manually by our team and tailored to your specific store, products, and customer experience. We don't use automated tools or generic checklists.",
  },
  {
    question: "What if I already have an internal team?",
    answer:
      "Even better. Internal teams often benefit from an outside perspective that can identify blind spots. The audit gives your team a clear, prioritized roadmap to work from — no ramp-up needed.",
  },
  {
    question: "What happens after I purchase?",
    answer:
      "Immediately after purchase, you'll receive a short intake form to share your store URL, any specific concerns, and your goals. Once submitted, we begin the review and deliver your audit within the stated turnaround.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "If we haven't started your audit, we're happy to issue a full refund. Once the review has begun, we'll work with you to make sure you're satisfied with the deliverable.",
  },
];

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={cn(
        "rounded-2xl border transition-all duration-300",
        open ? "border-coral-300 bg-coral-50" : "border-ink-100 bg-white hover:border-ink-200"
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 sm:px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 rounded-2xl cursor-pointer group"
        aria-expanded={open}
      >
        <span className="text-[15px] font-bold tracking-tight text-ink-900 pr-8">
          {question}
        </span>
        <span
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-full text-base transition-all duration-300 flex-shrink-0 font-bold",
            open
              ? "bg-coral-600 text-white rotate-45"
              : "bg-ink-100 text-ink-700 group-hover:bg-coral-100 group-hover:text-coral-700"
          )}
        >
          +
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 text-sm leading-relaxed text-ink-700 pr-10 sm:pr-12 max-w-xl">
            {answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <SectionWrapper id="faq">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 sm:mb-12 text-center">
          <Pill tone="sky" className="mb-4">FAQ</Pill>
          <h2 className="text-headline text-ink-900">
            Common questions.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} index={i} {...faq} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
