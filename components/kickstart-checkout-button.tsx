"use client";

import { useState } from "react";

type Props = {
  /** Tailwind classes for the button — passed through from the parent so styling stays identical */
  className?: string;
  children: React.ReactNode;
};

export function KickstartCheckoutButton({ className, children }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "kickstart" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Något gick fel — försök igen.");
      }
      const data = (await res.json()) as { url?: string };
      if (!data.url) {
        throw new Error("Ingen checkout-URL mottagen.");
      }
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`${className ?? ""} disabled:opacity-60 disabled:cursor-wait`}
      >
        {loading ? (
          <span className="block">Skickar dig vidare…</span>
        ) : (
          children
        )}
      </button>
      {error && (
        <p role="alert" className="mt-3 text-[13px] text-pink-deep text-center">
          {error}
        </p>
      )}
    </>
  );
}
