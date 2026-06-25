import React, { useState } from "react";
import { Mail, Check, ArrowRight, Instagram, MapPin, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import torunDock from "../../assets/torun_dock.jpg";

interface ContactFormProps {
  onNavigate: (tabId: string) => void;
}

export default function ContactForm({ onNavigate }: ContactFormProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 450);
  };

  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] min-h-[90vh] flex items-center justify-center relative overflow-hidden" id="contact-form-page">
      
      {/* Soft background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#fff5fc] rounded-full filter blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {submitted ? (
            /* SUCCESS VIEW */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel border border-white/65 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 text-center space-y-6 max-w-lg mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-500 shadow-sm animate-pulse-slow">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#230c1e]">
                Meddelande skickat!
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-light">
                Tack för att du hör av dig. Jag har tagit emot ditt meddelande och återkommer till dig så fort jag kan. ♡
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate("home")}
                  className="w-full bg-[#230c1e] hover:bg-[#3d1534] text-white text-[10px] font-sans font-semibold uppercase tracking-widest py-4 rounded-xl cursor-pointer transition-all active:scale-[0.98]"
                >
                  Tillbaka till startsidan
                </button>
              </div>
            </motion.div>
          ) : (
            /* FORM & PROFILE VIEW */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Focused Contact Form */}
              <div className="md:col-span-7 glass-panel border border-white/65 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#fd80ff] uppercase block">
                    HÖR AV DIG
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#230c1e] tracking-tight">
                    Skicka ett meddelande
                  </h1>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-light">
                    Skriv dina funderingar eller frågor nedan så återkommer jag till dig personligen så fort jag kan.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4 font-sans">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-stone-500 mb-1.5 font-bold">Ditt namn</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Skriv ditt förnamn och efternamn..."
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-stone-400/80 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-stone-500 mb-1.5 font-bold">E-postadress</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Skriv din e-postadress..."
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-stone-400/80 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-stone-500 mb-1.5 font-bold">Telefonnummer (valfritt)</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Skriv ditt telefonnummer..."
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-stone-400/80 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-stone-500 mb-1.5 font-bold">Ditt meddelande</label>
                      <textarea 
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Vad funderar du på? Skriv ditt meddelande här..."
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-stone-400/80 font-sans transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#fd80ff] hover:bg-[#eb5cf0] text-white text-[10px] uppercase tracking-widest font-black rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer hover:-translate-y-0.5 active:scale-98"
                    >
                      SKICKA MEDDELANDE <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Premium Contact Card & Profile Picture */}
              <div className="md:col-span-5 glass-panel border border-white/65 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                
                {/* Photo container */}
                <div className="aspect-[4/5] bg-stone-100 rounded-[1.8rem] overflow-hidden relative shadow-xs border border-stone-200/30">
                  <img 
                    src={torunDock} 
                    alt="Torun Wallin" 
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[1.02] contrast-[0.98]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#230c1e]/40 via-transparent to-transparent" />
                </div>

                {/* Profile Details */}
                <div className="space-y-4 font-sans flex-grow flex flex-col justify-center">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#230c1e] leading-tight">
                      Torun Wallin
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-[#fd80ff]">
                      Lic. Personlig Tränare & Specialist
                    </p>
                  </div>

                  {/* Contact Info Lines */}
                  <div className="space-y-3 pt-2 text-xs sm:text-[13px] text-[#230c1e]/85 font-light">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/50 border border-stone-200/40 flex items-center justify-center text-[#fd80ff] shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-stone-400 block leading-none mb-0.5">E-POST</span>
                        <a href="mailto:hej@torun.se" className="hover:text-[#fd80ff] transition-colors leading-normal font-sans">
                          hej@torun.se
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/50 border border-stone-200/40 flex items-center justify-center text-[#fd80ff] shrink-0">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-stone-400 block leading-none mb-0.5">INSTAGRAM</span>
                        <a 
                          href="https://instagram.com/torunwallin" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:text-[#fd80ff] transition-colors leading-normal font-sans"
                        >
                          @torunwallin
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/50 border border-stone-200/40 flex items-center justify-center text-[#fd80ff] shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-stone-400 block leading-none mb-0.5">SVARSTID</span>
                        <span className="leading-normal">Oftast inom 24 timmar</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/50 border border-stone-200/40 flex items-center justify-center text-[#fd80ff] shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-stone-400 block leading-none mb-0.5">PLATS</span>
                        <span className="leading-normal">Online & Stockholm, Sverige</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
