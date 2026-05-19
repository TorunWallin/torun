import { Reveal } from "./reveal";

export function StarkTjej() {
  return (
    <section className="relative px-6 md:px-16 py-28 md:py-36 bg-teal text-cream overflow-hidden">
      <div className="max-w-[920px] mx-auto text-center">
        <Reveal delay={0}>
          <div className="mono-eyebrow text-lime mb-6">en plats per kvartal</div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-pacifico text-[48px] md:text-[72px] text-white mb-10 leading-[1.05]">
            Stark Tjej <span className="text-pink-light">♡</span>
          </h2>
        </Reveal>
        <Reveal delay={260}>
          <p className="text-[18px] leading-[1.8] text-pink-light max-w-[720px] mx-auto mb-6 opacity-95 font-serif">
            En gång per kvartal ger jag bort en plats i{" "}
            <em className="italic text-lime">Stark med Torun</em> till en ung
            tjej som behöver stöd, trygghet och en ny start i sin relation till
            träning och sig själv.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <p className="text-[16px] leading-[1.75] text-pink-light max-w-[680px] mx-auto mb-6 opacity-90 font-serif">
            Ingen prestation. Ingen press att vara duktig. Bara ett varmt rum
            att börja om i.
          </p>
        </Reveal>
        <Reveal delay={460}>
          <p className="text-[16px] leading-[1.75] text-pink-light max-w-[680px] mx-auto mb-12 opacity-90 font-serif italic">
            För dig mellan 16–22 år som vill bygga styrka, självkänsla och en
            snällare relation till kroppen.
          </p>
        </Reveal>
        <Reveal delay={560}>
          <a href="#kontakt" className="btn-lime">
            Skicka ett mejl ♡
          </a>
        </Reveal>
      </div>
    </section>
  );
}
