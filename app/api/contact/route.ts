import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email addresses configurable via env vars (same as subscribe route)
const FROM = process.env.RESEND_FROM ?? "TORUN. <onboarding@resend.dev>";
const NOTIFY_TO = process.env.NOTIFY_EMAIL ?? "itorun@me.com";

type Program = "stark" | "ett-till-ett" | "stark-tjej";

type Payload = {
  program: Program;
  name: string;
  email: string;
  phone?: string;
  // Stark med Torun
  experience?: "nyborjare" | "lite-van" | "van";
  hopes?: string;
  // Torun 1:1
  message?: string;
  // Stark Tjej
  age?: string;
  why?: string;
  guardianEmail?: string;
};

const PROGRAM_LABELS: Record<Program, string> = {
  stark: "Stark med Torun",
  "ett-till-ett": "1:1 Coaching",
  "stark-tjej": "Stark Tjej",
};

const EXPERIENCE_LABELS: Record<NonNullable<Payload["experience"]>, string> = {
  nyborjare: "Nybörjare",
  "lite-van": "Lite van",
  van: "Van",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return Response.json(
        { error: "Mejltjänsten är inte konfigurerad än. Hör av dig direkt på hej@torun.se så hjälper jag dig." },
        { status: 500 },
      );
    }

    const body = (await req.json().catch(() => null)) as Payload | null;
    if (!body) {
      return Response.json({ error: "Ogiltig förfrågan." }, { status: 400 });
    }

    const validation = validatePayload(body);
    if (!validation.ok) {
      return Response.json({ error: validation.error }, { status: 400 });
    }
    const data = validation.data;

    // 1. Auto-reply to applicant (warm confirmation)
    const replyResult = await resend.emails.send({
      from: FROM,
      to: data.email,
      replyTo: NOTIFY_TO,
      subject: replySubject(data.program),
      html: replyEmailHtml(data),
    });

    if (replyResult.error) {
      console.error("Reply email failed:", replyResult.error);
      throw new Error("Kunde inte skicka mejl");
    }

    // 2. Notify Torun (best-effort — don't fail the whole request)
    try {
      await resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        replyTo: data.email,
        subject: notifySubject(data),
        html: notifyEmailHtml(data),
      });
    } catch (notifyErr) {
      console.error("Notify email failed (non-fatal):", notifyErr);
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("Contact error:", e);
    return Response.json(
      { error: "Något gick fel — försök igen om en stund." },
      { status: 500 },
    );
  }
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

type ValidationResult =
  | { ok: true; data: Payload }
  | { ok: false; error: string };

function validatePayload(body: Payload): ValidationResult {
  if (!body.program || !["stark", "ett-till-ett", "stark-tjej"].includes(body.program)) {
    return { ok: false, error: "Okänt program." };
  }
  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    return { ok: false, error: "Skriv ditt namn." };
  }
  if (!body.email || typeof body.email !== "string" || !EMAIL_REGEX.test(body.email)) {
    return { ok: false, error: "Skriv en giltig mejladress." };
  }

  if (body.program === "stark") {
    if (!body.phone || body.phone.trim().length < 4) {
      return { ok: false, error: "Skriv ditt telefonnummer." };
    }
    if (!body.experience || !["nyborjare", "lite-van", "van"].includes(body.experience)) {
      return { ok: false, error: "Välj din träningserfarenhet." };
    }
    if (!body.hopes || body.hopes.trim().length < 5) {
      return { ok: false, error: "Skriv några ord om vad du hoppas på." };
    }
  }

  if (body.program === "ett-till-ett") {
    if (!body.phone || body.phone.trim().length < 4) {
      return { ok: false, error: "Skriv ditt telefonnummer." };
    }
    if (!body.message || body.message.trim().length < 10) {
      return { ok: false, error: "Skriv några rader om vad du söker." };
    }
  }

  if (body.program === "stark-tjej") {
    const ageNum = body.age ? parseInt(body.age, 10) : NaN;
    if (!body.age || Number.isNaN(ageNum) || ageNum < 16 || ageNum > 22) {
      return { ok: false, error: "Ange din ålder (16–22 år)." };
    }
    if (!body.why || body.why.trim().length < 10) {
      return { ok: false, error: "Berätta lite om varför du söker platsen." };
    }
    // Guardian email required if under 18
    if (ageNum < 18) {
      if (!body.guardianEmail || !EMAIL_REGEX.test(body.guardianEmail)) {
        return { ok: false, error: "Du är under 18 — skriv en vårdnadshavares mejl." };
      }
    }
  }

  // Normalize whitespace
  return {
    ok: true,
    data: {
      ...body,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim(),
      hopes: body.hopes?.trim(),
      message: body.message?.trim(),
      why: body.why?.trim(),
      guardianEmail: body.guardianEmail?.trim(),
      age: body.age?.trim(),
    },
  };
}

// -----------------------------------------------------------------------------
// Email content
// -----------------------------------------------------------------------------

function replySubject(program: Program): string {
  if (program === "stark") return "Tack ♡ Jag hör av mig snart — Stark med Torun";
  if (program === "ett-till-ett") return "Tack ♡ Jag hör av mig snart — 1:1 Coaching";
  return "Tack ♡ Jag hör av mig snart — Stark Tjej";
}

function notifySubject(data: Payload): string {
  return `Ny ansökan: ${PROGRAM_LABELS[data.program]} — ${data.name}`;
}

function replyEmailHtml(data: Payload): string {
  const programName = PROGRAM_LABELS[data.program];

  const programIntro: Record<Program, string> = {
    stark:
      "Så glad att du vill börja resan in i <em>Stark med Torun</em>. Jag läser igenom din anmälan personligen, och hör av mig inom 2–3 dagar med nästa steg.",
    "ett-till-ett":
      "Så glad att du visat intresse för min mest personliga coachning. För 1:1 vill jag alltid prata med dig först innan vi bestämmer något — så jag hör av mig inom 2–3 dagar för att boka ett kort samtal.",
    "stark-tjej":
      "Tack för att du vågade söka platsen. Jag läser varje ansökan själv. Du hör från mig inom en vecka — och oavsett om platsen blir din den här gången eller inte vill jag att du vet att det betyder något att du tog det här steget.",
  };

  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Tack — ${programName}</title>
</head>
<body style="margin:0; padding:0; background:#FAF6EE; font-family: Georgia, 'Times New Roman', serif; color:#0A0A0A;">
  <div style="max-width:560px; margin:0 auto; padding:32px 24px;">
    <div style="font-style: italic; font-weight: 700; font-size: 28px; color:#0F4C3A; letter-spacing:-0.02em;">torun.</div>
    <div style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing:0.18em; text-transform:uppercase; color:#5A5A5A; margin-bottom: 28px;">Hälsa · Styrka · Vardag</div>

    <h1 style="font-style: italic; font-weight: 700; font-size: 32px; line-height:1.1; color:#0F4C3A; margin: 0 0 16px;">
      Hej ${escapeHtml(firstName(data.name))} ♡
    </h1>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 14px;">
      Tack för att du tog dig tid att skriva — det är inte småsak att skicka iväg ett sånt här mejl, och jag tar emot det med stor omsorg.
    </p>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 24px;">
      ${programIntro[data.program]}
    </p>

    <div style="background:#F2EBDB; border-radius:12px; padding:18px 22px; margin: 0 0 28px;">
      <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing:0.18em; text-transform:uppercase; color:#5A5A5A; margin: 0 0 6px;">Din ansökan</p>
      <p style="font-size: 15px; font-style: italic; color:#0F4C3A; margin: 0;">${programName}</p>
    </div>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 14px;">
      Under tiden — ta hand om dig. Och kom ihåg: bara det att du vågade ta det här steget är redan styrka.
    </p>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 4px;">
      Stark, trygg, hel ♡
    </p>
    <p style="font-style: italic; font-size: 18px; margin: 0; color:#0F4C3A;">Torun</p>

    <hr style="border: none; border-top: 1px solid #E8E8E8; margin: 36px 0 18px;" />

    <p style="font-size: 12px; color:#5A5A5A; line-height: 1.5;">
      Du får det här mejlet för att du skickade in en ansökan på torun.se.
      <br />
      <a href="https://www.tiktok.com/@toruncoach" style="color:#5A5A5A;">TikTok @toruncoach</a> · <a href="https://www.instagram.com/toruncoach" style="color:#5A5A5A;">Instagram @toruncoach</a>
    </p>
  </div>
</body>
</html>`;
}

function notifyEmailHtml(data: Payload): string {
  const programName = PROGRAM_LABELS[data.program];

  const fieldsHtml = buildNotifyFields(data)
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px 8px 0; vertical-align:top; font-family: Helvetica, Arial, sans-serif; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color:#5A5A5A; white-space: nowrap;">${escapeHtml(label)}</td>
          <td style="padding:8px 0; vertical-align:top; font-size: 15px; color:#0A0A0A; line-height:1.55;">${value}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Ny ansökan — ${programName}</title>
</head>
<body style="margin:0; padding:0; background:#FAF6EE; font-family: Georgia, 'Times New Roman', serif; color:#0A0A0A;">
  <div style="max-width:620px; margin:0 auto; padding:32px 24px;">
    <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing:0.18em; text-transform:uppercase; color:#5A5A5A; margin: 0 0 8px;">Ny ansökan via torun.se</p>
    <h1 style="font-style: italic; font-weight: 700; font-size: 26px; line-height:1.15; color:#0F4C3A; margin: 0 0 24px;">
      ${escapeHtml(programName)} — ${escapeHtml(data.name)}
    </h1>

    <table style="border-collapse: collapse; width: 100%;">
      ${fieldsHtml}
    </table>

    <p style="font-size: 13px; color:#5A5A5A; line-height: 1.6; margin: 32px 0 0;">
      Svara på det här mejlet för att kontakta ${escapeHtml(firstName(data.name))} direkt.
    </p>
  </div>
</body>
</html>`;
}

function buildNotifyFields(data: Payload): Array<[string, string]> {
  const fields: Array<[string, string]> = [
    ["Namn", escapeHtml(data.name)],
    ["Mejl", `<a href="mailto:${escapeHtml(data.email)}" style="color:#EC4D9C;">${escapeHtml(data.email)}</a>`],
  ];

  if (data.phone) {
    fields.push(["Telefon", `<a href="tel:${escapeHtml(data.phone)}" style="color:#EC4D9C;">${escapeHtml(data.phone)}</a>`]);
  }

  if (data.program === "stark") {
    if (data.experience) {
      fields.push(["Erfarenhet", escapeHtml(EXPERIENCE_LABELS[data.experience])]);
    }
    if (data.hopes) {
      fields.push(["Hoppas på", escapeHtml(data.hopes).replace(/\n/g, "<br />")]);
    }
  }

  if (data.program === "ett-till-ett" && data.message) {
    fields.push(["Söker", escapeHtml(data.message).replace(/\n/g, "<br />")]);
  }

  if (data.program === "stark-tjej") {
    if (data.age) fields.push(["Ålder", escapeHtml(data.age)]);
    if (data.guardianEmail) {
      fields.push([
        "Vårdnadshavare",
        `<a href="mailto:${escapeHtml(data.guardianEmail)}" style="color:#EC4D9C;">${escapeHtml(data.guardianEmail)}</a>`,
      ]);
    }
    if (data.why) {
      fields.push(["Varför", escapeHtml(data.why).replace(/\n/g, "<br />")]);
    }
  }

  return fields;
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
