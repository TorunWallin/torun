import type { Metadata } from "next";
import Link from "next/link";

import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteNav } from "@/components/site-nav";
import { HeroV2 as Hero } from "@/components/hero-v2";
import { StatsStripV2 as StatsStrip } from "@/components/stats-strip-v2";
import { ManifestoFilosofin } from "@/components/manifesto-filosofin";
import { Skiftet } from "@/components/skiftet";
import { ProgramsV2 as Programs } from "@/components/programs-v2";
import { KvinnokroppenStarkTjej } from "@/components/kvinnokroppen-starktjej";
import { CtaStrip } from "@/components/cta-strip";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Förhandsgranska — TORUN Coach (v2)",
  description: "Förhandsgranskning av nya v2-sajten — påverkar inte startsidan.",
  robots: { index: false, follow: false },
};

export default function ForhandsgranskaPage() {
  return (
    <main>
      {/* Förhandsgranskningsbanner */}
      <div className="bg-pink-hot text-white px-6 py-3 text-center font-mono text-[12px] tracking-[0.2em] uppercase relative z-[60]">
        <span className="opacity-90">Förhandsgranskning · v2 · </span>
        <Link href="/" className="underline hover:opacity-80">
          Tillbaka till startsidan
        </Link>
      </div>

      <AnnouncementBar />
      <SiteNav />
      <Hero />
      <StatsStrip />
      <ManifestoFilosofin />
      <Skiftet />
      <Programs />
      <KvinnokroppenStarkTjej />
      <CtaStrip />
      <SiteFooter />
    </main>
  );
}
