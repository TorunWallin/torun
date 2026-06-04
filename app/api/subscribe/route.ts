import { Resend } from "resend";
import { welcomeStartguideEmail } from "@/lib/email";

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
    // A/B-alternativ: "Välkommen — det här blir en snällare väg framåt"
    //                 "Här är din startguide (läs den i din egen takt)"
    const welcomeResult = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Din startguide är här 🤍",
      html: welcomeStartguideEmail(GUIDE_URL),
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
