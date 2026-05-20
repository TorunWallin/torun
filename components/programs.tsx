import { Reveal } from "./reveal";

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
};


const programs: Program[] = [
  {
    badge: "Perfekt för start",
    name: "Kickstart",
    tagline: "För dig som vill börja enkelt men på riktigt.",
    description:
      "Du får en tydlig 4-veckors plan som tar bort kaoset och gör det lätt att komma igång — utan att överväldigas.",
    outcome: "Du vet exakt vad du ska göra varje vecka och bygger momentum direkt.",
    price: "795 kr",
    priceNote: "engångsbetalning",
    cta: "Starta Kickstart",
    variant: "basic",
    features: [
      "4 veckors träningsplan",
      "Enkla rutiner att följa",
      "Gym eller hemma",
      "Ingen stress, bara struktur",
    ],
  },
  {
    badge: "Mest populär",
    name: "Stark med Torun",
    tagline: "Coaching som bygger styrka, trygghet och balans.",
    description:
      "Vi jobbar tillsammans med träning, kost och vanor som faktiskt funkar i din vardag — inte perfektion.",
    outcome:
      "Du blir starkare, mer stabil och får en kropp och vardag som känns hållbar.",
    price: "1 795 kr",
    priceNote: "/månad · 6 mån",
    cta: "Börja coaching",
    variant: "core",
    featured: true,
    features: [
      "Personligt anpassat upplägg",
      "Veckovis justering av träning",
      "Stöd i vardagsrutiner",
      "Balans mellan resultat & liv",
    ],
  },
  {
    badge: "Max 5 platser",
    name: "1:1 Coaching",
    tagline: "Fullt stöd. Full transformation. Fullt fokus på dig.",
    description:
      "Det här är för dig som vill gå all in med nära coachning, struktur och dagligt stöd i allt som påverkar din hälsa.",
    outcome:
      "Du bygger en helt ny nivå av disciplin, trygghet och självkänsla.",
    price: "3 495 kr",
    priceNote: "/månad",
    cta: "Ansök nu",
    variant: "premium",
    features: [
      "Daglig chat med coach",
      "Individuellt kostupplägg",
      "Veckoplanering & justering",
      "Mental coaching & stöd",
    ],
  },
];

function cardStyle(featured?: boolean, variant?: string) {
  const base =
    "relative rounded-3xl p-8 md:p-10 flex flex-col transition-all duration-300 border backdrop-blur-sm";

  if (featured) {
    return `${base} bg-black text-white border-black shadow-2xl scale-[1.04] hover:scale-[1.06]`;
  }

  switch (variant) {
    case "basic":
      return `${base} bg-white border-neutral-200 hover:shadow-xl hover:-translate-y-1`;
    case "core":
      return `${base} bg-neutral-50 border-neutral-200 hover:shadow-2xl hover:-translate-y-2`;
    case "premium":
      return `${base} bg-gradient-to-b from-black to-neutral-900 text-white border-black hover:scale-[1.02]`;
  }
}

function buttonStyle(featured?: boolean, variant?: string) {
  if (featured) return "bg-white text-black hover:opacity-90";

  switch (variant) {
    case "basic":
      return "bg-black text-white hover:opacity-90";
    case "core":
      return "bg-black text-white hover:opacity-90";
    case "premium":
      return "bg-white text-black hover:opacity-90";
  }
}

export function Programs() {
  return (
    <section className="px-6 md:px-16 py-28 md:py-40 
      bg-gradient-to-br from-[#fff9f5] via-[#fdf5f8] to-[#f8f4eb]
      relative overflow-hidden">

      {/* Bakgrundsmönster */}
      <div className="absolute inset-0 bg-[radial-gradient(#fcc6e8_1.2px,transparent_1px)] 
                      [background-size:45px_45px] opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffe4f0]/40 via-transparent to-[#f0f7e8]/30 pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <Reveal>
          <div className="mb-10">
            <div className="inline bg-[#fdeaf8] text-[#ffa3f0] font-mono font-extrabold uppercase 
                          text-[13px] md:text-[15px] leading-[1.7] px-8 py-3 rounded-[22px] 
                          decoration-clone box-decoration-clone">
              VÄLJ DIN VÄG
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="font-pacifico text-[52px] md:text-[64px] leading-none text-black mt-6">
            Vilken resa vill du påbörja?
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p className="font-merriweather text-[18px] md:text-[19px] leading-relaxed text-black mt-8 max-w-[620px] mx-auto">
            Oavsett var du börjar handlar det om att bygga en stark, hållbar och trygg relation 
            till din kropp och din vardag.
          </p>
        </Reveal>
      </div>

      {/* BREDare Program Cards */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {programs.map((p, i) => (
          <Reveal key={p.name} delay={200 + i * 100}>
            {/* Inne i programs.map */}
<div
  className={`
    group relative h-full rounded-3xl p-8 md:p-10 flex flex-col
    transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl overflow-hidden
    ${p.featured
      ? "bg-[#0a594c] text-white shadow-2xl border-2 border-[#97a9aa] scale-[1.02]" 
      : "bg-white border border-[#f5e8d3] hover:border-[#f8d4e6]"
    }
  `}
>
              {/* Badge */}
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
              <h3 className={`font-pacifico text-4xl md:text-5xl mb-3 transition-colors
                ${p.featured ? "text-white" : "text-[#ec4d9c]"}`}>
                {p.name}
              </h3>

              {/* Merriweather brödtext */}
              <p className={`font-merriweather text-[15px] leading-relaxed mb-2 font-medium ${p.featured ? "text-white" : "text-black"}`}>
                {p.tagline}
              </p>
              <p className={`font-merriweather text-[15px] leading-relaxed mb-8 ${p.featured ? "text-white/90" : "text-[#444]"}`}>
                {p.description}
              </p>

              {/* Du kommer få – IBM Mono */}
              <div className={`p-5 rounded-2xl mb-8 text-[15px] leading-relaxed font-ibm-mono
                ${p.featured 
                  ? "bg-white/10 border border-white/20 text-white" 
                  : "bg-gradient-to-br from-[#fff7fb] to-[#fdf0f7] border border-[#fce7f3] text-black"
                }`}>
                <span className="font-medium">Du kommer få:</span> {p.outcome}
              </div>

              {/* Features – IBM Mono */}
              <ul className="space-y-3.5 mb-10 text-[15px] flex-1 font-ibm-mono">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="text-[#ec4d9c] text-xl leading-none mt-0.5">✦</span>
                    <span className={p.featured ? "text-white/90" : "text-black"}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
              <div className="mt-auto pt-8 border-t border-white/20">
                <div className={`text-4xl font-semibold tracking-tight ${p.featured ? "text-white" : "text-[#2f4a3a]"}`}>
                  {p.price}
                </div>
                
                {p.priceNote && (
                  <div className="font-ibm-mono italic text-sm opacity-75 mt-1">
                    {p.priceNote}
                  </div>
                )}

                <a
  href="#kontakt"
  className={`block w-full text-center py-5 rounded-2xl font-medium text-base mt-8 
              transition-all duration-300 active:scale-95
    ${p.featured
      ? "bg-white text-[#0a594c] hover:bg-[#97a9aa] hover:text-white hover:shadow-xl"
      : "bg-gradient-to-r from-[#ec4d9c] to-[#d63a85] text-white hover:brightness-110 hover:shadow-xl"
    }`}
>
  {p.cta}
</a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}