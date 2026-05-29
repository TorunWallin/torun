/**
 * Skiftet — "Från överlevnad — till att leva."
 * Mjuk rosa version som matchar Toruns övriga stil.
 */
import { Reveal } from "./reveal";

type Shift = {
  from: string;
  to: string;
};

const shifts: Shift[] = [
  { from: "Träning som straff", to: "Rörelse som tar dig hem" },
  { from: "Mat som fiende", to: "Mat som ger dig kraft" },
  { from: "Vågen som domare", to: "Din egen kropp som kompass" },
  { from: "Krympa dig själv", to: "Ta plats — och bli stark" },
  { from: "Allt eller inget", to: "Små, mjuka steg framåt" },
];

export function Skiftet() {
  return (
    <section
      className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32"
      style={{
        background:
          "linear-gradient(135deg, #fff7fb 0%, #fdeaf8 50%, #fff0f7 100%)",
      }}
    >
      {/* Mjuka glow-bubblor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-[#ff8fd4]/30 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-white/60 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ff4fc4 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-[1000px] mx-auto">
        {/* Eyebrow */}
        <Reveal delay={0}>
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-3">
              <span className="block h-px w-10 bg-[#ec4d9c]/60" />
              <span className="font-mono text-[11px] md:text-[12px] tracking-[0.32em] uppercase text-[#ec4d9c] font-bold">
                Skiftet
              </span>
              <span className="block h-px w-10 bg-[#ec4d9c]/60" />
            </div>
          </div>
        </Reveal>

        {/* Headline — mindre, på samma rad */}
        <Reveal delay={120}>
          <h2 className="text-center font-pacifico text-[34px] md:text-[48px] lg:text-[54px] leading-[1.1] text-[#111] mb-3 tracking-[-0.02em]">
            Från överlevnad —{" "}
            <span className="text-[#ec4d9c] italic">till att leva.</span>
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p className="text-center font-merriweather italic text-[16px] md:text-[18px] text-black/65 max-w-[520px] mx-auto mb-16 leading-[1.5]">
            Små skiften som förändrar allt.
          </p>
        </Reveal>

        {/* Shifts list — vita kort på rosa bg */}
        <div className="max-w-[820px] mx-auto flex flex-col gap-3 md:gap-4">
          {shifts.map((s, i) => (
            <Reveal key={s.from} delay={300 + i * 90}>
              <div className="group grid grid-cols-[1fr,auto,1fr] gap-3 md:gap-6 items-center px-5 md:px-8 py-5 md:py-6 rounded-3xl bg-white/70 border border-[#f6c9ea] backdrop-blur-sm hover:bg-white/90 hover:border-[#ec4d9c]/40 hover:-translate-y-[2px] transition-all duration-500 shadow-[0_4px_20px_rgba(236,77,156,0.06)] hover:shadow-[0_12px_36px_rgba(236,77,156,0.14)]">
                {/* FROM — överstruket */}
                <div className="text-right">
                  <p className="font-mono text-[13px] md:text-[15px] text-black/45 line-through decoration-[#ec4d9c]/40 decoration-[1.5px] leading-tight">
                    {s.from}
                  </p>
                </div>

                {/* ARROW — rosa hjärtbubbla */}
                <div
                  aria-hidden="true"
                  className="flex items-center justify-center h-9 w-9 md:h-11 md:w-11 rounded-full bg-gradient-to-br from-[#fce7f3] to-[#f8d4e6] group-hover:from-[#f4c1f0] group-hover:to-[#ec4d9c] transition-all duration-500 flex-shrink-0"
                >
                  <svg
                    className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#ec4d9c] group-hover:text-white transition-colors duration-500"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>

                {/* TO — Pacifico, mörkrosa */}
                <div className="text-left">
                  <p className="font-pacifico text-[18px] md:text-[22px] text-[#ec4d9c] leading-[1.15]">
                    {s.to}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
