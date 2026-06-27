import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <Link href="/" className="logo">
            <Image
              src="/assets/logo-dark.jpeg"
              alt="NSJ Multiservice"
              width={44}
              height={44}
              className="logo__img"
            />
            <span className="logo__text">Multiservice</span>
          </Link>
          <p>
            Votre interlocuteur unique pour le nettoyage, la rénovation, le
            débarras, la conciergerie et les services aux particuliers et
            professionnels.
          </p>
        </div>
        <div>
          <h4>Zones d&apos;intervention</h4>
          <ul>
            {site.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom container">
        <p>© {year} NSJ Multiservice — Tous droits réservés.</p>
        <p className="footer__seo">
          Entreprise de nettoyage, nettoyage extrême, débarras maison,
          rénovation appartement, conciergerie, serrurerie, espaces verts,
          dératisation et transport accompagné en Île-de-France.
        </p>
      </div>
    </footer>
  );
}
