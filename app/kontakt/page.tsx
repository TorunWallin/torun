import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ContactForm, type ContactProgram } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Kontakt — Torun Wallin",
  description:
    "Hör av dig till Torun — mejla för frågor eller bara ett hej. Eller anmäl dig till Stark med Torun, 1:1 Coaching eller sök platsen i Stark Tjej.",
};

type Program = {
  program: ContactProgram;
  badge: string;
  name: string;
  tagline: string;
  desc: string;
  highlights: string[];
  price: string;
  priceNote: string;
  featured?: boolean;
};

const programs: Program[] = [
  {
    program: "stark",
    badge: "01 · Mest populär",
    name: "Stark med Torun",
    tagline: "Starkare, vecka för vecka.",
    desc: "Coaching som bygger styrka, trygghet och balans — för dig som vill må bra på riktigt och skapa vanor som håller i din vardag.",
    highlights: [
      "Personligt program som uppdateras varje vecka",
      "Veckovis incheckning & feedback från mig",
      "Kost och vanor anpassat efter din menscykel",
    ],
    price: "1 795 kr",
    priceNote: "/månad · 6 mån",
  },
  {
    program: "ett-till-ett",
    badge: "02 · Max 5 platser",
    name: "1:1 Coaching",
    tagline: "Full omfamning, hela vägen.",
    desc: "Det djupaste stödet — daglig kontakt och ett helt individuellt upplägg. För dig som vill gå all in, med mig vid din sida varje dag.",
    highlights: [
      "Daglig chatt med mig varje vardag",
      "Live-videosamtal varannan vecka",
      "Allt som ingår i Stark med Torun",
    ],
    price: "3 495 kr",
    priceNote: "/månad",
  },
  {
    program: "stark-tjej",
    badge: "03 · Gratis plats",
    name: "Stark Tjej ♡",
    tagline: "Ett varmt rum att börja om i.",
    desc: "En gång per kvartal ger jag bort en plats i Stark med Torun till en ung tjej (16–22 år) som behöver stöd, trygghet och en ny start.",
    highlights: [
      "3 månader i Stark med Torun — helt gratis",
      "Personligt program, anpassat efter dig",
      "Stöd hela vägen — utan krav på prestation",
    ],
    price: "Gratis",
    priceNote: "en plats per kvartal",
  },
];

export default function KontaktPage() {
  return (
    <>
      <SiteNav />

      {/* ===================================================================
          ALLT på EN mönster-bakgrund (cute_background — samma som "Min filosofi")
      =================================================================== */}
      <section className="relative">
        {/* Sticky mönster-bakgrund med vit slöja + glow */}
        <div className="sticky top-0 -mb-[100vh] h-screen overflow-hidden pointer-events-none z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/cute_background.png')",
              backgroundSize: "1100px auto",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="absolute inset-0 bg-white/75" />
          <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-[#ff8fd4]/20 blur-[140px]" />
          <div className="absolute top-1/3 -right-32 h-[440px] w-[440px] rounded-full bg-white/50 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-[#ff8fd4]/15 blur-[140px]" />
        </div>

        {/* ---------- HERO (mejl-fokus) ---------- */}
        <div className="relative z-10 px-6 md:px-16 pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* TEXT */}
            <div className="md:col-span-7">
              <Reveal delay={60}>
                <div className="inline-flex items-center justify-center px-7 py-2.5 rounded-full border border-[#ec4d9c]/30 bg-white/60 backdrop-blur-sm mb-6 shadow-sm">
                  <span className="font-mono text-[12px] tracking-[0.28em] text-[#ec4d9c] uppercase">
                    Kontakt
                  </span>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <h1 className="font-pacifico text-[46px] md:text-[64px] lg:text-[72px] text-teal leading-[0.98] mb-6">
                  Hör av dig <span className="text-pink-hot">♡</span>
                </h1>
              </Reveal>

              <Reveal delay={240}>
                <p className="font-serif text-[18px] md:text-[20px] leading-[1.6] text-ink-charcoal max-w-[540px] mb-8">
                  Har du en fråga, vill veta mer eller bara säga hej? Mejla mig så
                  svarar jag personligen — oftast inom 2–3 dagar. Inget krångel,
                  inga formulär.
                </p>
              </Reveal>

              <Reveal delay={340}>
                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href="mailto:hej@torun.se"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#f4c1f0] to-[#ec4d9c] text-white font-sans font-semibold text-[15px] px-7 py-3.5 shadow-[0_8px_28px_rgba(236,77,156,0.28)] hover:-translate-y-[2px] hover:from-[#fce4ee] hover:to-[#f4a6cc] hover:text-[#111] transition-all duration-300"
                  >
                    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2.5" />
                      <path d="m3.5 7 8.5 6 8.5-6" />
                    </svg>
                    Mejla mig
                  </a>
                  <a
                    href="https://www.instagram.com/torunwallin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-ink bg-white/70 backdrop-blur-sm text-ink font-sans font-semibold text-[15px] px-7 py-3.5 hover:bg-teal hover:text-cream hover:border-teal hover:-translate-y-[2px] transition-all duration-300"
                  >
                    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                    Skriv på Instagram
                  </a>
                </div>
              </Reveal>

              <Reveal delay={460}>
                <p className="mt-5 font-mono text-[13px] text-ink-gray">
                  eller skriv direkt till{" "}
                  <a href="mailto:hej@torun.se" className="text-pink-hot underline decoration-pink-hot/30 underline-offset-4 hover:decoration-pink-hot transition-all">
                    hej@torun.se
                  </a>
                </p>
              </Reveal>
            </div>

            {/* PORTRÄTT */}
            <Reveal direction="left" delay={200} className="md:col-span-5">
              <div className="relative mx-auto w-full max-w-[340px]">
                <div aria-hidden className="absolute -left-5 -top-5 h-full w-full rounded-[40px] border border-[#ec4d9c]/25" />
                <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[48px] bg-[#ff8fd4]/20 blur-[60px]" />
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-[38px] shadow-[0_30px_90px_rgba(236,77,156,0.20)]"
                  style={{ backgroundImage: "url('/kontakta_bild.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}
                  aria-label="Torun"
                />
                <div className="absolute -bottom-5 -right-3 md:-right-5 rounded-full border border-black/10 bg-white/85 px-5 py-2.5 backdrop-blur-xl shadow-xl">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-pink-hot">
                    svarar inom 2–3 dagar
                  </div>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-7 -right-2 h-12 w-12 md:h-14 md:w-14 rotate-12 animate-float bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: "url('/heart_pink.png')" }}
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------- PROGRAM-HEADER (samma stil som "Välj din väg hem") ---------- */}
        <div className="relative z-10 px-6 md:px-16 pt-10 md:pt-16 pb-2 text-center">
          <Reveal>
            <div className="mb-7">
              <div className="inline bg-[#fdeaf8] text-[#ec4d9c] font-mono font-extrabold uppercase text-[13px] md:text-[15px] leading-[1.7] px-8 py-3 rounded-[22px] tracking-[0.18em] decoration-clone box-decoration-clone">
                Anmäl dig
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-pacifico text-[44px] md:text-[56px] leading-[1.05] text-black">
              Välj din väg <span className="text-[#ec4d9c]">in.</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="font-serif text-[18px] md:text-[20px] leading-[1.6] text-black/90 mt-6 max-w-[620px] mx-auto">
              Tre vägar att börja — välj den som känns rätt för dig. Jag läser
              varje anmälan personligen.
            </p>
          </Reveal>
        </div>

        {/* ---------- PROGRAM-BLOCK (info + formulär, varannan vänd) ---------- */}
        <div className="relative z-10 px-6 md:px-16 pt-10 md:pt-14 pb-20 md:pb-28">
          <div className="max-w-[1140px] mx-auto flex flex-col gap-16 md:gap-24">
            {programs.map((p, i) => {
              const flip = i % 2 === 1;
              const accent = p.featured ? "#0a594c" : "#ec4d9c";
              return (
                <div key={p.program} id={p.program} className="scroll-mt-24">
                  <Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                      {/* INFO */}
                      <div className={flip ? "md:order-2" : ""}>
                        {/* Badge */}
                        <span
                          className={`inline-block text-xs font-mono tracking-widest px-5 py-2 rounded-2xl font-medium mb-5 ${
                            p.featured
                              ? "bg-[#97a9aa] text-white"
                              : "bg-gradient-to-r from-[#fce7f3] to-[#f8d4e6] text-[#ec4d9c]"
                          }`}
                        >
                          {p.badge}
                        </span>

                        {/* Namn — Pacifico */}
                        <h3 className="font-pacifico text-3xl md:text-4xl mb-3" style={{ color: accent }}>
                          {p.name}
                        </h3>

                        {/* Tagline — Merriweather italic */}
                        <p className="font-merriweather italic text-[16px] leading-relaxed text-black/80 mb-4">
                          {p.tagline}
                        </p>

                        {/* Beskrivning — Merriweather */}
                        <p className="font-merriweather text-[15px] leading-relaxed text-ink-charcoal mb-6 max-w-[460px]">
                          {p.desc}
                        </p>

                        {/* Highlights — IBM Mono med ✦ */}
                        <ul className="space-y-2.5 mb-7 font-ibm-mono text-[14px]">
                          {p.highlights.map((h, idx) => (
                            <li key={idx} className="flex gap-3 items-start text-ink-charcoal">
                              <span className="text-lg leading-none mt-0.5" style={{ color: accent }}>✦</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Pris */}
                        <div className="flex items-baseline gap-3">
                          <span className="text-4xl font-semibold tracking-tight text-[#2f4a3a]">{p.price}</span>
                          <span className="font-ibm-mono italic text-sm text-ink-gray">{p.priceNote}</span>
                        </div>
                      </div>

                      {/* FORMULÄR-KORT */}
                      <div className={flip ? "md:order-1" : ""}>
                        <div
                          className={`rounded-[32px] p-7 md:p-9 transition-all duration-500 ${
                            p.featured
                              ? "bg-[#0a594c] text-white border-2 border-[#97a9aa] shadow-[0_30px_80px_rgba(10,89,76,0.22)] md:-translate-y-1"
                              : "bg-white border border-[#f5e8d3] shadow-[0_18px_60px_rgba(236,77,156,0.10)] hover:border-[#f8d4e6] hover:-translate-y-1"
                          }`}
                        >
                          <ContactForm program={p.program} />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
