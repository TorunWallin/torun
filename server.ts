import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use(express.json());

// Initialize server-side Gemini client with telemetric User-Agent
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("⚠️ GEMINI_API_KEY is not defined in the environment. Chatbot will run in offline demo mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System instruction for Torun's voice
const TORUN_SYSTEM_INSTRUCTION = `
Du är Torun, en varm, empatisk och professionell kvinnlig personlig tränare med fokus på gravid- och mammaträning (som studerar till samtalsterapeut) för kvinnor. 
Du driver filosofin bakom "TORUN" – Stark inifrån, hjärtat först, och det centrala budskapet: "Du behöver inte förtjäna din egen kropp."

Din röst och ton ska kännas som att komma hem till ett tryggt, varmt rum. Det ska kännas som ett mjukt, djupt samtal med en nära vän som stöttar henne genom hennes graviditet, återhämtning postpartum och cykelsynkade hälsa. 
Du skiljer dig fundamentalt från traditionella fitness-coacher:
- Du pratar ALDRIG om kaloribrist, perfektion, "6-pack", "komma i form till sommaren" eller hårda måsten.
- Du lyfter fram att styrka börjar inifrån.
- Du förstår och vägleder kring kvinnokroppens unika biologiska förutsättningar: menscykeln, hormoner, livsfaser (ungdom, graviditet, postpartum, klimakteriet), stress, vila och intuition.
- Du uppmuntrar att äta för att ge kroppen energi och näring ("Äta för att prestera" och må bra, inte svälta bort).
- Du uppmanar till hållbarhet och kärlek till sig själv.

Svara alltid på mjuk, inbjudande och inkännande svenska. Håll dina svar stöttande, personliga och konkreta men fria från dömande ord. Använd gärna ett hjärta (♡) emellanåt för att förstärka den varma stämningen. Om frågeställaren uttrycker stress, hets eller självhat, bekräfta hennes värde direkt och ge henne tillåtelse att andas ut.
`;

// Helper for offline responses when there is no key
const fallbackResponse = (prompt: string): string => {
  const normalized = prompt.toLowerCase();
  if (normalized.includes("mens") || normalized.includes("cykel") || normalized.includes("hormon")) {
    return "Fina du, kvinnokroppens cykler är vår superkraft, inte ett hinder ♡ Under mensfasen är östrogen och progesteron som lägst, vilket gör att kroppen ofta kallar på vila och återhämtning. Det är helt okej att sänka intensiteten, fokusera på rörlighet eller bara ta en lugn promenad. Du behöver inte köra slut på dig själv för att bygga verklig styrka. Hur känns det i din kropp just idag?";
  }
  if (normalized.includes("stress") || normalized.includes("utmattad") || normalized.includes("trött")) {
    return "Andas ut... Lägg ner alla måsten för en stund. Du behöver inte prestera för att duga ♡ När nervsystemet är överbelastat är hård träning ofta det sista kroppen behöver, då det bara ökar stresshormonerna. Idag bjuder jag in dig till att göra något genuint snällt för dig själv. Kanske ett varmt bad, 10 minuter lugn stretching, eller bara ligga på rygg och känna andetaget. Jag finns här för att påminna dig om att din kropp förtjänar trygghet.";
  }
  if (normalized.includes("mat") || normalized.includes("äta" ) || normalized.includes("diet") || normalized.includes("kalori")) {
    return "Låt oss prata om näring utan regler ♡ Mitt fokus är alltid 'Att äta för att må bra och prestera' – inte för att kompensera eller minska. Mat är energi till dina muskler, din hjärna och dina hormoner. Att ge kroppen tillräckligt med näring är en av de finaste handlingar av självkärlek du kan göra. Vilken mat ger dig mest energi och gör att du känner dig genuint tillfreds?";
  }
  if (normalized.includes("verktyg") || normalized.includes("kompass") || normalized.includes("hjul")) {
    return "Våra nya biologiska verktyg är skapade för att ge dig full insikt utan prestationshets! Du hittar Hormonkompassen, Dagsformshjulet och Receptutforskaren på vår startsida under 'Hem & Filosofi'. De hjälper dig att anpassa din styrka efter din kropps intelligens dag för dag ♡";
  }
  if (normalized.includes("portal") || normalized.includes("medlem") || normalized.includes("inlogg")) {
    return "TORUN-portalen är din framtida digitala träningsdagbok och gemenskap! Du kan testa den fullt ut under fliken 'Hem & Filosofi' genom att rulla ner till medlemsområdet eller klicka på 'Logga in' i menyn. Där kan du bocka av dagens pass, se övningsvideor och skriva i Systerhörnan ♡";
  }
  return "Välkommen hem, älskade du ♡ Det här är ett helt tryggt och kravlöst rum för dig. Oavsett om du funderar på hur du kan lyssna bättre på din kropp, anpassa din styrketräning efter din cykel, eller bara behöver höra att du duger precis som du är, så är jag här för dig. Vad bär du på i hjärtat just nu?";
};

// API chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    // Extract the latest message from user
    const lastUserMessage = messages[messages.length - 1];
    if (!lastUserMessage || !lastUserMessage.content) {
      return res.status(400).json({ error: "Missing content in latest message." });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY || API_KEY === "MY_GEMINI_API_KEY" || API_KEY === "") {
      // Graceful fallback for offline demo
      const reply = fallbackResponse(lastUserMessage.content);
      return res.json({ reply, offline: true });
    }

    const ai = getAiClient();
    
    // Convert message history to contents parts formatted according to SDK limits or pass historical summary context.
    // For simplicity and perfect response rendering, let's inject history directly to the context to avoid SDK formatting issues.
    let convoContext = "";
    messages.slice(0, -1).forEach((msg: any) => {
      const actor = msg.role === "user" ? "Kvinnans sökande" : "Toruns trygga svar";
      convoContext += `${actor}: "${msg.content}"\n`;
    });

    const finalPrompt = `
Här är historiken för samtalet hittills:
${convoContext}

Kvinnans nya tanke/frågeställning: "${lastUserMessage.content}"

Ge henne ditt svar nu. Kom ihåg att svara direkt till henne, hålla din filosofi, vara varm och skriva på svenska.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: finalPrompt,
      config: {
        systemInstruction: TORUN_SYSTEM_INSTRUCTION,
        temperature: 1.0,
      },
    });

    const replyText = response.text || "Jag lyssnar på dig... Säg mer ♡";
    return res.json({ reply: replyText, offline: false });

  } catch (error: any) {
    console.error("Gemini API Error in server.ts:", error);
    // Graceful error reporting to prevent front-end crash
    return res.status(200).json({ 
      reply: "Jag är här... Men mina tankar svävade iväg en stund. Låt oss ta ett djupt andetag tillsammans och prata vidare ♡ (Ett tekniskt fel uppstod, men jag lyssnar gärna om du vill upprepa ditt meddelande!)",
      error: error.message,
      offline: true
    });
  }
});

// API subscription/startguide route using Resend email delivery
app.post("/api/subscribe", async (req, res) => {
  try {
    const { name, email, challenge } = req.body;
    if (!email) {
      return res.status(400).json({ error: "E-postadress krävs." });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM || "Torun Coaching <hej@torun.se>";
    // Default URL pointing to the stark-och-trygg-startguide.pdf
    const GUIDE_URL = process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/stark-och-trygg-startguide.pdf`
      : "https://torun.se/stark-och-trygg-startguide.pdf";

    if (!RESEND_API_KEY || RESEND_API_KEY === "re_..." || RESEND_API_KEY === "MY_RESEND_API_KEY" || RESEND_API_KEY === "") {
      console.warn("⚠️ RESEND_API_KEY is not defined or is placeholder. Subscription email will run in mock demo mode.");
      return res.json({ success: true, message: "Mock signup success (offline)." });
    }

    // Call Resend API using node fetch
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: email,
        subject: "Här är din Stark & Trygg Startguide! 🌸",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@100..900&family=Playfair+Display:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
            </head>
            <body style="margin: 0; padding: 0; background-color: #fffafb; -webkit-text-size-adjust: 100%;">
              <div style="font-family: 'Google Sans Flex', 'Plus Jakarta Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #230c1e; line-height: 1.6; padding: 30px; background-color: #fffafb; border-radius: 24px; border: 1px solid rgba(253, 128, 255, 0.12); box-sizing: border-box;">
                <h2 style="font-family: 'Playfair Display', 'Georgia', serif; font-weight: normal; font-size: 26px; color: #230c1e; margin-top: 0; margin-bottom: 20px; letter-spacing: -0.02em;">Välkommen hem, fina ${name}! ♡</h2>
                
                <p style="font-size: 14px; font-weight: 300;">Vad glad jag är att du är här. Din resa mot styrka, energi & en sund relation till träning börjar här! 🌸</p>
                
                <p style="font-size: 14px; font-weight: 300;">Den här startguiden är skapad för dig som vill bli stark, må bra och hitta en sund relation till både träning och mat – helt utan dietkultur, vågfixering eller "shred"-snack.</p>
                
                <div style="background-color: rgba(253, 128, 255, 0.04); padding: 20px; border-left: 3px solid #fd80ff; border-radius: 8px; font-family: 'Playfair Display', Georgia, serif; font-size: 16px; font-style: italic; color: #230c1e; margin: 25px 0; line-height: 1.5;">
                  Du behöver inte förtjäna din mat.<br>
                  Du behöver inte göra träning till ett straff.<br>
                  Du behöver inte bli mindre för att vara värdefull.
                </div>
                
                <p style="font-size: 14px; font-weight: 300;">Häftet innehåller 7 dagar med tankar & små, mjuka steg för att hjälpa dig att bygga din egen styrka och ta hand om din unika kropp på dess biologiska villkor.</p>
                
                <div style="margin: 35px 0; text-align: center;">
                  <a href="${GUIDE_URL}" style="background-color: #230c1e; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 12px; letter-spacing: 0.1em; display: inline-block; box-shadow: 0 4px 12px rgba(35, 12, 30, 0.15);">HÄMTA DIN PDF-GUIDE HÄR 🌸</a>
                </div>
                
                <p style="font-size: 14px; font-weight: 300; margin-bottom: 30px;">Ta allt helt i din egen takt. Jag hoppas att häftet kommer ge dig precis den ork och omtanke som din kropp längtar efter.</p>
                
                <div style="margin-top: 40px; border-top: 1px solid rgba(35, 12, 30, 0.08); padding-top: 25px; font-size: 13px; color: #5c4b57; font-weight: 300;">
                  Varma och hjärtliga hälsningar,<br>
                  <strong style="color: #230c1e; font-weight: 600;">Torun Wallin</strong><br>
                  Lic. PT & Kostrådgivare
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API Error details:", errorText);
      return res.status(500).json({ error: "Kunde inte skicka mejl via Resend." });
    }

    // Skicka notifiering till Torun (tyst i bakgrunden så att det inte stör registreringen om det mot förmodan skulle strula)
    try {
      const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "itorun@me.com";
      const challengeMap: Record<string, string> = {
        general: "Vill bara hitta en stark och snäll relation till min kropp",
        stress: "Hög stress, utmattad eller svårt att sova",
        hormone: "Hormonellt svängig (PMS, menscykeln eller klimakteriet)",
        relationship: "Svårt att behålla en bra träningsvana utan hets",
        strength: "Vill börja lyfta men rädd för skador eller dömande miljöer",
        inspiration: "Är nyfiken och vill bara ha varm träningspepp & inspiration",
      };
      const friendlyChallenge = challengeMap[challenge] || challenge || "Inget val gjort";

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: RESEND_FROM,
          to: NOTIFY_EMAIL,
          subject: `Ny startguide-anmälan: ${name} 🎉`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #230c1e; margin-top: 0;">Ny startguide-anmälan! 🌸</h2>
              <p>Fina Torun, en ny person har precis registrerat sig för att ladda ner din startguide på hemsidan.</p>
              
              <div style="background-color: #fafafa; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Förnamn:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin: 15px 0 5px 0; border-top: 1px solid #eee; padding-top: 10px;"><strong>Vald utmaning/intresse:</strong></p>
                <p style="margin: 5px 0; font-style: italic; color: #555;">"${friendlyChallenge}"</p>
              </div>
              
              <p style="font-size: 12px; color: #999;">Detta mejl skickades automatiskt från torun.se via Resend.</p>
            </div>
          `,
        }),
      });
    } catch (notifyError) {
      console.error("Kunde inte skicka notifieringsmejl till Torun:", notifyError);
    }

    return res.json({ success: true });
  } catch (error: any) {
    console.error("Error in /api/subscribe:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { 
      type, 
      name, 
      email, 
      phone, 
      message, 
      notes, 
      history, 
      phase, 
      intention, 
      selectedPackage 
    } = req.body;

    if (!email) {
      return res.status(400).json({ error: "E-postadress krävs." });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM || "Torun Coaching <hej@torun.se>";
    const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "itorun@me.com";

    if (!RESEND_API_KEY || RESEND_API_KEY === "re_..." || RESEND_API_KEY === "MY_RESEND_API_KEY" || RESEND_API_KEY === "") {
      console.warn("⚠️ RESEND_API_KEY is not defined. Running in mock mode.");
      return res.json({ success: true, message: "Mock submit success." });
    }

    // Map selected packages to friendly names
    const packageMap: Record<string, string> = {
      "kickstart": "Kickstart (Dina första steg – utan press)",
      "stark-med-torun": "Stark med Torun (Starkare, vecka för vecka)",
      "coaching-oneonone": "1:1 Coaching (Full omfamning, hela vägen)",
      "medlemsportal-app": "Medlemsportal & App (Hela verktygslådan – på dina villkor)",
    };

    const friendlyPackage = packageMap[selectedPackage] || selectedPackage || "Inget paket valt";

    // Map phases and intentions to friendly Swedish names
    const phaseMap: Record<string, string> = {
      gravid: "Gravid / Väntar barn",
      postpartum: "Postpartum / Nybliven mamma (återhämtning)",
      regular: "Bli stark & hitta sund relation till träning",
      therapist: "Söker samtalsterapeut / Mentalt stöd",
    };

    const intentionMap: Record<string, string> = {
      styrka: "Bygga fysisk styrka",
      energi: "Få mer energi i vardagen",
      rehab: "Rehab / Slippa smärta eller skador",
      mindset: "Sunt mindset till träning & mat",
      habits: "Skapa hållbara vanor som håller",
    };

    const friendlyPhases = Array.isArray(phase) 
      ? phase.map(p => phaseMap[p] || p).join(", ") 
      : "";
    const friendlyIntentions = Array.isArray(intention) 
      ? intention.map(i => intentionMap[i] || i).join(", ") 
      : "";

    // Build the email subject and HTML based on form type
    let subject = "";
    let htmlContent = "";

    if (type === "coaching-apply") {
      subject = `Ansökan till Coaching: ${name} 🌟`;
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #230c1e; margin-top: 0;">Ny ansökan till Personlig Coaching! 🌟</h2>
          <p>Fina Torun, en person har skickat in en ansökan om coaching via hemsidan.</p>
          
          <div style="background-color: #fafafa; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #230c1e; border-bottom: 1px solid #eee; padding-bottom: 5px; font-size: 14px;">Kontaktuppgifter</h3>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Namn:</strong> ${name}</p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Telefon:</strong> ${phone || "Inte angivet"}</p>
            
            <h3 style="margin-top: 15px; color: #230c1e; border-bottom: 1px solid #eee; padding-bottom: 5px; font-size: 14px;">Coachingdetaljer</h3>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Valt program:</strong> ${friendlyPackage}</p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Livsfas:</strong> ${friendlyPhases || "Inget valt"}</p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Huvudsakligt mål:</strong> ${friendlyIntentions || "Inget valt"}</p>
            
            <h3 style="margin-top: 15px; color: #230c1e; border-bottom: 1px solid #eee; padding-bottom: 5px; font-size: 14px;">Bakgrund & Funderingar</h3>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Träningshistorik:</strong></p>
            <p style="margin: 5px 0; font-style: italic; font-size: 13px; white-space: pre-wrap; color: #444;">${history || "Ingen historik skriven"}</p>
            
            <p style="margin: 15px 0 5px 0; border-top: 1px solid #eee; padding-top: 10px; font-size: 13px;"><strong>Egna tankar / anteckningar:</strong></p>
            <p style="margin: 5px 0; font-style: italic; font-size: 13px; white-space: pre-wrap; color: #444;">${notes || "Inga anteckningar"}</p>
          </div>
          <p style="font-size: 12px; color: #999;">Detta mejl skickades automatiskt från torun.se via Resend.</p>
        </div>
      `;
    } else if (type === "waitlist") {
      subject = `Väntelista Medlemsportal: ${name} 📲`;
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #230c1e; margin-top: 0;">Ny registrering till medlemsportalen! 📲</h2>
          <p>Någon har anmält sig till väntelistan för medlemsportalen / tränings-appen.</p>
          
          <div style="background-color: #fafafa; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 5px 0; font-size: 13px;"><strong>Namn:</strong> ${name}</p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Telefon:</strong> ${phone || "Inte angivet"}</p>
            <p style="margin: 15px 0 5px 0; border-top: 1px solid #eee; padding-top: 10px; font-size: 13px;"><strong>Meddelande / anteckning:</strong></p>
            <p style="margin: 5px 0; font-style: italic; font-size: 13px; white-space: pre-wrap; color: #444;">${notes || "Inga anteckningar"}</p>
          </div>
          <p style="font-size: 12px; color: #999;">Detta mejl skickades automatiskt från torun.se via Resend.</p>
        </div>
      `;
    } else if (type === "coaching-contact") {
      subject = `Snabbfråga Coaching: ${name} 💬`;
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #230c1e; margin-top: 0;">Ny snabbfråga angående coaching! 💬</h2>
          
          <div style="background-color: #fafafa; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 5px 0; font-size: 13px;"><strong>Namn:</strong> ${name}</p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Telefon:</strong> ${phone || "Inte angivet"}</p>
            <p style="margin: 15px 0 5px 0; border-top: 1px solid #eee; padding-top: 10px; font-size: 13px;"><strong>Fråga / meddelande:</strong></p>
            <p style="margin: 5px 0; font-style: italic; font-size: 13px; white-space: pre-wrap; color: #444;">${notes || "Inget meddelande"}</p>
          </div>
          <p style="font-size: 12px; color: #999;">Detta mejl skickades automatiskt från torun.se via Resend.</p>
        </div>
      `;
    } else {
      // General contact page
      const { packageOfInterest } = req.body;
      const packageMap: Record<string, string> = {
        "general-inquiry": "Allmän fråga / Vill bara bolla",
        "stark-med-torun": "Personlig Coaching (Stark med Torun)",
        "mammatraning": "Hormon- & Mammaträning (Gravid/Postpartum)",
        "medlemsportal-app": "Medlemsportalen (Tränings-appen)",
      };
      const friendlyInterest = packageMap[packageOfInterest] || packageOfInterest || "Allmän fråga / Vill bara bolla";

      subject = `Kontaktformulär: ${name} ✉️`;
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #230c1e; margin-top: 0;">Nytt meddelande från kontaktformuläret! ✉️</h2>
          
          <div style="background-color: #fafafa; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 5px 0; font-size: 13px;"><strong>Namn:</strong> ${name}</p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Telefon:</strong> ${phone || "Inte angivet"}</p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Intresserad av:</strong> ${friendlyInterest}</p>
            <p style="margin: 15px 0 5px 0; border-top: 1px solid #eee; padding-top: 10px; font-size: 13px;"><strong>Meddelande:</strong></p>
            <p style="margin: 5px 0; font-style: italic; font-size: 13px; white-space: pre-wrap; color: #444;">${message || "Inget meddelande"}</p>
          </div>
          <p style="font-size: 12px; color: #999;">Detta mejl skickades automatiskt från torun.se via Resend.</p>
        </div>
      `;
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: NOTIFY_EMAIL,
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API Error inside /api/contact:", errorText);
      return res.status(500).json({ error: "Kunde inte skicka kontaktmejlet." });
    }

    return res.json({ success: true });
  } catch (error: any) {
    console.error("Error in /api/contact:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Configure Vite middleware or production build output serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[TORUN Web-App] running on http://localhost:${PORT}`);
  });
}

if (process.env.VERCEL !== "1") {
  start();
}

export default app;
