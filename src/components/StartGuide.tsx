import React, { useState } from "react";
import { Mail, Sparkles, Check, Download, BookOpen, Clock, Heart, Calendar, ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StartGuideProps {
  onNavigate: (tabId: string) => void;
}

export default function StartGuide({ onNavigate }: StartGuideProps) {
  const [submitted, setSubmitted] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", challenge: "stress" });
  const [activeDay, setActiveDay] = useState<number>(1);

  const guideDays = [
    {
      day: 1,
      title: "Dag 1: Lyssna på nervsystemet",
      focus: "Lugn & Trygghet",
      description: "När det sympatiska nervsystemet (fight or flight) är påslaget är det biologiskt svårt att läka och bygga styrka. Idag lutar du dig tillbaka, reglerar andetaget med medveten saktfärdighet och dämpar kortisoldepåerna.",
      exercise: "10 minuters andningsbox-övning innan sängdags för att sänka din kropps stressförsvar."
    },
    {
      day: 2,
      title: "Dag 2: Äta för ren energi",
      focus: "Nourishment",
      description: "Glöm förbud och svält. Idag fokuserar du på hur du tankar kvinnokroppen med hormonstöttande fetter och bra proteiner som motverkar blodsockerfall och sötsug.",
      exercise: "Lägg till en näringsrik fettkälla (t.ex. avokado, olivolja eller frön) i varje måltid idag."
    },
    {
      day: 3,
      title: "Dag 3: Ditt första hängivna lyftpass",
      focus: "Mjuk Styrka",
      description: "Styrketräning stöttar din bentäthet och dämpar ledvärk på ålderns höst. Det handlar inte om att bestraffa kroppen, utan om att känna tyngd, kraft och djup jordning.",
      exercise: "30 minuters kravlös rörlighet och tunga men säkra basövningar helt i din egen takt."
    },
    {
      day: 4,
      title: "Dag 4: Cykelparning",
      focus: "Cykelsynkronisering",
      description: "Idag kartlägger du din position i menscykeln och anpassar vikterna och energin därefter så att du jobbar med din biologi – inte mot den.",
      exercise: "Skriv ner var i cykeln du tror att du befinner dig och reflektera över dagsformen."
    },
    {
      day: 5,
      title: "Dag 5: Vila som bärande block",
      focus: "Återhämtning",
      description: "Att bygga muskler och reglera hormoner sker när du sover och vilar, inte under träningen. Idag eliminerar du alla krav på rörelse.",
      exercise: "20 minuter guidad yoga-nidra eller vila helt ostört i ett svalt mörkt rum."
    },
    {
      day: 6,
      title: "Dag 6: Möt förändringen med värme",
      focus: "Självkänsla & Mindset",
      description: "PMS eller klimakteriebesvär kan göra själen sårbar. Du lär dig möta kroppens tillstånd med nyfikenhet istället för dömande piskor.",
      exercise: "Ställ dig framför spegeln och säg högt: 'Du behöver inte förtjäna din egen kropp' ♡"
    },
    {
      day: 7,
      title: "Dag 7: Skapa din heliga, varma vana",
      focus: "Hållbar Framtid",
      description: "Nu sammanfattar du veckan och väljer en hållbar riktning framåt. Inte baserat på kortsiktiga resultat eller kaloristress, utan på din inre bärande ork.",
      exercise: "Formulera en personlig avsikt till din kropp om en långsiktig och sund framtid."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lead.name.trim() && lead.email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="animated-aurora-bg min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative" id="start-guide-root">
      
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

        {!submitted ? (
          /* Landing Form card */
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#faf7f8] rounded-[2.5rem] border border-white/60 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12" id="lander-card">
            
            {/* Intro Visual Left */}
            <div className="md:col-span-5 bg-[#241f21] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[480px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fd80ff]/8 rounded-full filter blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fd80ff]/4 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-[0.14em] text-[#fd80ff] bg-[#341d2e] px-3.5 py-1.5 rounded-full inline-block border border-white/5">
                    GRATIS RESURS V1.0
                  </span>
                </div>
                
                <h2 className="font-sans text-3xl font-semibold tracking-tight leading-tight text-white">
                  7 dagar till biologisk insikt
                </h2>
                
                <p className="text-xs text-stone-300/85 leading-relaxed font-sans font-light">
                  En genuint stöttande, vetenskaplig startguide för dig som vill sluta bråka med heroisk kaloristress och istället synkronisera din rörelseglädje med kroppens hormoner och livskraft.
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/10 my-6 relative z-10"></div>

              <div className="space-y-4 font-sans text-[10px] uppercase tracking-[0.16em] text-stone-200 relative z-10">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#fd80ff] stroke-[2.5] flex-shrink-0" />
                  <span>Introduktion till cykelträning</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#fd80ff] stroke-[2.5] flex-shrink-0" />
                  <span>Nervsystemsreglering (Stresshjälp)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#fd80ff] stroke-[2.5] flex-shrink-0" />
                  <span>Hormonstöttande livsmedel</span>
                </div>
              </div>
            </div>

            {/* Form Right */}
            <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6 bg-white/60 backdrop-blur-md">
              <div>
                <h3 className="font-serif text-2xl font-normal text-[#230c1e] tracking-wide leading-tight">Hämta guiden kostnadsfritt</h3>
                <p className="text-xs text-[#230c1e]/75 mt-1 font-sans font-light">Fyll i dina uppgifter så skickar jag e-boken direkt till din inkorg.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-sans uppercase tracking-[0.16em] font-black text-[#230c1e]/50 mb-1.5">Ditt förnamn</label>
                  <input 
                    type="text" 
                    required
                    value={lead.name}
                    onChange={(e) => setLead({...lead, name: e.target.value})}
                    placeholder="T.ex. Hanna..."
                    className="w-full bg-[#fbf9fa] border border-[#ecdfe5] focus:bg-white focus:border-[#fd80ff]/70 focus:ring-4 focus:ring-[#fd80ff]/8 rounded-2xl px-5 py-3.5 text-xs text-[#230c1e] placeholder-[#230c1e]/35 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-sans uppercase tracking-[0.16em] font-black text-[#230c1e]/50 mb-1.5">Din e-postadress</label>
                  <input 
                    type="email" 
                    required
                    value={lead.email}
                    onChange={(e) => setLead({...lead, email: e.target.value})}
                    placeholder="hanna.andersson@epost.se"
                    className="w-full bg-[#fbf9fa] border border-[#ecdfe5] focus:bg-white focus:border-[#fd80ff]/70 focus:ring-4 focus:ring-[#fd80ff]/8 rounded-2xl px-5 py-3.5 text-xs text-[#230c1e] placeholder-[#230c1e]/35 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-sans uppercase tracking-[0.16em] font-black text-[#230c1e]/50 mb-1.5">Vad känner du är din största utmaning?</label>
                  <div className="relative">
                    <select 
                      value={lead.challenge}
                      onChange={(e) => setLead({...lead, challenge: e.target.value})}
                      className="w-full bg-[#fbf9fa] border border-[#ecdfe5] focus:bg-white focus:border-[#fd80ff]/70 focus:ring-4 focus:ring-[#fd80ff]/8 rounded-2xl px-5 py-3.5 pr-12 text-xs text-[#230c1e] appearance-none cursor-pointer transition-all outline-none"
                    >
                      <option value="stress">Hög stress, utmattad, svårt att sova</option>
                      <option value="hormone">Hormonellt svängig (PMS / Klimakteriet)</option>
                      <option value="relationship">Svårt att behålla god träningsvana utan hets</option>
                      <option value="strength">Vill börja lyfta men rädd för skador eller dömande miljöer</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#230c1e]/40">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button 
                    type="submit"
                    className="w-full bg-[#230c1e] hover:bg-[#34182d] text-white font-sans text-[10px] tracking-[0.18em] font-black uppercase py-4.5 rounded-2xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2.5 group"
                  >
                    <Mail className="w-4.5 h-4.5 text-[#fd80ff] group-hover:scale-105 transition-transform" />
                    SKICKA MIN 7-DAGARS GUIDE NU
                  </button>
                </div>
              </form>

              <p className="text-[9px] text-center text-stone-500 leading-relaxed font-sans font-light">
                Jag värnar om din integritet. Du får enbart genuina, lärorika brev fyllda av biologisk kunskap och träningspepp. Du kan självklart avsluta när som helst.
              </p>
            </div>
          </div>
        </div>
        ) : (
          /* Unlocked Interactive PDF Simulated Booklet */
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500" id="unlocked-guide-view">
            
            {/* Header / Tack-Kort banner */}
            <div className="glass-panel border border-white/60 rounded-[2.5rem] p-8 sm:p-12 text-center space-y-4 shadow-xl">
              <span className="text-[10px] font-sans font-bold bg-[#230c1e] text-white px-4 py-1.5 rounded-full uppercase tracking-widest inline-block">
                UPPLÅST & SKICKAD ✓
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-normal tracking-tight text-[#230c1e]">
                Stort tack, finaste {lead.name}! ♡
              </h2>
              <p className="text-[#230c1e]/75 text-xs sm:text-sm max-w-xl mx-auto font-sans font-light">
                E-boken har skickats till din adress. Du kan börja ta del av guiden direkt här i det digitala läshäftet nedan under tiden.
              </p>
            </div>

            {/* Interactive Day Viewer UI */}
            <div className="glass-panel border border-white/60 rounded-[2.5rem] p-6 sm:p-10 shadow-xl space-y-8">
              
              <div className="flex justify-between items-center border-b border-white/40 pb-5">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#fd80ff]" />
                  <span className="font-sans uppercase font-bold text-xs tracking-wider text-[#230c1e]">INTERAKTIV LÄSARE:</span>
                </div>
                <div className="text-xs text-[#230c1e]/70 font-sans font-bold">
                  STEG {activeDay} AV 7
                </div>
              </div>

              {/* Day details */}
              <div className="min-h-[160px]">
                {guideDays.map((step) => {
                  if (step.day !== activeDay) return null;
                  return (
                    <div key={step.day} className="space-y-5 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-sans font-bold bg-[#fff5fc] text-[#fd80ff] border border-[#f5c7fa]/50 px-3 py-1 rounded-full uppercase tracking-wider">
                          FOKUSOMRÅDE: {step.focus}
                        </span>
                        <span className="text-[10px] font-sans text-[#230c1e]/60 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#230c1e]/30" /> 3 MIN LÄSTID
                        </span>
                      </div>

                      <h3 className="font-display text-lg sm:text-2xl font-light text-[#230c1e] tracking-tight">{step.title}</h3>
                      
                      <p className="text-xs sm:text-sm text-[#230c1e]/85 leading-relaxed font-sans font-light">
                        {step.description}
                      </p>

                      <div className="bg-white/40 border-l-4 border-[#fd80ff] p-5 rounded-r-2xl space-y-1.5">
                        <span className="text-[9px] font-sans font-black text-[#fd80ff] uppercase tracking-widest block">DAGENS SMÅ SJÄLVHANDLING:</span>
                        <p className="text-xs text-[#230c1e] leading-relaxed italic font-serif">
                          {step.exercise}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Day selection pagination dots */}
              <div className="pt-6 border-t border-white/40 flex justify-between items-center flex-wrap gap-4 font-sans">
                <button
                  disabled={activeDay === 1}
                  onClick={() => setActiveDay(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 bg-white/45 border border-white/55 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[#230c1e] hover:border-[#fd80ff]/50 hover:bg-white/80 disabled:opacity-30 select-none flex items-center gap-1 cursor-pointer transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#fd80ff]" /> FÖREGÅENDE
                </button>

                <div className="flex gap-1 bg-white/20 p-1 rounded-full border border-white/40 backdrop-blur-xs">
                  {guideDays.map((item) => (
                    <button
                      key={item.day}
                      onClick={() => setActiveDay(item.day)}
                      className={`w-7.5 h-7.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        activeDay === item.day
                          ? "bg-[#230c1e] text-white"
                          : "text-[#230c1e]/70 hover:bg-white/40 hover:text-[#230c1e]"
                      }`}
                    >
                      {item.day}
                    </button>
                  ))}
                </div>

                <button
                  disabled={activeDay === 7}
                  onClick={() => setActiveDay(prev => Math.min(7, prev + 1))}
                  className="px-4 py-2 bg-white/45 border border-white/55 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[#230c1e] hover:border-[#fd80ff]/50 hover:bg-white/80 disabled:opacity-30 select-none flex items-center gap-1 cursor-pointer transition-all"
                >
                  NÄSTA STEG <ArrowRight className="w-3.5 h-3.5 text-[#fd80ff]" />
                </button>
              </div>

            </div>

            {/* Conversion CTA to Personal Coaching */}
            <div className="glass-panel border border-white/60 rounded-[2.5rem] p-8 sm:p-10 text-center space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#fd80ff]/5 rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#230c1e]/5 rounded-full filter blur-3xl pointer-events-none" />

              <div className="max-w-2xl mx-auto space-y-4 relative z-10 font-sans">
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#fd80ff] bg-[#fff5fc] border border-[#fd80ff]/20 px-3.5 py-1.5 rounded-full inline-block">
                  TA NÄSTA STEG HÄR ♡
                </span>
                <h3 className="font-display text-xl sm:text-3xl font-normal tracking-tight text-[#230c1e]">
                  Redo att gå hela vägen, {lead.name}?
                </h3>
                <p className="text-xs text-[#230c1e]/75 leading-relaxed font-sans font-light">
                  Att läsa startguiden är ett fantastiskt första steg. Men din unika fysiologi – din stressnivå, din menscykel och ditt livspussel – förtjänar ett anpassat stöd hela vägen. Genom personlig coachning får du veckovis uppföljning, cykelsynkade träningsprogram och anpassad näring direkt i mobilen.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => onNavigate("apply")}
                    className="bg-[#230c1e] hover:bg-[#3d1534] text-white font-sans text-[10px] tracking-widest font-extrabold uppercase py-4 px-8 rounded-full shadow-lg hover:shadow-[#fd80ff]/15 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    Ansök om personlig coachning nu
                    <ArrowRight className="w-3.5 h-3.5 text-[#fd80ff]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Download Action Bottom Box */}
            <div className="bg-[#1C1714]/90 rounded-[2.5rem] p-8 text-white flex flex-col sm:flex-row justify-between items-center gap-6 border border-white/10 shadow-2xl backdrop-blur-md">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-display text-base font-normal uppercase text-white leading-none">Vill du ladda ner hela häftet?</h4>
                <p className="text-xs text-stone-300 font-sans font-light">
                  Klicka på knappen nedan för att spara den kompletta 45-sidiga digitala utgåvan på din lokala enhet.
                </p>
              </div>
              <a 
                href="/stark-och-trygg-startguide.pdf"
                download="STARK_TRYGG_startguide.pdf"
                className="bg-white hover:bg-[#fff5fc] text-[#230c1e] border border-white/10 hover:text-[#fd80ff] text-[10px] font-sans font-extrabold uppercase tracking-widest py-3.5 px-6 rounded-full flex items-center gap-2 shadow-lg transition-all flex-shrink-0 cursor-pointer no-underline"
              >
                <Download className="w-4 h-4 text-[#fd80ff]" /> Spara PDF-versionen
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
