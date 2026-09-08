import { SiteNavbar } from "@/components/site/navbar";
import { SiteHero } from "@/components/site/hero";
import { SiteFooter } from "@/components/site/footer";

export default function HomePage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <SiteHero />
        {/* B3–B14 pending — see docs/aceternity-migration.md */}
      </main>
      <SiteFooter />
    </>
  );
}
