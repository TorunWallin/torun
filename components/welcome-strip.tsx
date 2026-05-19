import { Reveal } from "./reveal";

export function WelcomeStrip() {
  return (
    <section className="relative bg-cream py-28 md:py-36 px-6 text-center overflow-hidden">
      <div className="relative z-10 max-w-[760px] mx-auto">
        <Reveal delay={0}>
          <div className="font-script text-teal text-[44px] md:text-[60px] leading-[1.05] mb-4">
            Varmt välkommen
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="display-italic text-[20px] md:text-[24px] text-ink-charcoal tracking-tight">
            in till min träningshörna
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 mono-eyebrow text-pink-hot">
            stark · trygg · hel
          </div>
        </Reveal>
      </div>
    </section>
  );
}
