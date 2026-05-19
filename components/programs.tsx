import { Reveal } from "./reveal";

type Program = {
  badge?: string;
  name: string;
  tagline: string;
  price: string;
  priceNote?: string;
  features: string[];
  cta: string;
  variant: "cream" | "pink" | "teal";
  featured?: boolean;
};

const programs: Program[] = [
  {
    name: "Kickstart med Torun",
    tagline:
      "Färdigt 4-veckors program — gym eller hemma. Lågt instegspris för dig som vill testa min metod.",
    price: "795 kr",
    priceNote: "engångsköp",
    features: [
      "4 veckors program (gym ELLER hemma — du väljer)",
      "Tillgång via Everfit-appen",
      "Videoinstruktioner till varje övning",
      "PDF: Sunda träningsvanor (15-20 sidor)",
      "Mailsupport vid frågor",
    ],
    cta: "Kom igång — 795 kr",
    variant: "cream",
  },
  {
    badge: "Hjärtprodukten",
    name: "Stark med Torun",
    tagline:
      "3 eller 6 månaders online coaching. Helt anpassat program som uppdateras varannan vecka.",
    price: "fr. 1 795 kr",
    priceNote: "/månad — 6 mån bindning",
    features: [
      "Helt anpassat program i Everfit",
      "Veckovis check-in via chatten",
      "Formcheck på videos (svar inom 24h)",
      "Onboarding-samtal 30 min via Zoom",
      "Tillgång till hela övningsbiblioteket",
      "Enkla kostprinciper — utan kalorier",
    ],
    cta: "Boka — fr. 1 795 kr/mån",
    variant: "pink",
    featured: true,
  },
  {
    badge: "Max 5 platser",
    name: "Powerhouse",
    tagline:
      "6 månaders 1:1 coaching. Daglig kontakt, individuellt kostupplägg och månadssamtal.",
    price: "3 495 kr",
    priceNote: "/månad — 6 mån",
    features: [
      "Allt i Stark med Torun, plus:",
      "Daglig chatt-support (mån-fre)",
      "Månadssamtal 45 min via Zoom",
      "Individuellt kostupplägg",
      "Vanetracking & mental hälsa-incheckningar",
      "Programuppdatering varje vecka",
    ],
    cta: "Ansök om plats",
    variant: "teal",
  },
];

const cardClasses = {
  cream: "bg-white border-ink",
  pink: "bg-pink-light border-ink",
  teal: "bg-teal text-cream border-ink",
};

const priceColor = {
  cream: "text-pink-hot",
  pink: "text-pink-hot",
  teal: "text-lime",
};

const ctaClass = {
  cream: "btn-pink",
  pink: "btn-teal",
  teal: "btn-lime",
};

const checkColor = {
  cream: "text-pink-hot",
  pink: "text-teal",
  teal: "text-lime",
};

export function Programs() {
  return (
    <section
      id="program"
      className="relative px-6 md:px-16 py-28 md:py-40 bg-cream overflow-hidden"
    >
      <div className="relative max-w-[1200px] mx-auto text-center mb-20">
        <Reveal delay={0}>
          <div className="mono-eyebrow text-pink-hot mb-4">välj din väg</div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="display-italic text-[52px] md:text-[80px] text-teal leading-[1.0] mb-4 tracking-tight">
            Tre sätt att börja
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <div className="font-script text-pink-hot text-[28px] md:text-[36px] -rotate-2 inline-block mb-8">
            för dig, av mig
          </div>
        </Reveal>
        <Reveal delay={360}>
          <p className="max-w-[600px] mx-auto text-[17px] leading-[1.7] text-ink-charcoal">
            Oavsett var du är idag — vi tar nästa steg tillsammans. Alla program
            körs i Everfit-appen, med min coachning i ryggen.
          </p>
        </Reveal>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto items-stretch">
        {programs.map((p, i) => (
          <Reveal key={p.name} delay={300 + i * 140}>
            <article
              className={`${cardClasses[p.variant]} relative rounded-3xl border-[1.5px] p-9 md:p-10 flex flex-col h-full ${
                p.featured ? "md:scale-[1.04] shadow-[0_18px_60px_rgba(0,0,0,0.10)]" : ""
              }`}
            >
              {p.badge && (
                <div className="mb-5">
                  <span
                    className={`inline-block font-sans text-[12px] font-semibold px-3.5 py-1.5 rounded-full border-[1.5px] tracking-wide ${
                      p.variant === "teal"
                        ? "bg-lime text-ink border-lime"
                        : "bg-pink-hot text-white border-pink-hot"
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>
              )}
              <h3 className="display-italic text-[32px] md:text-[36px] leading-[1.05] mb-4">
                {p.name}
              </h3>
              <p
                className={`text-[15.5px] leading-[1.65] mb-8 ${
                  p.variant === "teal" ? "text-pink-light opacity-95" : "text-ink-charcoal"
                }`}
              >
                {p.tagline}
              </p>
              <div className="mb-8">
                <span className={`display-italic text-[44px] md:text-[48px] ${priceColor[p.variant]}`}>
                  {p.price}
                </span>
                {p.priceNote && (
                  <span
                    className={`block mt-1 font-mono text-[11px] tracking-[0.1em] ${
                      p.variant === "teal" ? "text-pink-light opacity-80" : "text-ink-gray"
                    }`}
                  >
                    {p.priceNote}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-3.5 mb-10 flex-grow">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[14.5px] leading-[1.55]"
                  >
                    <span className={`${checkColor[p.variant]} font-bold mt-0.5 flex-shrink-0`}>
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#kontakt" className={`${ctaClass[p.variant]} w-full justify-center`}>
                {p.cta}
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={800}>
        <div className="max-w-[700px] mx-auto text-center mt-20">
          <p className="mono-eyebrow text-ink-gray">
            Founding Members · 20% rabatt på Stark med Torun · 10 platser
          </p>
        </div>
      </Reveal>
    </section>
  );
}
