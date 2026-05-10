# Setup-instruktioner

Hej Torun! ❤️ Här är allt du behöver göra för att få igång projektet på din dator.

## 1. Rensa och installera dependencies

Sandbox-miljön påbörjade en installation men hann inte slutföra den, och dess binärer är för Linux — inte macOS. Så vi börjar fräscht.

Öppna Terminal och kör:

```bash
cd ~/Projects/torun
rm -rf node_modules package-lock.json
npm install
```

(Det tar 1–2 minuter på en macbook.)

## 2. Starta dev-servern

```bash
npm run dev
```

Öppna sedan [http://localhost:3000](http://localhost:3000) i din webbläsare. Du ska se TORUN.-landningssidan med hot pink, lime, teal och cream — samma som mockupen.

## 3. När du är redo att deploya

Skapa konto på [vercel.com](https://vercel.com) (gratis), installera Vercel CLI:

```bash
npm i -g vercel
vercel
```

Följ prompten — projektet är live på en `*.vercel.app`-URL inom 30 sekunder. Senare kopplar vi `torun.se`.

## 4. Vad finns redan?

```
app/
  layout.tsx         ← Root layout, fonts, metadata
  page.tsx           ← Sätter ihop alla sektioner
  globals.css        ← Tailwind + brand-utility-klasser

components/
  announcement-bar.tsx   ← Hot pink topbar
  site-nav.tsx           ← Logo, meny, "Börja här"-knapp
  hero.tsx               ← Stora rubriken + bild
  stats-strip.tsx        ← Fyra stats-kort
  pillars.tsx            ← "Stark · Trygg · Hel"
  cta-strip.tsx          ← Pink CTA-band
  site-footer.tsx        ← Footer

tailwind.config.ts       ← Hela paletten + typografi
```

## Brand-färger (i Tailwind)

```
bg-cream            #FAF6EE  (bas)
bg-pink-hot         #EC4D9C  (CTAs, accent)
bg-pink-light       #FCE4EE  (mjuka kort)
bg-lime             #D9FF4D  (lekfull accent)
bg-teal             #0F4C3A  (rubriker, kontrast)
text-ink            #0A0A0A  (text)
```

Plus `text-*` och `border-*` på samma färger.

## Nästa steg vi gör tillsammans

1. ⏳ Köra projektet lokalt (du gör step 1+2 ovan)
2. Deploya till Vercel
3. Bygg ut fler sektioner (om mig, programkort, FAQ)
4. Sätt upp Stripe för försäljning
5. Sätt upp Supabase + auth
6. Bygg appdelen (PWA)

Säg till när det rullar lokalt så fortsätter vi! 🌸
