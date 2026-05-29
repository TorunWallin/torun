import Stripe from "stripe";
import { Resend } from "resend";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM ?? "TORUN. <onboarding@resend.dev>";
const NOTIFY_TO = process.env.NOTIFY_EMAIL ?? "itorun@me.com";
const KICKSTART_PDF_URL =
  process.env.KICKSTART_PDF_URL ?? "https://torun.se/torun-startguide.pdf";

// Stripe requires the raw body to verify the webhook signature
export const dynamic = "force-dynamic";

function getStripe(): Stripe {
  if (!stripeSecret) {
    throw new Error("STRIPE_SECRET_KEY saknas i miljövariablerna.");
  }
  return new Stripe(stripeSecret);
}

export async function POST(req: Request) {
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // Handle the events we care about
  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(stripe, session);
    }
    // Add more event types here as needed (refunds, disputes, etc.)
  } catch (handlerErr) {
    console.error(`Error handling ${event.type}:`, handlerErr);
    // Return 500 so Stripe retries
    return new Response("Handler error", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

async function handleCheckoutCompleted(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
) {
  const product = session.metadata?.product ?? "unknown";

  // Get customer email — Stripe stores it on the session
  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? null;
  const customerName = session.customer_details?.name ?? "";
  const amount = ((session.amount_total ?? 0) / 100).toLocaleString("sv-SE");
  const currency = (session.currency ?? "sek").toUpperCase();

  if (!customerEmail) {
    console.error("No customer email on completed session", session.id);
    // Notify Torun anyway so she can follow up manually
    await notifyTorun(NOTIFY_TO, {
      product,
      name: "(okänd)",
      email: "(ingen e-post)",
      amount,
      currency,
      sessionId: session.id,
    });
    return;
  }

  // 1. Send welcome email to customer with PDF + "Everfit invite within 24h"
  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: FROM,
        to: customerEmail,
        replyTo: NOTIFY_TO,
        subject: "Välkommen till Kickstart ♡",
        html: customerEmailHtml({
          firstName: firstName(customerName),
          pdfUrl: KICKSTART_PDF_URL,
        }),
      });
    } catch (mailErr) {
      console.error("Welcome email failed:", mailErr);
    }
  }

  // 2. Notify Torun so she can send the Everfit invite manually
  try {
    await notifyTorun(NOTIFY_TO, {
      product,
      name: customerName || "(saknas)",
      email: customerEmail,
      amount,
      currency,
      sessionId: session.id,
    });
  } catch (notifyErr) {
    console.error("Notify email failed:", notifyErr);
  }
}

type NotifyData = {
  product: string;
  name: string;
  email: string;
  amount: string;
  currency: string;
  sessionId: string;
};

async function notifyTorun(to: string, data: NotifyData) {
  if (!process.env.RESEND_API_KEY) return;
  await resend.emails.send({
    from: FROM,
    to,
    replyTo: data.email !== "(ingen e-post)" ? data.email : undefined,
    subject: `💚 Ny betalning: ${prettyProduct(data.product)} — ${data.name}`,
    html: torunNotifyHtml(data),
  });
}

function prettyProduct(p: string): string {
  if (p === "kickstart") return "Kickstart";
  return p;
}

function customerEmailHtml({
  firstName,
  pdfUrl,
}: {
  firstName: string;
  pdfUrl: string;
}): string {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Välkommen till Kickstart</title>
</head>
<body style="margin:0; padding:0; background:#FAF6EE; font-family: Georgia, 'Times New Roman', serif; color:#0A0A0A;">
  <div style="max-width:560px; margin:0 auto; padding:32px 24px;">
    <div style="font-style: italic; font-weight: 700; font-size: 28px; color:#0F4C3A; letter-spacing:-0.02em;">torun.</div>
    <div style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing:0.18em; text-transform:uppercase; color:#5A5A5A; margin-bottom: 28px;">Hälsa · Styrka · Vardag</div>

    <h1 style="font-style: italic; font-weight: 700; font-size: 32px; line-height:1.1; color:#0F4C3A; margin: 0 0 16px;">
      Hej ${escapeHtml(firstName)} ♡
    </h1>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 14px;">
      Så kul att du sa ja till Kickstart. Det här blir en lugn, tydlig start — fyra veckor som tar bort kaoset och bygger momentum, utan stress.
    </p>

    <h2 style="font-style: italic; font-weight: 700; font-size: 20px; color:#0F4C3A; margin: 28px 0 12px;">
      1. Din startguide ligger här:
    </h2>

    <p style="margin: 0 0 24px;">
      <a href="${pdfUrl}"
         style="background:#EC4D9C; color:#FFFFFF; padding: 14px 28px; border-radius: 999px; text-decoration:none; display:inline-block; font-family: Helvetica, Arial, sans-serif; font-weight: 600; font-size: 14px;">
        Ladda ner startguiden →
      </a>
    </p>

    <h2 style="font-style: italic; font-weight: 700; font-size: 20px; color:#0F4C3A; margin: 28px 0 12px;">
      2. Inom 24 timmar:
    </h2>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 14px;">
      Jag skickar en personlig inbjudan till Everfit-appen där hela ditt 4-veckors program ligger. Du behöver inte göra något — den dyker upp i din inkorg.
    </p>

    <p style="font-size: 16px; line-height: 1.7; margin: 0 0 14px;">
      Tills dess: läs startguiden, andas, och kom ihåg att första steget är taget. Resten bygger vi tillsammans.
    </p>

    <p style="font-size: 16px; line-height: 1.7; margin: 28px 0 4px;">
      Stark, trygg, hel ♡
    </p>
    <p style="font-style: italic; font-size: 18px; margin: 0; color:#0F4C3A;">Torun</p>

    <hr style="border: none; border-top: 1px solid #E8E8E8; margin: 36px 0 18px;" />

    <p style="font-size: 12px; color:#5A5A5A; line-height: 1.5;">
      Du får det här mejlet för att du köpt Kickstart på torun.se. Frågor? Svara bara på mejlet.
      <br />
      <a href="https://www.tiktok.com/@toruncoach" style="color:#5A5A5A;">TikTok @toruncoach</a> · <a href="https://www.instagram.com/toruncoach" style="color:#5A5A5A;">Instagram @toruncoach</a>
    </p>
  </div>
</body>
</html>`;
}

function torunNotifyHtml(data: NotifyData): string {
  return `<!DOCTYPE html>
<html lang="sv">
<head><meta charset="utf-8" /></head>
<body style="margin:0; padding:0; background:#FAF6EE; font-family: Georgia, serif; color:#0A0A0A;">
  <div style="max-width:620px; margin:0 auto; padding:32px 24px;">
    <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing:0.18em; text-transform:uppercase; color:#5A5A5A; margin: 0 0 8px;">Ny betalning via torun.se</p>
    <h1 style="font-style: italic; font-weight: 700; font-size: 26px; line-height:1.15; color:#0F4C3A; margin: 0 0 24px;">
      ${escapeHtml(prettyProduct(data.product))} — ${escapeHtml(data.name)}
    </h1>

    <table style="border-collapse: collapse; width: 100%;">
      ${row("Belopp", `${escapeHtml(data.amount)} ${escapeHtml(data.currency)}`)}
      ${row("Namn", escapeHtml(data.name))}
      ${row("Mejl", `<a href="mailto:${escapeHtml(data.email)}" style="color:#EC4D9C;">${escapeHtml(data.email)}</a>`)}
      ${row("Session ID", `<span style="font-family: monospace; font-size: 12px; color:#5A5A5A;">${escapeHtml(data.sessionId)}</span>`)}
    </table>

    <div style="background:#F2EBDB; border-radius:12px; padding:18px 22px; margin: 28px 0;">
      <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing:0.18em; text-transform:uppercase; color:#5A5A5A; margin: 0 0 6px;">Att göra inom 24h</p>
      <p style="font-size: 15px; color:#0F4C3A; margin: 0;">Skicka Everfit-inbjudan till ${escapeHtml(data.email)}</p>
    </div>

    <p style="font-size: 13px; color:#5A5A5A; line-height: 1.6; margin: 0;">
      Kunden har redan fått startguiden via mejl. Svara på det här mejlet för att kontakta dem direkt.
    </p>
  </div>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px 8px 0; vertical-align:top; font-family: Helvetica, Arial, sans-serif; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color:#5A5A5A; white-space: nowrap;">${escapeHtml(label)}</td>
    <td style="padding:8px 0; vertical-align:top; font-size: 15px; color:#0A0A0A; line-height:1.55;">${value}</td>
  </tr>`;
}

function firstName(fullName: string): string {
  const first = fullName.trim().split(/\s+/)[0];
  return first || "du";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
