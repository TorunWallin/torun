"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export type ContactProgram = "stark" | "ett-till-ett" | "stark-tjej";

type Props = {
  program: ContactProgram;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  experience: "" | "nyborjare" | "lite-van" | "van";
  hopes: string;
  message: string;
  age: string;
  why: string;
  guardianEmail: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  hopes: "",
  message: "",
  age: "",
  why: "",
  guardianEmail: "",
};

// Theme per program — matches the section bg color in /kontakt
const THEMES = {
  stark: {
    // White card on pink-light section
    inputBg: "bg-white",
    inputBorder: "border-ink",
    inputText: "text-ink",
    label: "text-ink-charcoal",
    button: "btn-pink",
    successAccent: "text-pink-hot",
    errorText: "text-pink-deep",
    ring: "focus:ring-pink-hot/50",
  },
  "ett-till-ett": {
    // Cream card on teal section
    inputBg: "bg-cream",
    inputBorder: "border-teal",
    inputText: "text-ink",
    label: "text-cream-warm",
    button: "btn-lime",
    successAccent: "text-lime",
    errorText: "text-pink-light",
    ring: "focus:ring-lime/60",
  },
  "stark-tjej": {
    // Cream card on teal-deep section
    inputBg: "bg-cream",
    inputBorder: "border-teal",
    inputText: "text-ink",
    label: "text-cream-warm",
    button: "btn-lime",
    successAccent: "text-lime",
    errorText: "text-pink-light",
    ring: "focus:ring-lime/60",
  },
} as const;

const SUCCESS_COPY: Record<ContactProgram, { headline: string; body: string }> = {
  stark: {
    headline: "tack ♡",
    body: "Jag läser din anmälan personligen. Hör av mig inom 2–3 dagar.\nKika i din inkorg — bekräftelsen ligger där om en minut.",
  },
  "ett-till-ett": {
    headline: "tack ♡",
    body: "För 1:1 vill jag alltid prata med dig först.\nJag hör av mig inom 2–3 dagar för att boka ett kort samtal.",
  },
  "stark-tjej": {
    headline: "tack ♡",
    body: "Det är ingen liten sak att skicka det här.\nJag läser varje ansökan själv — du hör från mig inom en vecka.",
  },
};

export function ContactForm({ program }: Props) {
  const theme = THEMES[program];
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const ageNum = form.age ? parseInt(form.age, 10) : NaN;
  const showGuardian = program === "stark-tjej" && !Number.isNaN(ageNum) && ageNum < 18;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const payload: Record<string, string> = {
      program,
      name: form.name,
      email: form.email,
    };
    if (program === "stark") {
      payload.phone = form.phone;
      payload.experience = form.experience;
      payload.hopes = form.hopes;
    } else if (program === "ett-till-ett") {
      payload.phone = form.phone;
      payload.message = form.message;
    } else if (program === "stark-tjej") {
      payload.age = form.age;
      payload.why = form.why;
      if (showGuardian) payload.guardianEmail = form.guardianEmail;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Något gick fel — försök igen om en stund.");
      }
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Något gick fel — försök igen.");
    }
  }

  // Success state
  if (status === "success") {
    const copy = SUCCESS_COPY[program];
    return (
      <div className="text-center py-8">
        <div
          className={`font-script text-[40px] md:text-[52px] mb-4 -rotate-2 inline-block ${theme.successAccent}`}
        >
          {copy.headline}
        </div>
        <p className={`text-[16px] leading-[1.7] whitespace-pre-line ${theme.label}`}>
          {copy.body}
        </p>
      </div>
    );
  }

  const inputBase = `w-full rounded-2xl px-4 py-3 border-[1.5px] font-sans text-[15px] focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.inputText} ${theme.ring} disabled:opacity-60`;
  const labelBase = `block font-sans text-[12px] font-semibold tracking-[0.06em] uppercase mb-2 ${theme.label}`;
  const fieldGroup = "flex flex-col";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {/* Name */}
      <div className={fieldGroup}>
        <label htmlFor={`${program}-name`} className={labelBase}>
          Namn
        </label>
        <input
          id={`${program}-name`}
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputBase}
          disabled={status === "loading"}
          placeholder="Ditt namn"
        />
      </div>

      {/* Email */}
      <div className={fieldGroup}>
        <label htmlFor={`${program}-email`} className={labelBase}>
          Mejladress
        </label>
        <input
          id={`${program}-email`}
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputBase}
          disabled={status === "loading"}
          placeholder="din@mejl.se"
        />
      </div>

      {/* Phone (Stark + 1:1) */}
      {(program === "stark" || program === "ett-till-ett") && (
        <div className={fieldGroup}>
          <label htmlFor={`${program}-phone`} className={labelBase}>
            Telefon
          </label>
          <input
            id={`${program}-phone`}
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputBase}
            disabled={status === "loading"}
            placeholder="070-123 45 67"
          />
        </div>
      )}

      {/* Experience (Stark only) */}
      {program === "stark" && (
        <div className={fieldGroup}>
          <span className={labelBase}>Träningserfarenhet</span>
          <div className="flex flex-wrap gap-2.5">
            {([
              ["nyborjare", "Nybörjare"],
              ["lite-van", "Lite van"],
              ["van", "Van"],
            ] as const).map(([value, label]) => {
              const active = form.experience === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => update("experience", value)}
                  disabled={status === "loading"}
                  aria-pressed={active}
                  className={`px-4 py-2 rounded-full border-[1.5px] font-sans text-[14px] font-medium transition-all ${
                    active
                      ? "bg-pink-hot text-white border-pink-hot"
                      : "bg-white text-ink border-ink hover:-translate-y-px"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hopes (Stark only) */}
      {program === "stark" && (
        <div className={fieldGroup}>
          <label htmlFor={`${program}-hopes`} className={labelBase}>
            Vad hoppas du på?
          </label>
          <textarea
            id={`${program}-hopes`}
            required
            value={form.hopes}
            onChange={(e) => update("hopes", e.target.value)}
            rows={4}
            className={`${inputBase} resize-y min-h-[110px]`}
            disabled={status === "loading"}
            placeholder="Berätta lite om var du står just nu och vad du vill få ut av coachningen."
          />
        </div>
      )}

      {/* Message (1:1 only) */}
      {program === "ett-till-ett" && (
        <div className={fieldGroup}>
          <label htmlFor={`${program}-message`} className={labelBase}>
            Vad söker du?
          </label>
          <textarea
            id={`${program}-message`}
            required
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={5}
            className={`${inputBase} resize-y min-h-[130px]`}
            disabled={status === "loading"}
            placeholder="Några rader om vad du söker just nu — ingen perfekt formulering behövs, vi pratar mer på samtalet."
          />
          <p className={`text-[13px] mt-2 italic opacity-80 ${theme.label}`}>
            Det är okej att inte veta allt än. Jag bokar in ett kort samtal med dig innan vi
            bestämmer något.
          </p>
        </div>
      )}

      {/* Age (Stark Tjej only) */}
      {program === "stark-tjej" && (
        <div className={fieldGroup}>
          <label htmlFor={`${program}-age`} className={labelBase}>
            Ålder
          </label>
          <input
            id={`${program}-age`}
            type="number"
            required
            min={16}
            max={22}
            value={form.age}
            onChange={(e) => update("age", e.target.value)}
            className={`${inputBase} max-w-[140px]`}
            disabled={status === "loading"}
            placeholder="t.ex. 18"
          />
          <p className={`text-[13px] mt-2 italic opacity-80 ${theme.label}`}>
            Platsen är för dig mellan 16–22 år.
          </p>
        </div>
      )}

      {/* Guardian email (Stark Tjej + under 18) */}
      {showGuardian && (
        <div className={fieldGroup}>
          <label htmlFor={`${program}-guardian`} className={labelBase}>
            Vårdnadshavares mejl
          </label>
          <input
            id={`${program}-guardian`}
            type="email"
            required
            value={form.guardianEmail}
            onChange={(e) => update("guardianEmail", e.target.value)}
            className={inputBase}
            disabled={status === "loading"}
            placeholder="vardnadshavare@mejl.se"
          />
          <p className={`text-[13px] mt-2 italic opacity-80 ${theme.label}`}>
            Eftersom du är under 18 behöver jag också kontakt till en vårdnadshavare.
          </p>
        </div>
      )}

      {/* Why (Stark Tjej only) */}
      {program === "stark-tjej" && (
        <div className={fieldGroup}>
          <label htmlFor={`${program}-why`} className={labelBase}>
            Berätta lite om dig
          </label>
          <textarea
            id={`${program}-why`}
            required
            value={form.why}
            onChange={(e) => update("why", e.target.value)}
            rows={5}
            className={`${inputBase} resize-y min-h-[130px]`}
            disabled={status === "loading"}
            placeholder="Var står du just nu? Vad skulle den här platsen betyda? Du behöver inte vara bra på att skriva — jag läser med öppna ögon."
          />
        </div>
      )}

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className={`${theme.button} w-full justify-center disabled:opacity-60`}
        >
          {status === "loading" ? "Skickar…" : submitLabel(program)}
        </button>
      </div>

      {/* Error */}
      {status === "error" && (
        <p role="alert" className={`text-[14px] mt-1 ${theme.errorText}`}>
          {error}
        </p>
      )}
    </form>
  );
}

function submitLabel(program: ContactProgram): string {
  if (program === "stark") return "Skicka in ♡";
  if (program === "ett-till-ett") return "Vi tar samtalet ♡";
  return "Det här är min plats ♡";
}
