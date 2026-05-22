import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { StatsStrip } from "@/components/stats-strip";
import { Pillars } from "@/components/pillars";
import { Kvinnokroppen } from "@/components/kvinnokroppen";
import { Programs } from "@/components/programs";
import { AboutTeaser } from "@/components/about-teaser";
import { CtaStrip } from "@/components/cta-strip";
import { SiteFooter } from "@/components/site-footer";
import { WaveDivider } from "@/components/wave-divider";

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <SiteNav />
      <Hero />
      <StatsStrip />
      <Pillars />
      <Kvinnokroppen />
      <Programs />
      <AboutTeaser />
      <CtaStrip />
      <SiteFooter />
    </main>
  );
}
