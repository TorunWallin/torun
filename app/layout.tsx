import type { Metadata } from "next";
import { Lora, Inter, JetBrains_Mono, Lobster } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const lobster = Lobster({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "TORUN. — Hälsa som verktyg, inte ett mål.",
  description:
    "Träning, mat och välmående utan diet-tjat, vågen som coach eller skam. Ett annat samtal om hälsa — varmt, ärligt, gjort för verkliga liv.",
  metadataBase: new URL("https://torun.se"),
  openGraph: {
    title: "TORUN. — Hälsa som verktyg, inte ett mål.",
    description:
      "Träning, mat och välmående utan diet-tjat, vågen som coach eller skam.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${lora.variable} ${inter.variable} ${jetbrainsMono.variable} ${lobster.variable}`}>
      <body className="font-serif">{children}</body>
    </html>
  );
}
