import { ImgSticker } from "./img-sticker";
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
      className="relative px-6 md:px-12 py-24 md:py-32 bg-cream-warm overflow-hidden"
    >
      {/* Section-level lifestyle stickers in margins (no per-card stickers) */}
      <Reveal direction="scale" delay={300}>
        <ImgSticker
          src="/PinkEar.png"
          size={75}
          className="hidden md:block absolute top-16 left-[6%] animate-float -rotate-6"
        />
      </Reveal>
      <Reveal direction="scale" delay={400}>
        <ImgSticker
          src="/StanleyCup.png"
          size={70}
          className="hidden md:block absolute top-20 right-[8%] animate-twinkle rotate-6"
        />
      </Reveal>
      <Reveal direction="scale" delay={500}>
        <ImgSticker
          src="/Namnlöst.png"
          size={85}
          className="hidden md:block absolute top-1/2 left-[3%] animate-float rotate-3"
        />
      </Reveal>
      <Reveal direction="scale" delay={550}>
        <ImgSticker
          src="/GymBottle.png"
          size={56}
          className="hidden md:block absolute top-1/2 right-[4%] animate-twinkle -rotate-12"
        />
      </Reveal>
      <Reveal direction="scale" delay={600}>
        <ImgSticker
          src="/GymMat.png"
          size={75}
          className="hidden md:block absolute bottom-20 left-[5%] animate-float -rotate-6"
        />
      </Reveal>
      <Reveal direction="scale" delay={650}>
        <ImgSticker
          src="/gymshoes.png"
          size={80}
          className="hidden md:block absolute bottom-24 right-[6%] animate-twinkle rotate-6"
        />
      </Reveal>

      <div className="relative max-w-[1200px] mx-auto text-center mb-16">
        <Reveal delay={0}>
          <div className="mono-eyebrow text-pink-hot mb-3">välj din väg</div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display-italic text-[44px] md:text-[64px] text-teal leading-[1] mb-4">
            Tre sätt att börja
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div className="font-script text-pink-hot text-[28px] md:text-[34px] -rotate-2 inline-block mb-6">
            för dig, av mig
          </div>
        </Reveal>
        <Reveal delay={280}>
          <p className="max-w-[620px] mx-auto text-[16px] leading-[1.7] text-ink-charcoal">
            Oavsett var du är idag — vi tar nästa steg tillsammans. Alla program
            körs i Everfit-appen, med min coachning i ryggen.
          </p>
        </Reveal>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1200px] mx-auto items-stretch">
        {programs.map((p, i) => (
          <Reveal key={p.name} delay={400 + i * 130}>
            <article
              className={`${cardClasses[p.variant]} relative rounded-2xl border-[1.5px] p-8 md:p-9 flex flex-col h-full ${
                p.featured ? "md:scale-[1.03] shadow-[0_10px_40px_rgba(0,0,0,0.08)]" : ""
              }`}
            >
              {p.badge && (
                <div className="mb-4">
                  <span
                    className={`inline-block font-sans text-[12px] font-semibold px-3 py-1 rounded-full border-[1.5px] ${
                      p.variant === "teal"
                        ? "bg-lime text-ink border-lime"
                        : "bg-pink-hot text-white border-pink-hot"
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>
              )}
              <h3 className="display-italic text-[28px] md:text-[32px] leading-tight mb-3">
                {p.name}
              </h3>
              <p
                className={`text-[15px] leading-[1.55] mb-6 ${
                  p.variant === "teal" ? "text-pink-light opacity-95" : "text-ink-charcoal"
                }`}
              >
                {p.tagline}
              </p>
              <div className="mb-6">
                <span className={`display-italic text-[40px] ${priceColor[p.variant]}`}>
                  {p.price}
                </span>
                {p.priceNote && (
                  <span
                    className={`font-mono text-[12px] tracking-wider ml-2 ${
                      p.variant === "teal" ? "text-pink-light opacity-90" : "text-ink-gray"
                    }`}
                  >
                    {p.priceNote}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-grow">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[14.5px] leading-[1.5]"
                  >
                    <span className={`${checkColor[p.variant]} font-bold mt-0.5`}>
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
        <div className="max-w-[700px] mx-auto text-center mt-16">
          <p className="font-mono text-[12px] tracking-[0.1em] text-ink-gray">
            Founding Members · 20% rabatt på Stark med Torun · 10 platser
          </p>
        </div>
      </Reveal>
    </section>
  );
}
