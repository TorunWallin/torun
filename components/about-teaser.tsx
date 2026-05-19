import { Reveal } from "./reveal";

export function AboutTeaser() {
  return (
    <section
      id="om"
      className="relative px-6 md:px-16 py-28 md:py-40 bg-cream-warm overflow-hidden"
    >
      <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
        {/* Left: photo (5 cols on md) */}
        <Reveal direction="right" delay={0} className="md:col-span-5">
          <div className="relative">
            <div
              className="rounded-3xl border-[1.5px] border-ink min-h-[480px] aspect-[4/5] md:aspect-auto md:h-[620px] bg-pink-light"
              style={{
                backgroundImage: "url('/torun-portrait.png')",
                backgroundSize: "cover",
                backgroundPosition: "center 30%",
              }}
              aria-label="Torun"
            />
          </div>
        </Reveal>

        {/* Right: copy (7 cols on md) */}
        <div className="md:col-span-7">
          <Reveal delay={150}>
            <div className="font-script text-pink-hot text-[40px] md:text-[52px] leading-none mb-3 -rotate-2 inline-block">
              Hej, jag är Torun
            </div>
          </Reveal>
          <Reveal delay={260}>
            <div className="mono-eyebrow text-pink-hot mt-5 mb-6">
              coach · pt · kostrådgivare
            </div>
          </Reveal>
          <Reveal delay={360}>
            <h2 className="display-italic text-[40px] md:text-[56px] text-teal mb-9 leading-[0.98] tracking-tight">
              Träning ska kännas bra <em className="italic text-pink-hot">— inte vara ett straff.</em>
            </h2>
          </Reveal>
          <Reveal delay={460}>
            <p className="text-[17px] leading-[1.8] text-ink-charcoal mb-5">
              Jag är personlig tränare och kostrådgivare, baserad i Mälardalen
              och jobbar 100% online via Everfit. Jag startar det här för att jag
              tror att tjejer och kvinnor förtjänar ett annat samtal om hälsa
              än det vi vuxit upp med.
            </p>
          </Reveal>
          <Reveal delay={540}>
            <p className="text-[17px] leading-[1.8] text-ink-charcoal mb-5">
              Inget diet-tjat. Ingen våg som coach. Inga regler om förbjudet.
              Bara styrka, värme och en plan som faktiskt fungerar i din vardag.
            </p>
          </Reveal>
          <Reveal delay={620}>
            <p className="text-[17px] leading-[1.8] text-ink-charcoal mb-10">
              Jag pratar med dig som med en kompis. För det är så det ska kännas.
            </p>
          </Reveal>
          <Reveal delay={720}>
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

      {/* Personal callout — elephant photo, calmer styling */}
      <Reveal delay={0}>
        <div className="relative max-w-[1100px] mx-auto mt-28 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 items-center bg-cream border-[1.5px] border-ink rounded-3xl p-9 md:p-12">
          <div className="md:col-span-1">
            <div
              className="rounded-2xl border-[1.5px] border-ink aspect-[3/4] bg-pink-light"
              style={{
                backgroundImage: "url('/torun-elephant.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label="Torun ute i världen"
            />
          </div>
          <div className="md:col-span-2">
            <div className="mono-eyebrow text-pink-hot mb-3">utanför gymmet</div>
            <div className="font-script text-teal text-[32px] md:text-[40px] leading-none mb-6 -rotate-1 inline-block">
              Lite om mig
            </div>
            <p className="text-[16px] md:text-[17px] leading-[1.8] text-ink-charcoal mb-4">
              När jag inte coachar älskar jag att resa, vara nära djur och natur, och bara <em className="italic text-teal">vara</em>.
              Jag tror att hälsa också är det här — att hinna leva, att känna sig
              liten ibland, att fyllas på.
            </p>
            <p className="text-[15.5px] md:text-[16px] leading-[1.8] text-ink-charcoal italic">
              Det är samma muskel vi tränar — att ta plats utan att behöva förklara sig.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
