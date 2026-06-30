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

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

// Palette alignée sur la charte du site (noir · orange · blanc).
const C = {
  ink: "#0b0b0d",
  orange: "#ff6a00",
  orangeInk: "#ff8a33",
  text: "#14161a",
  soft: "#5b6470",
  border: "#e7e9ee",
  surface: "#f5f6f8",
};

export async function sendDevisEmail(
  devis: DevisInput,
  attachments: MailAttachment[] = [],
) {
  const transport = getTransport();
  const to = process.env.DEVIS_TO_EMAIL || "solofonirina35@gmail.com";
  const from =
    process.env.SMTP_FROM ||
    process.env.SMTP_USER ||
    "devis@nsj-multiservice.local";

  // Pièces jointes : on ajoute un CID pour afficher chaque image INLINE
  // dans le corps de l'email (et elle reste téléchargeable en pièce jointe).
  const cidAttachments = attachments.map((a, i) => ({
    ...a,
    cid: `photo${i}@nsj`,
  }));

  const rows: [string, string][] = [
    ["Nom", devis.nom],
    ["Prénom", devis.prenom],
    ["Téléphone", devis.telephone],
    ["Email", devis.email],
    ["Adresse", devis.adresse || "—"],
    ["Message", devis.message || "—"],
  ];

  const fieldsHtml = rows
    .map(
      ([k, v]) =>
        `<tr>
           <td style="padding:11px 0;border-bottom:1px solid ${C.border};color:${C.soft};font-size:13px;width:130px;vertical-align:top">${k}</td>
           <td style="padding:11px 0;border-bottom:1px solid ${C.border};color:${C.text};font-size:14px;font-weight:600">${escapeHtml(v)}</td>
         </tr>`,
    )
    .join("");

  const photosHtml =
    cidAttachments.length > 0
      ? `<tr><td style="padding:22px 28px 4px">
           <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:${C.text};text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px">
             Photos jointes (${cidAttachments.length})
           </div>
           ${cidAttachments
             .map(
               (a) =>
                 `<img src="cid:${a.cid}" alt="${escapeHtml(a.filename)}" style="width:100%;max-width:520px;height:auto;border-radius:12px;border:1px solid ${C.border};margin-bottom:10px;display:block" />`,
             )
             .join("")}
         </td></tr>`
      : "";

  const html = `
  <div style="background:${C.surface};margin:0;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;margin:0 auto;background:#ffffff;border:1px solid ${C.border};border-radius:16px;overflow:hidden">
      <!-- Header -->
      <tr>
        <td style="background:${C.ink};padding:24px 28px">
          <div style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-.02em">
            NSJ <span style="color:${C.orange}">Multiservice</span>
          </div>
          <div style="margin-top:6px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${C.orangeInk}">
            Nouvelle demande de devis
          </div>
        </td>
      </tr>
      <!-- Bandeau prestation -->
      <tr>
        <td style="padding:24px 28px 0">
          <div style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.orangeInk}">Prestation demandée</div>
          <div style="font-size:22px;font-weight:800;color:${C.text};margin-top:4px">${escapeHtml(devis.prestation)}</div>
        </td>
      </tr>
      <!-- Champs -->
      <tr>
        <td style="padding:14px 28px 0">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
            ${fieldsHtml}
          </table>
        </td>
      </tr>
      <!-- CTA -->
      <tr>
        <td style="padding:22px 28px 4px">
          <a href="tel:${escapeHtml(devis.telephone)}" style="display:inline-block;background:${C.orange};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:999px">Rappeler le client</a>
          <a href="mailto:${escapeHtml(devis.email)}" style="display:inline-block;margin-left:8px;background:#ffffff;color:${C.text};text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:999px;border:1.5px solid ${C.border}">Répondre par email</a>
        </td>
      </tr>
      ${photosHtml}
      <!-- Footer -->
      <tr>
        <td style="background:${C.surface};padding:18px 28px;margin-top:16px">
          <div style="font-size:11px;color:${C.soft}">
            Email automatique envoyé depuis <strong style="color:${C.text}">nsj-multiservice</strong>.
            Réponds directement à ce message pour contacter le client.
          </div>
        </td>
      </tr>
    </table>
  </div>`;

  const text = [
    "NSJ Multiservice — Nouvelle demande de devis",
    "",
    `Prestation : ${devis.prestation}`,
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    cidAttachments.length > 0
      ? `${cidAttachments.length} photo(s) en pièce jointe.`
      : "Aucune photo jointe.",
  ].join("\n");

  await transport.sendMail({
    from: `"NSJ Multiservice" <${from}>`,
    to,
    replyTo: devis.email,
    subject: `Nouvelle demande de devis — ${devis.prestation} (${devis.nom} ${devis.prenom})`,
    text,
    html,
    attachments: cidAttachments,
  });
}
