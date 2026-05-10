// Image-based decorative sticker (transparent PNGs in /public)
// Use for the cropped 3D-style stickers Torun uploaded

type Props = {
  src: string; // path relative to /public, e.g. "/PinkDumbells.png"
  alt?: string;
  className?: string;
  size?: number; // pixel size
};

export function ImgSticker({ src, alt = "", className = "", size = 80 }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`inline-block select-none object-contain pointer-events-none ${className}`}
      aria-hidden={alt ? undefined : true}
      loading="lazy"
    />
  );
}
