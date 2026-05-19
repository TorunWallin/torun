export function AnnouncementBar() {
  return (
    <div className="bg-[#fce7f3] text-[#2f4a3a] text-center py-2.5 px-4 text-[13px] tracking-[0.5px] border-b border-[#f8d0e0]">
      <div className="flex items-center justify-center gap-2">
        <span className="font-mono">Gratis 7-dagars startguide</span>
        <span className="text-[#5c6b5f]">→</span>
        <a
          href="#guide"
          className="font-playwrite text-[20px] text-[#ec4d9c] align-middle no-underline hover:text-[#d13f87] transition-colors"
        >
          ladda ner
        </a>
      </div>
    </div>
  );
}