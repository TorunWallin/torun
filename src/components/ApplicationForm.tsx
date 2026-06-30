import React, { useState, useEffect } from "react";
import { ClipboardCheck, Check, Heart, User, Sparkles, Activity, FileText, ArrowRight, ArrowLeft } from "lucide-react";
import { getPackages } from "../data";
import { motion, AnimatePresence } from "motion/react";
import torunDock from "../../assets/torun_dock.jpg";

interface ApplicationFormProps {
  selectedPackageId: string;
  onNavigate: (tabId: string) => void;
  language: "sv" | "en";
}

export default function ApplicationForm({ selectedPackageId, onNavigate, language }: ApplicationFormProps) {
  const packages = getPackages(language);

  const [formType, setFormType] = useState<"apply" | "contact" | "waitlist" | null>(
    selectedPackageId === "medlemsportal-app" ? "waitlist" : selectedPackageId ? "apply" : null
  );
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
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

  const t = {
    sv: {
      backBtn: "Gå tillbaka till startsidan",
      tagChoice: "KONTAKTA TORUN",
      titleChoice: "Hur kan jag hjälpa dig?",
      introChoice: "Välj det alternativ som passar dig bäst. Vi bokar alltid ett personligt samtal innan vi startar ett coachingprogram.",
      choice1Title: "Coachingansökan",
      choice1Desc: "Ansök till Stark med Torun, Kickstart eller 1:1 djupcoaching. Vi synkar träningen efter din unika biologi.",
      choice2Title: "Medlemsportal & App",
      choice2Desc: "Säkra ditt early-bird-pris (19 kr/mån) och bevaka lanseringen.",
      choice3Title: "Skicka meddelande",
      choice3Desc: "För allmänna frågor om mina recept, metodik, samarbeten eller om du bara vill ställa en allmän fråga.",
      showcaseTag: "DIN COACH PÅ VÄGEN ♡",
      
      backLink: "Tillbaka",
      tagWaitlist: "MEDLEMSPORTAL & APP · INTRESSEANMÄLAN",
      titleWaitlist: "Säkra ditt lanseringspris 💎",
      introWaitlist: "Säkra ditt lanseringspris på 19 kr/mån (utan bindningstid, ord. pris 39 kr/mån) och få info så fort vi lanserar portalen och appen.",
      labelName: "Ditt förnamn",
      placeholderName: "Ditt förnamn...",
      labelEmail: "Din e-postadress",
      placeholderEmail: "Din e-postadress...",
      labelPhone: "Ditt telefonnummer (valfritt)",
      placeholderPhone: "070-123 45 67 (om du vill ha sms-avisering)",
      waitlistSubmit: "BEVAKA LANSERING",
      
      tagContact: "ALLMÄNT KONTAKTFORMULÄR",
      titleContact: "Skicka ett meddelande",
      introContact: "Fyll i fälten nedan så återkommer jag till dig personligen så fort jag har möjlighet.",
      labelPhoneRequired: "Ditt telefonnummer",
      placeholderPhoneRequired: "070-123 45 67",
      labelMessage: "Ditt meddelande",
      placeholderMessage: "Skriv dina funderingar här...",
      contactSubmit: "SKICKA MEDDELANDE",
      sending: "SKICKAR...",
      networkError: "Ett nätverksfel uppstod. Kontrollera din anslutning och försök igen.",
      submitError: "Det gick inte att skicka in din förfrågan just nu. Försök igen.",
      
      tagApply: "ANSTÄNDIG ANSÖKAN TILL COACHING",
      titleApply: "Ett första fritt steg",
      introApply: "Här finns inga krav på prestation, före- och efterbilder eller kaloripiskor. Berätta om din vardag så möter jag dig där du är.",
      step1: "Kontakt",
      step2: "Livsfas",
      step3: "Intention",
      step4: "Kropp",
      step5: "Paket",
      step1Title: "Vem är du?",
      step2Title: "Vilken livsfas befinner du dig i?",
      step2Desc: "Jag anpassar träningen och din kost helhjärtat efter dina hormonnivåer, livsmässiga pusselbitar och din sömncykel. Välj gärna flera alternativ.",
      step3Title: "Vad vill du bjuda in i livet?",
      step3Desc: "Vad är din innerliga strävan bakom ansökan? Välj gärna flera alternativ.",
      step4Title: "Erfarenheter och bakgrund",
      step4Desc: "Berätta kortfattat om du har brottats med bantningsångest, matstress eller dömande träningsmiljöer förut, så att jag vet hur jag bäst stöttar dig.",
      step4Label: "Din personliga berättelse (Komplett sekretess)",
      step4Placeholder: "T.ex. 'Jag vill känna mig trygg med tunga lyft och sluta hetsa kring maten'...",
      step5Title: "Önskat medlemskapsprogram",
      step5Desc: "Inget av alternativen är bindande just nu — jag bjuder in till ett kort personligt samtal först så att vi stämmer av.",
      step5NotesLabel: "Övriga funderingar eller frågor?",
      step5NotesPlaceholder: "Något mer du vill berätta?",
      
      prevBtn: "Bakåt",
      nextBtn: "Nästa del",
      submitBtn: "SKICKA ANSÖKAN",
      
      successTagApply: "RESURSCHEF BEKRÄFTAR",
      successTitleApply: "Mottagen i hjärtat, ",
      successDescApply: "Tack för ditt förtroende. Jag går personligen igenom dina ord under kvällen utan brådska eller opersonliga auto-scripts.",
      directPaymentLabel: "💳 Direktbetalning lanseras snart",
      directPaymentDesc: "Ingen betalning sker i detta steg. Vi stämmer av ditt upplägg och betalningsdetaljer först under vårt personliga samtal.",
      nextPhaseLabel: "NÄSTA MJUKA FASE:",
      applyPhase1: "Jag läser dina livsfaser, stressnivåer och erfarenheter personligen.",
      applyPhase2: "Du får ett genuint svar från mig inom 24 timmar.",
      applyPhase3: "Därefter pratar vi i ett kort videosamtal för att känna efter om det matchar.",
      applyPhase4: "Om allt känns helt underbart sätter vi igång i Everfit-appen i din egen takt!",
      
      successTagWaitlist: "SÄKRAD EARLY-BIRD 💎",
      successTitleWaitlist: "Du står nu på väntelistan, ",
      successDescWaitlist: "Tack för din intresseanmälan! Rabatten på 19 kr/mån (ord. pris 39 kr/mån) är säkrad och du får reda på direkt när appen lanseras.",
      nextWaitlistLabel: "VAD HÄNDER HÄRNÄST:",
      waitlistPhase1: "Jag skickar en bekräftelse till dig personligen.",
      waitlistPhase2: "När medlemsportalen öppnar får du en personlig inbjudan med inloggningslänk.",
      waitlistPhase3: "Ingen betalning eller bindning sker förrän du själv väljer att starta ditt konto.",
      
      successTagContact: "MEDDELANDE SKICKAT",
      successTitleContact: "Mottaget i hjärtat, ",
      successDescContact: "Tack för ditt meddelande. Jag återkommer till dig så snart som möjligt.",
      nextContactLabel: "VAD SOM HÄNDER NU:",
      contactPhase1: "Jag kikar på ditt meddelande personligen så fort jag kan.",
      contactPhase2: "Ett svar skickas direkt till din e-post.",
      contactPhase3: "Har du brådskande funderingar kan du också nå mig i mina sociala kanaler.",
      
      newChoiceBtn: "Gör ett nytt val"
    },
    en: {
      backBtn: "Return to home page",
      tagChoice: "CONTACT TORUN",
      titleChoice: "How can I help you?",
      introChoice: "Choose the option that suits you best. We always book a personal call before starting any coaching program.",
      choice1Title: "Coaching Application",
      choice1Desc: "Apply for Strong with Torun, Kickstart, or 1:1 deep coaching. We sync training with your unique biology.",
      choice2Title: "Member Portal & App",
      choice2Desc: "Secure your early-bird price (19 SEK/month) and monitor the launch.",
      choice3Title: "Send a message",
      choice3Desc: "For general questions about my recipes, methodology, partnerships, or if you just want to ask a general question.",
      showcaseTag: "YOUR COACH ALONG THE WAY ♡",
      
      backLink: "Back",
      tagWaitlist: "MEMBER PORTAL & APP · INTEREST INQUIRY",
      titleWaitlist: "Secure your launch price 💎",
      introWaitlist: "Secure your launch price of 19 SEK/month (no commitment, regular price 39 SEK/month) and get notified as soon as we launch the portal and app.",
      labelName: "Your first name",
      placeholderName: "Your first name...",
      labelEmail: "Your email address",
      placeholderEmail: "Your email address...",
      labelPhone: "Your phone number (optional)",
      placeholderPhone: "070-123 45 67 (if you want SMS updates)",
      waitlistSubmit: "MONITOR LAUNCH",
      
      tagContact: "GENERAL CONTACT FORM",
      titleContact: "Send a message",
      introContact: "Fill in the fields below and I will get back to you personally as soon as I can.",
      labelPhoneRequired: "Your phone number",
      placeholderPhoneRequired: "070-123 45 67",
      labelMessage: "Your message",
      placeholderMessage: "Write your thoughts here...",
      contactSubmit: "SEND MESSAGE",
      sending: "SENDING...",
      networkError: "A network error occurred. Please check your connection and try again.",
      submitError: "Could not submit your request right now. Please try again.",
      
      tagApply: "GENUINE APPLICATION FOR COACHING",
      titleApply: "A first free step",
      introApply: "Here there are no demands on performance, before and after pictures, or calorie whips. Tell me about your everyday life and I will meet you where you are.",
      step1: "Contact",
      step2: "Life phase",
      step3: "Intention",
      step4: "Body",
      step5: "Package",
      step1Title: "Who are you?",
      step2Title: "Which life phase are you in?",
      step2Desc: "I adapt the training and your diet wholeheartedly to your hormone levels, daily life puzzle, and sleep cycle. Select multiple if they apply.",
      step3Title: "What do you want to invite into your life?",
      step3Desc: "What is your sincere aspiration behind this application? Select multiple if they apply.",
      step4Title: "Experiences and background",
      step4Desc: "Tell me briefly if you have struggled with dieting anxiety, food stress, or judgmental training environments before, so that I know how to best support you.",
      step4Label: "Your personal story (Complete confidentiality)",
      step4Placeholder: "E.g. 'I want to feel safe with heavy lifts and stop stressing about food'...",
      step5Title: "Desired membership program",
      step5Desc: "None of the options are binding right now — I will invite you to a short personal call first to sync.",
      step5NotesLabel: "Other thoughts or questions?",
      step5NotesPlaceholder: "Anything else you would like to share?",
      
      prevBtn: "Back",
      nextBtn: "Next part",
      submitBtn: "SUBMIT APPLICATION",
      
      successTagApply: "COACH CONFIRMS",
      successTitleApply: "Received in my heart, ",
      successDescApply: "Thank you for your trust. I personally go through your words during the evening without rush or impersonal auto-scripts.",
      directPaymentLabel: "Direct payment launching soon",
      directPaymentDesc: "No payment occurs at this step. We sync your setup and payment details first during our personal conversation.",
      nextPhaseLabel: "NEXT GENTLE PHASE:",
      applyPhase1: "I read your life phases, stress levels, and experiences personally.",
      applyPhase2: "You get a genuine response from me within 24 hours.",
      applyPhase3: "After that we talk in a short video call to feel if it matches.",
      applyPhase4: "If everything feels absolutely wonderful, we get started in the Everfit app at your own pace!",
      
      successTagWaitlist: "SECURED EARLY-BIRD 💎",
      successTitleWaitlist: "You are now on the waitlist, ",
      successDescWaitlist: "Thank you for your interest! The discount at 19 SEK/month (regular 39 SEK/month) is secured and you will know directly when the app launches.",
      nextWaitlistLabel: "WHAT HAPPENS NEXT:",
      waitlistPhase1: "I will send a confirmation to you personally.",
      waitlistPhase2: "When the member portal opens, you will get a personal invitation with a login link.",
      waitlistPhase3: "No payment or commitment occurs until you choose to start your account.",
      
      successTagContact: "MESSAGE SENT",
      successTitleContact: "Received in my heart, ",
      successDescContact: "Thank you for your message. I will get back to you as soon as possible.",
      nextContactLabel: "WHAT HAPPENS NOW:",
      contactPhase1: "I look at your message personally as soon as I can.",
      contactPhase2: "A response is sent directly to your email.",
      contactPhase3: "If you have urgent questions, you can also reach me in my social channels.",
      
      newChoiceBtn: "Make a new choice"
    }
  }[language];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage("");
    try {
      const payload: any = {
        type: formType === "apply" ? "coaching-apply" : formType === "waitlist" ? "waitlist" : "coaching-contact",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes
      };

      if (formType === "apply") {
        payload.phase = formData.phase;
        payload.intention = formData.intention;
        payload.history = formData.history;
        payload.selectedPackage = formData.selectedPackage;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || t.submitError);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t.networkError);
    } finally {
      setIsSending(false);
    }
  };

  const stepsInfo = [
    { num: 1, label: t.step1, icon: User },
    { num: 2, label: t.step2, icon: Activity },
    { num: 3, label: t.step3, icon: Sparkles },
    { num: 4, label: t.step4, icon: Heart },
    { num: 5, label: t.step5, icon: FileText },
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
            <ArrowLeft className="w-3.5 h-3.5 text-[#fd80ff] stroke-[2.5]" /> {t.backBtn}
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
                        {t.tagChoice}
                      </span>
                      <h1 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-[#230c1e]">
                        {t.titleChoice}
                      </h1>
                      <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed font-light">
                        {t.introChoice}
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
                            {t.choice1Title}
                          </h3>
                          <p className="text-[11px] text-[#230c1e]/70 leading-normal mt-0.5 font-light">
                            {t.choice1Desc}
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
                            {t.choice2Title}
                          </h3>
                          <p className="text-[11px] text-[#230c1e]/70 leading-normal mt-0.5 font-light">
                            {t.choice2Desc}
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
                            {t.choice3Title}
                          </h3>
                          <p className="text-[11px] text-[#230c1e]/70 leading-normal mt-0.5 font-light">
                            {t.choice3Desc}
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
                            {t.showcaseTag}
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
              <div className="glass-panel border border-white/65 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 space-y-8 animate-in-fade-slide text-left">
                
                {/* Header portion */}
                <div className="border-b border-white/40 pb-6 space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => setFormType(null)}
                    className="absolute right-0 top-0 text-[9px] font-sans font-bold uppercase tracking-wider text-[#230c1e]/60 hover:text-[#230c1e] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3 text-[#fd80ff]" /> {t.backLink}
                  </button>
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#fd80ff] uppercase block">
                    {t.tagWaitlist}
                  </span>
                  <h1 className="font-display text-xl sm:text-3xl font-normal tracking-tight text-[#230c1e]">
                    {t.titleWaitlist}
                  </h1>
                  <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed font-light">
                    {t.introWaitlist}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4 font-sans">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelName}</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder={t.placeholderName}
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelEmail}</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder={t.placeholderEmail}
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelPhone}</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder={t.placeholderPhone}
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="text-red-500 text-[11px] font-sans font-medium text-center bg-red-500/10 border border-red-500/25 px-4 py-2.5 rounded-xl my-4">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-6 border-t border-white/40 flex justify-end font-sans">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="px-8 py-3.5 bg-[#fd80ff] hover:bg-[#eb5cf0] disabled:opacity-50 text-white text-[10px] uppercase tracking-widest font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {isSending ? t.sending : t.waitlistSubmit} <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* GENERAL CONTACT FORM */}
            {formType === "contact" && (
              <div className="glass-panel border border-white/65 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 space-y-8 animate-in-fade-slide text-left">
                
                {/* Header portion */}
                <div className="border-b border-white/40 pb-6 space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => setFormType(null)}
                    className="absolute right-0 top-0 text-[9px] font-sans font-bold uppercase tracking-wider text-[#230c1e]/60 hover:text-[#230c1e] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3 text-[#fd80ff]" /> {t.backLink}
                  </button>
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#fd80ff] uppercase block">
                    {t.tagContact}
                  </span>
                  <h1 className="font-display text-xl sm:text-3xl font-normal tracking-tight text-[#230c1e]">
                    {t.titleContact}
                  </h1>
                  <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed font-light">
                    {t.introContact}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4 font-sans">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelName}</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder={t.placeholderName}
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelEmail}</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder={t.placeholderEmail}
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelPhoneRequired}</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder={t.placeholderPhoneRequired}
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelMessage}</label>
                      <textarea 
                        rows={5}
                        required
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder={t.placeholderMessage}
                        className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40 font-sans"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="text-red-500 text-[11px] font-sans font-medium text-center bg-red-500/10 border border-red-500/25 px-4 py-2.5 rounded-xl my-4">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-6 border-t border-white/40 flex justify-end font-sans">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="px-8 py-3.5 bg-[#230c1e] hover:bg-[#3d1534] disabled:opacity-50 text-white text-[10px] uppercase tracking-widest font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {isSending ? t.sending : t.contactSubmit} <ArrowRight className="w-4 h-4 text-[#fd80ff]" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {formType === "apply" && (
              <div className="glass-panel border border-white/65 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 space-y-8 animate-in-fade-slide text-left">
                {selectedPackageId && selectedPackageId !== "medlemsportal-app" ? (
                  <div className="space-y-6">
                    <div className="border-b border-white/40 pb-6 space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => onNavigate("programs")}
                        className="absolute right-0 top-0 text-[9px] font-sans font-bold uppercase tracking-wider text-[#230c1e]/60 hover:text-[#230c1e] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-3 h-3 text-[#fd80ff]" /> {t.backLink}
                      </button>
                      <span className="text-[10px] font-sans font-bold tracking-widest text-[#fd80ff] uppercase block">
                        COACHINGANSÖKAN
                      </span>
                      <h1 className="font-display text-xl sm:text-3xl font-normal tracking-tight text-[#230c1e]">
                        {packages.find(p => p.id === selectedPackageId)?.name} 🎀
                      </h1>
                      <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed font-light">
                        {selectedPackageId === "kickstart" 
                          ? "Fyll i dina uppgifter nedan för att påbörja Kickstart. Vi hörs på mejl/sms och sätter igång i Everfit!"
                          : selectedPackageId === "stark-med-torun"
                          ? "Fyll i uppgifterna nedan så kontaktar jag dig personligen för att boka ett fritt samtal där vi stämmer av din cykel-synk och dina mål."
                          : "Detta är mitt djupaste och mest exklusiva coachingprogram. Berätta kort om dig själv och vad du vill bjuda in i livet, så hörs vi för ett inledande samtal."
                        }
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4 font-sans">
                        <div>
                          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelName}</label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder={t.placeholderName}
                            className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelEmail}</label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder={t.placeholderEmail}
                            className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelPhoneRequired}</label>
                          <input 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder={t.placeholderPhoneRequired}
                            className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">
                            Berätta kort om din vardag, din träningsbakgrund eller dina funderingar
                          </label>
                          <textarea 
                            rows={5}
                            required
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            placeholder="Skriv dina funderingar här, t.ex. vad du önskar uppnå och vad som känns viktigt för dig just nu..."
                            className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40 font-sans"
                          />
                        </div>
                      </div>

                      {errorMessage && (
                        <div className="text-red-500 text-[11px] font-sans font-medium text-center bg-red-500/10 border border-red-500/25 px-4 py-2.5 rounded-xl my-4">
                          {errorMessage}
                        </div>
                      )}

                      <div className="pt-6 border-t border-white/40 flex justify-end font-sans">
                        <button
                          type="submit"
                          disabled={isSending}
                          className="px-8 py-3.5 bg-[#fd80ff] hover:bg-[#eb5cf0] disabled:opacity-50 text-white text-[10px] uppercase tracking-widest font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          {isSending ? t.sending : t.submitBtn} <ClipboardCheck className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <>
                    <div className="border-b border-white/40 pb-6 space-y-2 relative">
                      {!selectedPackageId && (
                        <button
                          type="button"
                          onClick={() => setFormType(null)}
                          className="absolute right-0 top-0 text-[9px] font-sans font-bold uppercase tracking-wider text-[#230c1e]/60 hover:text-[#230c1e] flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <ArrowLeft className="w-3 h-3 text-[#fd80ff]" /> {t.backLink}
                        </button>
                      )}
                      <span className="text-[10px] font-sans font-bold tracking-widest text-[#fd80ff] uppercase block">
                        {t.tagApply}
                      </span>
                      <h1 className="font-display text-xl sm:text-3xl font-normal tracking-tight text-[#230c1e]">
                        {t.titleApply}
                      </h1>
                      <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed font-light">
                        {t.introApply}
                      </p>
                    </div>

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

                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {step === 1 && (
                        <div className="space-y-4 animate-in-fade-slide">
                          <h3 className="font-display text-sm font-normal tracking-tight text-[#230c1e] flex items-center gap-2">
                            <User className="w-4 h-4 text-[#fd80ff]" /> {t.step1Title}
                          </h3>
                          
                          <div>
                            <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelName}</label>
                            <input 
                              type="text" 
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              placeholder={t.placeholderName}
                              className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelEmail}</label>
                            <input 
                              type="email" 
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder={t.placeholderEmail}
                              className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.labelPhoneRequired}</label>
                            <input 
                              type="tel" 
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder={t.placeholderPhoneRequired}
                              className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40"
                            />
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4 animate-in-fade-slide font-sans">
                          <h3 className="font-display text-sm font-normal tracking-tight text-[#230c1e] flex items-center gap-2">
                            <Activity className="w-4 h-4 text-[#fd80ff]" /> {t.step2Title}
                          </h3>
                          <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed">{t.step2Desc}</p>
                          
                          <div className="grid grid-cols-1 gap-2.5">
                            {(language === "sv" ? [
                              { value: "stress", tag: "Stressig Vardag / Hög Belastning", desc: "Varma, utmattade depåer. Träning ska vara helande snarare än påfrestande." },
                              { value: "klimakterie", tag: "Perimenopaus / Klimakteriet", desc: "Varma vallningar, ledvärk, sömnstörningar. Fokus ligger på att bygga bentäthet och stötta muskler." },
                              { value: "postpartum", tag: "Gravid eller Postpartum", desc: "Gravid eller nybliven mamma. Jag sätter skonsamhet och stabilisering i absolut framsäte." },
                              { value: "regular", tag: "Regelbunden cykelparning", desc: "Erhåll cykel-synkad träning efter menstruationens fyra skiftande faser." },
                              { value: "general", tag: "Allmän Styrka & Vardagsenergi", desc: "Jag söker ett stabilt och tryggt upplägg för en starkare vardagskropp (utan cykelfokus)." },
                              { value: "beginner", tag: "Nybörjare / Komma igång", desc: "Jag är helt ny på gymmet eller vill hitta tillbaka till träningen efter ett längre uppehåll." },
                              { value: "rehab", tag: "Skadeförebyggande / Rehab", desc: "Jag vill bygga upp kroppen med extra hänsyn till känningar eller tidigare skador (t.ex. rygg, axlar eller knän)." },
                            ] : [
                              { value: "stress", tag: "Stressful Everyday / High Load", desc: "Warm, exhausted energy stores. Training should be healing rather than draining." },
                              { value: "klimakterie", tag: "Perimenopause / Menopause", desc: "Hot flashes, joint pain, sleep disturbances. Focus is on building bone density and supporting muscles." },
                              { value: "postpartum", tag: "Pregnant or Postpartum", desc: "Pregnant or a new mother. I place gentleness and stabilization in absolute priority." },
                              { value: "regular", tag: "Regular Cycle Syncing", desc: "Receive cycle-synced training based on the four shifting phases of menstruation." },
                              { value: "general", tag: "General Strength & Daily Energy", desc: "I seek a stable and secure routine for a stronger everyday body (no cycle sync focus)." },
                              { value: "beginner", tag: "Beginner / Getting Started", desc: "I am completely new to the gym or want to find my way back to training after a long break." },
                              { value: "rehab", tag: "Injury Prevention / Rehab", desc: "I want to build my body with extra consideration for discomfort or previous injuries (e.g. back, shoulders, or knees)." },
                            ]).map((opt) => (
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
                                  className="sr-only"
                                  checked={formData.phase.includes(opt.value)}
                                  onChange={() => handleTogglePhase(opt.value)}
                                />
                                <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                  formData.phase.includes(opt.value) 
                                    ? "bg-[#fd80ff] border-[#fd80ff] text-white" 
                                    : "border-stone-300 bg-white"
                                }`}>
                                  {formData.phase.includes(opt.value) && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </span>
                                <div className="space-y-0.5">
                                  <span className="text-[11.5px] font-bold text-[#230c1e] uppercase tracking-wider block">{opt.tag}</span>
                                  <span className="text-[10px] text-[#230c1e]/65 block font-light leading-snug">{opt.desc}</span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-4 animate-in-fade-slide font-sans">
                          <h3 className="font-display text-sm font-normal tracking-tight text-[#230c1e] flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#fd80ff]" /> {t.step3Title}
                          </h3>
                          <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed">{t.step3Desc}</p>
                          
                          <div className="grid grid-cols-1 gap-2.5">
                            {(language === "sv" ? [
                              { value: "styrka", tag: "Bygga Fysisk Styrka", desc: "Att bli stark i baslyft (knäböj, marklyft, pressar) för en tålig kropp." },
                              { value: "energi", tag: "Mer Energi i Vardagen", desc: "Komma ur trötthetsspiralen, känna pigghet och ork för arbete, lek och familj." },
                              { value: "mindset", tag: "Sunt tränings- & matmindset", desc: "Att lämna förbud, dieter, kaloripiskor och tvångsmässiga träningsregler." },
                              { value: "rehab", tag: "Slippa smärta eller skador", desc: "Att få ordning på ryggont, stela axlar eller trötta höfter under trygg styrning." },
                              { value: "habits", tag: "Skapa vanor som håller", desc: "Sluta med allt-eller-inget-tänkandet. Bygga upp mjuka, hållbara rutiner." },
                            ] : [
                              { value: "styrka", tag: "Build Physical Strength", desc: "To get strong in compound lifts (squats, deadlifts, presses) for a resilient body." },
                              { value: "energi", tag: "More Daily Energy", desc: "Get out of the fatigue spiral, feel alert and energized for work, play, and family." },
                              { value: "mindset", tag: "Healthy Training & Food Mindset", desc: "To leave restrictions, diets, calorie whips, and obsessive training rules behind." },
                              { value: "rehab", tag: "Avoid Pain or Injuries", desc: "Get back pain, stiff shoulders, or tired hips in order under safe guidance." },
                              { value: "habits", tag: "Create Habits That Last", desc: "Stop the all-or-nothing mindset. Build gentle, sustainable routines." },
                            ]).map((opt) => (
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
                                  className="sr-only"
                                  checked={formData.intention.includes(opt.value)}
                                  onChange={() => handleToggleIntention(opt.value)}
                                />
                                <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                  formData.intention.includes(opt.value) 
                                    ? "bg-[#fd80ff] border-[#fd80ff] text-white" 
                                    : "border-stone-300 bg-white"
                                }`}>
                                  {formData.intention.includes(opt.value) && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </span>
                                <div className="space-y-0.5">
                                  <span className="text-[11.5px] font-bold text-[#230c1e] uppercase tracking-wider block">{opt.tag}</span>
                                  <span className="text-[10px] text-[#230c1e]/65 block font-light leading-snug">{opt.desc}</span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="space-y-4 animate-in-fade-slide">
                          <h3 className="font-display text-sm font-normal tracking-tight text-[#230c1e] flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#fd80ff]" /> {t.step4Title}
                          </h3>
                          <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed">{t.step4Desc}</p>
                          
                          <div>
                            <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.step4Label}</label>
                            <textarea 
                              rows={6}
                              value={formData.history}
                              onChange={(e) => setFormData({...formData, history: e.target.value})}
                              placeholder={t.step4Placeholder}
                              className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40 font-sans"
                            />
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div className="space-y-5 animate-in-fade-slide font-sans">
                          <h3 className="font-display text-sm font-normal tracking-tight text-[#230c1e] flex items-center gap-2">
                            <ClipboardCheck className="w-4 h-4 text-[#fd80ff]" /> {t.step5Title}
                          </h3>
                          <p className="text-xs text-[#230c1e]/75 font-sans leading-relaxed">{t.step5Desc}</p>
                          
                          <div className="grid grid-cols-1 gap-2.5">
                            {packages.filter(p => p.id !== "medlemsportal-app").map((pkg) => (
                              <label 
                                key={pkg.id}
                                className={`p-4 rounded-xl border cursor-pointer transition-all flex gap-3.5 items-center ${
                                  formData.selectedPackage === pkg.id 
                                    ? "bg-white/50 border-[#fd80ff]/42 shadow-sm" 
                                    : "bg-white/10 hover:bg-white/20 border-white/40"
                                }`}
                              >
                                <input 
                                  type="radio"
                                  name="selectedPackage"
                                  className="sr-only"
                                  checked={formData.selectedPackage === pkg.id}
                                  onChange={() => setFormData({...formData, selectedPackage: pkg.id})}
                                />
                                <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                                  formData.selectedPackage === pkg.id 
                                    ? "bg-[#fd80ff] border-[#fd80ff] text-white" 
                                    : "border-stone-300 bg-white"
                                }`}>
                                  {formData.selectedPackage === pkg.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                </span>
                                <div className="flex-1 flex justify-between items-center">
                                  <div className="text-left">
                                    <span className="text-[11.5px] font-bold text-[#230c1e] uppercase tracking-wider block">{pkg.name}</span>
                                    <span className="text-[10px] text-[#230c1e]/55 block font-light">{pkg.subtitle}</span>
                                  </div>
                                  <span className="text-xs font-bold text-[#fd80ff]">{pkg.price}</span>
                                </div>
                              </label>
                            ))}
                          </div>

                          <div className="pt-3">
                            <label className="block text-[10px] font-sans uppercase tracking-wider text-[#230c1e]/70 mb-1.5 font-bold">{t.step5NotesLabel}</label>
                            <textarea 
                              rows={3}
                              value={formData.notes}
                              onChange={(e) => setFormData({...formData, notes: e.target.value})}
                              placeholder={t.step5NotesPlaceholder}
                              className="w-full bg-white/40 border border-white/65 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#fd80ff]/40 focus:bg-white/60 text-[#230c1e] placeholder-[#230c1e]/40 font-sans"
                            />
                          </div>
                        </div>
                      )}

                      {errorMessage && (
                        <div className="text-red-500 text-[11px] font-sans font-medium text-center bg-red-500/10 border border-red-500/25 px-4 py-2.5 rounded-xl my-4">
                          {errorMessage}
                        </div>
                      )}

                      <div className="pt-6 border-t border-white/40 flex justify-between font-sans">
                        {step > 1 ? (
                          <button
                            type="button"
                            onClick={handleBack}
                            className="px-5 py-3 border border-white/55 bg-white/45 hover:bg-white/70 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[#230c1e] flex items-center gap-1 cursor-pointer transition-all"
                          >
                            <ArrowLeft className="w-3.5 h-3.5 text-[#fd80ff]" /> {t.prevBtn}
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
                            {t.nextBtn} <ArrowRight className="w-3.5 h-3.5 text-[#fd80ff]" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={isSending}
                            className="px-8 py-3.5 bg-[#fd80ff] hover:bg-[#eb5cf0] disabled:opacity-50 text-white text-[10px] uppercase tracking-widest font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            {isSending ? t.sending : t.submitBtn} <ClipboardCheck className="w-4 h-4 text-white" />
                          </button>
                        )}
                      </div>
                    </form>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          /* Submission success card */
          <div className="glass-panel border border-white/65 p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in-fade-slide rounded-[2.5rem] text-left" id="apply-success-card">
            <div className="w-16 h-16 rounded-full bg-white/45 border border-white/65 text-[#fd80ff] flex items-center justify-center mx-auto text-3xl font-light shadow-sm">
              ✓
            </div>

            {formType === "apply" ? (
              <>
                <div className="space-y-3 font-sans text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff]">{t.successTagApply}</span>
                  <h2 className="text-xl sm:text-3xl font-display font-light text-[#230c1e] leading-none tracking-tight">
                    {t.successTitleApply}{formData.name.split(" ")[0]}! ♡
                  </h2>
                  <p className="text-[#230c1e]/80 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-sans font-light animate-pulse-slow">
                    {t.successDescApply}
                  </p>
                </div>

                <div className="bg-amber-50/10 border border-amber-300/20 p-4 rounded-2xl max-w-sm mx-auto text-left space-y-1 font-sans backdrop-blur-xs mb-3">
                  <span className="text-[9px] font-sans uppercase font-black text-[#fd80ff] tracking-wider block">{t.directPaymentLabel}</span>
                  <p className="text-[10.5px] text-[#230c1e]/85 font-light leading-relaxed">
                    {t.directPaymentDesc}
                  </p>
                </div>

                <div className="bg-white/20 border border-white/40 p-5 rounded-2xl max-w-sm mx-auto text-left space-y-2.5 font-sans backdrop-blur-xs">
                  <span className="text-[10px] font-sans uppercase font-black text-[#fd80ff] tracking-wider block">{t.nextPhaseLabel}</span>
                  <ol className="text-xs text-[#230c1e]/90 space-y-2 px-4 list-decimal font-light">
                    <li>{t.applyPhase1}</li>
                    <li>{t.applyPhase2}</li>
                    <li>{t.applyPhase3}</li>
                    <li>{t.applyPhase4}</li>
                  </ol>
                </div>
              </>
            ) : formType === "waitlist" ? (
              <>
                <div className="space-y-3 font-sans text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff]">{t.successTagWaitlist}</span>
                  <h2 className="text-xl sm:text-3xl font-display font-light text-[#230c1e] leading-none tracking-tight">
                    {t.successTitleWaitlist}{formData.name.split(" ")[0]}! ♡
                  </h2>
                  <p className="text-[#230c1e]/80 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-sans font-light">
                    {t.successDescWaitlist}
                  </p>
                </div>

                <div className="bg-white/20 border border-white/40 p-5 rounded-2xl max-w-sm mx-auto text-left space-y-2.5 font-sans backdrop-blur-xs">
                  <span className="text-[10px] font-sans uppercase font-black text-[#fd80ff] tracking-wider block">{t.nextWaitlistLabel}</span>
                  <ul className="text-xs text-[#230c1e]/90 space-y-2 px-4 list-disc font-light">
                    <li>{t.waitlistPhase1}</li>
                    <li>{t.waitlistPhase2}</li>
                    <li>{t.waitlistPhase3}</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3 font-sans text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#fd80ff]">{t.successTagContact}</span>
                  <h2 className="text-xl sm:text-3xl font-display font-light text-[#230c1e] leading-none tracking-tight">
                    {t.successTitleContact}{formData.name.split(" ")[0]}! ♡
                  </h2>
                  <p className="text-[#230c1e]/80 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-sans font-light">
                    {t.successDescContact}
                  </p>
                </div>

                <div className="bg-white/20 border border-white/40 p-5 rounded-2xl max-w-sm mx-auto text-left space-y-2.5 font-sans backdrop-blur-xs">
                  <span className="text-[10px] font-sans uppercase font-black text-[#fd80ff] tracking-wider block">{t.nextContactLabel}</span>
                  <ul className="text-xs text-[#230c1e]/90 space-y-2 px-4 list-disc font-light">
                    <li>{t.contactPhase1}</li>
                    <li>{t.contactPhase2}</li>
                    <li>{t.contactPhase3}</li>
                  </ul>
                </div>
              </>
            )}

            <div className="pt-4 text-center">
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
                {t.newChoiceBtn}
              </button>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
