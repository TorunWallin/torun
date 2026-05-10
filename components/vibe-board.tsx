import { ImgSticker } from "./img-sticker";
import { Reveal } from "./reveal";

type Item = { src: string; size: number; rotate: number; label?: string };

const movement: Item[] = [
  { src: "/BlondeRunning.png", size: 100, rotate: -6, label: "morgonpass" },
  { src: "/BlackDumbells.png", size: 90, rotate: 4 },
  { src: "/PinkSetYogaGirl.png", size: 100, rotate: -3, label: "söndags-yoga" },
  { src: "/Treadmil.png", size: 110, rotate: 0 },
  { src: "/bicykle.png", size: 95, rotate: 6, label: "söndagstur" },
];

const everyday: Item[] = [
  { src: "/StanleyCup.png", size: 75, rotate: 6, label: "vatten ♡" },
  { src: "/DarkPinkStanley.png", size: 75, rotate: -3 },
  { src: "/GymBottle.png", size: 60, rotate: 8 },
  { src: "/GymMat.png", size: 80, rotate: -4 },
  { src: "/gymshoes.png", size: 90, rotate: 4, label: "favorit-skor" },
  { src: "/airpod.png", size: 60, rotate: -6 },
  { src: "/PinkEar.png", size: 80, rotate: 6 },
];

const nourish: Item[] = [
  { src: "/matcha.png", size: 70, rotate: -6, label: "morgon-matcha" },
  { src: "/healthybowl.png", size: 90, rotate: 4 },
  { src: "/Mixedberrys.png", size: 75, rotate: -3 },
  { src: "/recharge.png", size: 75, rotate: 6, label: "vila & fyll på" },
  { src: "/Namnlöst.png", size: 95, rotate: -4 },
];

function StickerRow({ items, label }: { items: Item[]; label: string }) {
  return (
    <div className="mb-14 last:mb-0">
      <Reveal delay={0}>
        <div className="text-center mb-7">
          <div className="font-script text-pink-hot text-[26px] md:text-[32px] -rotate-1 inline-block">
            {label}
          </div>
        </div>
      </Reveal>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12">
        {items.map((it, i) => (
          <Reveal key={it.src} direction="scale" delay={120 + i * 80}>
            <div className="flex flex-col items-center">
              <div style={{ transform: `rotate(${it.rotate}deg)` }}>
                <ImgSticker
                  src={it.src}
                  size={it.size}
                  className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
                />
              </div>
              {it.label && (
                <span
                  className="font-script text-pink-hot text-[18px] mt-2 whitespace-nowrap"
                  style={{ transform: `rotate(${-it.rotate / 3}deg)` }}
                >
                  {it.label}
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function VibeBoard() {
  return (
    <section className="relative bg-cream py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <Reveal delay={0}>
            <div className="mono-eyebrow text-pink-hot mb-3">min stil just nu</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display-italic text-[44px] md:text-[60px] text-teal leading-[1] mb-3">
              Min vibe just nu
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-[520px] mx-auto text-[15px] md:text-[16px] leading-[1.7] text-ink-charcoal mt-4">
              Träning, vatten, vila, rörelse i vardagen. Det är ingen quick fix —
              det är en livsstil som faktiskt fungerar i längden.
            </p>
          </Reveal>
        </div>

        <StickerRow items={movement} label="rörelse jag älskar" />
        <StickerRow items={everyday} label="vardagskit" />
        <StickerRow items={nourish} label="mat & välmående" />
      </div>
    </section>
  );
}
