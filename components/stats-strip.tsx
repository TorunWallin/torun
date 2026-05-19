import { Reveal } from "./reveal";

const stats = [
  { num: "0", label: "Förbjudna livsmedel" },
  { num: "0", label: "Krav på perfektion" },
  { num: "100%", label: "Du behöver inte förändra dig för att börja" },
  { num: "∞", label: "Nya chanser" },
];

export function StatsStrip() {
  return (
    <div className="relative -mt-20 md:-mt-24 z-20 px-6 md:px-12 mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-[1100px] mx-auto">
        {stats.map((s, i) => (
          <Reveal key={s.label} direction="up" delay={i * 100}>
            <div className="bg-white rounded-2xl py-7 md:py-8 px-5 text-center border-[1.5px] border-ink shadow-[0_10px_30px_rgba(0,0,0,0.08)] h-full flex flex-col justify-center">
              <div className="font-pacifico text-[38px] md:text-[44px] text-pink-hot leading-none mb-3">
                {s.num}
              </div>
              <div className="font-sans text-[12px] md:text-[13px] text-ink-charcoal leading-tight">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
