/**
 * PillarsFilosofin — Ny version med "Styrka är inte målet. Styrka är medicinen."
 * Kopia av pillars.tsx med nya tre pillars + matchar AboutTeaserManifesto's
 * rosa rådjur-bakgrund så de flyter ihop visuellt.
 *
 * För att aktivera, byt import i page.tsx från
 *   import { Pillars } from "@/components/pillars";
 * till
 *   import { PillarsFilosofin as Pillars } from "@/components/pillars-filosofin";
 */
import { Reveal } from "./reveal";

const pillars = [
  {
    num: "— 01",
    title: "Styrka som medicin",
    body: "När du blir stark förändras din relation till dig själv. Inte för att kroppen ser annorlunda ut — utan för att du gör det. Du tar plats. Du bär dig själv. Du upptäcker att du klarar saker du inte trodde.",
  },
  {
    num: "— 02",
    title: "Äta för att prestera",
    body: "Mat är inte fienden. Mat är inte en belöning. Mat är bränslet som låter din kropp göra det den är skapad för. Här lär du dig att äta för att blomstra — inte för att krympa.",
  },
  {
    num: "— 03",
    title: "Hjärtat först",
    body: "Vi börjar med relationen — till träning, mat, kropp och dig själv. För när hjärtat är på rätt plats blir resten av resan så mycket mjukare. Det här är hälsa som läker, inte håller dig kvar i kontrollen.",
  },
];

export function PillarsFilosofin() {
  return (
    <section id="filosofi" className="relative overflow-hidden px-6 md:px-16 pt-8 md:pt-16 pb-24 md:pb-36">

      {/* Bakgrund — matchar AboutTeaserManifesto så Manifesto + Filosofin flyter ihop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/radjur-blabar_bakgrund.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-[#fdeaf8]/80" />

      <div className="absolute right-[-100px] top-[5%] h-[480px] w-[480px] rounded-full bg-[#ff8fd4]/45 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 left-[-80px] h-[420px] w-[420px] rounded-full bg-white/60 blur-[140px] pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ff4fc4 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative max-w-[1120px] mx-auto text-center">

        {/* Badge */}
        <Reveal delay={60}>
          <div className="inline-flex items-center justify-center px-7 py-2.5 rounded-full border border-[#ec4d9c]/30 bg-white/60 backdrop-blur-sm mb-6 shadow-sm">
            <span className="font-mono text-[12px] tracking-[0.28em] text-[#ec4d9c] uppercase">
              Filosofin
            </span>
          </div>
        </Reveal>

        {/* Rubrik */}
        <Reveal delay={140}>
          <h2 className="font-pacifico text-[44px] md:text-[64px] tracking-[-0.02em] text-[#111] leading-[1.05] mb-6 max-w-[920px] mx-auto">
            Styrka är inte målet. Styrka är <span className="text-[#ec4d9c]">medicinen.</span>
          </h2>
        </Reveal>

        {/* Subheading */}
        <Reveal delay={220}>
          <p className="font-serif italic text-[18px] md:text-[20px] text-black/75 max-w-[600px] mx-auto mb-16 leading-[1.5]">
            Vägen tillbaka till kroppen, till energin, till dig själv — börjar här.
          </p>
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
                <div className="relative z-10 inline-flex items-center justify-center bg-[#fdeaf8] text-[#ec4d9c] text-[14px] font-mono font-bold px-5 py-2 rounded-2xl mb-7 w-fit tracking-[0.08em]">
                  {p.num}
                </div>

                {/* Title */}
                <h3 className="relative z-10 font-pacifico text-[30px] md:text-[28px] tracking-[-0.04em] text-[#111] leading-[1.02] mb-6">
                  {p.title}
                </h3>

                {/* Body */}
                <p className="relative z-10 font-serif text-[16px] text-black/80 leading-[1.7] mt-auto">
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
