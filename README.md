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

**Typografi:**
- Display: Fraunces (italic, extra-bold)
- Sans: Inter
- Mono: JetBrains Mono

**Tonalitet:** varm, ärlig, peppande — anti-dietkultur. Se varumärkesdokumentet.
