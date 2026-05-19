import { Reveal } from "./reveal";

const stats = [
  { num: "0", label: "Regler om förbjudet" },
  { num: "0", label: "Vågar som coach" },
  { num: "100%", label: "Du, som du är" },
  { num: "∞", label: "Sätt att börja" },
];

// Refined transition between hero and welcome strip
export function StatsStrip() {
  return (
    <div className="relative -mt-20 md:-mt-24 z-20 px-6 md:px-12 mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-[1100px] mx-auto">
        {stats.map((s, i) => (
          <Reveal key={s.label} direction="up" delay={i * 100}>
            <div className="bg-white rounded-2xl py-7 md:py-8 px-5 text-center border-[1.5px] border-ink shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="display-italic text-[40px] md:text-[48px] text-pink-hot leading-none mb-2">
                {s.num}
              </div>
              <div className="mono-eyebrow text-ink-charcoal">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
