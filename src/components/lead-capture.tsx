"use client";

import { useState, type FormEvent } from "react";
import { SectionWrapper } from "./section-wrapper";
import { CTAButton } from "./cta-button";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Pill } from "./ui/pill";
import { Sticker } from "./ui/sticker";
import { MailSticker, SparkleSticker } from "./stickers";

interface FormData {
  name: string;
  email: string;
  storeUrl: string;
  message: string;
}

export function LeadCapture() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    storeUrl: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SectionWrapper id="lead-capture" background="cream">
        <motion.div
          className="mx-auto max-w-md text-center py-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-mint-soft)]">
            <CheckCircle className="h-7 w-7 text-emerald-700" />
          </div>
          <h3 className="text-title text-ink-900">
            We&rsquo;ll be in touch.
          </h3>
          <p className="mt-4 text-sm text-ink-600 leading-relaxed">
            Thanks for your interest. We&rsquo;ll review your details and reach
            out within 1&ndash;2 business days.
          </p>
        </motion.div>
      </SectionWrapper>
    );
  }

  const inputClasses =
    "w-full rounded-2xl border border-ink-200 bg-white px-5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-coral-500 focus:outline-none focus:ring-4 focus:ring-coral-100 transition-all";

  return (
    <SectionWrapper id="lead-capture" background="cream">
      <div className="mx-auto max-w-md relative">
        <Sticker size="md" tilt={-14} float className="absolute -top-10 -left-6 hidden sm:block">
          <MailSticker />
        </Sticker>
        <Sticker size="sm" tilt={18} float className="absolute -top-4 -right-2 hidden sm:block" style={{ animationDelay: "0.8s" }}>
          <SparkleSticker />
        </Sticker>

        <div className="mb-10">
          <Pill tone="mauve" className="mb-4">Not ready to purchase?</Pill>
          <h2 className="text-headline text-ink-900">
            Leave your details.
          </h2>
          <p className="mt-4 text-sm text-ink-600 leading-relaxed">
            Tell us about your store and we&rsquo;ll follow up with more
            information about how the audit can help.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-[var(--radius-card-lg)] bg-white p-8 shadow-soft border border-ink-100">
          <div>
            <label htmlFor="lead-name" className="text-caption block mb-2">
              Name
            </label>
            <input
              id="lead-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClasses}
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="lead-email" className="text-caption block mb-2">
              Work email
            </label>
            <input
              id="lead-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClasses}
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="lead-store" className="text-caption block mb-2">
              Store URL
            </label>
            <input
              id="lead-store"
              type="url"
              required
              value={formData.storeUrl}
              onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
              className={inputClasses}
              placeholder="https://yourstore.com"
            />
          </div>

          <div>
            <label htmlFor="lead-message" className="text-caption block mb-2">
              What are you trying to improve?{" "}
              <span className="normal-case tracking-normal text-ink-400">(optional)</span>
            </label>
            <textarea
              id="lead-message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClasses} resize-none`}
              placeholder="e.g., conversion rate, mobile experience, product pages..."
            />
          </div>

          {error && (
            <p className="text-sm text-coral-700 font-semibold" role="alert">
              {error}
            </p>
          )}

          <CTAButton
            type="submit"
            size="lg"
            className="w-full"
            loading={loading}
          >
            Send details
          </CTAButton>

          <p className="text-center text-[12px] text-ink-400">
            No spam. We&rsquo;ll only use this to follow up about the audit.
          </p>
        </form>
      </div>
    </SectionWrapper>
  );
}
