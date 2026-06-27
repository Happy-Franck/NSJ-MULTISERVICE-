"use client";

import { useEffect, useState } from "react";

// Visionneuse plein écran : écoute les clics sur tout bouton [data-zoom]
// (boutons d'agrandissement des cartes avant/après).
export default function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const zoom = target.closest<HTMLElement>("[data-zoom]");
      if (zoom?.dataset.zoom) setSrc(zoom.dataset.zoom);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSrc(null);
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      className={`lightbox${src ? " is-open" : ""}`}
      aria-hidden={!src}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSrc(null);
      }}
    >
      <button
        className="lightbox__close"
        type="button"
        aria-label="Fermer"
        onClick={() => setSrc(null)}
      >
        ×
      </button>
      {src && <img src={src} alt="Réalisation NSJ Multiservice" />}
    </div>
  );
}
