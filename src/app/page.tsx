import { SiteNavbar } from "@/components/site/navbar";
import { SiteHero } from "@/components/site/hero";
import { SiteFeatures } from "@/components/site/features";
import { SitePricing } from "@/components/site/pricing";
import { SiteFaq } from "@/components/site/faq";
import { SiteCta } from "@/components/site/cta";
import { SiteFooter } from "@/components/site/footer";

export default function HomePage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <SiteHero />
        <SiteFeatures />
        <SitePricing />
        <SiteFaq />
        <SiteCta />
        {/* B3 deliverable preview pending. See docs/aceternity-migration.md */}
      </main>
      <SiteFooter />
    </>
  );
}
