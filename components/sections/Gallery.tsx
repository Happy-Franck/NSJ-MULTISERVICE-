"use client";

import { useRef, useState } from "react";
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
  const items = typeof limit === "number" ? allItems.slice(0, limit) : allItems;

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
            className={`ba-card${active !== "all" && item.cat !== active ? " is-hidden" : ""}`}
            data-cat={item.cat}
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
