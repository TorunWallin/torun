import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Tack ♡ — TORUN Coach",
  description:
    "Tack för ditt köp av Kickstart. Här är vad som händer härnäst.",
  // Don't index this page
  robots: { index: false, follow: false },
};

export default function KopBekraftatPage() {
  return (
    <>
      <SiteNav />

      <section className="relative px-6 md:px-16 py-20 md:py-32 bg-pink-light overflow-hidden min-h-[70vh] flex items-center">
        <div className="max-w-[720px] mx-auto text-center">
          <Reveal delay={0}>
            <div className="mono-eyebrow text-pink-hot mb-5">
              betalning genomförd
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="font-pacifico text-[56px] md:text-[96px] text-teal leading-[0.95] mb-8">
              Tack ♡
            </h1>
          </Reveal>

          <Reveal delay={260}>
            <p className="text-[18px] md:text-[20px] leading-[1.65] text-ink-charcoal font-serif mb-6">
              Så kul att du sa ja till Kickstart. Det här är första steget — och
              det betyder mer än du tror.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="bg-white/70 border-[1.5px] border-ink rounded-3xl p-7 md:p-9 mt-10 mb-10 text-left">
              <div className="mono-eyebrow text-pink-hot mb-4">
                vad händer nu
              </div>
              <ol className="flex flex-col gap-4 text-[15.5px] leading-[1.7] text-ink-charcoal font-serif">
                <li className="flex gap-4">
                  <span className="font-pacifico text-pink-hot text-[28px] leading-none w-8 flex-shrink-0">
                    1.
                  </span>
                  <span>
                    <strong className="font-semibold">Just nu:</strong> Ett mejl
                    med din startguide ligger på väg till din inkorg. Kolla
                    skräpposten också, ifall.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="font-pacifico text-pink-hot text-[28px] leading-none w-8 flex-shrink-0">
                    2.
                  </span>
                  <span>
                    <strong className="font-semibold">Inom 24 timmar:</strong>{" "}
                    Jag skickar din personliga inbjudan till Everfit-appen där
                    hela ditt 4-veckors program ligger.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="font-pacifico text-pink-hot text-[28px] leading-none w-8 flex-shrink-0">
                    3.
                  </span>
                  <span>
                    <strong className="font-semibold">Sen kör vi:</strong> Läs
                    startguiden, ladda ner Everfit, och kör vecka 1 i din takt.
                    Inget krav. Bara nästa lugna steg.
                  </span>
                </li>
              </ol>
            </div>
          </Reveal>

          <Reveal delay={560}>
            <p className="text-[15px] leading-[1.7] text-ink-charcoal font-serif italic mb-10 opacity-85">
              Frågor? Svara bara på bekräftelsemejlet — det går direkt till mig.
            </p>
          </Reveal>

          <Reveal delay={700}>
            <Link href="/" className="btn-teal-deep">
              Tillbaka till startsidan
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
