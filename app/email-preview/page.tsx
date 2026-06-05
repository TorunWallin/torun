import type { Metadata } from "next";
import {
  welcomeStartguideEmail,
  applicationReplyEmail,
  kickstartWelcomeEmail,
} from "@/lib/email";

// Internal preview only — keep it out of search engines.
export const metadata: Metadata = {
  title: "Mejl-förhandsvisning",
  robots: { index: false, follow: false },
};

const GUIDE = "https://torun.se/torun-startguide.pdf";
const KICKSTART_PDF = "https://torun.se/kickstart-handbook.pdf";

const samples: { title: string; subject: string; html: string }[] = [
  {
    title: "Nyhetsbrev · startguide",
    subject: "Din startguide är här 🤍",
    html: welcomeStartguideEmail(GUIDE),
  },
  {
    title: "Ansökan · Stark med Torun",
    subject: "Din anmälan landade hos mig 🤍",
    html: applicationReplyEmail({ program: "stark", name: "Anna Lind" }),
  },
  {
    title: "Ansökan · 1:1 Coaching",
    subject: "Din intresseanmälan landade hos mig 🤍",
    html: applicationReplyEmail({ program: "ett-till-ett", name: "Anna Lind" }),
  },
  {
    title: "Ansökan · Stark Tjej",
    subject: "Tack för att du vågade söka ♡",
    html: applicationReplyEmail({ program: "stark-tjej", name: "Anna Lind" }),
  },
  {
    title: "Köp · Kickstart",
    subject: "Välkommen till Kickstart 🤍",
    html: kickstartWelcomeEmail({ firstName: "Anna", pdfUrl: KICKSTART_PDF }),
  },
];

export default function EmailPreviewPage() {
  return (
    <main
      style={{
        background: "#E8E2D6",
        minHeight: "100vh",
        padding: "32px 16px 64px",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0F4C3A",
          fontSize: 22,
          margin: "0 0 4px",
        }}
      >
        Mejl-förhandsvisning
      </h1>
      <p style={{ textAlign: "center", color: "#7A7264", fontSize: 13, margin: "0 0 36px" }}>
        Så här ser mejlen ut som skickas från torun.se
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 28,
          justifyContent: "center",
          maxWidth: 1320,
          margin: "0 auto",
        }}
      >
        {samples.map((s) => (
          <div key={s.title} style={{ width: 600, maxWidth: "100%" }}>
            <div style={{ margin: "0 0 4px", color: "#0F4C3A", fontWeight: 700, fontSize: 14 }}>
              {s.title}
            </div>
            <div style={{ margin: "0 0 10px", color: "#9A8FA0", fontSize: 12 }}>
              Ämne: <span style={{ color: "#5A5A5A" }}>{s.subject}</span>
            </div>
            <iframe
              srcDoc={s.html}
              title={s.title}
              style={{
                width: "100%",
                height: 820,
                border: "1px solid #D8CFC0",
                borderRadius: 14,
                background: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
