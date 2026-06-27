import { Icon } from "@/lib/icons";
import { perks } from "@/lib/data";
import DevisForm from "@/components/DevisForm";

export default function DevisSection() {
  return (
    <section className="section section--alt" id="devis">
      <div className="container devis">
        <div className="devis__intro">
          <span className="tag">Devis gratuit</span>
          <h2>Obtenez votre devis gratuit sous 24h</h2>
          <p>
            Décrivez votre besoin et joignez vos photos : nous revenons vers vous
            rapidement, sans engagement.
          </p>
          <ul className="perks" id="perks">
            {perks.map((p) => (
              <li key={p.label}>
                <Icon name={p.icon} />
                {p.label}
              </li>
            ))}
          </ul>
        </div>
        <DevisForm />
      </div>
    </section>
  );
}
