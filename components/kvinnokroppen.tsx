import { Reveal } from "./reveal";

export function Kvinnokroppen() {
  return (
    <section className="relative px-6 md:px-16 py-24 overflow-hidden bg-[#fcfcfb]">
     
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/cute_background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.4,
        }}
      />
      <div className="relative max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1fr] gap-20 items-center">
         
          {/* Image med flytande animation */}
          <Reveal delay={0}>
            <div style={{ animation: "float 6s ease-in-out infinite" }}>
              <img
                src="/bild_för-kvinnokroppen2.png"
                alt="Kvinna som fixar håret"
                className="rounded-[6px] w-full max-w-[520px] mx-auto lg:mx-0"
              />
            </div>
          </Reveal>

          {/* Textbox med scale-in effekt */}
          <Reveal delay={200}>
            <div 
              className="relative bg-white/100 border-[1.5px] border-[#f6c9ea] rounded-[42px] px-10 py-12 md:px-14 md:py-14"
              style={{ animation: "scaleIn 1.2s ease-out forwards" }}
            >
             
              {/* Top text */}
              <div className="font-mono text-[16px] md:text-[18px] tracking-[0.18em] text-[#f09ad6] font-bold uppercase mb-3">
                EN ANNAN APPROACH:
              </div>

              {/* Main heading */}
              <h2
                className="font-serif text-[58px] md:text-[54px] leading-[1.2] tracking-[-0.06em] text-[#ffccf7] mb-1"
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
                  JAG COACHAR TJEJER & KVINNOR UTIFRÅN HUR<br />KVINNOKROPPEN FAKTISKT FUNGERAR
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
                <p className="font-pacifico text-[22px] md:text-[20px] text-[#00000] leading-[1.4]">
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