/**
 * KvinnokroppenV2 — Samma innehåll & innerstil som v1, men med rosa sticker-bakgrund
 * som matchar StarkTjej så de flyter ihop som ett par utan jack.
 *
 * För att aktivera: byt import till
 *   import { KvinnokroppenV2 as Kvinnokroppen } from "@/components/kvinnokroppen-v2";
 */
import { Reveal } from "./reveal";

export function KvinnokroppenV2() {
  return (
    <section className="relative px-6 md:px-16 pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">

      {/* Bakgrund — matchar StarkTjej (flyter sömlöst nedåt) */}
      <div className="absolute inset-0 bg-[#fdeaf8]/80" />
      <div className="absolute left-[-100px] top-[5%] h-[480px] w-[480px] rounded-full bg-[#ff8fd4]/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-80px] h-[420px] w-[420px] rounded-full bg-white/60 blur-[140px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ff4fc4 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1fr] gap-20 items-center">

          {/* Image med flytande animation */}
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
              {/* Top text */}
              <div className="font-mono text-[16px] md:text-[18px] tracking-[0.18em] text-[#f09ad6] font-bold uppercase mb-3">
                EN ANNAN APPROACH:
              </div>

              {/* Main heading */}
              <h2
                className="font-serif text-[34px] sm:text-[42px] md:text-[54px] leading-[1.2] tracking-[-0.06em] text-[#ffccf7] mb-1"
                style={{
                  textShadow: "0px 1px 0px #e5a8d7, 0px 1px 0px rgba(236,77,156,0.18)",
                }}
              >
                för kvinnokroppen
              </h2>

              {/* Script line */}
              <div className="font-playwrite text-[28px] md:text-[30px] text-[#245648] -mt-1 mb-10 leading-none">
                aldrig någonsin emot den
              </div>

              {/* Blob text */}
              <div className="mb-10">
                <div className="inline bg-[#fdeaf8] text-[#ffa3f0] font-mono font-extrabold uppercase text-[13px] md:text-[15px] leading-[1.7] px-4 py-2 rounded-[22px] decoration-clone box-decoration-clone">
                  JAG COACHAR TJEJER &amp; KVINNOR UTIFRÅN HUR<br />KVINNOKROPPEN FAKTISKT FUNGERAR
                </div>
              </div>

              {/* Body */}
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
    </section>
  );
}
