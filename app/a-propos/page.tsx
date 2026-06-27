import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reviews from "@/components/sections/Reviews";
import DevisSection from "@/components/sections/DevisSection";

export const metadata: Metadata = {
  title: "À propos, votre interlocuteur unique en Île-de-France",
  description:
    "NSJ Multiservice accompagne particuliers, professionnels, syndics, agences immobilières, associations et mandataires judiciaires avec une offre complète de services. Un seul interlocuteur, réactif et professionnel.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <>
      <PageHero
        tag="À propos"
        title="NSJ Multiservice, l'allié du quotidien"
        lead="Un interlocuteur unique, réactif et professionnel pour simplifier la vie des particuliers comme des professionnels."
      />

      <section className="section" id="apropos">
        <div className="container apropos">
          <div className="apropos__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?auto=format&fit=crop&w=800&q=80"
              alt="Équipe NSJ Multiservice au travail"
              loading="lazy"
            />
            <div className="apropos__badge">
              <strong>1</strong>
              <span>interlocuteur unique pour tous vos besoins</span>
            </div>
          </div>
          <div className="apropos__text">
            <span className="tag">À propos</span>
            <h2>NSJ Multiservice, l&apos;allié du quotidien</h2>
            <p>
              NSJ Multiservice accompagne particuliers, professionnels, syndics,
              agences immobilières, associations et mandataires judiciaires grâce
              à une offre complète de services.
            </p>
            <p>
              Notre objectif : <strong>simplifier la vie de nos clients</strong>{" "}
              avec un interlocuteur unique, réactif et professionnel.
            </p>
            <ul className="checks">
              <li>Particuliers &amp; professionnels</li>
              <li>Syndics &amp; agences immobilières</li>
              <li>Associations &amp; mandataires judiciaires</li>
            </ul>
            <a href="#devis" className="btn btn--primary">
              Obtenir un devis gratuit
            </a>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="avis">
        <div className="container">
          <div className="head">
            <span className="tag">Avis clients</span>
            <h2>Ils nous ont fait confiance</h2>
            <p className="stars">
              ★★★★★ <span>Avis vérifiés Google</span>
            </p>
          </div>
          <Reviews />
        </div>
      </section>

      <DevisSection />
    </>
  );
}
