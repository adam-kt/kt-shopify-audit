import { SiteNavbar } from "@/components/site/navbar";
import { SiteHero } from "@/components/site/hero";
import { SiteFeatures } from "@/components/site/features";
import { SiteFooter } from "@/components/site/footer";

export default function HomePage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <SiteHero />
        <SiteFeatures />
        {/* B3, B12, B13 pending — see docs/aceternity-migration.md */}
      </main>
      <SiteFooter />
    </>
  );
}
