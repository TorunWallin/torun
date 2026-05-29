/**
 * ManifestoStarkTjej — Om mig (Manifesto) + Stark Tjej-stipendiet i EN sektion
 * med EN sömlös sticky radjur-blabar_bakgrund. Inget jack mellan dem.
 */
import { Reveal } from "./reveal";

export function ManifestoStarkTjej() {
  return (
    <section id="manifesto" className="relative">
      {/* EN sticky bakgrund för båda delarna */}
      <div className="sticky top-0 -mb-[100vh] h-screen overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/radjur-blabar_bakgrund.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-[#fdeaf8]/80" />

        <div className="absolute left-[-100px] top-[5%] h-[480px] w-[480px] rounded-full bg-[#ff8fd4]/50 blur-[130px]" />
        <div className="absolute bottom-[-100px] right-[-80px] h-[420px] w-[420px] rounded-full bg-white/60 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ff4fc4 1px, transparent 0)`,
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      {/* ============ DEL 1: MANIFESTO ============ */}
      <div className="relative z-10 px-6 py-20 md:px-16 md:py-44">
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
                  COACH · PT · WOMEN&apos;S HEALTH
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
                  DIN COACH
                </span>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <h2 className="font-pacifico text-[46px] leading-[1.1] tracking-[-0.025em] text-[#111] md:text-[62px]">
                Hej, jag är <span className="text-[#ff4fc4]">Torun.</span>
              </h2>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-8 max-w-[650px] font-serif text-[22px] leading-[1.55] text-black/100 md:text-[19px]">
                <b>Jag tror inte att din kropp är ett problem som ska fixas.</b>{" "}
                Jag tror att den är ett hem du har varit borta från ett tag.
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-10 border-l border-[#ff4fc4]/40 pl-6">
                <p className="font-mono text-[21px] italic leading-[1.65] text-[#111] md:text-[24px]">
                  &ldquo;Och jag är här för att hjälpa dig hitta tillbaka.&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal delay={460}>
              <div className="mt-12 grid gap-8 font-mono text-[14px] leading-[1.85] tracking-[0.04em] text-black/100 md:grid-cols-2">
                <p>
                  Jag har själv levt i det. I <b>dietkulturen</b>, i kontrollen,
                  i den utmattande jakten på en mindre version av mig själv.
                  I tron om att styrka var något jag måste förtjäna —
                  och att vila var något jag skulle straffas för.
                </p>
                <p>
                  Jag hittade tillbaka genom <b>styrketräning</b>. Inte för
                  att den förändrade min kropp — utan för att den förändrade{" "}
                  <i>mig</i>. Den lärde mig att äta för att prestera. Att
                  vila är intelligent. Och att kapacitet känns bättre än
                  kontroll.
                </p>
              </div>
            </Reveal>

            <Reveal delay={580}>
              <p className="mt-10 font-merriweather italic text-[18px] leading-[1.6] text-[#111] max-w-[640px] md:text-[20px]">
                Det är det jag vill ge vidare. Inte ett program. Inte en
                quick fix. Utan en mjukare, sundare väg hem.
              </p>
            </Reveal>

            <Reveal delay={700}>
              <div className="mt-14 flex flex-wrap gap-4">
                <a
                  href="#program"
                  className="group relative overflow-hidden rounded-full bg-[#ff4fc4] px-8 py-4 font-serif text-[15px] tracking-wide text-white shadow-[0_8px_28px_rgba(255,79,196,0.35)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#e03db0] hover:shadow-[0_16px_40px_rgba(255,79,196,0.45)]"
                >
                  <span className="block transition-transform duration-300 group-hover:-translate-x-2">
                    Se programmen
                  </span>
                  <span className="absolute inset-y-0 right-6 flex items-center translate-x-16 transition-transform duration-300 group-hover:translate-x-0">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </a>

                <a
                  href="https://www.tiktok.com/@toruncoach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-full border border-black/10 bg-white/60 px-8 py-4 font-serif text-[15px] tracking-wide text-[#111] backdrop-blur-xl transition-all duration-300 hover:-translate-y-[2px] hover:border-[#ff4fc4]/30 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                >
                  <span className="absolute inset-y-0 left-6 flex items-center -translate-x-10 transition-transform duration-300 group-hover:translate-x-0">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
                    </svg>
                  </span>
                  <span className="block transition-transform duration-300 group-hover:translate-x-2">
                    Följ på TikTok
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ============ DEL 2: STARK TJEJ — SAMMA BAKGRUND ============ */}
      <div id="stipendiet" className="relative z-10 px-6 md:px-16 pt-8 md:pt-12 pb-24 md:pb-40">
        <Reveal delay={0} className="relative mx-auto max-w-[860px]">
          <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] border border-white/50 bg-white/30 px-6 py-10 shadow-[0_8px_40px_rgba(255,79,196,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl md:px-16 md:py-16">
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-3">
                <div className="h-[1px] w-10 bg-[#ff4fc4]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[#ff4fc4]">
                  En plats per kvartal
                </span>
                <div className="h-[1px] w-10 bg-[#ff4fc4]" />
              </div>

              <h3 className="font-pacifico text-[38px] leading-[1.15] text-[#111] md:text-[50px]">
                Stark Tjej{" "}
                <span className="text-[#ff4fc4]">♡</span>
              </h3>

              <p className="mt-6 font-serif text-[18px] leading-[1.8] text-black/80 md:text-[20px]">
                En gång per kvartal ger jag bort en plats i{" "}
                <b>Stark med Torun</b> till en ung tjej som behöver stöd,
                trygghet och en ny start i sin relation till träning och sig själv.
              </p>

              <div className="mt-8 rounded-2xl bg-[#fdeaf8]/70 px-6 py-5">
                <p className="font-mono text-[15px] italic leading-[1.7] text-[#111]">
                  Ingen prestation. Ingen press att vara duktig.
                  Bara ett varmt rum att börja om i.
                </p>
              </div>

              <p className="mt-8 font-mono text-[13px] tracking-[0.08em] text-black/60">
                För dig mellan{" "}
                <span className="font-bold text-[#ff4fc4]">16–22 år</span>{" "}
                som vill bygga styrka, självkänsla och en snällare relation till kroppen.
              </p>

              <div className="mt-10">
                <a
                  href="/kontakt#stark-tjej"
                  className="group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-[#ff4fc4] px-10 py-4 font-serif text-[16px] tracking-[0.02em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#e03db0]"
                >
                  <span className="block transition-transform duration-300 group-hover:-translate-x-2">
                    Skicka ett mejl
                  </span>
                  <span className="absolute inset-y-0 right-5 flex items-center translate-x-16 transition-transform duration-300 group-hover:translate-x-0">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.593C6.37 16.054 1 11.296 1 7.19 1 3.8 3.78 2 6.281 2c1.312 0 3.5.612 5.719 3.457C14.219 2.612 16.407 2 17.719 2 20.22 2 23 3.8 23 7.19c0 4.106-5.37 8.864-11 14.403z" />
                      </svg>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
