/**
 * FilosofinKvinnokroppen — Filosofin (3 pillars) + Kvinnokroppen i EN sektion
 */
import { Reveal } from "./reveal";

const pillars = [
  {
    num: "01.",
    title: "Stark inifrån",
    body: "När du blir stark förändras din relation till dig själv. Inte för att du ser annorlunda ut i spegeln – utan för att du känner dig annorlunda. Du tar plats. Du litar på din kropp. Du upptäcker att du klarar saker du aldrig trodde var möjliga.",
  },
  {
    num: "02.",
    title: "Äta för att prestera",
    body: "Mat är inte fienden. Mat är inte en belöning. Mat är bränslet som låter din kropp göra det den är skapad för. Här lär du dig att äta för att blomstra — inte för att krympa.",
  },
  {
    num: "03.",
    title: "Hjärtat först",
    body: "Vi börjar med relationen — till träning, mat, kropp och dig själv. För när hjärtat är på rätt plats blir resten av resan så mycket mjukare. Det här är hälsa som läker, inte håller dig kvar i kontrollen.",
  },
];

export function FilosofinKvinnokroppen() {
  return (
    <section className="relative">
      {/* Bakgrund (oförändrad) */}
      <div className="sticky top-0 -mb-[100vh] h-screen overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/cute_background.png')",
            backgroundSize: "1100px auto",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="absolute inset-0 bg-white/70" />
        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-[#ff8fd4]/20 blur-[140px]" />
        <div className="absolute top-1/2 -right-32 h-[420px] w-[420px] rounded-full bg-white/50 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 h-[420px] w-[420px] rounded-full bg-[#ff8fd4]/15 blur-[140px]" />
      </div>

      {/* ============ FILOSOFIN ============ */}
      <div id="filosofi" className="relative z-10 px-6 md:px-16 pt-28 md:pt-40 pb-16 md:pb-24">
        <div className="relative max-w-[1180px] mx-auto text-center"> {/* Ökad max-width */}
          
          {/* Badge + Rubrik + Sub (oförändrade) */}
          <Reveal delay={60}>
            <div className="inline-flex items-center justify-center px-7 py-2.5 rounded-full border border-[#ec4d9c]/30 bg-white/60 backdrop-blur-sm mb-6 shadow-sm">
              <span className="font-mono text-[12px] tracking-[0.28em] text-[#ec4d9c] uppercase">
                Min filosofi
              </span>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <h2 className="font-serif text-[44px] md:text-[55px] tracking-[-0.05em] text-[#111] leading-[1.0] mb-4 max-w-[960px] mx-auto">
              Styrka är inte målet. Styrka är{" "}
              <span className="text-[#ec4d9c]">medicinen.</span>
            </h2>
          </Reveal>

          <Reveal delay={220}>
            <p className="font-pacifico text-[20px] md:text-[26px] text-black max-w-[700px] mx-auto mb-16 leading-[1.2]">
              För vägen till mer energi, mer styrka — och mer av dig själv. Börjar här & nu.
            </p>
          </Reveal>

          {/* Cards - NY VERSION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pillars.map((p, i) => (
              <Reveal key={i} delay={300 + i * 100}>
                <div
                  className={`
                    relative overflow-hidden
                    bg-white/85 backdrop-blur-md
                    border-[2px] border-[#ffa3f0]
                    rounded-[32px] px-10 py-12 md:px-11 md:py-14
                    text-left h-full flex flex-col
                    shadow-[0_10px_40px_rgba(236,77,156,0.10)]
                    hover:-translate-y-2 hover:scale-[1.01]
                    hover:shadow-[0_20px_60px_rgba(236,77,156,0.16)]
                    transition-all duration-500
                    ${i === 1 ? "md:-translate-y-6 scale-[1.02]" : ""}
                  `}
                  style={{
                    animation: `breathe 7s ease-in-out infinite ${i * 0.8}s`,
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_50%)] pointer-events-none" />

                  <div className="relative z-10 inline-flex items-center justify-center bg-[#fdeaf8] text-[#ffa3f0] text-[16px] font-mono font-bold px-5 py-2 rounded-2xl mb-7 w-fit tracking-[0.08em]">
                    {p.num}
                  </div>

                  <h3 className="relative z-10 font-pacifico text-[29px] md:text-[28px] tracking-[-0.04em] text-[#111] leading-[1.05] mb-6">
                    {p.title}
                  </h3>

                  {/* Detta är nyckeln för jämn text-höjd */}
                  <div className="flex-1 flex flex-col">
                    <p className="relative z-10 font-mono text-[16px] text-black/80 leading-[1.75] flex-1">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>


      {/* ============ DEL 2: KVINNOKROPPEN — SAMMA BAKGRUND ============ */}
      <div className="relative z-10 px-6 md:px-16 pt-16 md:pt-24 pb-28 md:pb-40">
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
                <div className="font-mono text-[14px] md:text-[15px] tracking-[0.22em] text-[#f09ad6] font-bold uppercase mb-3">
                  En annan approach
                </div>

                <h2
                  className="font-serif text-[34px] sm:text-[42px] md:text-[54px] leading-[1.15] tracking-[-0.05em] text-[#ffccf7] mb-1"
                  style={{
                    textShadow:
                      "0px 1px 0px #e5a8d7, 0px 1px 0px rgba(236,77,156,0.18)",
                  }}
                >
                  För kvinnokroppen.
                </h2>

                <div className="font-playwrite text-[26px] md:text-[28px] text-[#245648] -mt-1 mb-10 leading-tight">
                  Aldrig någonsin emot den.
                </div>

                <p className="font-serif text-[18px] md:text-[20px] leading-[1.5] text-black font-bold mb-7 max-w-[480px]">
                  Jag coachar tjejer och kvinnor utifrån hur kvinnokroppen faktiskt fungerar.
                </p>

                <div className="max-w-[480px] space-y-6">
                  <p className="font-mono text-[15.5px] md:text-[16px] leading-[1.6] text-black">
                    Det betyder att vi tar hänsyn till stress, återhämtning, hormoner, menscykel och energi —
                    istället för att pressa kroppen hårdare hela tiden.
                  </p>
                  <p className="font-mono italic text-[15.5px] md:text-[16px] text-black leading-[1.55]">
                    Du behöver inte leva som en fitnessprofil för att få resultat.{" "}
                    <span className="font-pacifico not-italic text-[22px] md:text-[20px] text-black leading-[1.2] block mt-3">
                      Utan du behöver vanor som fungerar i ditt riktiga liv.
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
