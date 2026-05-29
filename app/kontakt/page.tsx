import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Kontakt — TORUN Coach",
  description:
    "Anmäl dig till Stark med Torun, ansök om 1:1 Coaching eller sök platsen i Stark Tjej. Tre vägar att komma i kontakt — välj den som passar dig.",
};

export default function KontaktPage() {
  return (
    <>
      <SiteNav />

      {/* Hero / intro */}
      <section className="bg-cream-warm px-6 md:px-16 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
        <div className="max-w-[820px] mx-auto">
          <Reveal delay={0}>
            <div className="mono-eyebrow text-pink-hot mb-4">kontakt</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-pacifico text-[52px] md:text-[88px] text-teal leading-[1.0] mb-6">
              Hör av dig ♡
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-[17px] md:text-[18px] leading-[1.75] text-ink-charcoal font-serif max-w-[640px] mx-auto mb-8">
              Tre vägar — välj den som känns rätt för dig. Jag läser alla
              meddelanden personligen och hör av mig så fort jag kan.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="flex flex-wrap justify-center gap-2.5">
              <a
                href="#stark"
                className="px-4 py-2 rounded-full border-[1.5px] border-ink bg-white font-sans text-[14px] font-medium text-ink hover:bg-pink-hot hover:text-white hover:border-pink-hot transition-all"
              >
                Stark med Torun
              </a>
              <a
                href="#ett-till-ett"
                className="px-4 py-2 rounded-full border-[1.5px] border-ink bg-white font-sans text-[14px] font-medium text-ink hover:bg-teal hover:text-cream hover:border-teal transition-all"
              >
                1:1 Coaching
              </a>
              <a
                href="#stark-tjej"
                className="px-4 py-2 rounded-full border-[1.5px] border-ink bg-white font-sans text-[14px] font-medium text-ink hover:bg-lime hover:text-ink hover:border-lime transition-all"
              >
                Stark Tjej
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stark med Torun */}
      <section
        id="stark"
        className="relative px-6 md:px-16 py-20 md:py-28 bg-pink-light overflow-hidden scroll-mt-20"
      >
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <Reveal delay={0}>
              <div className="mono-eyebrow text-pink-hot mb-4">signaturcoachning</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-pacifico text-[44px] md:text-[68px] text-teal leading-[1.0] mb-6">
                Stark med Torun
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-[16px] md:text-[17px] leading-[1.75] text-ink-charcoal font-serif mb-5">
                Coaching som bygger styrka, trygghet och balans — för dig som vill
                må bra på riktigt och bygga vanor som funkar i din vardag.
              </p>
            </Reveal>
            <Reveal delay={340}>
              <p className="text-[15px] leading-[1.75] text-ink-charcoal font-serif italic mb-8 opacity-90">
                Fyll i formuläret så hör jag av mig inom 2–3 dagar med nästa steg.
                Ingen press — bara ett första hej.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <div className="bg-white/70 border-[1.5px] border-ink rounded-2xl p-5 max-w-[420px]">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-pink-hot font-bold mb-2">
                  Pris
                </div>
                <div className="font-pacifico text-[36px] text-pink-hot leading-none mb-1">
                  1 795 kr
                </div>
                <div className="font-ibm-mono italic text-[12px] text-ink-gray">
                  /månad · 6 mån
                </div>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal delay={300}>
              <div className="bg-white border-[1.5px] border-ink rounded-3xl p-7 md:p-9 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
                <ContactForm program="stark" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 1:1 Coaching */}
      <section
        id="ett-till-ett"
        className="relative px-6 md:px-16 py-20 md:py-28 bg-teal text-cream overflow-hidden scroll-mt-20"
      >
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <Reveal delay={0}>
              <div className="mono-eyebrow text-lime mb-4">max 5 platser · ansökan</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-pacifico text-[44px] md:text-[68px] text-white leading-[1.0] mb-6">
                1:1 Coaching
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-[16px] md:text-[17px] leading-[1.75] text-pink-light font-serif mb-5 opacity-95">
                Fullt stöd. Full transformation. Fullt fokus på dig — för dig som
                vill gå all in med nära coachning, struktur och dagligt stöd.
              </p>
            </Reveal>
            <Reveal delay={340}>
              <p className="text-[15px] leading-[1.75] text-pink-light font-serif italic mb-8 opacity-90">
                För 1:1 vill jag alltid prata med dig först. Lämna en kort
                intresseanmälan så hör jag av mig inom 2–3 dagar för att boka ett
                kort samtal — så ser vi om vi passar.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <div className="bg-teal-deep/40 border-[1.5px] border-lime/40 rounded-2xl p-5 max-w-[420px]">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime font-bold mb-2">
                  Pris
                </div>
                <div className="font-pacifico text-[36px] text-lime leading-none mb-1">
                  3 495 kr
                </div>
                <div className="font-ibm-mono italic text-[12px] text-pink-light opacity-80">
                  /månad
                </div>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal delay={300}>
              <div className="bg-teal-deep/30 border-[1.5px] border-lime/40 rounded-3xl p-7 md:p-9 backdrop-blur-sm">
                <ContactForm program="ett-till-ett" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stark Tjej */}
      <section
        id="stark-tjej"
        className="relative px-6 md:px-16 py-20 md:py-28 bg-teal-deep text-cream overflow-hidden scroll-mt-20"
      >
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <Reveal delay={0}>
              <div className="mono-eyebrow text-lime mb-4">en plats per kvartal · gratis</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-pacifico text-[44px] md:text-[68px] text-white leading-[1.0] mb-6">
                Stark Tjej <span className="text-pink-light">♡</span>
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-[16px] md:text-[17px] leading-[1.75] text-pink-light font-serif mb-5 opacity-95">
                En gång per kvartal ger jag bort en plats i{" "}
                <em className="italic text-lime">Stark med Torun</em> till en ung tjej
                som behöver stöd, trygghet och en ny start i sin relation till
                träning och sig själv.
              </p>
            </Reveal>
            <Reveal delay={340}>
              <p className="text-[15px] leading-[1.75] text-pink-light font-serif italic mb-6 opacity-90">
                Ingen prestation. Ingen press att vara duktig. Bara ett varmt rum att
                börja om i — för dig mellan 16–22 år.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <div className="bg-teal/40 border-[1.5px] border-lime/40 rounded-2xl p-5 max-w-[420px]">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime font-bold mb-2">
                  Det här ingår
                </div>
                <ul className="flex flex-col gap-2 text-[13.5px] font-ibm-mono text-pink-light leading-[1.6]">
                  <li className="flex items-start gap-2">
                    <span className="text-lime font-bold mt-0.5">♡</span>
                    <span>3 månader i Stark med Torun — helt utan kostnad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime font-bold mt-0.5">♡</span>
                    <span>Personligt program, anpassat efter dig</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime font-bold mt-0.5">♡</span>
                    <span>Stöd hela vägen — utan krav på prestation</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal delay={300}>
              <div className="bg-teal/40 border-[1.5px] border-lime/40 rounded-3xl p-7 md:p-9 backdrop-blur-sm">
                <ContactForm program="stark-tjej" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Generic mail fallback */}
      <section className="bg-cream px-6 md:px-16 py-16 md:py-20 text-center border-t border-cream-warm">
        <div className="max-w-[620px] mx-auto">
          <p className="mono-eyebrow text-ink-gray mb-3">eller</p>
          <p className="text-[16px] leading-[1.7] text-ink-charcoal font-serif mb-2">
            Vill du bara säga hej, ställa en fråga eller berätta något?
          </p>
          <p className="text-[16px] leading-[1.7] text-ink-charcoal font-serif">
            Mejla mig på{" "}
            <a
              href="mailto:hej@torun.se"
              className="text-pink-hot underline decoration-pink-hot/30 underline-offset-4 hover:decoration-pink-hot transition-all"
            >
              hej@torun.se
            </a>
          </p>
          <div className="mt-10">
            <Link href="/" className="btn-teal-deep">
              ← Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
