import React from "react";
import { Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (tabId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#02473E] text-white/70 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full mt-auto" id="footer">
      {/* Luminous spot */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#fd80ff]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center pb-12 border-b border-white/10 relative z-10">
        {/* Centered header "hälsa på dina villkor" with heart circle on the right */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
          <h2 className="font-script text-2xl sm:text-3xl lg:text-4xl font-light tracking-normal text-white lowercase">
            hälsa på dina villkor
          </h2>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/15">
            <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#fd80ff] fill-[#fd80ff]" />
          </div>
        </div>
        <p className="text-xs sm:text-sm font-sans font-light tracking-wider text-white/90 max-w-xl">
          Online-PT för tjejer och kvinnor som vill bli <span className="font-semibold">starka</span>, <span className="italic">må bra</span> och bygga vanor som faktiskt håller.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pt-12 font-sans text-left relative z-10">
        
        {/* Column 1: Torun Badge */}
        <div className="space-y-4 flex flex-col items-start justify-start">
          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white font-sans font-medium text-sm">
            <span className="font-display font-light tracking-wide text-white">Torun</span>
            <Heart className="w-3.5 h-3.5 text-[#fd80ff] fill-[#fd80ff]" />
          </div>
          <p className="text-[12px] text-white/50 leading-relaxed font-sans font-light tracking-wider uppercase">
            Vägen till ett <br /> hälsosammare liv
          </p>
        </div>

        {/* Column 2: UTFORSKA */}
        <div className="space-y-3 font-sans">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#fd80ff]">UTFORSKA</h4>
          <ul className="space-y-2 text-xs font-light text-white/80 font-sans tracking-wide">
            <li>
              <button 
                onClick={() => onNavigate("programs")} 
                className="hover:text-white transition-colors cursor-pointer text-left outline-none"
              >
                Program & paket
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  onNavigate("home");
                  setTimeout(() => {
                    const el = document.getElementById("philosophy-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 150);
                }} 
                className="hover:text-white transition-colors cursor-pointer text-left outline-none"
              >
                Filosofi
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  onNavigate("home");
                  setTimeout(() => {
                    const el = document.getElementById("story-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 150);
                }} 
                className="hover:text-white transition-colors cursor-pointer text-left outline-none"
              >
                Om mig
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate("startguide")} 
                className="hover:text-white transition-colors cursor-pointer text-left outline-none"
              >
                Startguide
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: KONTAKT */}
        <div className="space-y-3 font-sans">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#fd80ff]">KONTAKT</h4>
          <ul className="space-y-2 text-xs font-light text-white/80 font-sans tracking-wide">
            <li>
              <a href="mailto:hej@torun.se" className="hover:text-white transition-colors block">
                hej@torun.se
              </a>
            </li>
            <li>
              <button 
                onClick={() => onNavigate("contact")} 
                className="hover:text-white transition-colors cursor-pointer text-left outline-none"
              >
                Kontakta mig →
              </button>
            </li>
            <li>
              <a href="#privacy" className="hover:text-white transition-colors block">
                Integritetspolicy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: FÖLJ MED */}
        <div className="space-y-3 font-sans">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#fd80ff]">FÖLJ MED</h4>
          <div className="flex gap-4">
            <a 
              href="https://instagram.com/torunwallin" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#fd80ff] hover:bg-white/10 hover:border-[#fd80ff]/20 transition-all cursor-pointer"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a 
              href="https://tiktok.com/@torunwallin" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#fd80ff] hover:bg-white/10 hover:border-[#fd80ff]/20 transition-all cursor-pointer"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.28-.24-.53-.5-.77-.78-.07 1.93-.03 3.85-.04 5.78-.04 2.63-.84 5.34-2.81 7.11-2.02 1.84-4.9 2.58-7.56 2.09-2.73-.47-5.26-2.45-6.19-5.11-.99-2.79-.47-6.08 1.44-8.37 1.78-2.16 4.67-3.12 7.37-2.58v4.18c-1.39-.42-2.99-.08-4.06.87-.99.86-1.43 2.29-1.2 3.58.21 1.22.99 2.36 2.1 2.87 1.34.63 3 .47 4.14-.42.92-.72 1.38-1.87 1.37-3.05.02-4.46.01-8.91.01-13.37z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-sans font-bold uppercase tracking-wider text-white/40 relative z-10">
        <p>© 2026 TORUN WALLIN · ALLA RÄTTIGHETER FÖRBEHÅLLNA</p>
        <div className="flex items-center gap-1 select-none">
          <span>Byggt med omtanke</span>
          <Heart className="w-3 h-3 text-[#fd80ff] fill-[#fd80ff]" />
        </div>
      </div>
    </footer>
  );
}
