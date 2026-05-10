"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type Props = {
  /** Color scheme for the surrounding section. "pink" = on hot pink bg. "cream" = on light bg. */
  variant?: "pink" | "cream";
};

export function SubscribeForm({ variant = "pink" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Något gick fel — försök igen om en stund.");
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Något gick fel — försök igen.");
    }
  }

  // Success state
  if (status === "success") {
    return (
      <div className="max-w-[520px] mx-auto text-center">
        <div
          className={`font-script text-[36px] md:text-[44px] mb-3 -rotate-2 inline-block ${
            variant === "pink" ? "text-white" : "text-pink-hot"
          }`}
        >
          tack!
        </div>
        <p
          className={`text-[16px] leading-[1.6] ${
            variant === "pink" ? "text-white/95" : "text-ink-charcoal"
          }`}
        >
          Kika i din inkorg — startguiden ligger där om en minut.
          <br />
          (Glöm inte att titta i skräpposten också, ifall.)
        </p>
      </div>
    );
  }

  const inputClasses =
    variant === "pink"
      ? "bg-white/95 text-ink placeholder-ink-gray border-white"
      : "bg-white text-ink placeholder-ink-gray border-ink";

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-[520px] mx-auto"
      noValidate
    >
      <label htmlFor="subscribe-email" className="sr-only">
        Mejladress
      </label>
      <input
        id="subscribe-email"
        type="email"
        required
        placeholder="din@mejl.se"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-grow rounded-full px-5 py-3 border-[1.5px] font-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-lime/70 ${inputClasses}`}
        disabled={status === "loading"}
        aria-invalid={status === "error"}
        aria-describedby={status === "error" ? "subscribe-error" : undefined}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={
          variant === "pink"
            ? "btn-pill bg-white text-pink-hot hover:bg-teal hover:text-white disabled:opacity-60"
            : "btn-pink disabled:opacity-60"
        }
      >
        {status === "loading" ? "Skickar…" : "Skicka mig guiden"}
      </button>
      {status === "error" && (
        <p
          id="subscribe-error"
          role="alert"
          className={`w-full text-[14px] mt-1 ${
            variant === "pink" ? "text-cream-warm" : "text-pink-deep"
          }`}
        >
          {error}
        </p>
      )}
    </form>
  );
}
