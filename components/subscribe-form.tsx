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
      : "bg-white text-ink placeholder-ink-gray border-[#f4c1f0]/60 hover:border-[#ec4d9c]/40";

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
        className={`flex-grow rounded-full px-6 py-4 border-[1.5px] font-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-[#f4c1f0]/60 transition-all duration-200 ${inputClasses}`}
        disabled={status === "loading"}
        aria-invalid={status === "error"}
        aria-describedby={status === "error" ? "subscribe-error" : undefined}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-full font-mono font-bold text-[15px] transition-all duration-300 cursor-pointer disabled:opacity-60 hover:-translate-y-[2px] ${
          variant === "pink"
            ? "bg-white text-pink-hot hover:bg-[#fdeaf8]"
            : "bg-gradient-to-br from-[#f4c1f0] to-[#ec4d9c] text-white hover:from-[#fce4ee] hover:to-[#f4a6cc] hover:text-[#111]"
        }`}
      >
        <span className="block transition-transform duration-300 group-hover:-translate-x-2">
          {status === "loading" ? "Skickar…" : "Skicka mig guiden"}
        </span>
        {status !== "loading" && (
          <span className="absolute inset-y-0 right-5 flex items-center translate-x-16 transition-transform duration-300 group-hover:translate-x-0">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        )}
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
