import { ImgSticker } from "./img-sticker";
import { Reveal } from "./reveal";

export function StarkTjej() {
  return (
    <section className="relative px-6 md:px-12 py-24 md:py-28 bg-teal text-cream overflow-hidden">
      <Reveal direction="scale" delay={150}>
        <ImgSticker
          src="/BlondYogaGirl.png"
          size={100}
          className="hidden md:block absolute top-16 left-[8%] animate-float -rotate-6"
        />
      </Reveal>

      <div className="max-w-[860px] mx-auto text-center">
        <Reveal delay={0}>
          <div className="mono-eyebrow text-lime mb-5">en plats per kvartal</div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display-italic text-display-sm text-white mb-6">
            Stark Tjej — för dig som behöver det mest
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-[17px] leading-[1.7] text-pink-light max-w-[680px] mx-auto mb-8 opacity-95">
            En gång per kvartal går en plats i <em className="italic text-lime">Stark med Torun</em> till
            en ung tjej som behöver hitta tillbaka till sin styrka. Ingen kostnad. Inga
            krav på prestation. Bara ett varmt rum att börja om i.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <p className="text-[15px] leading-[1.7] text-pink-light max-w-[620px] mx-auto mb-10 opacity-90">
            Träning är ett verktyg för att må bra — aldrig för att straffa. För dig
            som är 16-22 år och vill bygga en sund relation till din kropp, finns
            den här platsen. Skicka ett mejl, skriv lite om dig, så pratar vi.
          </p>
        </Reveal>
        <Reveal delay={380}>
          <a href="#kontakt" className="btn-lime">
            Ansök om en Stark Tjej-plats
          </a>
        </Reveal>
      </div>
    </section>
  );
}
