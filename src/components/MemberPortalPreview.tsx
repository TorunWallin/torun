import React, { useState } from "react";
import { Lock, User, Key, CheckCircle, Calendar, Film, Heart, MessageSquare, Plus, Bell, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MemberPortalPreview() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("testmedlem@torun.se");
  const [password, setPassword] = useState<string>("••••••••");
  const [activeTab, setActiveTab] = useState<"workout" | "cycle" | "community">("workout");
  const [workoutChecked, setWorkoutChecked] = useState<Record<string, boolean>>({
    squats: false,
    press: false,
    romanian: false,
    breathing: false
  });
  const [notif, setNotif] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    triggerNotif("Välkommen hem, fina du! Du är inloggad i demo-portalen.");
  };

  const triggerNotif = (msg: string) => {
    setNotif(msg);
    setTimeout(() => {
      setNotif(null);
    }, 4500);
  };

  const toggleWorkout = (id: string, name: string) => {
    setWorkoutChecked(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        triggerNotif(`Underbart! Övningen "${name}" registrerad. Coach Torun hejar på dig! ♡`);
      }
      return next;
    });
  };

  const communityPosts = [
    {
      id: 1,
      author: "Louise, 42 år",
      avatar: "L",
      time: "2 timmar sedan",
      content: "Körde precis mitt cykelanpassade lutealpass. Kände mig lite tung i kroppen men sänkte vikterna med 15% som dagsformshjulet sa. Det kändes så skönt att träna UTAN press och att gå hem med energi kvar i depåerna! ♡",
      likes: 12
    },
    {
      id: 2,
      author: "Ebba, 19 år (Stark Tjej)",
      avatar: "E",
      time: "5 timmar sedan",
      content: "Min första vecka i communityn och jag är så tacksam. Jag har slutat hetsa med kalorier och äter för att orka lyfta tungt. Träningsvärk har aldrig känts så stärkande förut!",
      likes: 8
    },
    {
      id: 3,
      author: "Maria, 51 år",
      avatar: "M",
      time: "Igår",
      content: "Min ledvärk är som bortblåst efter att ha lyft tungt i 4 veckor nu. Mina knäböj känns så stabila och trygga. Tack Torun för den endokrina guidningen under klimakteriet!",
      likes: 15
    }
  ];

  return (
    <div className="glass-panel rounded-[2.5rem] border border-white/60 shadow-xl overflow-hidden text-[#230c1e] relative" id="member-portal-preview-widget">
      
      {/* Absolute notifications banner */}
      <AnimatePresence>
        {notif && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-4 left-4 right-4 z-50 bg-[#230c1e] text-white border border-[#fd80ff]/20 px-5 py-3 rounded-2xl shadow-xl flex items-center justify-between text-xs sm:text-sm font-sans"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#fd80ff]" />
              <span className="font-light">{notif}</span>
            </div>
            <button onClick={() => setNotif(null)} className="text-white/60 hover:text-white font-bold ml-2">×</button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoggedIn ? (
        /* LOGIN PREVIEW SCREEN */
        <div className="p-8 sm:p-12 text-center space-y-6 max-w-md mx-auto" id="portal-login-screen">
          <div className="w-14 h-14 rounded-full bg-[#fff5fc] border border-[#fd80ff]/20 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-6 h-6 text-[#fd80ff]" />
          </div>
          
          <div className="space-y-2">
            <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#fd80ff] bg-white/60 px-3.5 py-1 rounded-full inline-block">
              FRAMTIDA MEDLEMSINLOGG
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight">
              TORUN-portalen
            </h3>
            <p className="text-xs text-[#230c1e]/75 font-sans font-light">
              Det här är en interaktiv förhandsvisning av mitt exklusiva medlemsområde. Logga in nedan för att se hur portalen stöttar dig i vardagen.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left font-sans">
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-wider text-[#230c1e]/70 font-bold">E-postadress</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#230c1e]/40">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="email" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/40 border border-white/60 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 text-[#230c1e]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-wider text-[#230c1e]/70 font-bold">Lösenord</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#230c1e]/40">
                  <Key className="w-4 h-4" />
                </span>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/40 border border-white/60 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 text-[#230c1e]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-[#230c1e] hover:bg-[#3d1534] text-white text-[10px] font-sans font-bold uppercase tracking-widest py-4 rounded-xl shadow-md transition-all cursor-pointer text-center block"
              >
                Logga in som testmedlem ♡
              </button>
            </div>
          </form>

          <p className="text-[9.5px] text-stone-500 font-sans leading-relaxed">
            När du blir kund hos TORUN får du dina unika inloggningsuppgifter samt tillgång till min dedikerade mobilapp.
          </p>
        </div>
      ) : (
        /* LOGGED IN INTERACTIVE DEMO DASHBOARD */
        <div className="flex flex-col min-h-[500px] font-sans" id="portal-dashboard">
          
          {/* Dashboard Header Bar */}
          <div className="bg-[#230c1e] text-white p-5 sm:px-8 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-white font-serif text-lg font-bold">
                H
              </div>
              <div className="text-left">
                <h4 className="font-display text-sm sm:text-base font-light text-white leading-tight">Välkommen tillbaka, Hanna! ♡</h4>
                <span className="text-[9px] text-[#fd80ff] uppercase tracking-widest font-bold block mt-0.5">Cykelanpassat: Follikulärfas (Dag 9)</span>
              </div>
            </div>

            {/* Simulated app state info */}
            <div className="flex items-center gap-4 text-xs font-sans text-white/80">
              <div className="text-center sm:text-right">
                <span className="block text-[8px] uppercase tracking-wider text-white/50">Mina framsteg</span>
                <span className="block font-bold text-white">4 avstämda pass denna vecka</span>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)} 
                className="text-[9px] uppercase tracking-widest font-bold bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                Logga ut
              </button>
            </div>
          </div>

          {/* Dashboard Tabs Selectors */}
          <div className="bg-white/20 border-b border-white/40 p-2 flex gap-1 justify-center sm:justify-start sm:px-6">
            {[
              { id: "workout", label: "Mitt Träningsschema", icon: Calendar },
              { id: "cycle", label: "Hormon- & Dagsformlogg", icon: Heart },
              { id: "community", label: "Community & Pepp", icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? "bg-[#230c1e] text-white shadow-xs" 
                      : "hover:bg-white/40 text-[#230c1e]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="inline sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Dashboard Content Area */}
          <div className="p-5 sm:p-8 flex-grow bg-transparent">
            
            {/* WORKOUT SCHEMA TAB */}
            {activeTab === "workout" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <h5 className="font-serif text-lg font-bold text-[#230c1e]">Dagens styrkepass: Stark & Bärande</h5>
                    <span className="text-[10px] text-[#230c1e]/70 uppercase tracking-wider font-bold">Fokus: Benstyrka & Hormonell kraft • Fas: Vår</span>
                  </div>
                  <div className="bg-[#fff5fc] text-[#fd80ff] px-3.5 py-1.5 rounded-full border border-[#fd80ff]/20 text-[9px] font-bold uppercase tracking-wider">
                    Östrogen: Högt (Klarar tung belastning)
                  </div>
                </div>

                <p className="text-xs text-[#230c1e]/80 leading-relaxed max-w-2xl font-light">
                  Idag fokuserar vi på tunga baslyft för ben och säte. Eftersom du befinner dig i follikulärfasen har du gott om energi och snabb återhämtning. Känn vikten, lyft med jordning och stolt hållning.
                </p>

                {/* Workout list checklist */}
                <div className="space-y-3 font-sans">
                  {[
                    { id: "squats", name: "1. Kontrollerade Knäböj med Skrot", reps: "3 set x 6 repetitioner (Vila 2.5 min)", desc: "Sänk dig ner som på en låg stol med tyngden på hälarna. Håll bröstet stolt och spänn sätet på vägen upp.", videoUrl: "Knäböj" },
                    { id: "press", name: "2. Hantelpress över axlarna", reps: "3 set x 8 repetitioner (Vila 2 min)", desc: "Stå stadigt med aktiverad mage. Pressa kontrollerat hantlarna rakt upp utan att svanka.", videoUrl: "Hantelpress" },
                    { id: "romanian", name: "3. Rumänska Marklyft", reps: "3 set x 8 repetitioner (Vila 2 min)", desc: "Skjut bak höften och låt stången/hantlarna glida längs benen. Känn stretch i baksida lår innan du vänder.", videoUrl: "Marklyft" },
                    { id: "breathing", name: "4. Avslutande Nervsystem-andning", reps: "5 minuter box-andning i liggande ställning", desc: "Andas in 4 sekunder, håll 4 sekunder, andas ut 4 sekunder, håll 4 sekunder. Landas djupt.", videoUrl: "Andning" }
                  ].map((ex) => {
                    const isChecked = workoutChecked[ex.id];
                    return (
                      <div 
                        key={ex.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                          isChecked 
                            ? "bg-emerald-50/50 border-emerald-200" 
                            : "bg-white/40 border-white/60 hover:bg-white/60"
                        }`}
                      >
                        <div className="space-y-1 text-left flex-grow">
                          <strong className={`block text-xs text-[#230c1e] ${isChecked ? "line-through opacity-60" : ""}`}>
                            {ex.name}
                          </strong>
                          <span className="block text-[10px] text-[#fd80ff] font-bold">{ex.reps}</span>
                          <span className="block text-[11px] text-[#230c1e]/70 leading-normal font-light">{ex.desc}</span>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-center">
                          {/* Demo video button */}
                          <button 
                            onClick={() => triggerNotif(`Visar videoinstruktion för: ${ex.videoUrl} (Simulerat)`)}
                            className="bg-white/80 hover:bg-white text-[#230c1e] border border-white/80 p-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                            title="Visa övningsvideo"
                          >
                            <Film className="w-3.5 h-3.5 text-[#fd80ff]" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Video</span>
                          </button>
                          
                          {/* Checkoff button */}
                          <button
                            onClick={() => toggleWorkout(ex.id, ex.name)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                              isChecked 
                                ? "bg-emerald-600 text-white" 
                                : "bg-[#230c1e] text-white hover:bg-[#3d1534]"
                            }`}
                          >
                            {isChecked ? "Klar ✓" : "Klarmarkera"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CYCLE AND LOG TAB */}
            {activeTab === "cycle" && (
              <div className="space-y-6 animate-in fade-in duration-300 text-left">
                <div>
                  <h5 className="font-serif text-lg font-bold text-[#230c1e]">Biologisk loggbok & Dagsform</h5>
                  <p className="text-xs text-[#230c1e]/70 font-sans font-light">Registrera hur kroppen och själen känns idag för att synka dina träningsvikter.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
                  {/* Current cycle card status */}
                  <div className="bg-white/40 border border-white/60 p-5 rounded-2.5xl space-y-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#230c1e]/60 block">AKTUELL STATUS</span>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#fff5fc] border border-[#fd80ff]/20 flex flex-col items-center justify-center text-[#230c1e]">
                        <span className="text-xs uppercase font-bold text-[#230c1e]/60">DAG</span>
                        <span className="text-2xl font-serif font-bold leading-none">9</span>
                      </div>
                      <div>
                        <strong className="block text-xs text-[#230c1e]">Follikulärfasen (Vår)</strong>
                        <span className="block text-[11px] text-[#230c1e]/70 leading-snug mt-0.5">Estrogenet stiger. Muskelåterhämtningen är hög och ledhälsa är optimal. Kroppen svarar fantastiskt på belastning.</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => triggerNotif("Hormonell symptomregistrering öppnad (Simulerat)")}
                      className="w-full bg-[#fff5fc] hover:bg-white text-[#fd80ff] border border-[#fd80ff]/20 text-[9px] font-bold uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Registrera cykel-symptom (PMS, kramp)
                    </button>
                  </div>

                  {/* Dagsform check-in teaser */}
                  <div className="bg-white/40 border border-white/60 p-5 rounded-2.5xl space-y-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#230c1e]/60 block">SENASTE DAGSFORM</span>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                        <span className="text-xs font-bold text-[#230c1e]">Grönt ljus (82% balans)</span>
                      </div>
                      <p className="text-[11px] text-[#230c1e]/70 leading-normal mt-2 font-light">
                        Din senaste nervsystemsincheckning gjordes igår morse. Din sömn var god och stressnivån var låg. Du rekommenderades full styrka.
                      </p>
                    </div>

                    <button 
                      onClick={() => triggerNotif("Skickar dig till dagsformshjulet... (Skrolla upp till dagsformshjulet på startsidan för att testa!)")}
                      className="w-full bg-[#230c1e] hover:bg-[#3d1534] text-white text-[9px] font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#fd80ff]" /> Checka in ny dagsform nu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* COMMUNITY AND FORUM TAB */}
            {activeTab === "community" && (
              <div className="space-y-6 animate-in fade-in duration-300 text-left">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-serif text-lg font-bold text-[#230c1e]">Systerhörnan: Det stängda medlemsforumet</h5>
                    <p className="text-xs text-[#230c1e]/70 font-sans font-light">Här peppar vi varandra helt fritt från dömande kommentarer, kaloripiskor och kroppshets.</p>
                  </div>
                  
                  <button 
                    onClick={() => triggerNotif("Ny inläggs-skärm öppnad (Simulerat)")}
                    className="bg-white/80 hover:bg-white text-[#230c1e] border border-stone-200 text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#fd80ff]" /> Skriv inlägg
                  </button>
                </div>

                {/* Posts Feed */}
                <div className="space-y-4 font-sans text-xs">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="bg-white/40 border border-white/60 p-5 rounded-2.5xl space-y-3 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#fff5fc] border border-[#fd80ff]/20 text-[#fd80ff] flex items-center justify-center font-bold">
                            {post.avatar}
                          </div>
                          <div>
                            <strong className="block text-[#230c1e]">{post.author}</strong>
                            <span className="block text-[9px] text-[#230c1e]/60 uppercase tracking-wider">{post.time}</span>
                          </div>
                        </div>
                        
                        <div className="text-[10px] text-[#230c1e]/60 uppercase tracking-widest font-bold">
                          MEDLEM ♡
                        </div>
                      </div>

                      <p className="text-xs text-[#230c1e]/85 leading-relaxed font-light">
                        {post.content}
                      </p>

                      <div className="pt-2 border-t border-[#230c1e]/5 flex items-center gap-4 text-[10px] font-bold text-[#230c1e]/75">
                        <button 
                          onClick={() => triggerNotif(`Du gillade Louises inlägg! (Simulerat)`)}
                          className="hover:text-[#fd80ff] flex items-center gap-1.5 cursor-pointer"
                        >
                          <Heart className="w-3.5 h-3.5 fill-[#fd80ff]/0 text-[#230c1e]" /> Gilla ({post.likes})
                        </button>
                        <button 
                          onClick={() => triggerNotif("Kommentarer öppnade (Simulerat)")}
                          className="hover:text-[#fd80ff] flex items-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> Kommentera
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
