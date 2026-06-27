import Link from "next/link";
import { Icon } from "@/lib/icons";
import { services } from "@/lib/data";

export default function ServicesGrid({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <div className="services" id="servicesGrid">
      {items.map((s, i) => (
        <article
          key={s.title}
          className={`service${s.wide ? " service--wide" : ""}`}
          data-reveal
          style={{ transitionDelay: `${(i % 4) * 60}ms` }}
        >
          <div className="service__ic">
            <Icon name={s.icon} />
          </div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          <Link href="/#devis">
            Demander un devis <Icon name="arrow" strokeWidth={2} />
          </Link>
        </article>
      ))}
    </div>
  );
}
