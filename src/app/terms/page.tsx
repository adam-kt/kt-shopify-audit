import type { Metadata } from "next";
import Link from "next/link";
import { ThanksHeader } from "@/components/thanks/header";
import { ThanksFooter } from "@/components/thanks/footer";

export const metadata: Metadata = {
  title: "Terms & Conditions — Knock Twice Shopify",
  description:
    "The terms that govern your purchase and use of the Knock Twice Shopify Conversion Audit.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <ThanksHeader />
      <main className="bg-[var(--color-cream)]">
        <article className="mx-auto max-w-2xl px-6 sm:px-10 pt-36 pb-24 sm:pt-44">
          <p className="text-caption text-coral-600 mb-4">Terms</p>
          <h1 className="text-headline text-ink-900">Terms &amp; Conditions</h1>
          <p className="mt-4 text-sm text-ink-500">
            Last updated: April 18, 2026
          </p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink-700">
            <section>
              <p>
                These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your
                purchase and use of the Shopify Conversion Audit service
                offered by Knock Twice LLC, a New Jersey limited liability
                company (&ldquo;Knock Twice,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us&rdquo;). By purchasing the service or using this
                website, you agree to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                1. The service
              </h2>
              <p>
                The Shopify Conversion Audit is a one-time, expert review of
                your Shopify storefront, delivered as a written report with
                prioritized findings, annotated screenshots, and
                recommendations, along with a 30-day automated re-scan. The
                audit is typically delivered within five (5) business days
                from the time you complete the intake form that follows your
                purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                2. Pricing and payment
              </h2>
              <p>
                The audit is sold at the price listed on the site (currently
                $750 USD). Payment is processed by Square, Inc. We do not
                store card details. Purchase is only complete once payment is
                confirmed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                3. Your responsibilities
              </h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Provide accurate information in the intake form, including
                  your store URL and any relevant access.
                </li>
                <li>
                  Own or have authorization to request a review of the store
                  you submit.
                </li>
                <li>
                  Respond to reasonable requests for information needed to
                  complete the audit.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                4. Delivery and turnaround
              </h2>
              <p>
                The 5-business-day turnaround begins once we receive your
                completed intake form. Delays caused by missing information,
                inaccessible storefronts, or client unresponsiveness will
                extend the turnaround accordingly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                5. Refunds
              </h2>
              <p>
                Refund requests are subject to approval at our discretion. To
                be eligible, a request must be submitted within seven (7) days
                after delivery of the audit. Before work has begun on your
                review, a full refund is available on request. Refunds will be
                processed back to the original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                6. Intellectual property
              </h2>
              <p>
                On payment in full, we grant you a non-exclusive, perpetual
                license to use the written deliverables we provide for your
                internal business purposes, including sharing them with
                employees, contractors, and agencies working on your store. We
                retain ownership of our methodology, checklists, templates,
                and any general know-how used to produce the audit, and we
                may reuse them for other clients.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                7. Confidentiality
              </h2>
              <p>
                We treat information about your store, traffic, and strategy
                as confidential and will not disclose it except to deliver the
                service, comply with law, or with your consent. We may
                describe our work in anonymized, non-identifying case studies
                unless you request otherwise in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                8. No guarantee of results
              </h2>
              <p>
                The audit is a professional opinion based on reasonable
                review. We do not guarantee any specific improvement in
                conversion rate, revenue, traffic, or other outcome. Results
                depend on how recommendations are implemented and on factors
                outside our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                9. Disclaimer of warranties
              </h2>
              <p>
                The service and this website are provided on an &ldquo;as
                is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest
                extent permitted by law, Knock Twice disclaims all warranties,
                express or implied, including warranties of merchantability,
                fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                10. Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by law, our total liability to
                you for any claim arising out of or relating to the service or
                these Terms is limited to the amount you paid us for the
                audit. We are not liable for indirect, incidental, special,
                consequential, or punitive damages, or for lost profits,
                revenue, data, or business opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                11. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold Knock Twice harmless from any
                claims, losses, or expenses arising out of your breach of
                these Terms, your misuse of the service, or your infringement
                of any third-party rights, including intellectual property or
                privacy rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                12. Termination
              </h2>
              <p>
                We may suspend or terminate the service at our discretion if
                you breach these Terms, if we are unable to perform the work
                due to factors in your control, or if required by law. On
                termination, the limits-of-liability, intellectual property,
                and governing law sections survive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                13. Governing law and disputes
              </h2>
              <p>
                These Terms are governed by the laws of the State of New
                Jersey, without regard to its conflict of laws rules. Any
                dispute arising out of or relating to these Terms will be
                brought exclusively in the state or federal courts located in
                New Jersey, and you consent to the personal jurisdiction of
                those courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                14. Changes to these terms
              </h2>
              <p>
                We may update these Terms from time to time. Material changes
                will be reflected by updating the &ldquo;Last updated&rdquo;
                date. The Terms in effect on the day you purchase apply to
                that purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-3">
                15. Contact us
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
