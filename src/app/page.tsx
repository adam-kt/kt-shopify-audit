import { SiteNavbar } from "@/components/site/navbar";
import { SiteHero } from "@/components/site/hero";
import { SiteFeatures } from "@/components/site/features";
import { SiteDeliverable } from "@/components/site/deliverable";
import { SitePricing } from "@/components/site/pricing";
import { SiteFaq } from "@/components/site/faq";
import { SiteCta } from "@/components/site/cta";
import { SiteFooter } from "@/components/site/footer";
import { MobileStickyCta } from "@/components/site/mobile-sticky-cta";
import { StructuredData } from "@/components/site/structured-data";

export default function HomePage() {
  return (
    <>
      <StructuredData
        siteUrl={process.env.NEXT_PUBLIC_SITE_URL || "https://auditshopify.com"}
      />
      <SiteNavbar />
      <main>
        <SiteHero />
        <SiteFeatures />
        <SiteDeliverable />
        <SitePricing />
        <SiteFaq />
        <SiteCta />
      </main>
      <SiteFooter />
      <MobileStickyCta />
    </>
  );
}
