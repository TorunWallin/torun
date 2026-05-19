import type { Metadata } from "next";
import {
  Lora,
  Inter,
  JetBrains_Mono,
  Pacifico,
  Playwrite_HR,
} from "next/font/google";
import "./globals.css";

// Body & paragraphs — warm humanist serif
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Headlines & big display — Pacifico cursive (matches Toruns Canva)
const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
  weight: ["400"],
});

// Handwritten body accent (Playwrite — Slovakia/Croatia variants similar)
const playwrite = Playwrite_HR({
  variable: "--font-playwrite",
  display: "swap",
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

export const metadata: Metadata = {
  title: "TORUN Coach — Träning som får dig att må bra",
  description:
    "Träning, mat och välmående utan diet-tjat, vågen som coach eller skam. Ett annat samtal om hälsa — varmt, ärligt, gjort för verkliga liv.",
  metadataBase: new URL("https://torun.se"),
  openGraph: {
    title: "TORUN Coach — Träning som får dig att må bra",
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
    <html
      lang="sv"
      className={`${lora.variable} ${pacifico.variable} ${playwrite.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-serif">{children}</body>
    </html>
  );
}
