import type { Metadata } from "next";
import {
  Lora,
  Inter,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Merriweather,
  Pacifico,
  Playwrite_SK,
  Playwrite_DK_Uloopet,
  Playwrite_GB_J,
  Quattrocento,
  Alice,
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

// Handwritten body accent — Playwrite SK weight 400 (Toruns logo font)
const playwrite = Playwrite_SK({
  variable: "--font-playwrite",
  display: "swap",
  weight: ["400"],
});

// New display script for specific poetic/headline phrases + pillars — Playwrite DK Uloopet (normal/regular weight 400)
const playwriteDKUloopet = Playwrite_DK_Uloopet({
  subsets: ["latin"],
  variable: "--font-playwrite-dk-uloopet",
  display: "swap",
  weight: ["400"],
});

// Playwrite England Joined for specific sentences in filosofin section (normal weight 400)
const playwriteEnglandJoined = Playwrite_GB_J({
  subsets: ["latin"],
  variable: "--font-playwrite-england-joined",
  display: "swap",
  weight: ["400"],
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  variable: "--font-quattrocento",
  display: "swap",
  weight: ["400", "700"],
});

const alice = Alice({
  subsets: ["latin"],
  variable: "--font-alice",
  display: "swap",
  weight: ["400"],
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

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "TORUN — Vägen till ett hälsosammare liv",
  description:
    "Vägen till ett hälsosammare liv — träning, mat och välmående utan diet-tjat, vågen som coach eller skam. Ett annat samtal om hälsa — varmt, ärligt, gjort för verkliga liv.",
  metadataBase: new URL("https://torun.se"),
  openGraph: {
    title: "TORUN — Vägen till ett hälsosammare liv",
    description:
      "Vägen till ett hälsosammare liv — träning, mat och välmående utan diet-tjat, vågen som coach eller skam.",
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
      className={`${lora.variable} ${pacifico.variable} ${playwrite.variable} ${inter.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable} ${merriweather.variable} ${playwriteDKUloopet.variable} ${playwriteEnglandJoined.variable} ${quattrocento.variable} ${alice.variable}`}
    >
      <body className="font-serif">{children}</body>
    </html>
  );
}
