/**
 * Shared email templates — one premium design system for every email torun.se sends.
 *
 * Design language mirrors the site: deep green + hot pink on warm cream, a soft
 * rounded card, a Pacifico script logo/signature (with elegant italic-serif
 * fallback for clients that strip web fonts, e.g. Gmail/Outlook).
 *
 * Copy is Torun's own — warm, plain, no performative flourish.
 */

// ---------------------------------------------------------------------------
// Brand tokens
// ---------------------------------------------------------------------------

const C = {
  green: "#0F4C3A",
  pink: "#EC4D9C",
  pinkSoft: "#FFA3F0",
  cream: "#F7F1E9",
  card: "#FFFFFF",
  border: "#F3D6EA",
  ink: "#3A3A38",
  muted: "#A99F8E",
  mutedPink: "#C58BB0",
  infoBg: "#FBF1F8",
  hairline: "#F0E6D6",
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Helvetica, Arial, sans-serif";
// Pacifico where supported; graceful italic-serif fallback everywhere else.
const SCRIPT = "'Pacifico', Georgia, 'Times New Roman', serif";

export type EmailProgram = "stark" | "ett-till-ett" | "stark-tjej";

export const PROGRAM_LABELS: Record<EmailProgram, string> = {
  stark: "Stark med Torun",
  "ett-till-ett": "1:1 Coaching",
  "stark-tjej": "Stark Tjej",
};

// ---------------------------------------------------------------------------
// Shared utils
// ---------------------------------------------------------------------------

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function firstName(fullName: string): string {
  const first = fullName.trim().split(/\s+/)[0];
  return first || "du";
}

// ---------------------------------------------------------------------------
// Content building blocks
// ---------------------------------------------------------------------------

function paragraph(html: string): string {
  return `<p style="font-family:${SERIF}; font-size:16px; line-height:1.75; color:${C.ink}; margin:0 0 16px;">${html}</p>`;
}

function heading(html: string): string {
  return `<h1 style="font-family:${SERIF}; font-style:italic; font-weight:700; font-size:28px; line-height:1.2; color:${C.green}; margin:0 0 18px;">${html}</h1>`;
}

function subheading(html: string): string {
  return `<h2 style="font-family:${SERIF}; font-style:italic; font-weight:700; font-size:19px; line-height:1.3; color:${C.green}; margin:24px 0 8px;">${html}</h2>`;
}

// Small bold lead-in line that sits tight above the paragraph it introduces.
function leadIn(text: string): string {
  return `<p style="font-family:${SERIF}; font-weight:700; font-size:16px; line-height:1.5; color:${C.green}; margin:22px 0 4px;">${text}</p>`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px;">
    <tr>
      <td align="center" style="border-radius:999px; background-color:${C.pink}; background-image:linear-gradient(135deg, #F8A8E0, ${C.pink});">
        <a href="${href}" style="display:inline-block; padding:15px 32px; font-family:${SANS}; font-weight:600; font-size:14px; letter-spacing:0.01em; color:#FFFFFF; text-decoration:none; border-radius:999px;">${label}</a>
      </td>
    </tr>
  </table>`;
}

function infoCard(label: string, value: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 24px;">
    <tr>
      <td style="background-color:${C.infoBg}; border:1px solid ${C.border}; border-radius:18px; padding:18px 22px;">
        <div style="font-family:${SANS}; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:${C.mutedPink}; margin:0 0 6px;">${label}</div>
        <div style="font-family:${SERIF}; font-style:italic; font-size:17px; color:${C.green}; margin:0;">${value}</div>
      </td>
    </tr>
  </table>`;
}

// Gentle hand-signature — kept small so it reads as a name, not a headline.
function signature(closing: string, heart = ""): string {
  const mark = heart ? `Torun&nbsp;${heart}` : "Torun";
  return `<p style="font-family:${SERIF}; font-size:16px; line-height:1.7; color:${C.ink}; margin:26px 0 4px;">${closing}</p>
    <div style="font-family:${SCRIPT}; font-size:22px; color:${C.green}; line-height:1.2;">${mark}</div>`;
}

// ---------------------------------------------------------------------------
// Outer shell (header + card + footer)
// ---------------------------------------------------------------------------

function shell(opts: {
  title: string;
  preheader: string;
  content: string;
  footerNote: string;
}): string {
  const { title, preheader, content, footerNote } = opts;
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light" />
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
</head>
<body style="margin:0; padding:0; background-color:${C.cream}; -webkit-text-size-adjust:100%;">
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all; opacity:0;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.cream};">
    <tr>
      <td align="center" style="padding:36px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; width:100%; background-color:${C.card}; border:1px solid ${C.border}; border-radius:28px; overflow:hidden;">
          <tr><td style="height:5px; background-color:${C.pink}; background-image:linear-gradient(90deg, ${C.pinkSoft}, ${C.pink});">&nbsp;</td></tr>
          <tr>
            <td style="padding:38px 40px 0; text-align:center;">
              <div style="font-family:${SCRIPT}; font-size:32px; color:${C.green}; line-height:1;">Torun</div>
              <div style="width:42px; height:1px; background-color:${C.border}; margin:24px auto 0; font-size:0; line-height:0;">&nbsp;</div>
            </td>
          </tr>
          <tr><td style="padding:30px 40px 0;">${content}</td></tr>
          <tr>
            <td style="padding:8px 40px 38px;">
              <div style="border-top:1px solid ${C.hairline}; margin:28px 0 18px; font-size:0; line-height:0;">&nbsp;</div>
              <p style="font-family:${SANS}; font-size:12px; line-height:1.65; color:${C.muted}; margin:0;">
                ${footerNote}<br />
                <a href="https://www.instagram.com/torunwallin" style="color:${C.mutedPink}; text-decoration:none;">Instagram</a> &nbsp;·&nbsp; <a href="https://www.tiktok.com/@torunwallin" style="color:${C.mutedPink}; text-decoration:none;">TikTok</a> &nbsp;·&nbsp; <a href="https://torun.se" style="color:${C.mutedPink}; text-decoration:none;">torun.se</a>
              </p>
            </td>
          </tr>
        </table>
        <div style="max-width:560px; margin:18px auto 0; font-family:${SANS}; font-size:11px; letter-spacing:0.04em; color:${C.muted}; text-align:center;">© ${new Date().getFullYear()} Torun Wallin</div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// 1. Newsletter / startguide welcome
// ---------------------------------------------------------------------------

export function welcomeStartguideEmail(guideUrl: string): string {
  const content = `
    ${heading("Hej och välkommen hit 🤍")}
    ${paragraph(
      "Vad fint att du är här. Du har precis tagit första steget mot ett annat sätt att se på träning och mat — ett utan dietregler, utan vågen som chef och utan dåligt samvete för det du åt igår.",
    )}
    ${paragraph("Här är din startguide, precis som jag lovade:")}
    ${button(guideUrl, "Ladda ner din 7-dagars startguide →")}
    ${paragraph(
      "Läs den i din egen takt. Det är ingen plan du måste hinna med — bara några enkla grundtankar och små, konkreta steg som faktiskt håller i längden. Du behöver inte göra allt på en gång. Du behöver inte ens göra det perfekt.",
    )}
    ${paragraph(
      "För det här är hela min grej: du behöver inte förtjäna din kropp. Vi börjar i det — inte i prestationen.",
    )}
    ${paragraph(
      "De närmaste dagarna hör du från mig då och då. Jag delar det jag verkligen tror på: att bli stark inifrån, att äta för att orka, och att träning får kännas som energi istället för straff. Inga pekpinnar, det lovar jag.",
    )}
    ${paragraph("Tills dess — var lite snäll mot dig själv idag.")}
    ${signature("Med värme,", "🤍")}
  `;
  return shell({
    title: "Din startguide är här",
    preheader: "Ingen quick fix. Inget dåligt samvete. Bara första steget.",
    content,
    footerNote:
      "Du får det här mejlet för att du hämtade min startguide på torun.se.",
  });
}

// ---------------------------------------------------------------------------
// 2. Application reply (Stark / 1:1 / Stark Tjej)
// ---------------------------------------------------------------------------

export function applicationReplyEmail(data: {
  program: EmailProgram;
  name: string;
}): string {
  const name = escapeHtml(firstName(data.name));

  if (data.program === "stark") {
    const content = `
      ${heading(`Hej ${name} 🤍`)}
      ${paragraph(
        "Tack för att du hörde av dig — din anmälan har landat hos mig, och jag läser varenda en själv.",
      )}
      ${paragraph(
        "Vad roligt att du vill börja i <em>Stark med Torun</em>. Det här är coachingen där allt formas efter just din vecka, din kropp och din menscykel — inte tvärtom.",
      )}
      ${leadIn("Vad som händer nu:")}
      ${paragraph(
        "Jag hör av mig inom 2–3 dagar med nästa steg och hur vi kommer igång tillsammans. Du behöver inte förbereda något eller göra något mer just nu. Bara andas — jag tar det härifrån.",
      )}
      ${infoCard("Din anmälan", "Stark med Torun")}
      ${paragraph(
        "Och en sak till: du har faktiskt redan gjort det svåraste. Du började. Resten bygger vi i din takt, vecka för vecka.",
      )}
      ${signature("Vi hörs jättesnart,", "🤍")}
    `;
    return shell({
      title: "Din anmälan landade hos mig",
      preheader: "Du behöver inte göra något mer just nu. Jag tar det härifrån.",
      content,
      footerNote:
        "Du får det här mejlet för att du skickade in en anmälan på torun.se.",
    });
  }

  if (data.program === "ett-till-ett") {
    const content = `
      ${heading(`Hej ${name} 🤍`)}
      ${paragraph(
        "Tack för att du hörde av dig — din anmälan har landat hos mig, och jag läser varenda en själv.",
      )}
      ${paragraph(
        "Vad fint att du är nyfiken på <em>1:1 Coaching</em> — det djupaste och mest personliga jag erbjuder. Just därför vill jag alltid prata med dig först, innan vi bestämmer något. Det ska kännas helt rätt för dig.",
      )}
      ${leadIn("Vad som händer nu:")}
      ${paragraph(
        "Jag hör av mig inom 2–3 dagar för att hitta en tid för ett kort, lugnt samtal. Vi pratar om var du är idag, vad du längtar efter, och om vi är rätt match för varandra. Ingen press — bara ett samtal.",
      )}
      ${infoCard("Din anmälan", "1:1 Coaching")}
      ${paragraph(
        "Tills dess: ta hand om dig. Jag ser verkligen fram emot att höra mer om dig och vad du vill. 🤍",
      )}
      ${signature("Vi hörs snart,")}
    `;
    return shell({
      title: "Din intresseanmälan landade hos mig",
      preheader: "Innan vi bestämmer något vill jag höra mer om dig.",
      content,
      footerNote:
        "Du får det här mejlet för att du skickade in en intresseanmälan på torun.se.",
    });
  }

  // stark-tjej — uses ♡ throughout for a softer, warmer tone
  const content = `
    ${heading(`Hej ${name} ♡`)}
    ${paragraph(
      "Tack för att du hörde av dig — din ansökan har landat hos mig, och jag läser varenda en själv. Långsamt, och med hela hjärtat.",
    )}
    ${paragraph(
      "Att söka <em>Stark Tjej</em> kräver mod. Det vet jag. Så det första jag vill säga är bara: jag är så glad att du gjorde det.",
    )}
    ${leadIn("Vad som händer nu:")}
    ${paragraph(
      "Jag hör av mig inom en vecka. Och oavsett hur det blir den här gången vill jag att du ska veta en sak — att du sökte betyder något. Du behöver inte vara på ett visst sätt, prestera, eller ha tränat förut. Det här handlar inte om det. Det handlar om att du är välkommen precis som du är.",
    )}
    ${infoCard("Din ansökan", "Stark Tjej ♡")}
    ${paragraph(
      "Var snäll mot dig själv den här veckan. Du är modigare än du tror. ♡",
    )}
    ${signature("Vi hörs snart,")}
  `;
  return shell({
    title: "Tack för att du vågade söka",
    preheader: "Oavsett hur det blir — att du sökte betyder något.",
    content,
    footerNote:
      "Du får det här mejlet för att du skickade in en ansökan på torun.se.",
  });
}

// ---------------------------------------------------------------------------
// 3. Kickstart purchase welcome
// ---------------------------------------------------------------------------

export function kickstartWelcomeEmail(opts: {
  firstName: string;
  pdfUrl: string;
}): string {
  const content = `
    ${heading(`Hej ${escapeHtml(opts.firstName)} 🤍`)}
    ${paragraph(
      "Vad roligt att du sa ja till Kickstart! De närmaste fyra veckorna blir en lugn och tydlig start — vi tar bort kaoset och bygger momentum, helt utan stress och utan att du behöver kunna något sedan innan.",
    )}
    ${leadIn("Så här kommer vi igång:")}
    ${subheading("1 · Din startguide")}
    ${paragraph("Den ligger redo här — perfekt att läsa redan idag:")}
    ${button(opts.pdfUrl, "Ladda ner din startguide →")}
    ${subheading("2 · Inom 24 timmar")}
    ${paragraph(
      "Jag skickar en personlig inbjudan till appen Everfit, där hela ditt 4-veckorsprogram väntar — med videoinstruktioner till varje övning. Du behöver inte göra något; inbjudan dyker upp i din inkorg.",
    )}
    ${subheading("3 · Om du undrar något")}
    ${paragraph(
      "Du kan höra av dig till mig när du behöver. Du gör inte det här ensam.",
    )}
    ${paragraph(
      "Tills inbjudan kommer: läs startguiden, andas, och kom ihåg att första steget redan är taget. Resten bygger vi tillsammans, i din takt. 🤍",
    )}
    ${signature("Vi hörs snart,")}
  `;

  return shell({
    title: "Välkommen till Kickstart",
    preheader: "Första steget är redan taget. Resten bygger vi tillsammans.",
    content,
    footerNote:
      "Du får det här mejlet för att du köpte Kickstart på torun.se. Frågor? Svara bara på det här mejlet.",
  });
}
