import { Reveal } from "./reveal";

const stats = [
  { num: "0", label: "Förbjudna livsmedel" },
  { num: "0", label: "Krav på perfektion" },
  { num: "100%", label: "Du behöver inte förändra dig för att börja" },
  { num: "∞", label: "Nya chanser" },
];

export function StatsStrip() {
  return (
    <div 
      className="relative -mt-28 md:-mt-36 z-30 px-6 md:px-12 mb-20 py-16"
      style={{
        background: "repeating-linear-gradient(90deg, #fce7f3 0px, #fce7f3 12px, #ffffff 12px, #ffffff 28px)"
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1100px] mx-auto">
        {stats.map((s, i) => (
          <Reveal key={s.label} direction="up" delay={i * 80}>
            <div className="bg-white rounded-3xl py-9 md:py-10 px-7 text-center border border-[#f8d0e0] shadow-[0_8px_25px_rgba(236,77,156,0.08)] h-full flex flex-col justify-center hover:shadow-[0_12px_35px_rgba(236,77,156,0.12)] transition-all duration-300">
              <div className="font-playwrite text-[44px] md:text-[52px] text-[#ec4d9c] leading-none mb-5">
                {s.num}
              </div>
              <div className="font-mono text-[13px] text-[#2f4a3a] leading-snug max-w-[160px] mx-auto">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}