"use client";

import { useState, useEffect, type FormEvent } from "react";
import { CTAButton } from "./cta-button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MailSticker, SparkleSticker } from "./stickers";
import { Sticker } from "./ui/sticker";

export function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered) {
        triggered = true;
        setTimeout(() => setShow(true), 200);
      }
    };

    const timer = setTimeout(() => {
      const scrollPercent =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent < 0.6 && !triggered) {
        triggered = true;
        setShow(true);
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          email,
          storeUrl: "",
          message: "Exit intent — free checklist request",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Free Shopify checklist"
        >
          <motion.div
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
            onClick={handleDismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-md rounded-[var(--radius-card-lg)] bg-white p-8 sm:p-10 shadow-soft-lg"
            initial={{ opacity: 0, y: 40, rotate: -2, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            {/* Decorative stickers */}
            <Sticker
              size="md"
              tilt={-12}
              className="absolute -top-8 -left-6"
            >
              <MailSticker />
            </Sticker>
            <Sticker
              size="sm"
              tilt={15}
              className="absolute -top-4 right-6"
            >
              <SparkleSticker />
            </Sticker>

            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 rounded-full p-1.5 text-ink-400 hover:text-ink-900 hover:bg-ink-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="text-center py-4">
                <h3 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                  Check your inbox.
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  We&rsquo;ll send the checklist shortly. If you decide you want the
                  full audit, you know where to find us.
                </p>
              </div>
            ) : (
              <>
                <p className="text-caption text-coral-600 mb-3">Before you go</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink-900 leading-[1.1]">
                  Get our free Shopify
                  <br />
                  conversion checklist.
                </h3>
                <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                  The 12 most common conversion killers on Shopify stores — and how
                  to spot them on yours. Free, no commitment.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 rounded-full border border-ink-200 bg-white px-5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-coral-500 focus:outline-none focus:ring-4 focus:ring-coral-100 transition-all"
                  />
                  <CTAButton type="submit" size="default" loading={loading}>
                    Send it
                  </CTAButton>
                </form>

                <p className="mt-4 text-[11px] text-ink-400 text-center">
                  No spam. Just the checklist.
                </p>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
