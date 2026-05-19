import { Reveal } from "./reveal";

const pillars = [
  {
    num: "01",
    title: "Hälsa = må bra",
    body: "Hälsa mäts inte på vågen, i mått eller i utseende. Det mäts i hur du sover, hur du orkar, hur du mår med dig själv.",
    variant: "pink",
  },
  {
    num: "02",
    title: "Styrka är en superkraft",
    body: "Att lyfta tungt, klara av en vardag, säga ifrån, vila när det behövs. Det är samma muskel — och vi tränar den tillsammans.",
    variant: "teal",
  },
  {
    num: "03",
    title: "Mat utan dietkultur",
    body: 'Inga regler om "förbjudet". Ingen viktnedgång som mål. Mat är energi, glädje och näring — så pratar vi om den.',
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
      <Reveal delay={0}>
        <div className="mono-eyebrow text-pink-hot mb-4">vad du hittar här</div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="display-italic text-[52px] md:text-[80px] text-teal leading-[1.0] mb-4 tracking-tight">
          Stark · Trygg · Hel
        </h2>
      </Reveal>
      <Reveal delay={240}>
        <div className="font-script text-pink-hot text-[28px] md:text-[36px] mb-20 -rotate-1 inline-block">
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
                className={`display-italic text-[34px] md:text-[40px] leading-[1.05] mb-5 ${variantTitleColor[p.variant]}`}
              >
                {p.title}
              </h3>
              <p className={`text-[16px] leading-[1.7] ${variantBodyColor[p.variant]}`}>
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
