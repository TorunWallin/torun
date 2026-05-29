import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const kickstartPriceId = process.env.STRIPE_PRICE_KICKSTART;

// Lazy init so we don't crash at build time if env vars aren't set yet
function getStripe(): Stripe {
  if (!stripeSecret) {
    throw new Error("STRIPE_SECRET_KEY saknas i miljövariablerna.");
  }
  return new Stripe(stripeSecret);
}

type Product = "kickstart";

const PRODUCT_PRICE: Record<Product, string | undefined> = {
  kickstart: kickstartPriceId,
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const product: Product = body?.product ?? "kickstart";

    const priceId = PRODUCT_PRICE[product];
    if (!priceId) {
      console.error(`Saknas Price ID för produkt: ${product}`);
      return Response.json(
        {
          error:
            "Betalningen är inte konfigurerad än. Hör av dig direkt på hej@torun.se så hjälper jag dig.",
        },
        { status: 500 },
      );
    }

    const stripe = getStripe();

    // Origin used to build absolute success/cancel URLs
    const origin =
      req.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // Collect billing details + name automatically
      billing_address_collection: "auto",
      customer_creation: "always",
      // Where to send the user after payment
      success_url: `${origin}/kop-bekraftat?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#program`,
      // Locale
      locale: "sv",
      // Metadata so the webhook knows what was purchased
      metadata: {
        product,
      },
      // Allow promotion codes (so Torun can give out discount codes later)
      allow_promotion_codes: true,
    });

    if (!session.url) {
      throw new Error("Stripe returned no checkout URL");
    }

    return Response.json({ url: session.url });
  } catch (e) {
    console.error("Checkout error:", e);
    return Response.json(
      { error: "Något gick fel med betalningen — försök igen om en stund." },
      { status: 500 },
    );
  }
}
