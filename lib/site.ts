// Coordonnées & constantes globales du site NSJ Multiservice.
// Centralisées ici pour être réutilisées (header, footer, contact, WhatsApp…).

export const site = {
  name: "NSJ Multiservice",
  phoneDisplay: "00 00 00 00 00",
  phoneE164: "+33000000000",
  email: "contact@nsj-multiservice.fr",
  whatsapp: "33000000000",
  whatsappText:
    "Bonjour, je souhaite obtenir un devis pour une prestation NSJ Multiservice.",
  hours: "Lun – Sam · 08h – 20h",
  areas: [
    "Chaville · Viroflay · Versailles",
    "Le Chesnay-Rocquencourt",
    "Boulogne-Billancourt · Paris",
    "Hauts-de-Seine · Yvelines · Île-de-France",
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;

export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappText,
)}`;
