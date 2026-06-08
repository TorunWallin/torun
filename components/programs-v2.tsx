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
import { LAUNCH_OFFER } from "@/lib/offer";

type Program = {
  badge?: string;
  name: string;
  tagline: string;
  description: string;
  outcome: string;
  price: string;
  priceNote?: string;
  /** Lanseringspris — överstruket ordinarie (price) + nytt pris (launchPrice) */
  launchPrice?: string;
  offerLabel?: string;
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
    tagline: "Dina första steg – utan press.",
    description:
      "En enkel 4-veckorsplan för dig som vill börja träna men inte vet var du ska ta vägen. Ingen perfektion, ingen stress – bara struktur som passar ditt liv och ger dig det där första lugnet i kroppen när du vet exakt vad du ska göra.",
    outcome:
      "Struktur, momentum och en kropp som äntligen börjar känna sig hemma i träningen – utan att hela ditt liv måste läggas om.",
    price: "795 kr",
    priceNote: "engångsbetalning",
    launchPrice: LAUNCH_OFFER.kickstart.active ? LAUNCH_OFFER.kickstart.now : undefined,
    offerLabel: LAUNCH_OFFER.kickstart.active ? LAUNCH_OFFER.label : undefined,
    cta: "Ja, jag är redo ♡",
    variant: "basic",
    action: { kind: "checkout", product: "kickstart" },
    features: [
      "4-veckors träningsprogram (gym eller hemma – du väljer)",
      "Videoinstruktioner till varje övning",
      "Enkla vardagsrutiner för sömn, rörelse och mat",
      "Tillgång till hela programmet i Everfit, i din egen takt",
      "Du kan höra av dig till mig när du behöver",
    ],
  },
  {
    badge: "02 · Mest populär",
    name: "Stark med Torun",
    tagline: "Starkare, vecka för vecka.",
    description:
      "Sex månader av coaching som verkligen lever med ditt liv. Träning, kost och vanor som anpassas efter din vecka, din kropp och din menscykel. Du har mig vid din sida hela vägen – vi går den här resan tillsammans.",
    outcome:
      "En starkare och stabilare kropp – och en vardag som faktiskt går ihop. Inte ett quick fix, utan ett halvår som förändrar hur du rör dig genom livet.",
    price: "1 795 kr",
    priceNote: "/mån · 6 mån bindning",
    launchPrice: LAUNCH_OFFER.stark.active ? LAUNCH_OFFER.stark.now : undefined,
    offerLabel: LAUNCH_OFFER.stark.active ? LAUNCH_OFFER.label : undefined,
    cta: "Ja, jag vill börja ♡",
    variant: "core",
    featured: true,
    action: { kind: "link", href: "/kontakt#stark" },
    features: [
      "Personligt anpassat träningsprogram (uppdateras varje vecka)",
      "Månadsvisa check-ins via möte/video",
      "Veckovisa chatt-avstämningar – du skickar, jag ger feedback och justerar varje vecka",
      "Kostvägledning anpassad efter dig (inte ett strikt schema)",
      "Anpassningar utifrån menscykel och energi",
      "Stöd i sömn, stress och återhämtning",
      "Löpande stöd via chatt på vardagar",
      "Full tillgång till ditt program i Everfit",
    ],
  },
  {
    badge: "03 · Max 5 platser",
    name: "1:1 Coaching",
    tagline: "Full omfamning, hela vägen.",
    description:
      "Det djupaste stödet. Daglig chatt och veckovisa 1:1-möten med ett helt individuellt upplägg för träning, kost, mental hälsa och självkänsla. För dig som är redo att göra det här på riktigt – med någon som ser dig varje vecka.",
    outcome:
      "En helt ny nivå av styrka, trygghet och självkänsla. Och en relation till din kropp som håller långt efter att vi är klara.",
    price: "3 495 kr",
    priceNote: "/mån · löpande, minst 3 mån",
    launchPrice: LAUNCH_OFFER.one1.active ? LAUNCH_OFFER.one1.now : undefined,
    offerLabel: LAUNCH_OFFER.one1.active ? LAUNCH_OFFER.label : undefined,
    cta: "Ansök om plats ♡",
    variant: "premium",
    action: { kind: "link", href: "/kontakt#ett-till-ett" },
    features: [
      "Daglig chatt med mig varje vardag",
      "Veckovisa 1:1-möten (live video, bara vi två)",
      "Individuellt kostschema byggt bara för dig",
      "Mental coaching kring självkänsla och kroppsbild",
      "Prioriterad hjälp och löpande planering i realtid",
      "Allt som ingår i Stark med Torun",
    ],
  },
];

export function ProgramsV2() {
  return (
    <section id="program" className="px-6 md:px-16 py-20 md:py-28
      bg-gradient-to-br from-[#FEFBF5] via-[#FDF8F2] to-[#FEFBF5]
      relative overflow-hidden">

      {/* Bakgrundsmönster */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F4C3A]/5 via-transparent to-[#f0f7e8]/15 pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-20 relative">
        <Reveal>
          <div className="mb-10">
            <div className="inline bg-gradient-to-r from-[#fce7f3] to-[#f8d4e6] text-[#ec4d9c] font-mono font-extrabold uppercase
                          text-[13px] md:text-[15px] leading-[1.7] px-8 py-3 rounded-[22px]
                          tracking-[0.18em] decoration-clone box-decoration-clone">
              Tre vägar tillbaka
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="font-uloopet text-[52px] md:text-[60px] leading-[1.05] text-black mt-6">
            Välj din väg <span className="text-[#ec4d9c]">hem.</span>
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p className="font-alice tracking-[-0.015em] text-[18px] md:text-[20px] leading-[1.65] text-black/100 mt-8 max-w-[620px] mx-auto">
            Oavsett var du börjar handlar det om samma sak — att hitta tillbaka
            till en<i>  kropp som är trygg, stark och din.</i>
          </p>
        </Reveal>
      </div>

      {/* Program Cards — bredare container för mer features-text */}
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-3 gap-5 md:gap-6 items-stretch relative">
        {programs.map((p, i) => (
          <Reveal key={p.name} delay={200 + i * 100}>
            <div
              className={`
                group relative h-full rounded-3xl p-8 md:p-11 flex flex-col
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
                      : "bg-[#F5EDE3] text-[#ec4d9c]"
                    }`}>
                    {p.badge}
                  </span>
                </div>
              )}

              {/* Namn */}
              <h3 className={`font-uloopet text-3xl md:text-4xl mb-3 transition-colors
                ${p.featured ? "text-white" : "text-[#ec4d9c]"}`}>
                {p.name}
              </h3>

              {/* Tagline */}
              <p className={`font-alice tracking-[-0.015em] italic text-[17px] leading-relaxed mb-4 ${p.featured ? "text-white" : "text-black"}`}>
                {p.tagline}
              </p>
              <p className={`font-alice tracking-[-0.015em] text-[16px] leading-relaxed mb-8 ${p.featured ? "text-white/90" : "text-[#00000]"}`}>
                {p.description}
              </p>

              {/* Du kommer få */}
              <div className={`p-5 rounded-2xl mb-8 text-[15px] leading-relaxed font-ibm-mono
                ${p.featured
                  ? "bg-white/10 border border-white/20 text-white"
                  : "bg-gradient-to-br from-cream to-cream-warm border border-[#f4a6cc]/30 text-black"
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
                {p.offerLabel && (
                  <div className={`inline-block mb-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full
                    ${p.featured ? "bg-white/15 text-white" : "bg-[#fdeaf8] text-[#ec4d9c]"}`}>
                    {p.offerLabel}
                  </div>
                )}
                <div className="flex items-baseline gap-2.5">
                  <div className={`text-[42px] font-alice tracking-[-0.015em] font-semibold tracking-tight ${p.featured ? "text-white" : "text-[#2f4a3a]"}`}>
                    {p.launchPrice ?? p.price}
                  </div>
                  {p.launchPrice && (
                    <div className={`text-2xl font-alice tracking-[-0.015em] font-medium line-through ${p.featured ? "text-white/50" : "text-black/35"}`}>
                      {p.price}
                    </div>
                  )}
                </div>

                {p.priceNote && (
                  <div className="font-alice tracking-[-0.015em] italic text-base opacity-100 mt-1">
                    {p.priceNote}
                  </div>
                )}

                {p.action.kind === "checkout" ? (
                  <KickstartCheckoutButton
                    className={`group relative overflow-hidden flex items-center justify-center w-full py-5 rounded-full font-medium text-lg mt-8
              transition-all duration-300 hover:-translate-y-[2px] active:scale-95
    ${p.featured
      ? "bg-white text-[#0a594c] hover:bg-[#97a9aa] hover:text-white"
      : "bg-gradient-to-br from-[#f4c1f0] to-[#ec4d9c] text-white hover:from-[#fce4ee] hover:to-[#f4a6cc] hover:text-[#111]"
    }`}
                  >
                    <span className="block transition-transform duration-300 group-hover:-translate-x-2 font-alice tracking-[-0.015em]">{p.cta}</span>
                    <span className="absolute inset-y-0 right-6 flex items-center translate-x-16 transition-transform duration-300 group-hover:translate-x-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </KickstartCheckoutButton>
                ) : (
                  <a
                    href={p.action.href}
                    className={`group relative overflow-hidden flex items-center justify-center w-full py-5 rounded-full font-medium text-lg mt-8
              transition-all duration-300 hover:-translate-y-[2px] active:scale-95
    ${p.featured
      ? "bg-white text-[#0a594c] hover:bg-[#97a9aa] hover:text-white"
      : "bg-gradient-to-br from-[#f4c1f0] to-[#ec4d9c] text-white hover:from-[#fce4ee] hover:to-[#f4a6cc] hover:text-[#111]"
    }`}
                  >
                    <span className="block transition-transform duration-300 group-hover:-translate-x-2 font-alice tracking-[-0.015em]">{p.cta}</span>
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
