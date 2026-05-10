import { ImgSticker } from "./img-sticker";
import { Reveal } from "./reveal";

export function WelcomeStrip() {
  return (
    <section className="relative bg-pink-stripes py-20 md:py-24 px-6 overflow-hidden border-y-[1.5px] border-ink">
      <Reveal direction="scale" delay={150}>
        <ImgSticker
          src="/GymBag.png"
          size={84}
          className="hidden md:block absolute top-10 left-[10%] animate-float -rotate-6"
        />
      </Reveal>
      <Reveal direction="scale" delay={250}>
        <ImgSticker
          src="/schrunch.png"
          size={56}
          className="hidden md:block absolute top-10 right-[10%] animate-twinkle rotate-12"
        />
      </Reveal>

      <div className="relative z-10 max-w-[760px] mx-auto text-center">
        <Reveal delay={0}>
          <div className="font-script text-teal text-[40px] md:text-[56px] leading-[1.05] mb-2">
            Varmt välkommen
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="display-italic text-[22px] md:text-[28px] text-ink uppercase tracking-tight">
            in till min träningshörna
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-4 font-script text-pink-hot text-[24px] md:text-[28px]">
            stark · trygg · hel
          </div>
        </Reveal>
      </div>
    </section>
  );
}
