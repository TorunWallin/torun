# TORUN.

> Hälsa som verktyg — inte ett mål.

Hemsida + app för Toruns coachingverksamhet. Träning, kost, välmående utan dietkultur.

## Stack

- **Next.js 15** (App Router) — frontend + backend
- **Tailwind CSS 3.4** — styling
- **TypeScript** — typsäkerhet
- **Supabase** — auth + databas (kommer in steg 2)
- **Stripe** — betalningar (kommer in steg 2)
- **Vercel** — hosting

## Kör lokalt

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

## Struktur

```
app/                 # Next.js App Router
  layout.tsx         # Root layout med fonts + metadata
  page.tsx           # Landningssida
  globals.css        # Tailwind + brand-komponenter
components/          # React-komponenter
  announcement-bar.tsx
  site-nav.tsx
  hero.tsx
  stats-strip.tsx
  pillars.tsx
  cta-strip.tsx
  site-footer.tsx
public/              # Statiska filer (bilder, ikoner)
tailwind.config.ts   # Brand-paletten
```

## Brand

**Palett:**
- Cream `#FAF6EE`
- Pink hot `#EC4D9C`
- Lime `#D9FF4D`
- Teal `#0F4C3A`
- Ink (svart) `#0A0A0A`

**Typografi (aktuell):**
- Alice (narrow/regular för body + programtexter)
- Quattrocento (vissa rubriker)
- Playwrite England Joined + DK Uloopet (specifika poetiska meningar)
- Uloopet / England Joined / Pacifico-varianter för accenter
- Inter (sans), Lora (serif body)

**Tonalitet:** varm, ärlig, peppande — anti-dietkultur. Mer cream/beige än tidigare rosa-dominans för bättre balans.

Se varumärkesdokumentet.

## Launch / Deploy till produktion (Vercel + torun.se)

### 1. Bygg och testa lokalt
```bash
npm run build   # måste vara grön (ingen eslint-varning)
npm run dev
```
Testa: formulär (kontakt + startguide), Kickstart-CTA (om du har test-nycklar), email-preview på /email-preview.

### 2. Vercel
```bash
npm i -g vercel
vercel          # logga in, välj scope, deploy (får *.vercel.app URL)
vercel --prod   # när du är redo för live
```

Eller connecta repo i Vercel dashboard → Import → deploy.

### 3. Environment Variables (Vercel Dashboard → Project → Settings → Environment Variables)
Kopiera från [.env.example](.env.example). Sätt för Production + Preview + Development:

- `RESEND_API_KEY`
- `RESEND_FROM` (t.ex. `TORUN. <hej@torun.se>` efter domain verify)
- `NOTIFY_EMAIL`
- `GUIDE_URL=https://torun.se/torun-startguide.pdf`
- `KICKSTART_PDF_URL=https://torun.se/kickstart-handbook.pdf`
- `STRIPE_SECRET_KEY` (live eller test)
- `STRIPE_PRICE_KICKSTART`
- `STRIPE_WEBHOOK_SECRET` (från live webhook)
- `NEXT_PUBLIC_SITE_URL=https://torun.se`

### 4. Resend (mejl)
- Gå till resend.com → Domains → Add `torun.se`
- Lägg till de DNS-records Resend ger (vanligtvis TXT + MX/CNAME)
- Verifiera. Nu kan du skicka från `@torun.se` adresser.
- Uppdatera `RESEND_FROM` i Vercel till `TORUN. <hej@torun.se>` (eller vad du vill).

### 5. Stripe (live)
- Byt till Live mode i dashboard.
- Skapa produkt "Kickstart" (engångs) med pris (795 kr eller 636 kr under launch).
- Kopiera Price ID → `STRIPE_PRICE_KICKSTART`.
- Lägg till Webhook: endpoint `https://torun.se/api/webhook/stripe`, event `checkout.session.completed`.
- Kopiera Signing secret (whsec_live_...) → `STRIPE_WEBHOOK_SECRET`.
- (Stark med Torun och 1:1 hanteras via kontaktformulär + manuell uppföljning i Stripe just nu.)

### 6. Domain torun.se
I Vercel:
- Project → Settings → Domains → Add `torun.se` + `www.torun.se`
- Följ instruktionerna (flytta nameservers eller lägg A/CNAME records hos din registrar, t.ex. Loopia, Namecheap, etc.).
- Vänta på SSL + propagation (kan ta 5–60 min).

### 7. Efter deploy
- Testa live:
  - Startguide-anmälan (kolla inkorg + din NOTIFY_EMAIL)
  - Kontaktformulär för Stark / 1:1 / Stark Tjej
  - Kickstart checkout (om live price satt)
  - /kop-bekraftat efter köp
  - Webhook fungerar (kolla Stripe dashboard logs)
- Uppdatera ev. `lib/offer.ts` (sätt kickstart.active = true när Stripe-priset är rätt)
- Ta bort ev. test-data.

### 8. Övrigt
- Se till att PDF:erna i /public är uppladdade (de deployas automatiskt).
- Om du vill lägga till recurring checkout för Stark/1:1 senare: utöka /api/checkout till mode: "subscription" + fler price envs.

Lycka till med lanseringen! 🤍
```

## Dev notes
- Dev server: `npm run dev`
- Email preview (intern): `/email-preview`
- Background dev tasks hanteras via terminal i detta workspace.
