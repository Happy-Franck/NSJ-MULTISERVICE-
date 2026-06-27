import Link from "next/link";
import Hero from "@/components/sections/Hero";
import BannerBand from "@/components/sections/BannerBand";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyGrid from "@/components/sections/WhyGrid";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import DevisSection from "@/components/sections/DevisSection";

export default function Home() {
  return (
    <>
      <Hero />
      <BannerBand />

      <section className="section" id="services">
        <div className="container">
          <div className="head">
            <span className="tag">Nos services</span>
            <h2>Une offre complète, un seul interlocuteur</h2>
            <p>Du nettoyage courant aux interventions les plus techniques.</p>
          </div>
          <ServicesGrid limit={6} />
          <div className="center" style={{ marginTop: 40 }}>
            <Link href="/services" className="btn btn--primary btn--lg">
              Voir tous les services
            </Link>
          </div>
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

      <section className="section" id="realisations">
        <div className="container">
          <div className="head">
            <span className="tag">Nos réalisations</span>
            <h2>Galerie avant / après</h2>
            <p>Glissez le curseur pour découvrir la transformation.</p>
          </div>
          <Gallery limit={3} />
          <div className="center">
            <Link href="/realisations" className="btn btn--primary btn--lg">
              Voir toutes nos réalisations
            </Link>
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
