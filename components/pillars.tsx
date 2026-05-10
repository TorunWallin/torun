import { ImgSticker } from "./img-sticker";
import { Reveal } from "./reveal";

type Pillar = {
  num: string;
  title: string;
  body: string;
  variant: "pink" | "teal" | "lime";
  // Each pillar can have one or more stickers as a cluster
  stickers: { src: string; size: number; className: string }[];
};

const pillars: Pillar[] = [
  {
    num: "01",
    title: "Hälsa = må bra",
    body: "Hälsa mäts inte på vågen, i mått eller i utseende. Det mäts i hur du sover, hur du orkar, hur du mår med dig själv.",
    variant: "pink",
    stickers: [
      {
        src: "/PinkSetYogaGirl.png",
        size: 80,
        className: "absolute -top-9 right-3 rotate-[6deg] drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]",
      },
    ],
  },
  {
    num: "02",
    title: "Styrka är en superkraft",
    body: "Att lyfta tungt, klara av en vardag, säga ifrån, vila när det behövs. Det är samma muskel — och vi tränar den tillsammans.",
    variant: "teal",
    stickers: [
      {
        src: "/PinkKettleball.png",
        size: 70,
        className: "absolute -top-8 right-3 rotate-[8deg] drop-shadow-[0_4px_10px_rgba(0,0,0,0.20)]",
      },
      {
        src: "/GymGirl.png",
        size: 80,
        className: "absolute -top-10 right-16 -rotate-[10deg] drop-shadow-[0_4px_10px_rgba(0,0,0,0.20)]",
      },
    ],
  },
  {
    num: "03",
    title: "Mat utan dietkultur",
    body: 'Inga regler om "förbjudet". Ingen viktnedgång som mål. Mat är energi, glädje och näring — så pratar vi om den.',
    variant: "lime",
    stickers: [
      {
        src: "/avotoast.png",
        size: 75,
        className: "absolute -top-8 right-3 rotate-[6deg] drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]",
      },
      {
        src: "/Mixedberrys.png",
        size: 70,
        className: "absolute -top-9 right-16 -rotate-[8deg] drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]",
      },
    ],
  },
];

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
      className="relative px-6 md:px-12 py-24 md:py-32 text-center bg-cream overflow-hidden"
    >
      <Reveal delay={0}>
        <div className="mono-eyebrow text-pink-hot mb-3">vad du hittar här</div>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="display-italic text-display-md text-teal mb-3">
          Stark · Trygg · Hel
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <div className="font-script text-pink-hot text-[26px] md:text-[32px] mb-14 -rotate-1 inline-block">
          så här tänker jag
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
        {pillars.map((p, i) => (
          <Reveal key={p.num} delay={300 + i * 120}>
            <div
              className={`${variantClasses[p.variant]} relative rounded-2xl p-9 px-7 text-left border-[1.5px] border-ink hover:-translate-y-1 transition-transform duration-200 h-full`}
            >
              {p.stickers.map((s) => (
                <ImgSticker
                  key={s.src}
                  src={s.src}
                  size={s.size}
                  className={s.className}
                />
              ))}
              <div
                className={`font-mono text-[13px] font-bold tracking-wider mb-4 ${variantNumColor[p.variant]}`}
              >
                {p.num}
              </div>
              <h3
                className={`display-italic text-[32px] leading-tight mb-3.5 ${variantTitleColor[p.variant]}`}
              >
                {p.title}
              </h3>
              <p className={`text-[15px] leading-[1.55] ${variantBodyColor[p.variant]}`}>
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
