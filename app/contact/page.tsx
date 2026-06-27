import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactGrid from "@/components/sections/ContactGrid";
import DevisSection from "@/components/sections/DevisSection";

export const metadata: Metadata = {
  title: "Contact — Téléphone, Email, WhatsApp — Île-de-France",
  description:
    "Contactez NSJ Multiservice : téléphone, email, WhatsApp. Zone d'intervention Île-de-France. Horaires : lundi au samedi 08h–20h. Devis gratuit sous 24h.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Contact"
        title="Parlons de votre projet"
        lead="Une question, un projet ? Joignez-nous par téléphone, email ou WhatsApp — nous intervenons dans toute l'Île-de-France."
      />

      <section className="section" id="contact">
        <div className="container">
          <ContactGrid />
        </div>
      </section>

      <DevisSection />
    </>
  );
}
