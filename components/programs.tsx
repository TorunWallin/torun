import { Reveal } from "./reveal";

type Program = {
  badge?: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceNote?: string;
  features?: string[];
  cta: string;
  variant: "cream" | "pink" | "teal";
  featured?: boolean;
};

const programs: Program[] = [
  {
    badge: "Kickstart-produkten",
    name: "Kickstart med Torun",
    tagline:
      "För dig som vill komma igång på ett tryggt och hållbart sätt — utan att behöva göra allt perfekt.",
    description:
      "Ett färdigt 4-veckors program för gym eller hemma, med fokus på styrka, energi och rutiner som faktiskt håller.",
    price: "795 kr",
    priceNote: "engångsköp",
    cta: "Kom igång — 795 kr",
    variant: "cream",
  },
  {
    badge: "Signaturcoachning",
    name: "Stark med Torun",
    tagline:
      "Min signaturcoachning för dig som vill bygga styrka, trygghet och hållbara vanor med stöd hela vägen.",
    description:
      "Vi jobbar tillsammans utifrån din kropp, din vardag och dina mål — utan extrema upplägg eller stress kring mat och träning. För dig som vill känna dig starkare både fysiskt och mentalt.",
    price: "fr. 1 795 kr",
    priceNote: "/månad — 6 mån bindning",
    cta: "Boka — fr. 1 795 kr/mån",
    variant: "pink",
    featured: true,
  },
  {
    badge: "Max 5 platser",
    name: "Torun 1:1",
    tagline:
      "Min mest personliga coachning — för dig som vill ha nära stöd, djupare guidning och hjälp att skapa hållbara förändringar på riktigt.",
    description:
      "Vi jobbar tillsammans med träning, vanor, återhämtning, kost och mental hälsa utifrån dig, din kropp och ditt liv. För dig som vill känna dig stark, trygg och mer hemma i dig själv — med stöd hela vägen.",
    price: "3 495 kr",
    priceNote: "/månad · 6 månader",
    features: [
      "Allt i Stark med Torun",
      "Daglig kontakt via chat (mån–fre)",
      "Individuellt kostupplägg",
      "Veckovis programuppdatering",
      "Månadssamtal 45 min via Zoom",
      "Vanecoachning & mental hälsa-check-ins",
      "Extra stöd kring stress, återhämtning & balans",
    ],
    cta: "Ansök om plats ♡",
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
      className="relative px-6 md:px-16 py-28 md:py-40 bg-cream-warm overflow-hidden"
    >
      <div className="relative max-w-[1200px] mx-auto text-center mb-20">
        <Reveal delay={0}>
          <div className="mono-eyebrow text-pink-hot mb-4">välj din väg</div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-pacifico text-[52px] md:text-[80px] text-teal leading-[1.0] mb-6">
            Tre sätt att börja
          </h2>
        </Reveal>
        <Reveal delay={260}>
          <p className="max-w-[640px] mx-auto text-[17px] leading-[1.75] text-ink-charcoal font-serif mb-3">
            Oavsett om du är helt ny till gymmet eller bara vill hitta tillbaka
            till dig själv igen — det finns en plats att börja här.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <p className="max-w-[640px] mx-auto text-[15px] leading-[1.7] text-ink-gray font-serif italic">
            Alla program sker online via Everfit, med coachning, struktur och
            stöd längs vägen.
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
              <h3 className="font-pacifico text-[34px] md:text-[40px] leading-[1.05] mb-5">
                {p.name}
              </h3>
              <p
                className={`text-[15.5px] leading-[1.7] mb-4 font-serif ${
                  p.variant === "teal" ? "text-pink-light opacity-95" : "text-ink-charcoal"
                }`}
              >
                {p.tagline}
              </p>
              <p
                className={`text-[14.5px] leading-[1.65] mb-7 font-serif ${
                  p.variant === "teal" ? "text-pink-light opacity-85" : "text-ink-charcoal opacity-85"
                }`}
              >
                {p.description}
              </p>
              <div className="mb-7">
                <span className={`font-pacifico text-[44px] md:text-[48px] ${priceColor[p.variant]}`}>
                  {p.price}
                </span>
                {p.priceNote && (
                  <span
                    className={`block mt-1 font-sans text-[12px] ${
                      p.variant === "teal" ? "text-pink-light opacity-80" : "text-ink-gray"
                    }`}
                  >
                    {p.priceNote}
                  </span>
                )}
              </div>
              {p.features && p.features.length > 0 && (
                <ul className="flex flex-col gap-3 mb-9 flex-grow">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-[14px] leading-[1.55] font-serif"
                    >
                      <span className={`${checkColor[p.variant]} font-bold mt-0.5 flex-shrink-0`}>
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
              {(!p.features || p.features.length === 0) && (
                <div className="flex-grow" />
              )}
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
