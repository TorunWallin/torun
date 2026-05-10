import { Reveal } from "./reveal";

const stats = [
  { num: "0", label: "Regler om förbjudet" },
  { num: "0", label: "Vågar som coach" },
  { num: "100%", label: "Du, som du är" },
  { num: "∞", label: "Sätt att börja" },
];

// Small bridging cards — overlap from hero into welcome strip
export function StatsStrip() {
  return (
    <div className="relative -mt-16 md:-mt-20 z-20 px-6 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-[1100px] mx-auto">
        {stats.map((s, i) => (
          <Reveal key={s.label} direction="up" delay={i * 100}>
            <div className="bg-white rounded-xl py-5 md:py-6 px-4 text-center border-[1.5px] border-ink shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
              <div className="display-italic text-[34px] md:text-[40px] text-pink-hot leading-none mb-1.5">
                {s.num}
              </div>
              <div className="font-mono text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-ink-charcoal">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
