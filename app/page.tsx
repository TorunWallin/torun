// =============================================================================
// LIVE-VERSION — Ny struktur:
//   1. Hero
//   2. Stats
//   3. Filosofin + Kvinnokroppen (cute_background.png — en sektion)
//   4. Skiftet
//   5. Programs (Välj din väg)
//   6. Manifesto + Stark Tjej (radjur-blabar_bakgrund.png — en sektion)
//   7. CtaStrip
//   8. Footer
// =============================================================================

import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteNav } from "@/components/site-nav";
import { HeroV2 as Hero } from "@/components/hero-v2";
import { StatsStripV2 as StatsStrip } from "@/components/stats-strip-v2";
import { FilosofinKvinnokroppen } from "@/components/filosofin-kvinnokroppen";
import { Skiftet } from "@/components/skiftet";
import { ProgramsV2 as Programs } from "@/components/programs-v2";
import { ManifestoStarkTjej } from "@/components/manifesto-starktjej";
import { CtaStrip } from "@/components/cta-strip";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <SiteNav />
      <Hero />
      <StatsStrip />
      <FilosofinKvinnokroppen />
      <Skiftet />
      <Programs />
      <ManifestoStarkTjej />
      <CtaStrip />
      <SiteFooter />
    </main>
  );
}
