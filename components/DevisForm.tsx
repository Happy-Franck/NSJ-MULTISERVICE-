"use client";

import { useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import fr from "react-phone-number-input/locale/fr";
import "react-phone-number-input/style.css";
import { prestations } from "@/lib/data";
import { PRESTATION_EVENT } from "@/components/PrestationCta";

type Status = "idle" | "loading" | "success" | "error";
const REQUIRED = ["nom", "prenom", "email", "prestation"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_FILE_INFO = "JPG, PNG — plusieurs fichiers possibles";
const MAX_FILES = 6;
const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo

export default function DevisForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [fileInfo, setFileInfo] = useState(DEFAULT_FILE_INFO);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [prestation, setPrestation] = useState("");

  // Pré-remplissage depuis une card service (« Demander un devis »).
  useEffect(() => {
    function onPick(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string" && prestations.includes(detail)) {
        setPrestation(detail);
      }
    }
    window.addEventListener(PRESTATION_EVENT, onPick);
    return () => window.removeEventListener(PRESTATION_EVENT, onPick);
  }, []);

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

    // Téléphone : numéro international complet (indicatif + numéro).
    const phoneValid = Boolean(phone && isValidPhoneNumber(phone));
    if (!phoneValid) nextErrors.telephone = true;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setNote(
        phone && !phoneValid && Object.keys(nextErrors).length === 1
          ? "Numéro de téléphone invalide."
          : "Merci de remplir correctement les champs obligatoires.",
      );
      return;
    }

    // Validation des photos (optionnelles)
    const photos = data
      .getAll("photos")
      .filter((f): f is File => f instanceof File && f.size > 0);
    if (photos.length > MAX_FILES) {
      setStatus("error");
      setNote(`Maximum ${MAX_FILES} photos.`);
      return;
    }
    for (const p of photos) {
      if (p.size > MAX_SIZE) {
        setStatus("error");
        setNote(`Photo trop volumineuse (max 5 Mo) : ${p.name}`);
        return;
      }
    }

    // Le numéro est déjà au format international (ex. "+33612345678").
    data.set("telephone", phone as string);

    setErrors({});
    setStatus("loading");
    setNote("Envoi en cours…");

    try {
      // multipart/form-data : on envoie le FormData tel quel (champs + fichiers).
      // Ne pas définir Content-Type manuellement (le navigateur gère la limite).
      const res = await fetch("/api/devis", { method: "POST", body: data });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setNote(
        "Merci ! Votre demande a bien été prise en compte. Nous vous répondons sous 24h.",
      );
      form.reset();
      setFileInfo(DEFAULT_FILE_INFO);
      setPhone(undefined);
      setPrestation("");
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
          <PhoneInput
            id="telephone"
            international
            defaultCountry="FR"
            labels={fr}
            value={phone}
            onChange={setPhone}
            placeholder="Numéro de téléphone"
            numberInputProps={{ autoComplete: "tel" }}
          />
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
        <select
          id="prestation"
          name="prestation"
          value={prestation}
          onChange={(e) => setPrestation(e.target.value)}
        >
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
