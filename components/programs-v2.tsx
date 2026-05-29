/**
 * ProgramsV2 — Ny version med "Tre vägar tillbaka. Välj din väg hem."
 * Kopia av programs.tsx med ny copy + Kickstart-CTA går till Stripe Checkout,
 * Stark + 1:1 går till /kontakt#stark resp. /kontakt#ett-till-ett.
 *
 * För att aktivera, byt import i page.tsx från
 *   import { Programs } from "@/components/programs";
 * till
 *   import { ProgramsV2 as Programs } from "@/components/programs-v2";
 */
import { Reveal } from "./reveal";
import { KickstartCheckoutButton } from "./kickstart-checkout-button";

type Program = {
  badge?: string;
  name: string;
  tagline: string;
  description: string;
  outcome: string;
  price: string;
  priceNote?: string;
  features: string[];
  cta: string;
  variant: "basic" | "core" | "premium";
  featured?: boolean;
  /** "checkout" = Stripe Checkout, "link" = vanlig länk */
  action: { kind: "link"; href: string } | { kind: "checkout"; product: "kickstart" };
};

const programs: Program[] = [
  {
    badge: "01",
    name: "Kickstart",
    tagline: "Första stegen hem.",
    description:
      "En tydlig 4-veckors plan för dig som vill börja — men inte vet var. Ingen press, ingen perfekt start. Bara struktur som faktiskt funkar i ditt liv, och det första lugnet i kroppen när du vet vad du ska göra.",
    outcome: "Du vet exakt vad du ska göra varje vecka och bygger momentum direkt.",
    price: "795 kr",
    priceNote: "engångsbetalning",
    cta: "Ja, jag är redo ♡",
    variant: "basic",
    action: { kind: "checkout", product: "kickstart" },
    features: [
      "4 veckors träningsplan",
      "Enkla rutiner att följa",
      "Gym eller hemma",
      "Ingen stress, bara struktur",
    ],
  },
  {
    badge: "02 · Mest populär",
    name: "Stark med Torun",
    tagline: "Vägen tillbaka, vecka för vecka.",
    description:
      "Sex månader av coaching som lever med ditt liv. Träning, kost och vanor som justeras efter din vecka, din kropp, din menscykel. Du har mig vid din sida — och vi går den här vägen tillsammans.",
    outcome:
      "Du blir starkare, mer stabil och får en kropp och vardag som känns hållbar.",
    price: "1 795 kr",
    priceNote: "/månad · 6 mån",
    cta: "Ja, jag vill börja ♡",
    variant: "core",
    featured: true,
    action: { kind: "link", href: "/kontakt#stark" },
    features: [
      "Personligt anpassat upplägg",
      "Veckovis justering av träning",
      "Stöd i vardagsrutiner",
      "Balans mellan resultat & liv",
    ],
  },
  {
    badge: "03 · Max 5 platser",
    name: "1:1 Coaching",
    tagline: "Full omfamning, hela vägen.",
    description:
      "Det djupaste arbetet. Daglig kontakt, individuellt upplägg i allt — träning, kost, mental hälsa och självkänsla. För dig som är redo att göra det här arbetet på riktigt, med någon som ser dig hela tiden.",
    outcome:
      "Du bygger en helt ny nivå av disciplin, trygghet och självkänsla.",
    price: "3 495 kr",
    priceNote: "/månad",
    cta: "Ansök om plats ♡",
    variant: "premium",
    action: { kind: "link", href: "/kontakt#ett-till-ett" },
    features: [
      "Daglig chat med coach",
      "Individuellt kostupplägg",
      "Veckoplanering & justering",
      "Mental coaching & stöd",
    ],
  },
];

export function ProgramsV2() {
  return (
    <section id="program" className="px-6 md:px-16 py-28 md:py-40
      bg-gradient-to-br from-[#fff9f5] via-[#fdf5f8] to-[#f8f4eb]
      relative overflow-hidden">

      {/* Bakgrundsmönster */}
      <div className="absolute inset-0 bg-[radial-gradient(#fcc6e8_1.2px,transparent_1px)]
                      [background-size:45px_45px] opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffe4f0]/40 via-transparent to-[#f0f7e8]/30 pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-20 relative">
        <Reveal>
          <div className="mb-10">
            <div className="inline bg-[#fdeaf8] text-[#ec4d9c] font-mono font-extrabold uppercase
                          text-[13px] md:text-[15px] leading-[1.7] px-8 py-3 rounded-[22px]
                          tracking-[0.18em] decoration-clone box-decoration-clone">
              Tre vägar tillbaka
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="font-pacifico text-[52px] md:text-[68px] leading-[1.05] text-black mt-6">
            Välj din väg <span className="text-[#ec4d9c]">hem.</span>
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p className="font-serif italic text-[18px] md:text-[20px] leading-[1.65] text-black/75 mt-8 max-w-[620px] mx-auto">
            Oavsett var du börjar handlar det om samma sak — att hitta tillbaka
            till en kropp som är trygg, stark och din.
          </p>
        </Reveal>
      </div>

      {/* Program Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8 items-stretch relative">
        {programs.map((p, i) => (
          <Reveal key={p.name} delay={200 + i * 100}>
            <div
              className={`
                group relative h-full rounded-3xl p-7 md:p-10 flex flex-col
                transition-all duration-500 md:hover:scale-[1.03] hover:shadow-2xl overflow-hidden
                ${p.featured
                  ? "bg-[#0a594c] text-white shadow-2xl border-2 border-[#97a9aa] md:scale-[1.02]"
                  : "bg-white border border-[#f5e8d3] hover:border-[#f8d4e6]"
                }
              `}
            >
              {/* Badge */}
              {p.badge && (
                <div className="mb-6">
                  <span className={`inline-block text-xs font-mono tracking-widest px-5 py-2 rounded-2xl font-medium
                    ${p.featured
                      ? "bg-[#97a9aa] text-white"
                      : "bg-gradient-to-r from-[#fce7f3] to-[#f8d4e6] text-[#ec4d9c]"
                    }`}>
                    {p.badge}
                  </span>
                </div>
              )}

              {/* Namn */}
              <h3 className={`font-pacifico text-3xl md:text-4xl mb-3 transition-colors
                ${p.featured ? "text-white" : "text-[#ec4d9c]"}`}>
                {p.name}
              </h3>

              {/* Tagline */}
              <p className={`font-merriweather italic text-[16px] leading-relaxed mb-4 ${p.featured ? "text-white" : "text-black"}`}>
                {p.tagline}
              </p>
              <p className={`font-merriweather text-[15px] leading-relaxed mb-8 ${p.featured ? "text-white/90" : "text-[#444]"}`}>
                {p.description}
              </p>

              {/* Du kommer få */}
              <div className={`p-5 rounded-2xl mb-8 text-[15px] leading-relaxed font-ibm-mono
                ${p.featured
                  ? "bg-white/10 border border-white/20 text-white"
                  : "bg-gradient-to-br from-[#fff7fb] to-[#fdf0f7] border border-[#fce7f3] text-black"
                }`}>
                <span className="font-medium">Du kommer få:</span> {p.outcome}
              </div>

              {/* Features */}
              <ul className="space-y-3.5 mb-10 text-[15px] flex-1 font-ibm-mono">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="text-[#ec4d9c] text-xl leading-none mt-0.5">✦</span>
                    <span className={p.featured ? "text-white/90" : "text-black"}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
              <div className={`mt-auto pt-8 border-t ${p.featured ? "border-white/20" : "border-black/10"}`}>
                <div className={`text-4xl font-semibold tracking-tight ${p.featured ? "text-white" : "text-[#2f4a3a]"}`}>
                  {p.price}
                </div>

                {p.priceNote && (
                  <div className="font-ibm-mono italic text-sm opacity-75 mt-1">
                    {p.priceNote}
                  </div>
                )}

                {p.action.kind === "checkout" ? (
                  <KickstartCheckoutButton
                    className={`group relative overflow-hidden flex items-center justify-center w-full py-5 rounded-full font-medium text-base mt-8
              transition-all duration-300 hover:-translate-y-[2px] active:scale-95
    ${p.featured
      ? "bg-white text-[#0a594c] hover:bg-[#97a9aa] hover:text-white"
      : "bg-gradient-to-br from-[#f4c1f0] to-[#ec4d9c] text-white hover:from-[#fce4ee] hover:to-[#f4a6cc] hover:text-[#111]"
    }`}
                  >
                    <span className="block transition-transform duration-300 group-hover:-translate-x-2">{p.cta}</span>
                    <span className="absolute inset-y-0 right-6 flex items-center translate-x-16 transition-transform duration-300 group-hover:translate-x-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </KickstartCheckoutButton>
                ) : (
                  <a
                    href={p.action.href}
                    className={`group relative overflow-hidden flex items-center justify-center w-full py-5 rounded-full font-medium text-base mt-8
              transition-all duration-300 hover:-translate-y-[2px] active:scale-95
    ${p.featured
      ? "bg-white text-[#0a594c] hover:bg-[#97a9aa] hover:text-white"
      : "bg-gradient-to-br from-[#f4c1f0] to-[#ec4d9c] text-white hover:from-[#fce4ee] hover:to-[#f4a6cc] hover:text-[#111]"
    }`}
                  >
                    <span className="block transition-transform duration-300 group-hover:-translate-x-2">{p.cta}</span>
                    <span className="absolute inset-y-0 right-6 flex items-center translate-x-16 transition-transform duration-300 group-hover:translate-x-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
