import { Reveal } from "./reveal";

const posts = [
  { src: "/torun-portrait.png", alt: "Torun portrait" },
  { src: "/PinkSetYogaGirl.png", alt: "Yoga" },
  { src: "/avotoast.png", alt: "Healthy food" },
  { src: "/schrunch.png", alt: "Workout" },
  { src: "/matcha.png", alt: "Matcha" },
  { src: "/ZenGirl.png", alt: "Zen" },
];

export function InstagramFeed() {
  return (
    <section className="bg-[#fef6fb] px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <Reveal delay={0}>
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2">
              <div className="h-[1px] w-10 bg-[#ff4fc4]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[#ff4fc4]">Instagram</span>
              <div className="h-[1px] w-10 bg-[#ff4fc4]" />
            </div>
            <h2 className="font-pacifico text-[40px] leading-[1.1] text-[#111] md:text-[56px]">
              Följ med i vardagen
            </h2>
            <a
              href="https://www.instagram.com/toruncoach"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 font-mono text-[14px] text-black/45 transition-colors duration-200 hover:text-[#ff4fc4]"
            >
              @toruncoach
            </a>
          </div>
        </Reveal>

        {/* Grid */}
        <Reveal delay={100}>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {posts.map((post, i) => (
              <a
                key={i}
                href="https://www.instagram.com/toruncoach"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-[20px] md:rounded-[28px]"
              >
                <img
                  src={post.src}
                  alt={post.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#ff4fc4]/0 transition-all duration-300 group-hover:bg-[#ff4fc4]/30">
                  <span className="scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <svg className="h-10 w-10 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={200}>
          <div className="mt-10 flex justify-center">
            <a
              href="https://www.instagram.com/toruncoach"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#f4c1f0] to-[#ec4d9c] px-9 py-4 font-mono font-bold text-base text-white transition-all duration-300 hover:-translate-y-1 hover:from-[#fce4ee] hover:to-[#f4a6cc] hover:text-[#111] shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
            >
              <span className="block transition-transform duration-300 group-hover:-translate-x-2">
                Följ @toruncoach
              </span>
              <span className="absolute inset-y-0 right-6 flex items-center translate-x-16 transition-transform duration-300 group-hover:translate-x-0">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-12.881z"/>
                </svg>
              </span>
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
