import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

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

// Configure Vite middleware or production build output serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
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

start();
