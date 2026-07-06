import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";

/** Grille de cards services, 3 colonnes par ligne (page /services). */
export default function ServicesGrid({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <div className="services-grid" id="servicesGrid">
      {items.map((s, i) => (
        <div key={s.slug} data-reveal style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
          <ServiceCard service={s} index={i} />
        </div>
      ))}
    </div>
  );
}
