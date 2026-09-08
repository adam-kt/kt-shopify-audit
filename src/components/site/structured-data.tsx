import { FAQS } from "./faq";

/**
 * JSON-LD for the landing page.
 *
 * The FAQ block reads from the same FAQS array the page renders, so the schema
 * cannot drift from the visible answers. Google treats a mismatch between them
 * as a reason to drop the rich result entirely.
 *
 * Only facts that are true by construction go in: the price, the turnaround,
 * the platform. No ratings, no review counts, no aggregate anything. Marking up
 * a rating we cannot substantiate is both a policy violation and the same
 * failure this page has spent its whole life removing.
 */
export function StructuredData({ siteUrl }: { siteUrl: string }) {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Knock Twice",
      url: "https://knocktwice.io",
      email: "hello@knocktwice.io",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Shopify Conversion Audit | Knock Twice",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "Shopify Conversion Audit",
      serviceType: "Ecommerce conversion audit",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Worldwide",
      description:
        "A conversion review of a Shopify storefront. Every page reviewed, findings ranked by impact, each shown on an annotated screenshot, delivered in five business days with a free rescan after thirty days.",
      offers: {
        "@type": "Offer",
        price: "750",
        priceCurrency: "USD",
        url: `${siteUrl}/#pricing`,
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Content is our own static copy, not user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
