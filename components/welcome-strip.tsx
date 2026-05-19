import { Reveal } from "./reveal";

export function WelcomeStrip() {
  return (
    <section className="relative bg-cream py-28 md:py-36 px-6 text-center overflow-hidden">
      <div className="relative z-10 max-w-[760px] mx-auto">
        <Reveal delay={0}>
          <div className="font-pacifico text-teal text-[52px] md:text-[72px] leading-[1.05] mb-4">
            Varmt välkommen
          </div>
        </Reveal>
        <Reveal delay={160}>
          <div className="font-playwrite text-[18px] md:text-[22px] text-ink-charcoal leading-relaxed">
            in till min träningshörna 🎀
          </div>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-12 mono-eyebrow text-pink-hot">
            stark · trygg · hel
          </div>
        </Reveal>
      </div>
    </section>
  );
}
