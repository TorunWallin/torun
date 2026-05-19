import { Reveal } from "./reveal";

const stats = [
  { num: "0", label: "Förbjudna livsmedel" },
  { num: "0", label: "Krav på perfektion" },
  { num: "100%", label: "Du behöver inte förändra dig för att börja" },
  { num: "∞", label: "Nya chanser" },
];

export function StatsStrip() {
  return (
    <section
      className="relative -mt-24 md:-mt-32 z-30 px-6 md:px-12 py-14 md:py-20 overflow-hidden"
      style={{
        background:
          "repeating-linear-gradient(90deg, #fdf2f8 0px, #fdf2f8 10px, #fff 10px, #fff 26px)",
      }}
    >
      {/* soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f9c5dd_0%,transparent_45%)] opacity-40 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <Reveal key={s.label} direction="up" delay={i * 100}>
            <div className="group h-full rounded-[32px] border border-pink-100/80 bg-white/80 backdrop-blur-sm px-6 py-8 md:py-10 text-center shadow-[0_10px_40px_rgba(236,77,156,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(236,77,156,0.16)]">
              
              <div className="font-playwrite text-[42px] md:text-[56px] text-[#ec4d9c] leading-none mb-4 transition-transform duration-500 group-hover:scale-105">
                {s.num}
              </div>

              <p className="text-[#2f4a3a] text-sm md:text-[15px] leading-relaxed max-w-[180px] mx-auto font-light tracking-wide">
                {s.label}
              </p>

            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}