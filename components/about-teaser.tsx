import { Reveal } from "./reveal";

export function AboutTeaser() {
  return (
    <section
      id="om"
      className="relative overflow-hidden px-6 py-20 md:px-16 md:py-64"
    >
      {/* Bakgrundsbild */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/radjur-blabar_bakgrund.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 10.28,
        }}
      />
      {/* Rosa overlay ovanpå bilden */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#fdeaf8]/80" />

      {/* Glows */}
      <div className="absolute left-[-100px] top-[5%] h-[480px] w-[480px] rounded-full bg-[#ff8fd4]/50 blur-[130px] animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-80px] h-[420px] w-[420px] rounded-full bg-white/60 blur-[140px]" />

      {/* Prickmönster */}
      <div 
        className="pointer-events-none absolute inset-0 z-[-1] opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ff4fc4 1px, transparent 0)`,
          backgroundSize: '22px 22px'
        }}
      />

      <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-16 md:grid-cols-12 lg:gap-24">
        {/* IMAGE */}
        <Reveal direction="left" delay={0} className="relative md:col-span-5">
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-full w-full rounded-[40px] border border-black/10" />
            
            <div
              className="relative h-[360px] sm:h-[480px] md:h-[620px] overflow-hidden rounded-[38px] shadow-[0_30px_90px_rgba(0,0,0,0.12)]"
              style={{
                backgroundImage: "url('/torun-portrait.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label="Torun portrait"
            />
            
            <div className="absolute -bottom-7 -right-7 rounded-full border border-black/10 bg-white/80 px-6 py-3 backdrop-blur-xl shadow-xl">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff4fc4]">
                COACH • PT • WOMEN’S HEALTH
              </div>
            </div>
          </div>
        </Reveal>

        {/* TEXT */}
        <div className="relative md:col-span-7">
          <Reveal delay={80}>
            <div className="mb-5 inline-flex items-center gap-3">
              <div className="h-[1px] w-14 bg-[#ff4fc4]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[#ff4fc4]">
                FÖR KVINNOR SOM VILL MÅ BRA – PÅ RIKTIGT
              </span>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h2 className="font-pacifico text-[46px] leading-[1.1] tracking-[-0.025em] text-[#111] md:text-[62px]">
              Hälsa utan <span className="text-[#ff4fc4]">skuld.</span>
            </h2>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-8 max-w-[650px] font-serif text-[22px] leading-[1.75] text-black/100 md:text-[19px]">
              <b>Jag hjälper tjejer och kvinnor att</b> bygga styrka,
              balans och självkänsla — utan att fastna i
              kontroll, prestation eller allt-eller-inget-tänk.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-12 border-l border-[#ff4fc4]/40 pl-6">
              <p className="font-mono text-[21px] italic leading-[1.65] text-[#111] md:text-[25px]">
                “Jag tror inte att hälsa ska kännas som ett
                straff eller ett heltidsjobb.”
              </p>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <div className="mt-12 grid gap-8 font-mono text-[14px] tracking-[0.08em] text-black/100 md:grid-cols-2">
              <p>
                Det är därför jag skapade <b>Toruncoach</b>. För alla er som är
                trötta på skuld, extrema regler och känslan av att aldrig
                vara tillräckliga.
              </p>
              <p>
                Här handlar träning om energi, trygghet, <b>hormonbalans</b>,
                styrka och att bygga ett liv som <i> faktiskt känns hållbart över tid.</i>
              </p>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-14 flex flex-wrap gap-4">
              <a
                href="#program"
                className="group relative overflow-hidden rounded-full bg-[#111] px-9 py-4 font-serif text-[16px] tracking-[0.02em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <span className="relative z-10">Se programmen</span>
                <div className="absolute inset-0 translate-y-full bg-[#ff4fc4] transition-transform duration-500 group-hover:translate-y-0" />
              </a>
              
              <a
                href="https://www.tiktok.com/@toruncoach"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-black/10 bg-white/70 px-9 py-4 font-serif text-[16px] tracking-[0.02em] text-[#111] backdrop-blur-xl transition-all duration-300 hover:-translate-y-[2px] hover:bg-white hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
              >
                Följ på TikTok
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* STARK TJEJ */}
      <Reveal delay={200} className="relative mx-auto mt-16 max-w-[860px] md:mt-40">
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] border border-[#ff4fc4]/20 bg-white/60 px-6 py-10 shadow-[0_20px_70px_rgba(255,79,196,0.10)] backdrop-blur-xl md:px-16 md:py-16">

          {/* Dekorativ glow inuti kortet */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#ff8fd4]/30 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[#fdeaf8]/80 blur-[60px]" />

          <div className="relative">
            {/* Etikett */}
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="h-[1px] w-10 bg-[#ff4fc4]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[#ff4fc4]">
                En plats per kvartal
              </span>
              <div className="h-[1px] w-10 bg-[#ff4fc4]" />
            </div>

            {/* Rubrik */}
            <h3 className="font-pacifico text-[38px] leading-[1.15] text-[#111] md:text-[50px]">
              Stark Tjej{" "}
              <span className="text-[#ff4fc4]">♡</span>
            </h3>

            {/* Brödtext */}
            <p className="mt-6 font-serif text-[18px] leading-[1.8] text-black/80 md:text-[20px]">
              En gång per kvartal ger jag bort en plats i{" "}
              <b>Stark med Torun</b> till en ung tjej som behöver stöd,
              trygghet och en ny start i sin relation till träning och sig själv.
            </p>

            {/* Citat-stil */}
            <div className="mt-8 rounded-2xl bg-[#fdeaf8]/70 px-6 py-5">
              <p className="font-mono text-[15px] italic leading-[1.7] text-[#111]">
                Ingen prestation. Ingen press att vara duktig.
                Bara ett varmt rum att börja om i.
              </p>
            </div>

            {/* Ålder */}
            <p className="mt-8 font-mono text-[13px] tracking-[0.08em] text-black/60">
              För dig mellan{" "}
              <span className="font-bold text-[#ff4fc4]">16–22 år</span>{" "}
              som vill bygga styrka, självkänsla och en snällare relation till kroppen.
            </p>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="mailto:hej@toruncoach.se"
                className="group inline-flex items-center gap-3 rounded-full bg-[#ff4fc4] px-10 py-4 font-serif text-[16px] tracking-[0.02em] text-white shadow-[0_10px_30px_rgba(255,79,196,0.35)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#e03db0] hover:shadow-[0_16px_40px_rgba(255,79,196,0.45)]"
              >
                Skicka ett mejl ♡
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}