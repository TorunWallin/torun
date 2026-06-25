import React, { useState, useRef, useEffect } from "react";
import { Send, Heart, Sparkles, AlertCircle, Quote, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function TorunAiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Välkommen hem, fina du ♡ Jag har skapat det här utrymmet för att ge dig en helt kravlös och genomtrygg zon. Här kan du fråga mig helt fritt om allt som rör din träningsrytm, din menscykel, hormonbalans under klimakteriet, matglädje utan dömande kaloriregler, eller hur du bäst varvar ner ditt nervsystem. Vad bär du på i hjärtat eller kroppen just idag?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [offlineDemo, setOfflineDemo] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: "Hur tränar jag under mens? 🌊", prompt: "Hur anpassar jag min träning under min menscykel så att det stöttar kroppen?" },
    { label: "Känner mig stressad & utmattad 🧘‍♀️", prompt: "Jag känner mig extremt utmattad och stressad just nu. Vilken rörelse är snällast mot mitt nervsystem?" },
    { label: "Hur fungerar era cykelverktyg? 🧭", prompt: "Hur fungerar era nya biologiska verktyg som Hormonkompassen och Dagsformshjulet för min träning?" },
    { label: "Berätta om medlemsportalen 🔐", prompt: "Berätta mer om den nya interaktiva TORUN-portalen och vad jag får förhandsvisa där?" }
  ];

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: "user", content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg]
        })
      });

      if (!response.ok) {
        throw new Error("Kunde inte ansluta till server-oraklet.");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      if (data.offline) {
        setOfflineDemo(true);
      } else {
        setOfflineDemo(false);
      }

    } catch (err) {
      console.error(err);
      
      const fallbacks: Record<string, string> = {
        mens: "Fina du, under menstruationsfasen är dina hormoner som lägst. Kroppen lägger kraft på inre helande. Träning ska vara återhämtande just nu — prova mjuk yinyoga eller lugna promenader istället för tunga baslyft ♡",
        stress: "Andas in djupt... Andas ut... När kortisolnivåerna slår i taket gör tunga intervallpass mer skada än nytta för sköldkörteln. Gå ut på en tyst barfotapromenad eller ligg med benen vinkelrätt mot en vägg i 15 minuter ♡",
        äta: "Att 'äta för att prestera' innebär att möta din fantastiska kropp med den respekt och energi den behöver för att må gott. Mat är kroppens viktigaste byggsten och glädje — den ska aldrig förtjänas eller kompenseras bort ♡",
        verktyg: "Mina nya biologiska verktyg är skapade för att ge dig full insikt utan prestationshets! Du hittar Hormonkompassen, Dagsformshjulet och Receptutforskaren på min startsida under 'Hem & Filosofi'. De hjälper dig att anpassa din styrka efter din kropps intelligens dag för dag ♡",
        portal: "TORUN-portalen är min framtida digitala träningsdagbok och gemenskap för mina medlemmar! När du går med i min coaching får du full tillgång till appen där du kan bocka av dagens pass, se övningsvideor, hålla tät kontakt med mig och få feedback ♡"
      };

      let answer = "Jag lyssnar på dig med hela mitt hjärta... Ta ett djupt andetag. Det du känner just nu är helt okej och värt att respekteras. Hur kan jag stötta dig i detta? ♡";
      const norm = textToSend.toLowerCase();
      if (norm.includes("mens") || norm.includes("cykel")) answer = fallbacks.mens;
      else if (norm.includes("stress") || norm.includes("trött") || norm.includes("utmatt")) answer = fallbacks.stress;
      else if (norm.includes("ät") || norm.includes("mat") || norm.includes("kalor")) answer = fallbacks.äta;
      else if (norm.includes("verktyg") || norm.includes("kompass") || norm.includes("hjul")) answer = fallbacks.verktyg;
      else if (norm.includes("portal") || norm.includes("medlem") || norm.includes("inlogg")) answer = fallbacks.portal;

      setMessages(prev => [...prev, { role: "assistant", content: answer }]);
      setOfflineDemo(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animated-aurora-bg min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative" id="ai-chat-root">
      
      <div className="max-w-3xl mx-auto flex flex-col h-[78vh] glass-panel rounded-[2rem] border border-white/65 shadow-2xl overflow-hidden relative z-10 font-sans">
        
        {/* Chat Header in high-contrast deep emerald with brand accents */}
        <div className="bg-[#230c1e] p-5 text-white flex items-center justify-between border-b border-white/35">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 relative">
              <Heart className="w-5 h-5 text-[#fd80ff] fill-[#fd80ff]" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#fd80ff] rounded-full border-2 border-[#230c1e] animate-pulse-slow" />
            </div>
            <div>
              <h2 className="font-display font-light text-sm tracking-wide text-white leading-tight">Torun AI-Träningskompis</h2>
              <span className="text-[9px] font-sans text-white/70 uppercase tracking-widest block mt-0.5">Lyssnar med det biologiska hjärtat</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-[9px] font-sans font-bold text-[#fd80ff] bg-[#fff5fc] border border-white/60 px-3 py-1.5 rounded-full shadow-xs">
            <Sparkles className="w-3 h-3 text-[#fd80ff]" />
            <span>BIOLOGISK AI-GUIDE</span>
          </div>
        </div>

        {/* Offline notification banner */}
        {offlineDemo && (
          <div className="bg-[#fff5fc]/45 px-5 py-2.5 border-b border-white/30 flex items-center gap-2 text-[10px] font-sans tracking-wide text-[#230c1e]">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#fd80ff]" />
            <p className="leading-tight font-light">
              Torun AI körs i inbyggt sandbox-läge (offline). Ställ gärna dina biologiska frågor ändå!
            </p>
          </div>
        )}

        {/* Messages list container */}
        <div className="flex-grow overflow-y-auto p-5 sm:p-6 space-y-4 bg-transparent" id="chat-messages-container">
          {messages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <div 
                key={i}
                className={`flex gap-3.5 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#fff5fc] border border-white/50 text-[#fd80ff] flex items-center justify-center text-[10px] font-bold flex-shrink-0 shadow-2xs">
                    AI
                  </div>
                )}
                
                <div className={`p-4 rounded-2.5xl relative text-xs sm:text-sm font-sans leading-relaxed ${
                  isUser 
                    ? "bg-[#230c1e] text-white rounded-tr-none border border-white/30 shadow-xs" 
                    : "glass-panel border border-white/55 text-[#230c1e] rounded-tl-none shadow-xs"
                }`}>
                  <p className="whitespace-pre-line">
                    {msg.content}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Typing Loading Indicator */}
          {loading && (
            <div className="flex gap-3 items-center text-[10px] font-sans text-[#230c1e]/70 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-[#fff5fc] border border-white/50 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-[#fd80ff]">
                •••
              </div>
              <span>Torun AI analyserar dina fysiologiska svar...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        {messages.length === 1 && !loading && (
          <div className="p-4 bg-white/20 border-t border-white/35 space-y-2.5 backdrop-blur-xs">
            <span className="text-[9px] font-sans uppercase tracking-widest font-black text-[#230c1e]/60 block px-1">GENVÄGAR TILL INSIGTER:</span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(qp.prompt)}
                  className="bg-white/40 hover:bg-white/70 border border-white/50 hover:border-[#fd80ff]/30 text-[#230c1e] text-xs px-3.5 py-2 rounded-xl transition-all text-left font-sans cursor-pointer shadow-xs"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* User Inputs panel */}
        <div className="p-4 bg-white/25 border-t border-white/35 flex gap-2 relative backdrop-blur-sm">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage(input);
            }}
            placeholder="Skriv dina biologiska funderingar här..."
            className="flex-grow bg-white/45 border border-white/60 rounded-xl px-4.5 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/70 text-[#230c1e] placeholder-[#230c1e]/50"
          />
          <button
            onClick={() => handleSendMessage(input)}
            disabled={!input.trim() || loading}
            className="bg-[#fd80ff] hover:bg-[#e472e6] disabled:opacity-30 text-white p-3.5 rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-md hover:shadow-[#fd80ff]/20"
            aria-label="Skicka meddelande"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
}
