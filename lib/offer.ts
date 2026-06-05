/**
 * Lanseringserbjudande — tidsbegränsat "lanseringspris" (20 % rabatt) på
 * Kickstart + Stark med Torun + 1:1 Coaching. Stark Tjej är oförändrad.
 *
 * Styr allt härifrån:
 *   • Ändra datumet i `label` på ETT ställe.
 *   • Sätt `active: false` på ett paket för att ta bort just dess erbjudande
 *     (priset går då automatiskt tillbaka till ordinarie).
 *
 * OBS Kickstart: själva betalningen styrs av Stripe-priset (env STRIPE_PRICE_KICKSTART),
 * inte av den här filen. Uppdatera Stripe-priset till 636 kr innan Kickstart-
 * erbjudandet går live, annars visar sajten 636 kr men Stripe drar 795 kr.
 */

export type OfferTier = {
  active: boolean;
  /** Ordinarie pris (visas överstruket) */
  original: string;
  /** Lanseringspris (visas stort) */
  now: string;
};

export const LAUNCH_OFFER: {
  label: string;
  kickstart: OfferTier;
  stark: OfferTier;
  one1: OfferTier;
} = {
  label: "Lanseringspris · t.o.m. 10 juli",
  // Kickstart väntar tills Stripe-priset är satt till 636 kr (annars visar
  // sajten 636 men Stripe drar 795). Sätt till true när Stripe är klart.
  kickstart: { active: false, original: "795 kr", now: "636 kr" },
  stark: { active: true, original: "1 795 kr", now: "1 436 kr" },
  one1: { active: true, original: "3 495 kr", now: "2 796 kr" },
};
