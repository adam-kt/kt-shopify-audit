"use client";

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { ThanksHeader } from "@/components/thanks/header";
import { ThanksFooter } from "@/components/thanks/footer";

// Curated option sets — kept inline since they're only used here.
const CATEGORIES = [
  "Apparel",
  "Beauty",
  "Food & drink",
  "Home",
  "Lifestyle",
  "Wellness",
  "Pet",
  "Outdoor",
  "Accessories",
  "Skincare",
  "Other",
];

const REVENUE_RANGES = [
  "Under $10K / month",
  "$10K – $50K / month",
  "$50K – $250K / month",
  "$250K – $1M / month",
  "$1M+ / month",
];

const TEAM_SIZES = ["Solo / founder", "2–5", "6–20", "21–50", "50+"];

interface IntakeFormState {
  name: string;
  email: string;
  storeUrl: string;
  brandName: string;
  category: string;
  monthlyRevenue: string;
  teamSize: string;
  topProducts: string;
  challenges: string;
  crm: string;
  analyticsTools: string;
  priorities: string;
  notes: string;
}

const EMPTY: IntakeFormState = {
  name: "",
  email: "",
  storeUrl: "",
  brandName: "",
  category: "",
  monthlyRevenue: "",
  teamSize: "",
  topProducts: "",
  challenges: "",
  crm: "",
  analyticsTools: "",
  priorities: "",
  notes: "",
};

function IntakeForm() {
  const params = useSearchParams();
  const [form, setForm] = useState<IntakeFormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  // Prefill email from the ?email= query param (success page / checkout).
  useEffect(() => {
    const prefilled = params.get("email") ?? "";
    if (prefilled) setForm((f) => ({ ...f, email: prefilled }));
  }, [params]);

  useEffect(() => {
    if (submitted) successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [submitted]);

  const update =
    <K extends keyof IntakeFormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save the form. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the form.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        ref={successRef}
        className="rounded-[var(--radius-card-lg)] border border-ink-100 bg-white p-8 sm:p-12 text-center shadow-soft"
      >
        <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-mint-soft)]">
          <CheckCircle className="h-7 w-7 text-emerald-700" />
        </div>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-[-0.015em] text-ink-950">
          Got it — we&rsquo;re on it.
        </h2>
        <p className="mt-4 text-[15px] text-ink-600 max-w-md mx-auto leading-relaxed">
          Thanks for the detail. Our team is reviewing your store now and
          you&rsquo;ll hear from us within 5 business days with your full
          audit.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-coral-600 hover:text-coral-700 transition-colors"
        >
          Back to Knock Twice
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-card-lg)] border border-ink-100 bg-white p-6 sm:p-10 shadow-soft space-y-10"
    >
      <Section title="Who's this for?">
        <Field
          label="Your name"
          required
          value={form.name}
          onChange={update("name")}
          placeholder="Jane Doe"
        />
        <Field
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          placeholder="you@brand.com"
        />
      </Section>

      <Section title="About the store">
        <Field
          label="Store URL"
          required
          value={form.storeUrl}
          onChange={update("storeUrl")}
          placeholder="https://yourbrand.com"
          type="url"
        />
        <Field
          label="Brand name"
          value={form.brandName}
          onChange={update("brandName")}
          placeholder="Marlow & Grove"
        />
        <div className="grid sm:grid-cols-3 gap-4">
          <Select
            label="Category"
            value={form.category}
            onChange={update("category")}
            options={CATEGORIES}
          />
          <Select
            label="Monthly revenue"
            value={form.monthlyRevenue}
            onChange={update("monthlyRevenue")}
            options={REVENUE_RANGES}
          />
          <Select
            label="Team size"
            value={form.teamSize}
            onChange={update("teamSize")}
            options={TEAM_SIZES}
          />
        </div>
      </Section>

      <Section title="What are you selling?">
        <TextArea
          label="Best-selling products"
          value={form.topProducts}
          onChange={update("topProducts")}
          placeholder="Top 3–5 SKUs by revenue, and anything you want us to scrutinize closely."
        />
      </Section>

      <Section title="Where it hurts">
        <TextArea
          label="Biggest struggles right now"
          value={form.challenges}
          onChange={update("challenges")}
          placeholder="What's not converting? Where does traffic drop off? What have you tried that hasn't moved the needle?"
        />
        <TextArea
          label="What would a great audit uncover?"
          value={form.priorities}
          onChange={update("priorities")}
          placeholder="Specific surfaces (PDP, cart, mobile), metrics you're chasing, or a hypothesis you'd love us to validate."
        />
      </Section>

      <Section title="Stack & tools">
        <Field
          label="CRM / email platform"
          value={form.crm}
          onChange={update("crm")}
          placeholder="Klaviyo, Attentive, Hubspot, etc."
        />
        <Field
          label="Analytics & other tools"
          value={form.analyticsTools}
          onChange={update("analyticsTools")}
          placeholder="GA4, Hotjar, Shopify Analytics, Triple Whale, Loop Returns…"
        />
      </Section>

      <Section title="Anything else">
        <TextArea
          label="Notes for the team (optional)"
          value={form.notes}
          onChange={update("notes")}
          placeholder="Anything else we should know — brand guidelines, upcoming launches, things off-limits."
        />
      </Section>

      {error && (
        <p className="text-sm font-semibold text-coral-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 text-white px-8 py-4 text-[15px] font-semibold hover:bg-ink-800 transition-colors shadow-soft disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Submitting…
          </>
        ) : (
          <>
            Submit intake form
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-ink-500 tracking-[0.1em] uppercase font-semibold">
        You&rsquo;ll hear back within 5 business days
      </p>
    </form>
  );
}

// Small, file-local field primitives — keeps the form body scannable without
// over-engineering a generic form library.
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h3 className="text-caption text-ink-700">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-semibold text-ink-800 mb-1.5">
        {label}
        {required && <span className="text-coral-600"> *</span>}
      </span>
      <input
        required={required}
        {...rest}
        className="w-full rounded-full border border-ink-200 bg-white px-5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 transition-all"
      />
    </label>
  );
}

function Select({
  label,
  required,
  options,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <label className="block">
      <span className="block text-[13px] font-semibold text-ink-800 mb-1.5">
        {label}
        {required && <span className="text-coral-600"> *</span>}
      </span>
      <select
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-full border border-ink-200 bg-white px-5 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 transition-all appearance-none cursor-pointer"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  required,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-semibold text-ink-800 mb-1.5">
        {label}
        {required && <span className="text-coral-600"> *</span>}
      </span>
      <textarea
        required={required}
        rows={4}
        {...rest}
        className="w-full rounded-2xl border border-ink-200 bg-white px-5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 transition-all resize-y min-h-[96px]"
      />
    </label>
  );
}

export default function IntakePage() {
  return (
    <>
      <ThanksHeader />
      <main className="min-h-screen bg-[var(--color-cream)] pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="mx-auto max-w-2xl px-6 sm:px-10">
        <div className="mb-10 text-center">
          <p className="text-caption mb-3 text-coral-700">Intake form</p>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[-0.02em] leading-[1.05] text-ink-950">
            Tell us about your store.
          </h1>
          <p className="mt-4 text-[15px] text-ink-600 leading-relaxed max-w-lg mx-auto">
            The more we know up front, the sharper the audit gets. Takes
            about five minutes — everything here lands straight in the
            reviewer&rsquo;s brief.
          </p>
        </div>

        <Suspense fallback={null}>
          <IntakeForm />
        </Suspense>

        <p className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-ink-500 hover:text-ink-900 transition-colors font-medium"
          >
            &larr; Back to Knock Twice
          </Link>
        </p>
        </div>
      </main>
      <ThanksFooter />
    </>
  );
}
