import { Reveal } from "./reveal";

const stats = [
  { num: "0", label: "Förbjudna livsmedel" },
  { num: "0", label: "Krav på perfektion" },
  { num: "100%", label: "Du behöver inte förändra dig för att börja" },
  { num: "∞", label: "Nya chanser" },
];

export function StatsStrip() {
  return (
    <section className="relative -mt-24 md:-mt-32 z-30 px-6 md:px-12 py-20 md:py-28 overflow-hidden bg-[#fff7fb]">
      
      {/* floating background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-[-120px] w-[520px] h-[520px] bg-pink-200/30 blur-[140px] rounded-full animate-float-slow" />
        <div className="absolute bottom-[-220px] right-[-120px] w-[520px] h-[520px] bg-rose-200/20 blur-[160px] rounded-full animate-float-slower" />
      </div>

      {/* Header */}
      <div className="relative max-w-[1200px] mx-auto text-center mb-14 md:mb-20">
        <Reveal direction="up" delay={0}>
          <p className="font-mono text-[15px] md:text-[17px] tracking-[0.35em] uppercase text-pink-400 mb-4">
            MINDSET SHIFT
          </p>
        </Reveal>
        <Reveal direction="up" delay={120}>
          <h2 className="font-serif text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] text-[#2a2a2a]">
            Allt börjar med att släppa pressen
          </h2>
        </Reveal>
      </div>

      {/* Cards */}
      <div className="relative max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} direction="up" delay={i * 120}>
            <div className="group relative h-full text-center rounded-[36px] bg-white/60 backdrop-blur-xl border border-white/40 px-6 py-10 md:py-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-[0_45px_120px_rgba(236,77,156,0.18)] hover:bg-white/70">
              
              {/* Number - PLAYWRITE */}
              <div className="font-playwrite text-[58px] md:text-[52px] leading-none text-[#ec4d9c] mb-4 transition-all group-hover:scale-105">
                {s.num}
              </div>

              {/* Label - IBM Mono, större, kursiv, svart */}
              <p className="font-mono text-[15px] md:text-[16px] leading-tight text-black italic tracking-wide">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}