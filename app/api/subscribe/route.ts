import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email addresses configurable via env vars
const FROM = process.env.RESEND_FROM ?? "TORUN. <onboarding@resend.dev>";
const NOTIFY_TO = process.env.NOTIFY_EMAIL ?? "itorun@me.com";
const GUIDE_URL = process.env.GUIDE_URL ?? "https://torun.se/torun-startguide.pdf";

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return Response.json(
        { error: "Mejltjänsten är inte konfigurerad än. Hör av dig direkt på hej@torun.se så hjälper jag dig." },
        { status: 500 },
      );
    }

    const body = await req.json().catch(() => null);
    const email = body?.email;

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Skriv en giltig mejladress." }, { status: 400 });
    }

    // 1. Welcome email to subscriber (with PDF link)
    const welcomeResult = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Välkommen ♡ Här är din startguide",
      html: welcomeEmailHtml(GUIDE_URL),
    });

    if (welcomeResult.error) {
      console.error("Welcome email failed:", welcomeResult.error);
      throw new Error("Kunde inte skicka mejl");
    }

    // 2. Notify Torun (best-effort — don't fail the whole request if this fails)
    try {
      await resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        subject: "Ny anmälan till startguiden",
        text: `Ny anmälan från: ${email}\n\nKom ihåg att lägga till den i din mejllista (MailerLite/Mailchimp/etc) när du är redo att skicka nyhetsbrev.`,
      });
    } catch (notifyErr) {
      console.error("Notify email failed (non-fatal):", notifyErr);
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("Subscribe error:", e);
    return Response.json(
      { error: "Något gick fel — försök igen om en stund." },
      { status: 500 },
    );
  }
}

function welcomeEmailHtml(guideUrl: string): string {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Välkommen till TORUN.</title>
</head>
<body style="margin:0; padding:0; background:#FAF6EE; font-family: Georgia, 'Times New Roman', serif; color:#0A0A0A;">
  <div style="max-width:560px; margin:0 auto; padding:32px 24px;">
    <div style="font-style: italic; font-weight: 700; font-size: 28px; color:#0F4C3A; letter-spacing:-0.02em;">torun.</div>
    <div style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing:0.18em; text-transform:uppercase; color:#5A5A5A; margin-bottom: 28px;">Hälsa · Styrka · Vardag</div>

    <h1 style="font-style: italic; font-weight: 700; font-size: 32px; line-height:1.1; color:#0F4C3A; margin: 0 0 16px;">
      Hej och varmt välkommen ♡
    </h1>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 14px;">
      Så kul att du hittade hit. Det här är ditt första steg in i ett annat sätt att tänka på hälsa — utan diet-tjat, utan vågen som coach, utan skam.
    </p>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 24px;">
      Här är startguiden jag lovade dig:
    </p>

    <p style="margin: 0 0 28px;">
      <a href="${guideUrl}"
         style="background:#EC4D9C; color:#FFFFFF; padding: 14px 28px; border-radius: 999px; text-decoration:none; display:inline-block; font-family: Helvetica, Arial, sans-serif; font-weight: 600; font-size: 14px;">
        Ladda ner startguiden →
      </a>
    </p>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 14px;">
      Läs i din takt. Det är ingen quick fix — det är några grundtankar och konkreta steg som faktiskt fungerar i längden.
    </p>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 28px;">
      Vi hörs snart igen. Tills dess — ta hand om dig själv.
    </p>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 4px;">
      Stark, trygg, hel ♡
    </p>
    <p style="font-style: italic; font-size: 18px; margin: 0; color:#0F4C3A;">Torun</p>

    <hr style="border: none; border-top: 1px solid #E8E8E8; margin: 36px 0 18px;" />

    <p style="font-size: 12px; color:#5A5A5A; line-height: 1.5;">
      Du får det här mejlet för att du anmälde dig till min startguide på torun.se.
      <br />
      <a href="https://www.tiktok.com/@toruncoach" style="color:#5A5A5A;">TikTok @toruncoach</a> · <a href="https://www.instagram.com/toruncoach" style="color:#5A5A5A;">Instagram @toruncoach</a>
    </p>
  </div>
</body>
</html>`;
}
