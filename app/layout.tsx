import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Lightbox from "@/components/Lightbox";
import ScrollReveal from "@/components/ScrollReveal";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.nsj-multiservice.fr");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "NSJ Multiservice — Nettoyage, Rénovation, Débarras & Conciergerie en Île-de-France",
    template: "%s — NSJ Multiservice",
  },
  description:
    "NSJ Multiservice : votre interlocuteur unique pour le nettoyage, le nettoyage extrême, le débarras, la rénovation, la conciergerie, la serrurerie, les espaces verts et la dératisation en Île-de-France. Devis gratuit sous 24h.",
  keywords: [
    "entreprise de nettoyage",
    "nettoyage extrême",
    "débarras maison",
    "rénovation appartement",
    "conciergerie",
    "multiservice",
    "serrurerie",
    "espaces verts",
    "dératisation",
    "transport accompagné",
    "Île-de-France",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    title:
      "NSJ Multiservice — Nettoyage, Rénovation, Débarras & Conciergerie en Île-de-France",
    description:
      "Votre interlocuteur unique pour le nettoyage, la rénovation, le débarras, la conciergerie et les services aux particuliers et professionnels.",
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem('nsj-theme');if(!t)t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "NSJ Multiservice",
  description:
    "Nettoyage, rénovation, débarras, conciergerie, transport et services aux particuliers et professionnels en Île-de-France.",
  url: SITE_URL,
  telephone: "+33000000000",
  email: "multiservices.nsj@gmail.com",
  priceRange: "€€",
  areaServed: [
    "Chaville",
    "Viroflay",
    "Versailles",
    "Le Chesnay-Rocquencourt",
    "Boulogne-Billancourt",
    "Paris",
    "Hauts-de-Seine",
    "Yvelines",
    "Île-de-France",
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "20:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0b0b0d" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Lightbox />
        <ScrollReveal />
      </body>
    </html>
  );
}
