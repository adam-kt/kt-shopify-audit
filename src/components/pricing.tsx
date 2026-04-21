"use client";

import { useState, type FormEvent } from "react";
import { SectionWrapper } from "./section-wrapper";
import { CTAButton } from "./cta-button";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill } from "./ui/pill";
import { Sticker } from "./ui/sticker";
import {
  HeartSticker,
  StarSticker,
  SparkleSticker,
  LightningSticker,
  CoinSticker,
} from "./stickers";

const included = [
  "Complete storefront analysis",
  "Homepage, collections, PDPs, cart & mobile",
  "Prioritized findings by revenue impact",
  "Annotated screenshots",
  "30-day automated re-scan",
  "Actionable recommendations",
  "Next-step roadmap",
  "Delivered within 5 business days",
];

export function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          storeUrl: "",
          message: "Pre-checkout capture",
        }),
      }).catch(() => {});

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Could not start checkout. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Could not start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="pricing" background="cream" padding="wide">
      <div className="max-w-xl mx-auto text-center mb-12 sm:mb-14">
        <Pill tone="coral" className="mb-4">Pricing</Pill>
        <h2 className="text-headline text-ink-900">
          One audit. One price.{" "}
          <span className="text-coral-600">No surprises.</span>
        </h2>
      </div>

      {/* Value bar */}
      <motion.div
        className="mx-auto max-w-3xl mb-14 sm:mb-16 grid grid-cols-3 rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-soft overflow-hidden"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {[
          { value: "73%", label: "of Shopify stores have conversion issues on mobile" },
          { value: "40%", label: "revenue lift from addressing top UX friction", prefix: "up to" },
          { value: "5 days", label: "from purchase to audit in your inbox" },
        ].map((s, i) => (
          <div key={i} className={`px-4 sm:px-6 py-6 text-center ${i > 0 ? "border-l border-ink-100" : ""}`}>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-ink-900 leading-none">
              {s.prefix && <span className="text-xs font-medium text-ink-400 mr-1">{s.prefix}</span>}
              {s.value}
            </div>
            <p className="mt-2 text-[11px] sm:text-xs text-ink-600 leading-snug font-medium">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Pricing card */}
      <div className="mx-auto max-w-lg relative">
        <Sticker size="lg" tilt={-18} float className="absolute -top-10 -left-8 z-10 hidden sm:block">
          <HeartSticker />
        </Sticker>
        <Sticker size="md" tilt={22} float className="absolute -top-6 -right-6 z-10 hidden sm:block" style={{ animationDelay: "0.6s" }}>
          <StarSticker />
        </Sticker>
        <Sticker size="md" tilt={-14} className="absolute -bottom-6 -right-8 z-10 hidden sm:block" float style={{ animationDelay: "1.2s" }}>
          <LightningSticker />
        </Sticker>

        <motion.div
          className="relative rounded-[var(--radius-card-lg)] bg-white border-2 border-ink-900 p-10 sm:p-12 overflow-hidden shadow-soft-lg"
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-coral-600" />

          <div className="text-center mt-2">
            <Pill tone="coral">Shopify Conversion Audit</Pill>
            <div className="mt-6">
              <span className="text-6xl sm:text-7xl font-extrabold tracking-[-0.04em] text-coral-600">
                $750
              </span>
            </div>
            <p className="mt-4 text-sm text-ink-600 leading-relaxed max-w-sm mx-auto">
              Expert review of your entire Shopify storefront with prioritized,
              actionable recommendations.
            </p>
          </div>

          <div className="my-8 border-t border-ink-100" />

          <ul className="space-y-3.5">
            {included.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-coral-500 flex-shrink-0" />
                <span className="text-sm text-ink-700 font-medium">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-center gap-2 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-coral-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral-600" />
            </span>
            <span className="text-[11px] font-bold text-ink-700 tracking-[0.1em] uppercase">
              3 spots remaining this month
            </span>
          </div>

          <div>
            <CTAButton
              size="lg"
              className="w-full"
              onClick={() => setModalOpen(true)}
            >
              Get my audit now
              <ArrowRight className="h-4 w-4" />
            </CTAButton>
          </div>

          <div className="mt-5 rounded-2xl bg-[var(--color-mint-soft)] px-4 py-3 text-center">
            <p className="text-[13px] text-ink-700 font-medium">
              Full refund if we haven&rsquo;t started your review.
            </p>
          </div>

          <p className="mt-4 text-center text-caption">
            Secure payment via Square · Delivered within 5 business days
          </p>
        </motion.div>

        <p className="mt-8 text-center text-sm text-ink-500">
          Need help implementing the recommendations?{" "}
          <a
            href="mailto:hello@knocktwice.io"
            className="text-coral-600 hover:text-coral-700 underline underline-offset-4 decoration-coral-200 hover:decoration-coral-500 transition-all font-semibold"
          >
            Get in touch
          </a>
        </p>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Start checkout"
          >
            <motion.div
              className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
              onClick={() => !loading && setModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative w-full max-w-md rounded-[var(--radius-card-lg)] bg-white p-8 sm:p-10 shadow-soft-lg"
              initial={{ opacity: 0, y: 40, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Sticker size="md" tilt={-14} className="absolute -top-6 -left-6">
                <SparkleSticker />
              </Sticker>
              <Sticker size="sm" tilt={18} className="absolute -top-3 right-8">
                <CoinSticker />
              </Sticker>

              <button
                onClick={() => !loading && setModalOpen(false)}
                disabled={loading}
                className="absolute top-4 right-4 rounded-full p-1.5 text-ink-400 hover:text-ink-900 hover:bg-ink-100 transition-colors cursor-pointer disabled:opacity-50"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <Pill tone="coral" className="mb-3">One step to checkout</Pill>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink-900 leading-[1.1]">
                Where should we send the receipt and intake form?
              </h3>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-full border border-ink-200 bg-white px-5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-coral-500 focus:outline-none focus:ring-4 focus:ring-coral-100 transition-all"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-full border border-ink-200 bg-white px-5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-coral-500 focus:outline-none focus:ring-4 focus:ring-coral-100 transition-all"
                />
                {error && (
                  <p className="text-xs text-coral-700 font-semibold">{error}</p>
                )}
                <CTAButton type="submit" size="lg" className="w-full" loading={loading}>
                  Continue to payment
                  <ArrowRight className="h-4 w-4" />
                </CTAButton>
              </form>

              <p className="mt-4 text-[11px] text-ink-400 text-center">
                Secure payment via Square on the next step.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
