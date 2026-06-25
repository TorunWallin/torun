import React, { useState, useEffect } from "react";
import { ClipboardCheck, Check, Heart, User, Sparkles, Activity, FileText, ArrowRight, ArrowLeft } from "lucide-react";
import { packages } from "../data";
import { motion, AnimatePresence } from "motion/react";
import torunDock from "../../assets/torun_dock.jpg";

interface ApplicationFormProps {
  selectedPackageId: string;
  onNavigate: (tabId: string) => void;
}

export default function ApplicationForm({ selectedPackageId, onNavigate }: ApplicationFormProps) {
  const [formType, setFormType] = useState<"apply" | "contact" | "waitlist" | null>(
    selectedPackageId === "medlemsportal-app" ? "waitlist" : selectedPackageId ? "apply" : null
  );
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    phase: [] as string[],
    intention: [] as string[],
    history: "",
    selectedPackage: selectedPackageId || "stark-med-torun",
    notes: ""
  });

  // Track outer changes to package selection
  useEffect(() => {
    if (selectedPackageId) {
      if (selectedPackageId === "medlemsportal-app") {
        setFormType("waitlist");
      } else {
        setFormType("apply");
      }
      setFormData((prev) => ({ ...prev, selectedPackage: selectedPackageId }));
    } else {
      setFormType(null);
    }
  }, [selectedPackageId]);

  const handleTogglePhase = (value: string) => {
    setFormData((prev) => {
      const current = prev.phase;
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, phase: updated };
    });
  };

  const handleToggleIntention = (value: string) => {
    setFormData((prev) => {
      const current = prev.intention;
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, intention: updated };
    });
  };

  const handleNext = () => {
    setStep((prev) => Math.min(5, prev + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const stepsInfo = [
    { num: 1, label: "Kontakt", icon: User },
    { num: 2, label: "Livsfas", icon: Activity },
    { num: 3, label: "Intention", icon: Sparkles },
    { num: 4, label: "Kropp", icon: Heart },
    { num: 5, label: "Paket", icon: FileText },
  ];

  return (
    <div className="animated-aurora-bg min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative" id="coaching-apply-root">
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Back navigation button */}
        <div className="mb-6 flex justify-start">
          <button 
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 text-[10px] font-sans font-bold uppercase tracking-[0.16em] text-[#230c1e]/75 bg-white/70 backdrop-blur-md border border-white/85 shadow-xs px-4 py-2.5 rounded-full hover:bg-white hover:text-[#230c1e] hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#fd80ff] stroke-[2.5]" /> Gå tillbaka till startsidan
          </button>
        </div>

        <div className={`${formType === null ? "max-w-4xl" : "max-w-xl"} mx-auto transition-all duration-500`}>
        
        {!submitted ? (
          <>
            {/* CHOICE SCREEN */}
            {formType === null && (
              <div className="glass-panel border border-white/65 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 animate-in-fade-slide max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Side: Header & Choices */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="space-y-2">
                      <span className="text-[10px] font-sans font-bold tracking-widest text-[#fd80ff] uppercase block">
                        KONTAKTA TORUN
                      </span>
                      <h1 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-[#230c1e]">
                        Hur kan jag hjälpa dig?
                      </h1>
                      <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed font-light">
                        Välj det alternativ som passar dig bäst. Vi bokar alltid ett personligt samtal innan vi startar ett coachingprogram.
                      </p>
                    </div>

                    <div className="space-y-3 font-sans">
                      {/* Option A: Coaching Application */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormType("apply");
                          setStep(1);
                        }}
                        className="group w-full p-4.5 rounded-2xl border border-white/65 bg-white/20 hover:bg-white/45 hover:border-[#fd80ff]/40 cursor-pointer text-left transition-all duration-300 flex items-center gap-4 hover:shadow-[0_8px_20px_rgba(253,128,255,0.05)]"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#fff5fc] border border-pink-100 flex items-center justify-center text-[#fd80ff] shrink-0">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xs font-black text-[#230c1e] group-hover:text-[#fd80ff] transition-colors uppercase tracking-wider">
                            Coachingansökan
                          </h3>
                          <p className="text-[11px] text-[#230c1e]/70 leading-normal mt-0.5 font-light">
                            Ansök till Stark med Torun, Kickstart eller 1:1 djupcoaching. Vi synkar träningen efter din unika biologi.
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#fd80ff] group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>

                      {/* Option B: Waitlist for portal/app */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormType("waitlist");
                          setFormData((prev) => ({ ...prev, selectedPackage: "medlemsportal-app" }));
                        }}
                        className="group w-full p-4.5 rounded-2xl border border-white/65 bg-white/20 hover:bg-white/45 hover:border-[#fd80ff]/40 cursor-pointer text-left transition-all duration-300 flex items-center gap-4 hover:shadow-[0_8px_20px_rgba(253,128,255,0.05)]"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/50 border border-stone-200/40 flex items-center justify-center text-[#fd80ff] shrink-0">
                          <Heart className="w-5 h-5" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xs font-black text-[#230c1e] group-hover:text-[#fd80ff] transition-colors uppercase tracking-wider">
                            Medlemsportal & App
                          </h3>
                          <p className="text-[11px] text-[#230c1e]/70 leading-normal mt-0.5 font-light">
                            Säkra ditt early-bird-pris (19 kr/mån) och bevaka lanseringen.
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#fd80ff] group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>

                      {/* Option C: General Contact */}
                      <button
                        type="button"
                        onClick={() => setFormType("contact")}
                        className="group w-full p-4.5 rounded-2xl border border-white/65 bg-white/20 hover:bg-white/45 hover:border-[#fd80ff]/40 cursor-pointer text-left transition-all duration-300 flex items-center gap-4 hover:shadow-[0_8px_20px_rgba(253,128,255,0.05)]"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/50 border border-stone-200/40 flex items-center justify-center text-[#230c1e]/70 shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xs font-black text-[#230c1e] group-hover:text-[#fd80ff] transition-colors uppercase tracking-wider">
                            Skicka meddelande
                          </h3>
                          <p className="text-[11px] text-[#230c1e]/70 leading-normal mt-0.5 font-light">
                            För allmänna frågor om mina recept, metodik, samarbeten eller om du bara vill ställa en allmän fråga.
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#230c1e]/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Showcase Photo */}
                  <div className="lg:col-span-5 relative hidden lg:block">
                    <div className="absolute inset-0 border border-[#230c1e]/10 rounded-[2rem] translate-x-3 translate-y-3 -z-10" />
                    <div className="bg-stone-50 rounded-[2rem] border border-stone-200/40 p-1 relative z-10 overflow-hidden shadow-md">
                      <div className="aspect-[4/5] bg-stone-100 rounded-[1.9rem] overflow-hidden relative">
                        <img 
                          src={torunDock} 
                          alt="Torun Wallin" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs py-2 px-3 rounded-xl border border-white/60 text-center shadow-xs">
                          <span className="text-[8px] font-sans font-black tracking-widest text-[#230c1e] uppercase">
                            DIN COACH PÅ VÄGEN ♡
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* WAITLIST FORM */}
            {formType === "waitlist" && (
              <div className="glass-panel border border-white/65 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 space-y-8 animate-in-fade-slide">
                
                {/* Header portion */}
                <div className="border-b border-white/40 pb-6 space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => setFormType(null)}
                    className="absolute right-0 top-0 text-[9px] font-sans font-bold uppercase tracking-wider text-[#230c1e]/60 hover:text-[#230c1e] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3 text-[#fd80ff]" /> Tillbaka
                  </button>
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#fd80ff] uppercase block">
                    MEDLEMSPORTAL & APP · INTRESSEANMÄLAN
                  </span>
                  <h1 className="font-display text-xl sm:text-3xl font-normal tracking-tight text-[#230c1e]">
                    Säkra ditt lanseringspris 💎
                  </h1>
                  <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed font-light">
                    Säkra ditt lanseringspris på <strong>19 kr/mån</strong> (utan bindningstid, ord. pris 39 kr/mån) och få info så fort vi lanserar portalen och appen.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4 font-sans">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">Ditt fullständiga namn</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Förnamn och efternamn..."
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">Din e-postadress</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="hanna.lindqvist@epost.se"
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">Ditt telefonnummer (valfritt)</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="070-123 45 67 (om du vill ha sms-avisering)"
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/40 flex justify-end font-sans">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#fd80ff] hover:bg-[#eb5cf0] text-white text-[10px] uppercase tracking-widest font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      BEVAKA LANSERING <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* GENERAL CONTACT FORM */}
            {formType === "contact" && (
              <div className="glass-panel border border-white/65 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 space-y-8 animate-in-fade-slide">
                
                {/* Header portion */}
                <div className="border-b border-white/40 pb-6 space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => setFormType(null)}
                    className="absolute right-0 top-0 text-[9px] font-sans font-bold uppercase tracking-wider text-[#230c1e]/60 hover:text-[#230c1e] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3 text-[#fd80ff]" /> Tillbaka
                  </button>
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#fd80ff] uppercase block">
                    ALLMÄNT KONTAKTFORMULÄR
                  </span>
                  <h1 className="font-display text-xl sm:text-3xl font-normal tracking-tight text-[#230c1e]">
                    Skicka ett meddelande
                  </h1>
                  <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed font-light">
                    Fyll i fälten nedan så återkommer jag till dig personligen så fort jag har möjlighet.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4 font-sans">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">Ditt fullständiga namn</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Förnamn och efternamn..."
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">Din e-postadress</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="hanna.lindqvist@epost.se"
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">Ditt telefonnummer</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="070-123 45 67"
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">Ditt meddelande</label>
                      <textarea 
                        rows={5}
                        required
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Skriv dina funderingar här..."
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40 font-sans"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/40 flex justify-end font-sans">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#230c1e] hover:bg-[#3d1534] text-white text-[10px] uppercase tracking-widest font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      SKICKA MEDDELANDE <ArrowRight className="w-4 h-4 text-[#fd80ff]" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* COACHING APPLICATION FORM */}
            {formType === "apply" && (
              <div className="glass-panel border border-white/65 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 space-y-8 animate-in-fade-slide">
                
                {/* Header portion */}
                <div className="border-b border-white/40 pb-6 space-y-2 relative">
                  {!selectedPackageId && (
                    <button
                      type="button"
                      onClick={() => setFormType(null)}
                      className="absolute right-0 top-0 text-[9px] font-sans font-bold uppercase tracking-wider text-[#230c1e]/60 hover:text-[#230c1e] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3 text-[#fd80ff]" /> Tillbaka
                    </button>
                  )}
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#fd80ff] uppercase block">
                    ANSTÄNDIG ANSÖKAN TILL COACHING
                  </span>
                  <h1 className="font-display text-xl sm:text-3xl font-normal tracking-tight text-[#230c1e]">
                    Ett första fritt steg
                  </h1>
                  <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed font-light">
                    Här finns inga krav på prestation, före- och efterbilder eller kaloripiskor. Berätta om din vardag så möter jag dig där du är.
                  </p>
                </div>

                {/* Steps tracker breadcrumbs */}
                <div className="flex justify-between items-center bg-white/20 p-2.5 rounded-2xl border border-white/40 backdrop-blur-xs">
                  {stepsInfo.map((st) => {
                    const isCompleted = step > st.num;
                    const isActive = step === st.num;
                    return (
                      <div key={st.num} className="flex flex-col items-center flex-1 relative font-sans">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted 
                            ? "bg-[#230c1e] text-white font-extrabold" 
                            : isActive 
                            ? "bg-[#fd80ff] text-white font-extrabold shadow-md ring-2 ring-[#fd80ff]/20" 
                            : "bg-white/20 text-[#230c1e]/40 border border-white/30"
                        }`}>
                          {isCompleted ? <Check className="w-4 h-4 text-white" /> : st.num}
                        </div>
                        <span className={`text-[8px] font-bold tracking-wider uppercase mt-1 hidden sm:block ${isActive ? "text-[#fd80ff]" : "text-[#230c1e]/40"}`}>{st.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Form details */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* STEP 1: CONTACT */}
                  {step === 1 && (
                    <div className="space-y-4 animate-in-fade-slide">
                      <h3 className="font-display text-sm font-normal tracking-tight text-[#230c1e] flex items-center gap-2">
                        <User className="w-4 h-4 text-[#fd80ff]" /> Vem är du?
                      </h3>
                      
                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">Ditt fullständiga namn</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Förnamn och efternamn..."
                          className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">Din e-postadress</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="hanna.lindqvist@epost.se"
                          className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">Ditt telefonnummer</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="070-123 45 67"
                          className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2: BIO-PHASE */}
                  {step === 2 && (
                    <div className="space-y-4 animate-in-fade-slide font-sans">
                      <h3 className="font-display text-sm font-normal tracking-tight text-[#230c1e] flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#fd80ff]" /> Vilken livsfas befinner du dig i?
                      </h3>
                      <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed">Jag anpassar träningen och din kost helhjärtat efter dina hormonnivåer, livsmässiga pusselbitar och din sömncykel. Välj gärna flera alternativ.</p>
                      
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          { value: "stress", tag: "Stressig Vardag / Hög Belastning", desc: "Varma, utmattade depåer. Träning ska vara helande snarare än påfrestande." },
                          { value: "klimakterie", tag: "Perimenopaus / Klimakteriet", desc: "Varma vallningar, ledvärk, sömnstörningar. Fokus ligger på att bygga bentäthet och stötta muskler." },
                          { value: "postpartum", tag: "Gravid eller Postpartum", desc: "Gravid eller nybliven mamma. Jag sätter skonsamhet och stabilisering i absolut framsäte." },
                          { value: "regular", tag: "Regelbunden cykelparning", desc: "Erhåll cykel-synkad träning efter menstruationens fyra skiftande faser." },
                          { value: "general", tag: "Allmän Styrka & Vardagsenergi", desc: "Jag söker ett stabilt och tryggt upplägg för en starkare vardagskropp (utan cykelfokus)." },
                          { value: "beginner", tag: "Nybörjare / Komma igång", desc: "Jag är helt ny på gymmet eller vill hitta tillbaka till träningen efter ett längre uppehåll." },
                          { value: "rehab", tag: "Skadeförebyggande / Rehab", desc: "Jag vill bygga upp kroppen med extra hänsyn till känningar eller tidigare skador (t.ex. rygg, axlar eller knän)." },
                        ].map((opt) => (
                          <label 
                            key={opt.value}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex gap-3.5 items-start ${
                              formData.phase.includes(opt.value) 
                                ? "bg-white/50 border-[#fd80ff]/42 shadow-sm" 
                                : "bg-white/10 hover:bg-white/20 border-white/40"
                            }`}
                          >
                            <input 
                              type="checkbox"
                              name="phase"
                              value={opt.value}
                              checked={formData.phase.includes(opt.value)}
                              onChange={() => handleTogglePhase(opt.value)}
                              className="mt-1 text-[#fd80ff] focus:ring-[#fd80ff]/40 rounded-sm"
                            />
                            <div className="font-sans">
                              <strong className="block text-xs text-[#230c1e]">{opt.tag}</strong>
                              <span className="block text-[11px] text-[#230c1e]/75 leading-snug mt-0.5">{opt.desc}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: INTENTION */}
                  {step === 3 && (
                    <div className="space-y-4 animate-in-fade-slide font-sans">
                      <h3 className="font-display text-sm font-normal tracking-tight text-[#230c1e] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#fd80ff]" /> Vad vill du bjuda in i livet?
                      </h3>
                      <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed">Vad är din innerliga strävan bakom ansökan? Välj gärna flera alternativ.</p>

                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          { value: "strength", label: "Bygga bärande muskelmassa inifrån", desc: "Uppleva ork i lederna, ingen mer ryggvärk, sund kroppskomposition." },
                          { value: "relationship", label: "Sund hälsovana helt utan prestationspiska", desc: "Skaka av dig skuld efter helgmat och njuta av naturlig, anständig träning." },
                          { value: "balancing", label: "Balansera PMS & dämpa kortisolnivåer", desc: "Få jämnare humör, sänka hjärtklappning och stressindikationer." },
                          { value: "adolescent", label: "Trygg introduktion till sund styrka", desc: "Speciellt för unga tjejer som vill lära sig att lyfta utan mätregler." },
                        ].map((opt) => (
                          <label 
                            key={opt.value}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex gap-3.5 items-start ${
                              formData.intention.includes(opt.value) 
                                ? "bg-white/50 border-[#fd80ff]/42 shadow-sm" 
                                : "bg-white/10 hover:bg-white/20 border-white/40"
                            }`}
                          >
                            <input 
                              type="checkbox"
                              name="intention"
                              value={opt.value}
                              checked={formData.intention.includes(opt.value)}
                              onChange={() => handleToggleIntention(opt.value)}
                              className="mt-1 text-[#fd80ff] focus:ring-[#fd80ff]/40 rounded-sm"
                            />
                            <div className="font-sans">
                              <strong className="block text-xs text-[#230c1e]">{opt.label}</strong>
                              <span className="block text-[11px] text-[#230c1e]/75 leading-snug mt-0.5">{opt.desc}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: RELATIONSHIP */}
                  {step === 4 && (
                    <div className="space-y-4 animate-in-fade-slide font-sans">
                      <h3 className="font-display text-sm font-normal tracking-tight text-[#230c1e] flex items-center gap-2">
                        <Heart className="w-4 h-4 text-[#fd80ff]" /> Erfarenheter och bakgrund
                      </h3>
                      <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed">Berätta kortfattat om du har brottats med bantningsångest, matstress eller dömande träningsmiljöer förut, så att jag vet hur jag bäst stöttar dig.</p>

                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">Din personliga berättelse (Komplett sekretess)</label>
                        <textarea 
                          rows={5}
                          value={formData.history}
                          onChange={(e) => setFormData({...formData, history: e.target.value})}
                          placeholder="T.ex. 'Jag vill känna mig trygg med tunga lyft och sluta hetsa kring maten'..."
                          className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40 font-sans"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 5: ROAD SELECTION */}
                  {step === 5 && (
                    <div className="space-y-4 animate-in-fade-slide font-sans">
                      <h3 className="font-display text-sm font-normal tracking-tight text-[#230c1e] flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#fd80ff]" /> Önskat medlemskapsprogram
                      </h3>
                      <p className="text-xs text-[#230c1e]/75 font-sans">Inget av alternativen är bindande just nu — jag bjuder in till ett kort personligt samtal först så att vi stämmer av.</p>

                      <div className="grid grid-cols-1 gap-2.5">
                        {packages.map((pkg) => (
                          <label 
                            key={pkg.id}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex gap-3.5 items-center ${
                              formData.selectedPackage === pkg.id 
                                ? "bg-white/50 border-[#fd80ff]/42 shadow-sm" 
                                : "bg-white/10 hover:bg-white/20 border-white/40 text-[#230c1e]"
                            }`}
                          >
                            <input 
                              type="radio"
                              name="selectedPackage"
                              value={pkg.id}
                              checked={formData.selectedPackage === pkg.id}
                              onChange={(e) => setFormData({...formData, selectedPackage: e.target.value})}
                              className="text-[#fd80ff] focus:ring-[#fd80ff]/40"
                            />
                            <div className="flex-grow flex justify-between items-center pr-2 font-sans">
                              <div>
                                <strong className="block text-xs text-[#230c1e]">{pkg.name}</strong>
                                <span className="block text-[10px] text-[#230c1e]/75">{pkg.subtitle}</span>
                              </div>
                              <span className="font-sans text-xs font-black text-[#fd80ff] uppercase tracking-wider">{pkg.price}</span>
                            </div>
                          </label>
                        ))}
                      </div>

                      <div className="pt-2">
                        <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/60 mb-1.5 font-bold">Övriga funderingar eller frågor?</label>
                        <textarea 
                          rows={2}
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          placeholder="Något mer du vill berätta?"
                          className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40 font-sans"
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="pt-6 border-t border-white/40 flex justify-between font-sans">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-5 py-3 border border-white/55 bg-white/45 hover:bg-white/70 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[#230c1e] flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 text-[#fd80ff]" /> Bakåt
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 5 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={step === 1 && (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim())}
                        className="px-6 py-3 bg-[#230c1e] hover:bg-[#3d1534] text-white text-[10px] uppercase tracking-widest font-extrabold rounded-xl disabled:opacity-30 flex items-center gap-1 cursor-pointer transition-all"
                      >
                        Nästa del <ArrowRight className="w-3.5 h-3.5 text-[#fd80ff]" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-8 py-3.5 bg-[#fd80ff] hover:bg-[#eb5cf0] text-white text-[10px] uppercase tracking-widest font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        SKICKA ANSÖKAN <ClipboardCheck className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>

                </form>
              </div>
            )}
          </>
        ) : (
          /* Submission success card */
          <div className="glass-panel border border-white/65 p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in-fade-slide rounded-[2.5rem]" id="apply-success-card">
            <div className="w-16 h-16 rounded-full bg-white/45 border border-white/65 text-[#fd80ff] flex items-center justify-center mx-auto text-3xl font-light shadow-sm">
              ✓
            </div>

            {formType === "apply" ? (
              <>
                <div className="space-y-3 font-sans">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff]">RESURSCHEF BEKRÄFTAR</span>
                  <h2 className="text-xl sm:text-3xl font-display font-light text-[#230c1e] leading-none tracking-tight">
                    Mottagen i hjärtat, {formData.name.split(" ")[0]}! ♡
                  </h2>
                  <p className="text-[#230c1e]/80 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-sans font-light animate-pulse-slow">
                    Tack för ditt förtroende. Jag går personligen igenom dina ord under kvällen utan brådska eller opersonliga auto-scripts.
                  </p>
                </div>

                <div className="bg-white/20 border border-white/40 p-5 rounded-2xl max-w-sm mx-auto text-left space-y-2.5 font-sans backdrop-blur-xs">
                  <span className="text-[10px] font-sans uppercase font-black text-[#fd80ff] tracking-wider block">NÄSTA MJUKA FAS:</span>
                  <ol className="text-xs text-[#230c1e]/90 space-y-2 px-4 list-decimal font-light">
                    <li>Jag läser dina livsfaser, stressnivåer och erfarenheter personligen.</li>
                    <li>Du får ett genuint svar från mig inom 24 timmar.</li>
                    <li>Därefter pratar vi i ett kort videosamtal för att känna efter om det matchar.</li>
                    <li>Om allt känns helt underbart sätter vi igång i Everfit-appen i din egen takt!</li>
                  </ol>
                </div>
              </>
            ) : formType === "waitlist" ? (
              <>
                <div className="space-y-3 font-sans">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff]">SÄKRAD EARLY-BIRD 💎</span>
                  <h2 className="text-xl sm:text-3xl font-display font-light text-[#230c1e] leading-none tracking-tight">
                    Du står nu på väntelistan, {formData.name.split(" ")[0]}! ♡
                  </h2>
                  <p className="text-[#230c1e]/80 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-sans font-light">
                    Tack för din intresseanmälan! Jag har registrerat din e-postadress <strong>{formData.email}</strong>. Din tidiga rabatt på 19 kr/mån (ord. pris 39 kr/mån) är säkrad och du får reda på direkt när appen lanseras.
                  </p>
                </div>

                <div className="bg-white/20 border border-white/40 p-5 rounded-2xl max-w-sm mx-auto text-left space-y-2.5 font-sans backdrop-blur-xs">
                  <span className="text-[10px] font-sans uppercase font-black text-[#fd80ff] tracking-wider block">VAD HÄNDER HÄRNÄST:</span>
                  <ul className="text-xs text-[#230c1e]/90 space-y-2 px-4 list-disc font-light">
                    <li>Jag skickar en bekräftelse till dig personligen.</li>
                    <li>När medlemsportalen öppnar får du en personlig inbjudan med inloggningslänk.</li>
                    <li>Ingen betalning eller bindning sker förrän du själv väljer att starta ditt konto.</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3 font-sans">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff]">MEDDELANDE SKICKAT</span>
                  <h2 className="text-xl sm:text-3xl font-display font-light text-[#230c1e] leading-none tracking-tight">
                    Mottaget i hjärtat, {formData.name.split(" ")[0]}! ♡
                  </h2>
                  <p className="text-[#230c1e]/80 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-sans font-light">
                    Tack för ditt meddelande. Jag återkommer till din e-postadress {formData.email} så snart som möjligt.
                  </p>
                </div>

                <div className="bg-white/20 border border-white/40 p-5 rounded-2xl max-w-sm mx-auto text-left space-y-2.5 font-sans backdrop-blur-xs">
                  <span className="text-[10px] font-sans uppercase font-black text-[#fd80ff] tracking-wider block">VAD SOM HÄNDER NU:</span>
                  <ul className="text-xs text-[#230c1e]/90 space-y-2 px-4 list-disc font-light">
                    <li>Jag kikar på ditt meddelande personligen så fort jag kan.</li>
                    <li>Ett svar skickas direkt till din e-post.</li>
                    <li>Har du brådskande funderingar kan du också nå mig i mina sociala kanaler.</li>
                  </ul>
                </div>
              </>
            )}

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setFormType(selectedPackageId === "medlemsportal-app" ? "waitlist" : selectedPackageId ? "apply" : null);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    phase: [],
                    intention: [],
                    history: "",
                    selectedPackage: selectedPackageId || "stark-med-torun",
                    notes: ""
                  });
                }}
                className="bg-[#230c1e] hover:bg-[#3d1534] text-white text-[10px] font-sans font-extrabold uppercase tracking-widest px-6 py-3.5 rounded-full cursor-pointer transition-all"
              >
                Gör ett nytt val
              </button>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
