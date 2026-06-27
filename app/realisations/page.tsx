import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/sections/Gallery";
import DevisSection from "@/components/sections/DevisSection";

export const metadata: Metadata = {
  title: "Réalisations avant / après",
  description:
    "Galerie avant / après des réalisations NSJ Multiservice : nettoyage, débarras, rénovation et espaces verts en Île-de-France. Glissez le curseur pour découvrir la transformation.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        tag="Nos réalisations"
        title="Galerie avant / après"
        lead="Glissez le curseur pour découvrir la transformation. Cliquez pour agrandir."
      />

      <section className="section" id="realisations">
        <div className="container">
          <Gallery showFilters />
          <div className="center">
            <a href="#devis" className="btn btn--primary btn--lg">
              Demander un devis pour une prestation similaire
            </a>
          </div>
        </div>
      </section>

      <DevisSection />
    </>
  );
}
