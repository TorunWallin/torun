import { Reveal } from "./reveal";

export function AboutTeaser() {
  return (
    <section
      id="om"
      className="relative px-6 md:px-16 py-28 md:py-40 bg-cream overflow-hidden"
    >
      <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
        {/* Left: photo */}
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

        {/* Right: copy */}
        <div className="md:col-span-7">
          <Reveal delay={150}>
            <h2 className="font-pacifico text-[44px] md:text-[60px] text-teal leading-[1.05] mb-3 inline-block">
              Hej, jag är Torun <span className="text-pink-hot">♡</span>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <div className="mono-eyebrow text-pink-hot mt-2 mb-8">
              pt · coach · kostrådgivare
            </div>
          </Reveal>

          <Reveal delay={360}>
            <p className="text-[17px] leading-[1.8] text-ink-charcoal font-serif mb-5">
              Jag vet hur lätt det är att känna att man måste göra allt perfekt
              för att vara &ldquo;hälsosam&rdquo;.{" "}
              <em className="italic text-teal">
                Träna hårdare. Äta renare. Ta mindre plats.
              </em>{" "}
              Men jag tror inte att hälsa ska kännas som ett heltidsjobb.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <p className="text-[17px] leading-[1.8] text-ink-charcoal font-serif mb-5">
              Jag startade Torun för att skapa ett tryggare sätt att prata om
              träning, mat och kroppen — särskilt för tjejer och kvinnor som är
              trötta på skuld, press och allt-eller-inget-tänk.
            </p>
          </Reveal>
          <Reveal delay={540}>
            <p className="text-[17px] leading-[1.8] text-ink-charcoal font-serif mb-5">
              Här handlar styrka inte om att straffa kroppen. Det handlar om att
              bygga en relation till sig själv som känns hållbar, varm och stark
              över tid.
            </p>
          </Reveal>
          <Reveal delay={620}>
            <p className="text-[17px] leading-[1.8] text-ink-charcoal font-serif italic mb-10">
              Jag coachar dig som jag själv hade velat bli coachad — med
              ärlighet, trygghet och mycket hjärta.
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

      {/* Personal callout — utanför gymmet */}
      <Reveal delay={0}>
        <div className="relative max-w-[1100px] mx-auto mt-28 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 items-center bg-cream-warm border-[1.5px] border-ink rounded-3xl p-9 md:p-12">
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
            <div className="font-pacifico text-teal text-[36px] md:text-[44px] leading-[1.05] mb-6 inline-block">
              När jag inte coachar
            </div>
            <p className="text-[16px] md:text-[17px] leading-[1.8] text-ink-charcoal font-serif mb-4">
              När jag inte coachar älskar jag lugna morgnar, naturen, djur, att
              resa och allt som får livet att kännas lite mjukare.
            </p>
            <p className="text-[15.5px] md:text-[16px] leading-[1.8] text-ink-charcoal font-serif italic">
              För mig är hälsa också det där: att skratta mycket, vila utan
              skuld, ha energi till människor man älskar och känna att livet får
              vara mer än prestation hela tiden.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
