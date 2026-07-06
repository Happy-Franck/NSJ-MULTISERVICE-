import type { IconName } from "@/lib/icons";

export type Service = {
  icon: IconName;
  title: string;
  text: string;
  wide?: boolean;
  /** Slug utilisé pour le nom de fichier image (`/assets/services/<slug>.jpg`). */
  slug: string;
  /**
   * Photo du service. Laisser vide → placeholder en dégradé (charte noir/orange).
   * Déposer les photos dans `public/assets/services/` puis renseigner le chemin,
   * ex. `image: "/assets/services/entretien-nettoyage.jpg"`.
   */
  image?: string;
};

export const services: Service[] = [
  { icon: "clean", slug: "entretien-nettoyage", title: "Entretien & Nettoyage", text: "Nettoyage régulier ou ponctuel de vos locaux, parties communes et logements.", wide: true },
  { icon: "extreme", slug: "nettoyage-extreme", title: "Nettoyage Extrême", text: "Remise en état des situations difficiles : insalubrité, après sinistre, Diogène." },
  { icon: "concierge", slug: "conciergerie", title: "Conciergerie", text: "Gestion et services sur-mesure pour faciliter votre quotidien." },
  { icon: "debarras", slug: "debarras", title: "Débarras", text: "Débarras complet de maisons, appartements, caves et locaux." },
  { icon: "reno", slug: "renovation", title: "Rénovation Tous Corps d'État", text: "Travaux complets, de la peinture au gros œuvre, coordonnés par nos soins.", wide: true },
  { icon: "serrurerie", slug: "serrurerie", title: "Serrurerie", text: "Ouverture, dépannage et sécurisation de vos serrures et accès." },
  { icon: "transport", slug: "transport", title: "Transport", text: "Transport de marchandises et transport accompagné, en sécurité." },
  { icon: "bricolage", slug: "bricolage", title: "Bricolage", text: "Petits et grands travaux : montage, fixation, réparations." },
  { icon: "verts", slug: "espaces-verts", title: "Espaces Verts", text: "Tonte, taille, élagage et aménagement de vos extérieurs." },
  { icon: "derat", slug: "deratisation", title: "Dératisation & Désinsectisation", text: "Traitement et prévention contre nuisibles et insectes." },
];

export type WhyItem = { icon: IconName; title: string; text: string };

export const why: WhyItem[] = [
  { icon: "bolt", title: "Réactivité", text: "Une prise en charge rapide, au service de vos délais." },
  { icon: "shield", title: "Professionnalisme", text: "Des équipes qualifiées et un travail soigné." },
  { icon: "clock", title: "Devis gratuit sous 24h", text: "Une réponse claire, transparente et sans engagement." },
  { icon: "heart", title: "Satisfaction client", text: "Votre satisfaction est notre priorité absolue." },
];

export type Perk = { icon: IconName; label: string };

export const perks: Perk[] = [
  { icon: "clock", label: "Réponse sous 24h" },
  { icon: "shield", label: "Devis 100 % gratuit" },
  { icon: "heart", label: "Sans engagement" },
];

export type GalleryCategory =
  | "nettoyage"
  | "debarras"
  | "renovation"
  | "espaces-verts";

export type GalleryItem = {
  cat: GalleryCategory;
  title: string;
  before: string;
  after: string;
};

export const catLabel: Record<GalleryCategory, string> = {
  nettoyage: "Nettoyage",
  debarras: "Débarras",
  renovation: "Rénovation",
  "espaces-verts": "Espaces verts",
};

export const gallery: GalleryItem[] = [
  { cat: "nettoyage", title: "Appartement insalubre", before: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80", after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
  { cat: "renovation", title: "Rénovation cuisine", before: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", after: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80" },
  { cat: "debarras", title: "Débarras de local", before: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80", after: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" },
  { cat: "espaces-verts", title: "Entretien de jardin", before: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80", after: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=800&q=80" },
  { cat: "nettoyage", title: "Remise en état SDB", before: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80", after: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80" },
  { cat: "renovation", title: "Rénovation bureaux", before: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", after: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80" },
];

export type Review = {
  stars: number;
  text: string;
  name: string;
  meta: string;
};

export const reviews: Review[] = [
  { stars: 5, text: "Intervention rapide et travail impeccable pour le nettoyage de notre immeuble. Je recommande vivement.", name: "Sophie M.", meta: "Syndic · Boulogne-Billancourt" },
  { stars: 5, text: "Débarras complet d'un appartement en une journée, équipe sérieuse et soignée. Un vrai gain de temps.", name: "Karim B.", meta: "Particulier · Versailles" },
  { stars: 5, text: "Rénovation de notre cuisine du début à la fin avec un seul interlocuteur. Professionnel et à l'écoute.", name: "Élodie R.", meta: "Particulier · Chaville" },
  { stars: 5, text: "Réactivité exemplaire pour une serrurerie en urgence. Devis clair et tarif honnête. Merci !", name: "Agence Horizon", meta: "Agence immobilière · Paris" },
  { stars: 5, text: "Entretien régulier de nos espaces verts, toujours nickel. Une équipe fiable.", name: "Association Lien", meta: "Association · Yvelines" },
];

// Liste des prestations proposées dans le formulaire de devis.
export const prestations: string[] = [
  "Conciergerie",
  "Entretien & Nettoyage",
  "Nettoyage Extrême",
  "Débarras",
  "Rénovation Tous Corps d'État",
  "Serrurerie",
  "Transport",
  "Bricolage",
  "Espaces Verts",
  "Dératisation & Désinsectisation",
  "Autre / Plusieurs prestations",
];
