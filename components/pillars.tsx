import { Reveal } from "./reveal";

const pillars = [
  {
    num: "01",
    title: "Hälsa ska hjälpa dig leva",
    body: "Hälsa handlar inte om kontroll. Det handlar om energi, styrka, återhämtning och att kunna leva livet fullt ut.",
    variant: "pink",
  },
  {
    num: "02",
    title: "Styrka förändrar allt",
    body: "Styrka handlar om så mycket mer än kroppen. Det bygger självkänsla, trygghet och modet att ta plats.",
    variant: "teal",
  },
  {
    num: "03",
    title: "Mat ska kännas tryggt",
    body: "Här finns inga förbud eller perfekta dagar. Mat är näring, njutning och en naturlig del av livet.",
    variant: "lime",
  },
] as const;

const variantClasses = {
  pink: "bg-[#ffeaf3]",
  teal: "bg-[#2f4a3a]",
  lime: "bg-[#eef7b2]",
};

const variantNumColor = {
  pink: "text-[#ec4d9c]",
  teal: "text-[#d8ff72]",
  lime: "text-[#d94b91]",
};

const variantTitleColor = {
  pink: "text-[#2f4a3a]",
  teal: "text-white",
  lime: "text-[#2f4a3a]",
};

const variantBodyColor = {
  pink: "text-[#3f3f3f]",
  teal: "text-[#fff6fa]/90",
  lime: "text-[#3f3f3f]",
};

export function Pillars() {
  return (
    <section
      id="filosofi"
      className="relative overflow-hidden px-6 md:px-16 py-28 md:py-40 bg-[#fdfaf7]"
    >
      {/* subtle background glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-lime-200 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* heading */}
        <div className="text-center mb-20 md:mb-24">
          <Reveal delay={120}>
            <h2 className="font-serif text-[52px] md:text-[82px] leading-[0.95] tracking-[-0.04em] text-[#2f4a3a]">
              Stark · Trygg · Hel
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <div className="font-playwrite text-[#ec4d9c] text-[18px] md:text-[24px] mt-6 inline-block">
              så här tänker jag
            </div>
          </Reveal>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={300 + i * 120}>
              <div
                className={`
                  ${variantClasses[p.variant]}
                  relative
                  overflow-hidden
                  rounded-[36px]
                  px-8 py-10 md:px-10 md:py-12
                  border border-black/5
                  shadow-[0_15px_45px_rgba(0,0,0,0.05)]
                  backdrop-blur-sm
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]
                  h-full
                  flex flex-col
                  ${i === 1 ? "md:-translate-y-6" : ""}
                `}
              >
                {/* subtle card glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_45%)] pointer-events-none" />

                {/* number */}
                <div
                  className={`
                    ${variantNumColor[p.variant]}
                    text-[13px]
                    font-medium
                    tracking-[0.28em]
                    uppercase
                    mb-8
                    relative
                    z-10
                  `}
                >
                  {p.num}
                </div>

                {/* title */}
                <h3
                  className={`
                    ${variantTitleColor[p.variant]}
                    font-serif
                    text-[30px]
                    md:text-[42px]
                    leading-[1.02]
                    tracking-[-0.03em]
                    mb-6
                    relative
                    z-10
                  `}
                >
                  {p.title}
                </h3>

                {/* body */}
                <p
                  className={`
                    ${variantBodyColor[p.variant]}
                    text-[15px]
                    md:text-[16px]
                    leading-[1.9]
                    font-light
                    relative
                    z-10
                    max-w-[32ch]
                  `}
                >
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}