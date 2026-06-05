export function AnnouncementBar() {
  return (
    <div className="bg-[#FCE4EE] text-[#2f4a3a] text-center py-2.5 px-4 text-[14px] tracking-[0.5px] border-b border-[#f0e6d8]">
      <div className="flex items-center justify-center gap-2">
        <span className="font-mono">Gratis 7-dagars startguide</span>
        <span className="text-[#ec4d9c]">→</span>
        <a
          href="#guide"
          className="font-englandJoined text-[#ec4d9c] align-middle no-underline hover:text-[#d13f87] transition-colors"
        >
          ladda ner här
        </a>
      </div>
    </div>
  );
}