import { NextResponse } from "next/server";
import { validateDevis } from "@/lib/devis";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { sendDevisEmail, type MailAttachment } from "@/lib/mailer";

// Nodemailer + upload nécessitent le runtime Node.js (pas Edge).
export const runtime = "nodejs";

const BUCKET = "devis-photos";
const MAX_FILES = 6;
const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo
const ALLOWED = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/heic"];

function sanitize(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
}

export async function POST(request: Request) {
  // Le formulaire envoie du multipart/form-data (champs texte + fichiers).
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  // Le téléphone est composé de l'indicatif pays + du numéro (champs séparés).
  const dialCode = String(form.get("dialCode") ?? "").trim();
  const rawPhone = String(form.get("telephone") ?? "").trim();
  const telephone =
    dialCode && rawPhone ? `${dialCode} ${rawPhone}` : rawPhone;

  const body = {
    nom: form.get("nom"),
    prenom: form.get("prenom"),
    telephone,
    email: form.get("email"),
    adresse: form.get("adresse"),
    prestation: form.get("prestation"),
    message: form.get("message"),
  };

  const result = validateDevis(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Champs invalides", fields: result.errors },
      { status: 422 },
    );
  }
  const devis = result.data;

  // --- Récupération + validation des fichiers ---
  const files = form
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0)
    .slice(0, MAX_FILES);

  for (const file of files) {
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `Photo trop volumineuse (max 5 Mo) : ${file.name}` },
        { status: 422 },
      );
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { error: `Format d'image non supporté : ${file.name}` },
        { status: 422 },
      );
    }
  }

  // Identifiant commun à la ligne DB et au dossier de stockage.
  const id = crypto.randomUUID();

  // Prépare les pièces jointes email (toujours, même sans Supabase).
  const attachments: MailAttachment[] = [];
  const buffers: { file: File; buffer: Buffer }[] = [];
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    buffers.push({ file, buffer });
    attachments.push({
      filename: sanitize(file.name) || "photo",
      content: buffer,
      contentType: file.type,
    });
  }

  // --- Stockage Supabase (storage + table) si configuré ---
  const photoUrls: string[] = [];
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();

      // 1) Upload des photos dans le bucket.
      for (let i = 0; i < buffers.length; i++) {
        const { file, buffer } = buffers[i];
        const path = `${id}/${i}-${sanitize(file.name) || "photo"}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, buffer, { contentType: file.type, upsert: true });
        if (upErr) throw upErr;
        photoUrls.push(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
      }

      // 2) Insertion de la demande (avec URLs des photos).
      const { error } = await supabase
        .from("devis")
        .insert({ id, ...devis, photos: photoUrls });
      if (error) throw error;
    } catch (err) {
      console.error("[devis] échec stockage Supabase:", err);
      return NextResponse.json(
        { error: "Impossible d'enregistrer la demande." },
        { status: 500 },
      );
    }
  } else {
    console.warn("[devis] Supabase non configuré : stockage ignoré (mode dev).");
  }

  // --- Notification email (best-effort : la demande est déjà enregistrée) ---
  let emailSent = true;
  try {
    // Les photos sont envoyées en pièces jointes (affichées inline dans l'email).
    // Les URLs Storage restent enregistrées en base (devis.photos) pour consultation.
    await sendDevisEmail(devis, attachments);
  } catch (err) {
    emailSent = false;
    console.error("[devis] échec envoi email:", err);
  }

  return NextResponse.json({ ok: true, emailSent, photos: photoUrls.length });
}
