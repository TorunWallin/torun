// Doodle stickers — handwritten outlined style
// All in light pink + white, sketchy hand-drawn aesthetic

type StickerName =
  | "bow"
  | "dumbbell-bow"
  | "heart"
  | "sparkle"
  | "star"
  | "flower"
  // Aliases that point to doodle equivalents
  | "doodle-heart"
  | "doodle-star"
  | "doodle-arrow"
  | "doodle-swirl"
  | "doodle-flower-smile"
  | "doodle-cherry"
  | "doodle-yay"
  | "doodle-circle";

type Props = {
  name: StickerName;
  className?: string;
  size?: number;
  "aria-hidden"?: boolean;
};

// Color tokens for doodles
const PINK = "#F4A6CC"; // ljusrosa stroke
const PINK_HOT = "#EC4D9C"; // accent for emphasis
const WHITE = "#FFFFFF";

export function Sticker({ name, className = "", size = 64, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg",
    className: `inline-block ${className}`,
    "aria-hidden": rest["aria-hidden"] ?? true,
  };

  // === HEART (with dots/sparkles around) ===
  if (name === "heart" || name === "doodle-heart") {
    return (
      <svg {...common}>
        {/* White fill behind outline for ljusrosa+vitt feel */}
        <path
          d="M 50 80 C 25 65, 18 45, 26 32 C 34 20, 46 24, 50 36 C 54 24, 66 20, 74 32 C 82 45, 75 65, 50 80 Z"
          fill={WHITE}
          stroke={PINK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Decorative dots */}
        <g fill={PINK}>
          <circle cx="14" cy="22" r="2.5" />
          <circle cx="86" cy="20" r="2" />
          <circle cx="20" cy="84" r="2" />
          <circle cx="84" cy="76" r="2.5" />
          <circle cx="50" cy="12" r="2" />
        </g>
        {/* Little sparkle x */}
        <path
          d="M 90 38 L 96 32 M 96 38 L 90 32"
          stroke={PINK}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // === BOW (outline ribbon doodle) ===
  if (name === "bow") {
    return (
      <svg {...common}>
        <g
          fill={WHITE}
          stroke={PINK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Left loop */}
          <path d="M50 50 Q 22 32, 14 50 Q 22 68, 50 50 Z" />
          {/* Right loop */}
          <path d="M50 50 Q 78 32, 86 50 Q 78 68, 50 50 Z" />
          {/* Tails */}
          <path d="M48 52 L 38 78 L 50 72 Z" />
          <path d="M52 52 L 62 78 L 50 72 Z" />
          {/* Center knot */}
          <ellipse cx="50" cy="50" rx="6" ry="8" />
        </g>
        {/* Tiny accent dots */}
        <g fill={PINK}>
          <circle cx="10" cy="50" r="1.8" />
          <circle cx="90" cy="50" r="1.8" />
        </g>
      </svg>
    );
  }

  // === DUMBBELL with bow on top ===
  if (name === "dumbbell-bow") {
    return (
      <svg {...common}>
        <g
          fill={WHITE}
          stroke={PINK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Dumbbell bar */}
          <rect x="35" y="58" width="30" height="6" rx="2" />
          {/* Left weight */}
          <rect x="22" y="48" width="14" height="26" rx="3" />
          {/* Right weight */}
          <rect x="64" y="48" width="14" height="26" rx="3" />
        </g>
        {/* Bow on top */}
        <g
          transform="translate(28 6) scale(0.55)"
          fill={WHITE}
          stroke={PINK}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M50 50 Q 22 32, 14 50 Q 22 68, 50 50 Z" />
          <path d="M50 50 Q 78 32, 86 50 Q 78 68, 50 50 Z" />
          <path d="M48 52 L 38 78 L 50 72 Z" />
          <path d="M52 52 L 62 78 L 50 72 Z" />
          <ellipse cx="50" cy="50" rx="7" ry="9" />
        </g>
        {/* Tiny dots around */}
        <g fill={PINK}>
          <circle cx="14" cy="86" r="2" />
          <circle cx="86" cy="86" r="2" />
        </g>
      </svg>
    );
  }

  // === SPARKLE (4-point twinkle) ===
  if (name === "sparkle") {
    return (
      <svg {...common}>
        <path
          d="M 50 10 L 56 44 L 90 50 L 56 56 L 50 90 L 44 56 L 10 50 L 44 44 Z"
          fill={WHITE}
          stroke={PINK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Surrounding mini dots */}
        <g fill={PINK}>
          <circle cx="20" cy="22" r="1.8" />
          <circle cx="80" cy="22" r="1.8" />
          <circle cx="22" cy="78" r="1.8" />
          <circle cx="80" cy="80" r="1.8" />
        </g>
      </svg>
    );
  }

  // === STAR (5-point outline) ===
  if (name === "star" || name === "doodle-star") {
    return (
      <svg {...common}>
        <path
          d="M 50 12 L 60 40 L 90 42 L 66 60 L 74 88 L 50 72 L 26 88 L 34 60 L 10 42 L 40 40 Z"
          fill={WHITE}
          stroke={PINK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner sketch hint */}
        <path
          d="M 50 22 L 56 42 L 76 44 L 60 56 L 66 78 L 50 66 L 34 78 L 40 56 L 24 44 L 44 42 Z"
          fill="none"
          stroke={PINK}
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </svg>
    );
  }

  // === FLOWER (plain outline) ===
  if (name === "flower") {
    return (
      <svg {...common}>
        <g
          fill={WHITE}
          stroke={PINK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ellipse cx="50" cy="22" rx="12" ry="15" />
          <ellipse cx="78" cy="50" rx="15" ry="12" />
          <ellipse cx="50" cy="78" rx="12" ry="15" />
          <ellipse cx="22" cy="50" rx="15" ry="12" />
          <circle cx="50" cy="50" r="11" fill={PINK} stroke={PINK} />
        </g>
      </svg>
    );
  }

  // === FLOWER WITH SMILEY ===
  if (name === "doodle-flower-smile") {
    return (
      <svg {...common}>
        <g
          fill={WHITE}
          stroke={PINK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ellipse cx="50" cy="22" rx="11" ry="14" />
          <ellipse cx="76" cy="50" rx="14" ry="11" />
          <ellipse cx="50" cy="78" rx="11" ry="14" />
          <ellipse cx="24" cy="50" rx="14" ry="11" />
          <circle cx="50" cy="50" r="13" fill={PINK} stroke={PINK} />
        </g>
        {/* Smiley face */}
        <g stroke={WHITE} strokeWidth="2" strokeLinecap="round" fill="none">
          <circle cx="44" cy="48" r="1" fill={WHITE} />
          <circle cx="56" cy="48" r="1" fill={WHITE} />
          <path d="M 44 54 Q 50 60, 56 54" />
        </g>
      </svg>
    );
  }

  // === ARROW (curvy hand-drawn) ===
  if (name === "doodle-arrow") {
    return (
      <svg {...common}>
        <g
          fill="none"
          stroke={PINK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 12 50 Q 30 20, 55 40 T 86 50" />
          <path d="M 86 50 L 76 40" />
          <path d="M 86 50 L 76 60" />
        </g>
      </svg>
    );
  }

  // === SWIRL (spiral) ===
  if (name === "doodle-swirl") {
    return (
      <svg {...common}>
        <g
          fill="none"
          stroke={PINK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 50 50 m -2 0 a 2 2 0 1 1 4 0 a 8 8 0 1 1 -16 0 a 14 14 0 1 1 28 0 a 22 22 0 1 1 -42 0 a 30 30 0 1 1 60 0 a 38 38 0 0 1 -36 38" />
        </g>
      </svg>
    );
  }

  // === CHERRY ===
  if (name === "doodle-cherry") {
    return (
      <svg {...common}>
        <g stroke={PINK} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none">
          {/* Stems */}
          <path d="M 35 65 Q 40 30, 55 22" />
          <path d="M 65 65 Q 60 30, 55 22" />
          {/* Leaf */}
          <path d="M 55 22 Q 65 14, 75 22 Q 70 30, 55 22 Z" fill={WHITE} />
        </g>
        {/* Cherry bodies */}
        <g stroke={PINK} strokeWidth="3" fill={WHITE}>
          <circle cx="35" cy="74" r="13" />
          <circle cx="65" cy="74" r="13" />
        </g>
        {/* Highlights */}
        <ellipse cx="31" cy="70" rx="2.5" ry="1.5" fill={PINK} />
        <ellipse cx="61" cy="70" rx="2.5" ry="1.5" fill={PINK} />
      </svg>
    );
  }

  // === YAY BUBBLE ===
  if (name === "doodle-yay") {
    return (
      <svg {...common} viewBox="0 0 120 80">
        <g fill={WHITE} stroke={PINK} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          <path d="M 12 20 Q 12 8, 24 8 L 96 8 Q 108 8, 108 20 L 108 50 Q 108 62, 96 62 L 50 62 L 38 74 L 40 62 L 24 62 Q 12 62, 12 50 Z" />
        </g>
        <text
          x="60"
          y="44"
          fontFamily="var(--font-script), cursive"
          fontSize="32"
          fontWeight="400"
          textAnchor="middle"
          fill={PINK_HOT}
        >
          yay!
        </text>
      </svg>
    );
  }

  // === CIRCLE (sketchy ellipse) ===
  if (name === "doodle-circle") {
    return (
      <svg {...common}>
        <g
          fill="none"
          stroke={PINK}
          strokeWidth="3"
          strokeLinecap="round"
        >
          <ellipse cx="50" cy="50" rx="38" ry="32" transform="rotate(-3 50 50)" />
          <ellipse cx="50" cy="50" rx="35" ry="30" transform="rotate(2 50 50)" opacity="0.5" />
        </g>
      </svg>
    );
  }

  return null;
}
