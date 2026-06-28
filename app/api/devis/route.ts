import { NextResponse } from "next/server";
import { validateDevis } from "@/lib/devis";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { sendDevisEmail } from "@/lib/mailer";

// Nodemailer nécessite le runtime Node.js (pas Edge).
export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const result = validateDevis(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Champs invalides", fields: result.errors },
      { status: 422 },
    );
  }
  const devis = result.data;

  // 1) Stockage dans Supabase.
  // Si Supabase n'est pas configuré (dev local), on ignore le stockage pour
  // permettre de tester l'email seul. S'il EST configuré mais échoue, on
  // renvoie une erreur (problème réel à corriger).
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase.from("devis").insert(devis);
      if (error) throw error;
    } catch (err) {
      console.error("[devis] échec insertion Supabase:", err);
      return NextResponse.json(
        { error: "Impossible d'enregistrer la demande." },
        { status: 500 },
      );
    }
  } else {
    console.warn(
      "[devis] Supabase non configuré : stockage ignoré (mode dev).",
    );
  }

  // 2) Notification email (best-effort : la demande est déjà enregistrée).
  let emailSent = true;
  try {
    await sendDevisEmail(devis);
  } catch (err) {
    emailSent = false;
    console.error("[devis] échec envoi email:", err);
  }

  return NextResponse.json({ ok: true, emailSent });
}
