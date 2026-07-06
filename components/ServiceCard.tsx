import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon } from "@/lib/icons";
import PrestationCta from "@/components/PrestationCta";
import type { Service } from "@/lib/data";

/**
 * Card service : image (ou placeholder dégradé) + titre + description + CTA devis.
 * `index` sert uniquement à varier l'angle du dégradé du placeholder.
 */
export default function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  return (
    <article className="service-card">
      <div className="service-card__media">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 600px) 90vw, 320px"
            className="service-card__img"
          />
        ) : (
          <div
            className="service-card__ph"
            style={{ "--a": `${index * 36}deg` } as CSSProperties}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="service-card__body">
        <h3>{service.title}</h3>
        <p>{service.text}</p>
        <PrestationCta prestation={service.title} className="service-card__cta">
          Demander un devis <Icon name="arrow" strokeWidth={2} />
        </PrestationCta>
      </div>
    </article>
  );
}
