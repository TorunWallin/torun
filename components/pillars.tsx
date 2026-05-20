import { Reveal } from "./reveal";

const pillars = [
  {
    num: "01.",
    title: "Hälsa ska hjälpa dig leva",
    body: "Hälsa handlar inte om kontroll. Det handlar om energi, styrka, återhämtning och att kunna leva livet fullt ut.",
  },
  {
    num: "02.",
    title: "Styrka förändrar allt",
    body: "Styrka handlar om så mycket mer än kroppen. Det bygger självkänsla, trygghet och modet att ta plats.",
  },
  {
    num: "03.",
    title: "Mat ska kännas tryggt",
    body: "Här finns inga förbud eller perfekta dagar. Mat är näring, njutning och en naturlig del av livet.",
  },
];

export function Pillars() {
  return (
    <section className="relative overflow-hidden px-6 md:px-16 py-28 md:py-40">
      
      {/* Background image - subtil */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/cute_background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 1.12
        }}
      />
      
      {/* Vit overlay */}
      <div className="absolute inset-0 bg-white/70" />

      <div className="relative max-w-[1120px] mx-auto text-center">
        
        {/* Badge */}
        <Reveal delay={60}>
          <div className="inline-flex items-center justify-center px-7 py-2.5 rounded-full border border-[#ec4d9c]/30 bg-white/60 backdrop-blur-sm mb-6 shadow-sm">
            <span className="font-mono text-[12px] tracking-[0.28em] text-[#ec4d9c] uppercase">
              Min filosofi
            </span>
          </div>
        </Reveal>

        {/* Rubrik - MERRIWEATHER */}
        <Reveal delay={140}>
          <h2 className="font-serif text-[54px] md:text-[62px] tracking-[-0.05em] text-[#111] leading-[0.92] mb-4">
            Stark · Trygg · Hel
          </h2>
        </Reveal>

        {/* Subheading - PACIFICO */}
        <Reveal delay={220}>
          <div className="font-pacifico text-[18px] md:text-[24px] text-black mb-16">
            så här tänker jag
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pillars.map((p, i) => (
            <Reveal key={i} delay={300 + i * 100}>
              <div
                className={`
                  relative overflow-hidden
                  bg-white/75 backdrop-blur-md
                  border-[2px] border-[#ffa3f0]
                  rounded-[32px] px-9 py-11 md:px-10 md:py-12
                  text-left h-full flex flex-col
                  shadow-[0_10px_40px_rgba(236,77,156,0.10)]
                  hover:-translate-y-2 hover:scale-[1.01]
                  hover:shadow-[0_20px_60px_rgba(236,77,156,0.16)]
                  transition-all duration-500
                  ${i === 1 ? "md:-translate-y-5 scale-[1.02]" : ""}
                `}
                style={{
                  animation: `breathe 7s ease-in-out infinite ${i * 0.8}s`,
                }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_50%)] pointer-events-none" />

                {/* Number */}
                <div className="relative z-10 inline-flex items-center justify-center bg-[#fdeaf8] text-[#ffa3f0] text-[16px] font-mono font-bold px-6 py-2 rounded-2xl mb-7 w-fit">
                  {p.num}
                </div>

                {/* Title - PACIFICO */}
                <h3 className="relative z-10 font-pacifico text-[30px] md:text-[28px] tracking-[-0.04em] text-[#111] leading-[1.02] mb-6">
                  {p.title}
                </h3>

                {/* Body - IBM PLEX MONO */}
                <p className="relative z-10 font-mono text-[16px] text-black/75 leading-[1.9] mt-auto">
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


