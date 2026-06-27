// Type partagé + validation serveur d'une demande de devis.

export type DevisInput = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  adresse: string;
  prestation: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Valide et normalise le corps de la requête. Renvoie soit les données
// nettoyées, soit la liste des champs en erreur.
export function validateDevis(
  body: unknown,
): { ok: true; data: DevisInput } | { ok: false; errors: string[] } {
  const b = (body ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const data: DevisInput = {
    nom: str(b.nom),
    prenom: str(b.prenom),
    telephone: str(b.telephone),
    email: str(b.email),
    adresse: str(b.adresse),
    prestation: str(b.prestation),
    message: str(b.message),
  };

  const errors: string[] = [];
  (["nom", "prenom", "telephone", "email", "prestation"] as const).forEach(
    (k) => {
      if (!data[k]) errors.push(k);
    },
  );
  if (data.email && !EMAIL_RE.test(data.email)) errors.push("email");

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, data };
}
