"use client";

import type { ReactNode } from "react";

/** Événement écouté par le formulaire de devis pour pré-remplir « Type de prestation ». */
export const PRESTATION_EVENT = "nsj:prestation";

/**
 * Lien « Demander un devis » d'une card service.
 * - scrolle vers le formulaire (#devis) via l'ancre native,
 * - émet un événement qui pré-remplit le champ « Type de prestation ».
 */
export default function PrestationCta({
  prestation,
  className,
  children,
}: {
  prestation: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#devis"
      className={className}
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent(PRESTATION_EVENT, { detail: prestation }),
        )
      }
    >
      {children}
    </a>
  );
}
