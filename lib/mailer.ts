import nodemailer from "nodemailer";
import type { DevisInput } from "@/lib/devis";

// Envoi des notifications de devis par email (SMTP / Nodemailer).

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host) {
    throw new Error(
      "SMTP non configuré : définissez au moins SMTP_HOST dans .env.local",
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true pour 465, false pour 587/STARTTLS
    // Auth optionnelle : les serveurs de test locaux (MailDev, Mailpit…)
    // n'en demandent pas. En production (Gmail…), renseigner USER + PASS.
    ...(user && pass ? { auth: { user, pass } } : {}),
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendDevisEmail(devis: DevisInput) {
  const transport = getTransport();
  const to = process.env.DEVIS_TO_EMAIL || "solofonirina35@gmail.com";
  const from =
    process.env.SMTP_FROM ||
    process.env.SMTP_USER ||
    "devis@nsj-multiservice.local";

  const rows: [string, string][] = [
    ["Nom", devis.nom],
    ["Prénom", devis.prenom],
    ["Téléphone", devis.telephone],
    ["Email", devis.email],
    ["Adresse", devis.adresse || "—"],
    ["Prestation", devis.prestation],
    ["Message", devis.message || "—"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#ff6a00">Nouvelle demande de devis — NSJ Multiservice</h2>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;width:140px;vertical-align:top">${k}</td>
                 <td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(v)}</td>
               </tr>`,
          )
          .join("")}
      </table>
      <p style="color:#888;font-size:12px;margin-top:16px">
        Email automatique envoyé depuis le site nsj-multiservice.
      </p>
    </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  await transport.sendMail({
    from: `"NSJ Multiservice" <${from}>`,
    to,
    replyTo: devis.email,
    subject: `Nouvelle demande de devis — ${devis.prestation} (${devis.nom} ${devis.prenom})`,
    text,
    html,
  });
}
