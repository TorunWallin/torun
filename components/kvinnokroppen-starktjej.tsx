/**
 * KvinnokroppenStarkTjej — Slår ihop Kvinnokroppen + Stark Tjej i EN sektion
 * med EN gemensam cute_background.png-bakgrund. Inget jack mellan dem.
 */
import { Reveal } from "./reveal";

export function KvinnokroppenStarkTjej() {
  return (
    <section className="relative overflow-hidden">
      {/* EN bakgrund som täcker hela sektionen — cute_background.png */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/cute_background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-[#fdeaf8]/70" />

      <div className="absolute left-[-100px] top-[5%] h-[480px] w-[480px] rounded-full bg-[#ff8fd4]/35 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-80px] h-[420px] w-[420px] rounded-full bg-white/55 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 left-[-80px] h-[420px] w-[420px] rounded-full bg-[#ff8fd4]/25 blur-[140px] pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ff4fc4 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
      />

      {/* ============ DEL 1: KVINNOKROPPEN ============ */}
      <div className="relative z-10 px-6 md:px-16 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="relative max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1fr] gap-20 items-center">

            {/* Image */}
            <Reveal delay={0}>
              <div style={{ animation: "float 6s ease-in-out infinite" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/bild_för-kvinnokroppen2.png"
                  alt="Kvinna som fixar håret"
                  className="rounded-[6px] w-full max-w-[520px] mx-auto lg:mx-0"
                />
              </div>
            </Reveal>

            {/* Textbox */}
            <Reveal delay={200}>
              <div
                className="relative bg-white/95 border-[1.5px] border-[#f6c9ea] rounded-[42px] px-10 py-12 md:px-14 md:py-14 shadow-[0_8px_40px_rgba(255,79,196,0.08)]"
                style={{ animation: "scaleIn 1.2s ease-out forwards" }}
              >
                <div className="font-mono text-[16px] md:text-[18px] tracking-[0.18em] text-[#f09ad6] font-bold uppercase mb-3">
                  EN ANNAN APPROACH:
                </div>

                <h2
                  className="font-serif text-[34px] sm:text-[42px] md:text-[54px] leading-[1.2] tracking-[-0.06em] text-[#ffccf7] mb-1"
                  style={{
                    textShadow: "0px 1px 0px #e5a8d7, 0px 1px 0px rgba(236,77,156,0.18)",
                  }}
                >
                  för kvinnokroppen
                </h2>

                <div className="font-playwrite text-[28px] md:text-[30px] text-[#245648] -mt-1 mb-10 leading-none">
                  aldrig någonsin emot den
                </div>

                <div className="mb-10">
                  <div className="inline bg-[#fdeaf8] text-[#ffa3f0] font-mono font-extrabold uppercase text-[13px] md:text-[15px] leading-[1.7] px-4 py-2 rounded-[22px] decoration-clone box-decoration-clone">
                    JAG COACHAR TJEJER &amp; KVINNOR UTIFRÅN HUR<br />KVINNOKROPPEN FAKTISKT FUNGERAR
                  </div>
                </div>

                <div className="max-w-[470px] space-y-7">
                  <p className="font-mono text-[16px] md:text-[17px] leading-[1.2] tracking-[-0.03em] text-black">
                    Det betyder att vi tar hänsyn till stress, återhämtning, hormoner, menscykel och energi —
                    istället för att försöka pressa kroppen hårdare hela tiden.
                  </p>
                  <p className="font-mono italic text-[16px] md:text-[17px] text-black leading-[1.3]">
                    Du behöver inte leva som en fitnessprofil för att få resultat.
                  </p>
                  <p className="font-pacifico text-[22px] md:text-[20px] text-black leading-[1.4]">
                    Utan du behöver vanor som fungerar i ditt riktiga liv.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ============ DEL 2: STARK TJEJ — SAMMA BAKGRUND ============ */}
      <div id="stipendiet" className="relative z-10 px-6 md:px-16 pt-12 md:pt-16 pb-24 md:pb-32">
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
