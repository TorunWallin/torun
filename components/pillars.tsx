import { Reveal } from "./reveal";

const pillars = [
  {
    num: "01",
    title: "Hälsa ska hjälpa dig att leva",
    body: "Jag tror inte hälsa handlar om att kontrollera kroppen hela tiden. Jag tror det handlar om att sova bättre, ha energi, känna sig stark och kunna leva sitt liv fullt ut.",
    variant: "pink",
  },
  {
    num: "02",
    title: "Styrka förändrar mer än kroppen",
    body: "Att bli stark handlar inte bara om muskler. Det handlar om självkänsla, trygghet och att våga ta plats utan att behöva be om ursäkt för det.",
    variant: "teal",
  },
  {
    num: "03",
    title: "Mat ska inte skapa skuld",
    body: 'Här jobbar vi inte med "förbjudet", straff eller perfektion. Mat är energi, näring, njutning och en del av livet — inte något du måste förtjäna.',
    variant: "lime",
  },
] as const;

const variantClasses = {
  pink: "bg-pink-light",
  teal: "bg-teal text-cream",
  lime: "bg-lime",
};

const variantNumColor = {
  pink: "text-pink-hot",
  teal: "text-lime",
  lime: "text-pink-deep",
};

const variantTitleColor = {
  pink: "text-teal",
  teal: "text-white",
  lime: "text-teal",
};

const variantBodyColor = {
  pink: "text-ink-charcoal",
  teal: "text-pink-light opacity-95",
  lime: "text-ink-charcoal",
};

export function Pillars() {
  return (
    <section
      id="filosofi"
      className="relative px-6 md:px-16 py-28 md:py-40 text-center bg-cream-warm overflow-hidden"
    >
      <Reveal delay={120}>
        <h2 className="font-pacifico text-[52px] md:text-[80px] text-teal leading-[1.0] mb-4">
          Stark · Trygg · Hel
        </h2>
      </Reveal>
      <Reveal delay={240}>
        <div className="font-playwrite text-pink-hot text-[20px] md:text-[24px] mb-20 inline-block">
          så här tänker jag
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1180px] mx-auto">
        {pillars.map((p, i) => (
          <Reveal key={p.num} delay={300 + i * 140}>
            <div
              className={`${variantClasses[p.variant]} rounded-3xl p-10 md:p-12 text-left border-[1.5px] border-ink hover:-translate-y-1 transition-transform duration-300 h-full`}
            >
              <div
                className={`font-mono text-[13px] font-bold tracking-[0.18em] mb-8 ${variantNumColor[p.variant]}`}
              >
                {p.num}
              </div>
              <h3
                className={`font-pacifico text-[30px] md:text-[36px] leading-[1.1] mb-5 ${variantTitleColor[p.variant]}`}
              >
                {p.title}
              </h3>
              <p className={`text-[16px] leading-[1.7] font-serif ${variantBodyColor[p.variant]}`}>
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
