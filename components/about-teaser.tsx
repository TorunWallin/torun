import { ImgSticker } from "./img-sticker";
import { Reveal } from "./reveal";

export function AboutTeaser() {
  return (
    <section
      id="om"
      className="relative px-6 md:px-12 py-24 md:py-32 bg-cream overflow-hidden"
    >
      {/* gymkit collection — sits next to the bio header */}
      <Reveal direction="scale" delay={300}>
        <ImgSticker
          src="/gymkit.png"
          size={220}
          className="hidden md:block absolute top-16 right-[4%] animate-float -rotate-3"
        />
      </Reveal>

      <div className="relative max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left: photo */}
        <Reveal direction="right" delay={0}>
          <div className="relative">
            <div
              className="rounded-2xl border-[1.5px] border-ink min-h-[420px] aspect-[4/5] md:aspect-auto md:h-[560px] bg-pink-light"
              style={{
                backgroundImage: "url('/torun-portrait.png')",
                backgroundSize: "cover",
                backgroundPosition: "center 30%",
              }}
              aria-label="Torun"
            />
            <ImgSticker
              src="/Strawberry.png"
              size={70}
              className="absolute -top-6 -left-4 animate-twinkle -rotate-12 drop-shadow-[0_6px_14px_rgba(0,0,0,0.15)]"
            />
          </div>
        </Reveal>

        {/* Right: copy */}
        <div>
          <Reveal delay={150}>
            <div className="font-script text-pink-hot text-[36px] md:text-[44px] leading-none mb-1 -rotate-2 inline-block">
              Hej, jag är Torun
            </div>
          </Reveal>
          <Reveal delay={230}>
            <div className="mono-eyebrow text-pink-hot mt-4 mb-4">
              coach · pt · kostrådgivare
            </div>
          </Reveal>
          <Reveal delay={310}>
            <h2 className="display-italic text-display-sm text-teal mb-7 leading-[0.98]">
              Träning ska kännas bra <em className="italic text-pink-hot">— inte vara ett straff.</em>
            </h2>
          </Reveal>
          <Reveal delay={400}>
            <p className="text-[16px] leading-[1.75] text-ink-charcoal mb-5">
              Jag är personlig tränare och kostrådgivare, baserad i Mälardalen
              och jobbar 100% online via Everfit. Jag startar det här för att jag
              tror att tjejer och kvinnor förtjänar ett annat samtal om hälsa
              än det vi vuxit upp med.
            </p>
          </Reveal>
          <Reveal delay={470}>
            <p className="text-[16px] leading-[1.75] text-ink-charcoal mb-5">
              Inget diet-tjat. Ingen våg som coach. Inga regler om förbjudet.
              Bara styrka, värme och en plan som faktiskt fungerar i din vardag.
            </p>
          </Reveal>
          <Reveal delay={540}>
            <p className="text-[16px] leading-[1.75] text-ink-charcoal mb-9">
              Jag pratar med dig som med en kompis. För det är så det ska kännas.
            </p>
          </Reveal>
          <Reveal delay={620}>
            <div className="flex gap-3 flex-wrap">
              <a href="#program" className="btn-pink">
                Se programmen
              </a>
              <a
                href="https://www.tiktok.com/@toruncoach"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-teal"
              >
                Följ på TikTok
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Personal callout — elephant photo */}
      <Reveal delay={0}>
        <div className="relative max-w-[1100px] mx-auto mt-24 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-pink-stripes-narrow border-[1.5px] border-ink rounded-2xl p-7 md:p-10">
          <ImgSticker
            src="/pinkgirl.png"
            size={70}
            className="hidden md:block absolute -top-8 -right-4 animate-float rotate-6 drop-shadow-[0_6px_14px_rgba(0,0,0,0.15)]"
          />
          <div className="md:col-span-1">
            <div
              className="rounded-xl border-[1.5px] border-ink aspect-[3/4] bg-pink-light"
              style={{
                backgroundImage: "url('/torun-elephant.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label="Torun ute i världen"
            />
          </div>
          <div className="md:col-span-2">
            <div className="font-script text-teal text-[30px] md:text-[36px] leading-none mb-4 -rotate-1 inline-block">
              Lite om mig utanför gymmet
            </div>
            <p className="text-[15px] md:text-[16px] leading-[1.75] text-ink-charcoal mb-3">
              När jag inte coachar älskar jag att resa, vara nära djur och natur, och bara *vara*.
              Jag tror att hälsa också är det här — att hinna leva, att känna sig
              liten ibland, att fyllas på.
            </p>
            <p className="text-[15px] md:text-[16px] leading-[1.75] text-ink-charcoal italic">
              Det är samma muskel vi tränar — att ta plats utan att behöva förklara sig.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
