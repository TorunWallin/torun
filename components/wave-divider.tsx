type Props = {
  bg: string;
  fill: string;
  height?: number;
  variant?: "a" | "b" | "c";
};

const paths = {
  a: "M0,0 C360,80 1080,0 1440,60 L1440,80 L0,80 Z",
  b: "M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z",
  c: "M0,0 C480,72 960,72 1440,0 L1440,80 L0,80 Z",
};

export function WaveDivider({ bg, fill, height = 80, variant = "a" }: Props) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: bg }}
      aria-hidden
    >
      <svg
        viewBox={`0 0 1440 80`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: `${height}px` }}
      >
        <path d={paths[variant]} fill={fill} />
      </svg>
    </div>
  );
}
