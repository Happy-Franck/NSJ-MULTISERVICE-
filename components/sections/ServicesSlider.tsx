"use client";

import { useEffect, useRef } from "react";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";

/**
 * Slider auto des services — défilement continu piloté en JS sur un conteneur
 * nativement scrollable (`overflow-x: auto`).
 * La liste est dupliquée ×2 pour une boucle infinie (wrap à la moitié).
 * - Desktop : pause au survol souris + reprise à la sortie.
 * - Mobile : swipe/glissé à la main possible ; un simple tap ne fige plus
 *   l'animation (pause pendant l'interaction, reprise juste après).
 * - `prefers-reduced-motion` : pas d'auto-défilement, mais reste parcourable.
 */
export default function ServicesSlider() {
  const loop = [...services, ...services];
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const SPEED = 60; // px / seconde
    const half = () => scroller.scrollWidth / 2; // largeur d'une des deux copies

    let raf = 0;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let last = performance.now();

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!reduce && !paused) {
        scroller.scrollLeft += SPEED * dt;
      }
      // Boucle sans couture dans les deux sens (auto ou glissé manuel).
      const h = half();
      if (h > 0) {
        if (scroller.scrollLeft >= h) scroller.scrollLeft -= h;
        else if (scroller.scrollLeft <= 0) scroller.scrollLeft += h;
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pause = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      paused = true;
    };
    const resume = (delay = 0) => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        last = performance.now();
        paused = false;
      }, delay);
    };

    // Souris (desktop) : pause au survol, reprise à la sortie.
    const onMouseEnter = () => pause();
    const onMouseLeave = () => resume();
    // Tactile (mobile) : pause pendant le glissé, reprise peu après le relâché.
    const onTouchStart = () => pause();
    const onTouchEnd = () => resume(1200);

    scroller.addEventListener("mouseenter", onMouseEnter);
    scroller.addEventListener("mouseleave", onMouseLeave);
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchend", onTouchEnd, { passive: true });
    scroller.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer) clearTimeout(resumeTimer);
      scroller.removeEventListener("mouseenter", onMouseEnter);
      scroller.removeEventListener("mouseleave", onMouseLeave);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchend", onTouchEnd);
      scroller.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <div className="services-marquee" ref={scrollerRef}>
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
