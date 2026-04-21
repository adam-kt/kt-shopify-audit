import type { Metadata } from "next";
import Link from "next/link";
import { ThanksHeader } from "@/components/thanks/header";
import { ThanksFooter } from "@/components/thanks/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Knock Twice Shopify",
  description:
    "How Knock Twice LLC collects, uses, and protects your information.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <ThanksHeader />
      <main className="bg-[var(--color-cream)]">
        <article className="mx-auto max-w-2xl px-6 sm:px-10 pt-36 pb-24 sm:pt-44">
          <p className="text-caption text-coral-600 mb-4">Privacy Policy</p>
          <h1 className="text-headline text-ink-900">Privacy Policy</h1>
          <p className="mt-4 text-sm text-ink-500">
            Last updated: April 18, 2026
          </p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink-700">
            <section>
              <p>
                Knock Twice LLC (&ldquo;Knock Twice,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us&rdquo;) is a New Jersey limited liability company.
                This Privacy Policy explains what information we collect when
                you visit our website or purchase our Shopify Conversion Audit
                service, how we use that information, and the choices you have.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                1. Information we collect
              </h2>
              <p className="mb-3">We collect information in three ways:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Information you give us.</strong> When you submit a
                  form on our site, we collect your name, email address, store
                  URL, and any message you include. When you purchase an audit,
                  we also collect your payment information through our payment
                  processor.
                </li>
                <li>
                  <strong>Information collected automatically.</strong> When
                  you visit the site, we (and our analytics providers) may
                  collect information about your device, browser, referring
                  site, pages viewed, and general location (country/region)
                  through cookies and similar technologies. Analytics cookies
                  only load if you grant consent.
                </li>
                <li>
                  <strong>Information we receive from third parties.</strong>{" "}
                  Our payment processor confirms whether a payment succeeded or
                  failed and shares limited details (order ID, amount) with
                  us; we do not receive your full card number.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                2. How we use information
              </h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>To deliver the audit you purchased and communicate with you about it.</li>
                <li>To send you service-related emails, and marketing emails if you opt in.</li>
                <li>To understand how the site is used and improve it.</li>
                <li>To prevent fraud, enforce our terms, and comply with law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                3. Service providers we share information with
              </h2>
              <p className="mb-3">
                We share information with service providers who process it on
                our behalf. Each has their own privacy policy:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Square, Inc.</strong> — payment processing. Card data
                  is handled directly by Square and never passes through our
                  systems.
                </li>
                <li>
                  <strong>Klaviyo, Inc.</strong> — email delivery, profiles,
                  and audience list management.
                </li>
                <li>
                  <strong>Google LLC (Google Analytics 4)</strong> — site
                  analytics. Only active after you grant consent.
                </li>
                <li>
                  <strong>Hosting and infrastructure providers</strong> used to
                  operate the site.
                </li>
              </ul>
              <p className="mt-3">
                We do not sell your personal information, and we do not share
                it for cross-context behavioral advertising.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                4. Cookies and tracking
              </h2>
              <p>
                We use a small number of essential cookies to make the site
                work. We also use analytics cookies (Google Analytics 4) only
                if you click Accept in the cookie banner. You can change your
                choice any time by clearing cookies for our domain. We do not
                respond to Do Not Track signals, but we honor the consent
                choice you make in the banner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                5. Data retention
              </h2>
              <p>
                We keep your information for as long as needed to deliver the
                service, comply with legal obligations, resolve disputes, and
                enforce our agreements. Marketing contacts are kept until you
                unsubscribe. Payment records are kept as required by tax and
                accounting law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                6. Your rights
              </h2>
              <p className="mb-3">
                Depending on where you live (including under the GDPR if you
                are in the EU/UK, and the CCPA/CPRA if you are in California),
                you may have the right to:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Access the personal information we hold about you.</li>
                <li>Correct inaccurate information.</li>
                <li>Delete your information.</li>
                <li>Opt out of marketing emails (use the unsubscribe link, or email us).</li>
                <li>Port your data to another provider.</li>
                <li>Withdraw consent for analytics cookies.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email us at{" "}
                <a
                  href="mailto:hello@knocktwice.io"
                  className="text-coral-600 hover:text-coral-700 underline underline-offset-2 decoration-coral-200 font-semibold"
                >
                  hello@knocktwice.io
                </a>
                . We will respond within the time required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                7. International users
              </h2>
              <p>
                We are based in the United States. If you access the site from
                outside the U.S., your information will be transferred to and
                processed in the United States, which may have different data
                protection laws than your country. By using the site, you
                consent to that transfer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                8. Security
              </h2>
              <p>
                We use reasonable administrative, technical, and physical
                safeguards to protect your information. No method of
                transmission over the internet is completely secure, so we
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                9. Children
              </h2>
              <p>
                The site is not directed to children under 16, and we do not
                knowingly collect information from them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                10. Changes to this policy
              </h2>
              <p>
                We may update this policy from time to time. Material changes
                will be reflected by updating the &ldquo;Last updated&rdquo;
                date. Continued use of the site after changes means you accept
                the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                11. Contact us
              </h2>
              <p>
                Knock Twice LLC
                <br />
                New Jersey, United States
                <br />
                <a
                  href="mailto:hello@knocktwice.io"
                  className="text-coral-600 hover:text-coral-700 underline underline-offset-2 decoration-coral-200 font-semibold"
                >
                  hello@knocktwice.io
                </a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-ink-100">
            <Link
              href="/"
              className="text-sm text-ink-500 hover:text-ink-900 transition-colors font-medium"
            >
              &larr; Back to Knock Twice Shopify
            </Link>
          </div>
        </article>
      </main>
      <ThanksFooter />
    </>
  );
}
