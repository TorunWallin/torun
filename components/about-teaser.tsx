import { Reveal } from "./reveal";

export function AboutTeaser() {
  return (
    <section
      id="om"
      className="relative overflow-hidden bg-[#fdeaf8] px-6 py-28 md:px-16 md:py-40"
    >
      {/* Glow */}
      <div className="absolute left-[-120px] top-[10%] h-[420px] w-[420px] rounded-full bg-[#ffb7e6]/40 blur-[120px]" />
      <div className="absolute bottom-[-120px] right-[-100px] h-[380px] w-[380px] rounded-full bg-[#ffffff]/50 blur-[120px]" />

      {/* Background words */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-60px] top-[100px] rotate-[-90deg] text-[120px] font-black uppercase tracking-[0.3em] text-black/[0.03]">
          Soft Strength
        </div>

        <div className="absolute bottom-[80px] right-[-70px] text-[120px] font-black uppercase tracking-[0.3em] text-black/[0.03]">
          Womanhood
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-16 md:grid-cols-12 lg:gap-24">
        {/* IMAGE */}
        <Reveal direction="right" className="relative md:col-span-5">
          <div className="relative">
            {/* outline */}
            <div className="absolute -left-6 -top-6 h-full w-full rounded-[40px] border border-black/10" />

            {/* portrait */}
            <div
              className="relative h-[620px] overflow-hidden rounded-[38px] shadow-[0_30px_90px_rgba(0,0,0,0.12)]"
              style={{
                backgroundImage: "url('/torun-portrait.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label="Torun portrait"
            />

            {/* floating label */}
            <div className="absolute -bottom-7 -right-7 rounded-full border border-black/10 bg-white/80 px-6 py-3 backdrop-blur-xl shadow-xl">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff4fc4]">
                COACH • PT • WOMEN’S HEALTH
              </div>
            </div>
          </div>
        </Reveal>

        {/* TEXT */}
        <div className="relative md:col-span-7">
          {/* eyebrow */}
          <Reveal delay={100}>
            <div className="mb-5 inline-flex items-center gap-3">
              <div className="h-[1px] w-14 bg-[#ff4fc4]" />

              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[#ff4fc4]">
                FÖR KVINNOR SOM VILL MÅ BRA PÅ RIKTIGT
              </span>
            </div>
          </Reveal>

          {/* heading */}
          <Reveal delay={180}>
            <h2 className="font-pacifico text-[60px] leading-[0.92] tracking-[-0.03em] text-[#111] md:text-[80px]">
              Hälsa utan
              <span className="block text-[#ff4fc4]">
                skuld.
              </span>
            </h2>
          </Reveal>

          {/* intro */}
          <Reveal delay={280}>
            <p className="mt-10 max-w-[650px] font-serif text-[23px] leading-[1.8] text-black/100 md:text-[20px]">
             <b> Jag hjälper tjejer och kvinnor </b> bygga styrka, 
              balans och självkänsla — utan att fastna i
              kontroll, prestation eller allt-eller-inget.
            </p>
          </Reveal>

          {/* quote */}
          <Reveal delay={380}>
            <div className="mt-14 border-l border-[#ff4fc4]/40 pl-6">
              <p className="font-mono text-[22px] italic leading-[1.7] text-[#111] md:text-[26px]">
                “Jag tror inte att hälsa ska kännas som ett
                straff eller ett heltidsjobb.”
              </p>
            </div>
          </Reveal>

          {/* body */}
          <Reveal delay={500}>
            <div className="mt-14 grid gap-8 font-mono text-[14px] -[2] tracking-[0.08em] text-black/100 md:grid-cols-2">
              <p>
                Jag skapade Toruncoach för kvinnor som är trötta på
                skuld, extrema regler och känslan av att aldrig
                vara tillräckliga.
              </p>

              <p>
                Här handlar träning om energi, trygghet,
                hormoner, styrka och att bygga ett liv som
                <i> faktiskt känns hållbart över tid.</i>
              </p>
            </div>
          </Reveal>

          {/* buttons */}
          <Reveal delay={620}>
            <div className="mt-16 flex flex-wrap gap-4">
              {/* primary */}
              <a
                href="#program"
                className="group relative overflow-hidden rounded-full bg-[#111] px-9 py-4 font-serif text-[16px] tracking-[0.02em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <span className="relative z-10">
                  Se programmen
                </span>

                <div className="absolute inset-0 translate-y-full bg-[#ff4fc4] transition-transform duration-500 group-hover:translate-y-0" />
              </a>

              {/* secondary */}
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
    </section>
  );
}