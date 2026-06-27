import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyGrid from "@/components/sections/WhyGrid";
import DevisSection from "@/components/sections/DevisSection";

export const metadata: Metadata = {
  title: "Nos services — Nettoyage, Rénovation, Débarras…",
  description:
    "Découvrez les services NSJ Multiservice : entretien & nettoyage, nettoyage extrême, conciergerie, débarras, rénovation tous corps d'état, serrurerie, transport, bricolage, espaces verts et dératisation en Île-de-France.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="Nos services"
        title="Une offre complète, un seul interlocuteur"
        lead="Du nettoyage courant aux interventions les plus techniques — chaque prestation gérée par un interlocuteur unique."
      />

      <section className="section" id="services">
        <div className="container">
          <ServicesGrid />
        </div>
      </section>

      <section className="section section--alt" id="pourquoi">
        <div className="container">
          <div className="head">
            <span className="tag">Pourquoi nous choisir</span>
            <h2>La tranquillité d&apos;un partenaire de confiance</h2>
          </div>
          <WhyGrid />
        </div>
      </section>

      <DevisSection />
    </>
  );
}
