"use client";

import { useEffect, useRef, useState } from "react";
import { catLabel, gallery as allItems, type GalleryItem } from "@/lib/data";

const FILTERS: { value: "all" | GalleryItem["cat"]; label: string }[] = [
  { value: "all", label: "Tout" },
  { value: "nettoyage", label: "Nettoyage" },
  { value: "debarras", label: "Débarras" },
  { value: "renovation", label: "Rénovation" },
  { value: "espaces-verts", label: "Espaces verts" },
];

export default function Gallery({
  limit,
  showFilters = false,
}: {
  limit?: number;
  showFilters?: boolean;
}) {
  const [active, setActive] = useState<"all" | GalleryItem["cat"]>("all");
  const base = typeof limit === "number" ? allItems.slice(0, limit) : allItems;
  // On filtre réellement la liste rendue (au lieu de masquer en CSS) : la
  // grille se réagence proprement, sans trous ni cartes fantômes.
  const items = active === "all" ? base : base.filter((it) => it.cat === active);

  // Révélation à l'apparition gérée dans React (et non via le ScrollReveal
  // global) : sinon un re-rendu au clic sur un filtre effacerait la classe
  // `is-visible` ajoutée en DOM. Indexée par titre (clé stable) car filtrer
  // réordonne la liste — un index désignerait alors une autre carte.
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          const next = new Set(prev);
          let changed = false;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const key = (entry.target as HTMLElement).dataset.key;
              if (key && !next.has(key)) {
                next.add(key);
                changed = true;
              }
              io.unobserve(entry.target);
            }
          });
          return changed ? next : prev;
        });
      },
      { threshold: 0.12 },
    );
    // Réobserve les cartes actuellement montées à chaque changement de filtre,
    // sinon une carte affichée par un onglet mais jamais vue au scroll
    // resterait invisible (opacity 0).
    cardRefs.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active]);

  return (
    <>
      {showFilters && (
        <div
          className="filters"
          id="filters"
          role="tablist"
          aria-label="Filtrer les réalisations"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={active === f.value}
              className={`filter${active === f.value ? " is-active" : ""}`}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="gallery" id="gallery">
        {items.map((item) => (
          <div
            key={item.title}
            ref={(el) => {
              if (el) cardRefs.current.set(item.title, el);
              else cardRefs.current.delete(item.title);
            }}
            className={`ba-card${revealed.has(item.title) ? " is-visible" : ""}`}
            data-cat={item.cat}
            data-key={item.title}
            data-reveal
          >
            <BeforeAfter item={item} />
            <div className="ba-card__meta">
              <span className="ba-card__title">{item.title}</span>
              <span className="ba-card__cat">{catLabel[item.cat]}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function BeforeAfter({ item }: { item: GalleryItem }) {
  const baRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  function setFromClientX(clientX: number) {
    const el = baRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  }

  return (
    <div
      className="ba"
      ref={baRef}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) setFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="ba__img ba__after"
        src={item.after}
        alt={`${item.title} après`}
        loading="lazy"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="ba__img ba__before"
        src={item.before}
        alt={`${item.title} avant`}
        loading="lazy"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <span className="ba__label ba__label--before">Avant</span>
      <span className="ba__label ba__label--after">Après</span>
      <button
        className="ba__zoom"
        type="button"
        aria-label="Agrandir la photo"
        data-zoom={item.after}
      >
        ⤢
      </button>
      <div className="ba__handle" style={{ left: `${pos}%` }}></div>
    </div>
  );
}
