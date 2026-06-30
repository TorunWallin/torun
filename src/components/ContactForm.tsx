import React, { useState } from "react";
import { Mail, Check, ArrowRight, Instagram, MapPin, Clock, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import torunDock from "../../assets/torun_dock.jpg";

interface ContactFormProps {
  onNavigate: (tabId: string) => void;
  language: "sv" | "en";
}

export default function ContactForm({ onNavigate, language }: ContactFormProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    packageOfInterest: "general-inquiry",
    message: ""
  });

  const t = {
    sv: {
      successTitle: "Meddelande skickat!",
      successDesc: "Tack för att du hör av dig. Jag har tagit emot ditt meddelande och återkommer till dig så fort jag kan. ♡",
      backBtn: "Tillbaka till startsidan",
      tag: "KONTAKT",
      title: "Hör av dig till mig 🤍",
      intro: "Skriv dina frågor, tankar eller funderingar nedan. Berätta gärna om du är nyfiken på ett specifikt träningsprogram eller om du bara vill bolla vad som passar din kropp bäst just nu. Jag svarar dig personligen så snart jag kan!",
      labelName: "Ditt förnamn",
      placeholderName: "Ditt förnamn...",
      labelPhone: "Telefonnummer (valfritt)",
      placeholderPhone: "Ditt telefonnummer...",
      labelEmail: "Din e-postadress",
      placeholderEmail: "Din e-postadress...",
      labelInterest: "Vad är du intresserad av?",
      opt1: "Allmän fråga / Vill bara bolla",
      opt2: "Personlig Coaching (Stark med Torun)",
      opt3: "Hormon- & Mammaträning (Gravid/Postpartum)",
      opt4: "Medlemsportalen (Tränings-appen)",
      labelMessage: "Ditt meddelande",
      placeholderMessage: "Skriv dina tankar här...",
      submitBtn: "SKICKA MEDDELANDE",
      sending: "SKICKAR...",
      license: "Lic. Personlig Tränare & Kostrådgivare",
      emailLabel: "E-POST",
      instaLabel: "INSTAGRAM",
      responseTimeLabel: "SVARSTID",
      responseTimeVal: "Oftast inom 24 timmar",
      locationLabel: "PLATS",
      locationVal: "Online & Stockholm, Sverige",
      errorNetwork: "Ett nätverksfel uppstod. Kontrollera din anslutning och försök igen.",
      errorGeneric: "Det gick inte att skicka meddelandet just nu. Försök igen."
    },
    en: {
      successTitle: "Message sent!",
      successDesc: "Thank you for reaching out. I have received your message and will get back to you as soon as possible. ♡",
      backBtn: "Back to home page",
      tag: "CONTACT",
      title: "Get in touch 🤍",
      intro: "Write your questions, thoughts, or reflections below. Let me know if you are curious about a specific training program or just want to discuss what suits your body best right now. I will respond to you personally as soon as I can!",
      labelName: "Your first name",
      placeholderName: "Your first name...",
      labelPhone: "Phone number (optional)",
      placeholderPhone: "Your phone number...",
      labelEmail: "Your email address",
      placeholderEmail: "Your email address...",
      labelInterest: "What are you interested in?",
      opt1: "General inquiry / Just want to talk",
      opt2: "Personal Coaching (Strong with Torun)",
      opt3: "Hormone & Motherhood Training (Pregnancy/Postpartum)",
      opt4: "Member Portal (Training App)",
      labelMessage: "Your message",
      placeholderMessage: "Write your thoughts here...",
      submitBtn: "SEND MESSAGE",
      sending: "SENDING...",
      license: "Lic. Personal Trainer & Nutrition Advisor",
      emailLabel: "EMAIL",
      instaLabel: "INSTAGRAM",
      responseTimeLabel: "RESPONSE TIME",
      responseTimeVal: "Usually within 24 hours",
      locationLabel: "LOCATION",
      locationVal: "Online & Stockholm, Sweden",
      errorNetwork: "A network error occurred. Please check your connection and try again.",
      errorGeneric: "Could not send message right now. Please try again."
    }
  }[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "contact-page",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          packageOfInterest: formData.packageOfInterest,
          message: formData.message
        })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || t.errorGeneric);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t.errorNetwork);
    } finally {
      setIsSending(false);
    }
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
                {t.successTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-light">
                {t.successDesc}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate("home")}
                  className="w-full bg-[#230c1e] hover:bg-[#3d1534] text-white text-[10px] font-sans font-semibold uppercase tracking-widest py-4 rounded-xl cursor-pointer transition-all active:scale-[0.98]"
                >
                  {t.backBtn}
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
                    {t.tag}
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#230c1e] tracking-tight">
                    {t.title}
                  </h1>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-light">
                    {t.intro}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4 font-sans">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-wider text-stone-500 mb-1.5 font-bold">{t.labelName}</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder={t.placeholderName}
                          className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-stone-400/80 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-wider text-stone-500 mb-1.5 font-bold">{t.labelPhone}</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder={t.placeholderPhone}
                          className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-stone-400/80 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-stone-500 mb-1.5 font-bold">{t.labelEmail}</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder={t.placeholderEmail}
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-stone-400/80 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-stone-500 mb-1.5 font-bold">{t.labelInterest}</label>
                      <div className="relative">
                        <select 
                          value={formData.packageOfInterest}
                          onChange={(e) => setFormData({...formData, packageOfInterest: e.target.value})}
                          className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] appearance-none cursor-pointer transition-all outline-none font-sans"
                        >
                          <option value="general-inquiry">{t.opt1}</option>
                          <option value="stark-med-torun">{t.opt2}</option>
                          <option value="mammatraning">{t.opt3}</option>
                          <option value="medlemsportal-app">{t.opt4}</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#230c1e]/40">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-stone-500 mb-1.5 font-bold">{t.labelMessage}</label>
                      <textarea 
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder={t.placeholderMessage}
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-stone-400/80 font-sans transition-all"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="text-red-500 text-[11px] font-sans font-medium text-center bg-red-500/10 border border-red-500/25 px-4 py-2.5 rounded-xl">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-4 bg-[#fd80ff] hover:bg-[#eb5cf0] disabled:opacity-50 text-white text-[10px] uppercase tracking-widest font-black rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer hover:-translate-y-0.5 active:scale-98"
                    >
                      {isSending ? t.sending : t.submitBtn} <ArrowRight className="w-4 h-4 text-white" />
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
                <div className="space-y-4 font-sans flex-grow flex flex-col justify-center text-left">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#230c1e] leading-tight">
                      Torun Wallin
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-[#fd80ff]">
                      {t.license}
                    </p>
                  </div>

                  {/* Contact Info Lines */}
                  <div className="space-y-3 pt-2 text-xs sm:text-[13px] text-[#230c1e]/85 font-light">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/50 border border-stone-200/40 flex items-center justify-center text-[#fd80ff] shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-stone-400 block leading-none mb-0.5">{t.emailLabel}</span>
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
                        <span className="text-[9px] font-bold text-stone-400 block leading-none mb-0.5">{t.instaLabel}</span>
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
                        <span className="text-[9px] font-bold text-stone-400 block leading-none mb-0.5">{t.responseTimeLabel}</span>
                        <span className="leading-normal">{t.responseTimeVal}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/50 border border-stone-200/40 flex items-center justify-center text-[#fd80ff] shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-stone-400 block leading-none mb-0.5">{t.locationLabel}</span>
                        <span className="leading-normal">{t.locationVal}</span>
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
