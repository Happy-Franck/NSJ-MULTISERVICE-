"use client";

import { useState } from "react";
import { prestations } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";
const REQUIRED = ["nom", "prenom", "telephone", "email", "prestation"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_FILE_INFO = "JPG, PNG — plusieurs fichiers possibles";

export default function DevisForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [fileInfo, setFileInfo] = useState(DEFAULT_FILE_INFO);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(
      [...REQUIRED, "adresse", "message"].map((k) => [
        k,
        String(data.get(k) ?? "").trim(),
      ]),
    ) as Record<string, string>;

    // Validation
    const nextErrors: Record<string, boolean> = {};
    REQUIRED.forEach((k) => {
      if (!values[k]) nextErrors[k] = true;
    });
    if (values.email && !EMAIL_RE.test(values.email)) nextErrors.email = true;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setNote("Merci de remplir correctement les champs obligatoires.");
      return;
    }

    setErrors({});
    setStatus("loading");
    setNote("Envoi en cours…");

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setNote(
        "Merci ! Votre demande a bien été prise en compte. Nous vous répondons sous 24h.",
      );
      form.reset();
      setFileInfo(DEFAULT_FILE_INFO);
    } catch {
      setStatus("error");
      setNote(
        "Une erreur est survenue. Réessayez ou contactez-nous directement par téléphone.",
      );
    }
  }

  const cls = (k: string) => `field${errors[k] ? " is-error" : ""}`;

  return (
    <form className="form" id="quoteForm" noValidate onSubmit={handleSubmit}>
      <div className="form__row">
        <div className={cls("nom")}>
          <label htmlFor="nom">Nom *</label>
          <input id="nom" name="nom" type="text" autoComplete="family-name" />
        </div>
        <div className={cls("prenom")}>
          <label htmlFor="prenom">Prénom *</label>
          <input id="prenom" name="prenom" type="text" autoComplete="given-name" />
        </div>
      </div>
      <div className="form__row">
        <div className={cls("telephone")}>
          <label htmlFor="telephone">Téléphone *</label>
          <input id="telephone" name="telephone" type="tel" autoComplete="tel" />
        </div>
        <div className={cls("email")}>
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="adresse">Adresse</label>
        <input id="adresse" name="adresse" type="text" autoComplete="street-address" />
      </div>
      <div className={cls("prestation")}>
        <label htmlFor="prestation">Type de prestation *</label>
        <select id="prestation" name="prestation" defaultValue="">
          <option value="">Sélectionnez une prestation…</option>
          {prestations.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Décrivez votre besoin…"
        />
      </div>
      <div className="field">
        <label htmlFor="photos" className="file">
          <span>Ajouter des photos</span>
          <small id="fileInfo">{fileInfo}</small>
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const n = e.target.files?.length ?? 0;
            setFileInfo(n ? `${n} fichier(s) sélectionné(s)` : DEFAULT_FILE_INFO);
          }}
        />
      </div>
      <button
        type="submit"
        className="btn btn--primary btn--lg btn--block"
        disabled={status === "loading"}
      >
        Obtenir mon devis gratuit
      </button>
      <p
        className={`note${status === "success" ? " is-success" : ""}${status === "error" ? " is-error" : ""}`}
        id="formNote"
        role="status"
        aria-live="polite"
      >
        {note}
      </p>
    </form>
  );
}
