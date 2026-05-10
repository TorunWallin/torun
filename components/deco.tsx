// Coquette / soft-girl text decorations
// Curated set of unicode + emoji combos for floating decorative elements

const VARIANTS = {
  // === Butterfly heart family (signature coquette mark) ===
  "butterfly-heart": "ʚïɞ",
  "butterfly-heart-flower": "ʚïɞ˚❀",
  "butterfly-pair": "ʚĭɞ",
  "tiny-butterfly": "𝜗𝜚",

  // === Pretty butterflies ===
  butterfly: "🦋",
  "butterfly-magic": "˚✧🦋.ೃ࿔",
  "butterfly-stars": "🦋⋰˚☆",
  "butterfly-bubble": "🦋⊹꙳ 🫧",
  "butterfly-flower": "🦋 ♡⁺⊹˚",

  // === Heart sparkles ===
  "glowing-heart": "ཐི♡ཋྀ",
  "heart-stars": "♡₊˚⋆",
  "tiny-heart": "♡",
  "heart-mini": "◞♡",

  // === Pure sparkle ornaments ===
  ornate: "°❀⋆.ೃ࿔",
  sparkles: "⋆‧°𓏲ּ𝄢",
  ornament: "*ੈ‧₊˚༘⋆",
  "soft-stars": "‧₊˚⊹",
  "small-stars": "✩˚｡⋆",
  "moon-stars": "₊˚✩",
  "tiny-stars": "⋆˚｡⋆౨ৎ˚",

  // === Crown / royal touches ===
  crown: "𐀔",
  "crown-stars": "𐀔⋆｡˚",

  // === Flowers ===
  "tiny-flower": "❀",
  "pink-flower": "❀⋆.ೃ࿔*:･",
  "flower-flame": "❁ ࿐",
} as const;

type Variant = keyof typeof VARIANTS;

type Props = {
  variant?: Variant;
  text?: string;
  className?: string;
};

export function Deco({ variant, text, className = "" }: Props) {
  const content = text ?? (variant ? VARIANTS[variant] : "");
  return (
    <span
      className={`inline-block select-none whitespace-nowrap leading-none ${className}`}
      aria-hidden="true"
    >
      {content}
    </span>
  );
}
