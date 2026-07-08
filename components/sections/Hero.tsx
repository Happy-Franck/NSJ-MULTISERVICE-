import Link from "next/link";
import Counter from "@/components/Counter";

export default function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="container hero__grid">
        <div className="hero__lead">
          <span className="pill">
            <span className="dot"></span> Île-de-France · Devis gratuit sous 24h
          </span>
          <h1>
            NSJ Multiservice
            <span className="hero__accent">
              Votre interlocuteur unique pour tous vos besoins.
            </span>
          </h1>
          <p className="lead">
            Nettoyage, rénovation, débarras, conciergerie, transport et services
            aux particuliers et professionnels.
          </p>
          <div className="hero__actions">
            <Link href="/#devis" className="btn btn--primary btn--lg">
              Obtenir un devis gratuit
            </Link>
            <Link href="/contact" className="btn btn--soft btn--lg">
              Nous contacter
            </Link>
          </div>
        </div>
        <div className="bento">
          <div
            className="bento__img"
            role="img"
            aria-label="NSJ Multiservice — un seul interlocuteur, tous vos services : entretien, nettoyage extrême, débarras, rénovation, serrurerie, transport, bricolage, espaces verts, dératisation"
          ></div>
          <div className="bento__tile bento__rating">
            <div className="bento__stars">★★★★★</div>
            <strong>4,9/5</strong>
            <span>Avis Google vérifiés</span>
          </div>
          <div className="bento__tile bento__stat">
            <Counter target={500} suffix="+" />
            <span>interventions réalisées</span>
          </div>
          <div className="bento__tile bento__stat">
            <strong>24h</strong>
            <span>pour un devis gratuit</span>
          </div>
        </div>
      </div>
      <Marquee />
    </section>
  );
}

function Marquee() {
  const text =
    "NETTOYAGE • RÉNOVATION • DÉBARRAS • CONCIERGERIE • SERRURERIE • ESPACES VERTS • TRANSPORT • DÉRATISATION • ".repeat(
      3,
    );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
