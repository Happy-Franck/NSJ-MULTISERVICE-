import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";

/**
 * Slider auto (marquee) des services — s'inspire de la bande de texte défilante.
 * La liste est dupliquée ×2 pour une boucle infinie (translateX -50 %).
 * Pause au survol/focus ; en `prefers-reduced-motion`, devient scrollable à la main.
 */
export default function ServicesSlider() {
  const loop = [...services, ...services];

  return (
    <div className="services-marquee">
      <div className="services-marquee__track">
        {loop.map((s, i) => {
          const isClone = i >= services.length;
          return (
            <div
              key={`${s.slug}-${i}`}
              className="services-marquee__item"
              // La 2ᵉ copie est décorative : hors tab-order et lecteurs d'écran.
              {...(isClone ? { inert: true } : {})}
            >
              <ServiceCard service={s} index={i % services.length} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
