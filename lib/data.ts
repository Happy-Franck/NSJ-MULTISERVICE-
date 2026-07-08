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
  { icon: "clean", slug: "entretien-nettoyage", title: "Entretien & Nettoyage", text: "Nettoyage régulier ou ponctuel de vos locaux, parties communes et logements.", wide: true, image: "/assets/services/entretien-nettoyage.jpg" },
  { icon: "extreme", slug: "nettoyage-extreme", title: "Nettoyage Extrême", text: "Remise en état des situations difficiles : insalubrité, après sinistre, Diogène.", image: "/assets/services/nettoyage-extreme.jpg" },
  { icon: "concierge", slug: "conciergerie", title: "Conciergerie", text: "Gestion et services sur-mesure pour faciliter votre quotidien.", image: "/assets/services/conciergerie.jpg" },
  { icon: "debarras", slug: "debarras", title: "Débarras", text: "Débarras complet de maisons, appartements, caves et locaux.", image: "/assets/services/debarras.jpg" },
  { icon: "reno", slug: "renovation", title: "Rénovation Tous Corps d'État", text: "Travaux complets, de la peinture au gros œuvre, coordonnés par nos soins.", wide: true, image: "/assets/services/renovation.jpg" },
  { icon: "serrurerie", slug: "serrurerie", title: "Serrurerie", text: "Ouverture, dépannage et sécurisation de vos serrures et accès.", image: "/assets/services/serrurerie.jpg" },
  { icon: "transport", slug: "transport", title: "Transport", text: "Transport de marchandises et transport accompagné, en sécurité.", image: "/assets/services/transport.jpg" },
  { icon: "bricolage", slug: "bricolage", title: "Bricolage", text: "Petits et grands travaux : montage, fixation, réparations.", image: "/assets/services/bricolage.jpg" },
  { icon: "verts", slug: "espaces-verts", title: "Espaces Verts", text: "Tonte, taille, élagage et aménagement de vos extérieurs.", image: "/assets/services/espaces-verts.jpg" },
  { icon: "derat", slug: "deratisation", title: "Dératisation & Désinsectisation", text: "Traitement et prévention contre nuisibles et insectes.", image: "/assets/services/deratisation.jpg" },
  { icon: "biens", slug: "gestion-biens-logements", title: "Gestion de biens & Logements", text: "États des lieux, remise des clés, visites de contrôle, mise en sécurité et coordination des interventions.", wide: true },
  { icon: "literie", slug: "gestion-literie", title: "Gestion de la literie", text: "Fourniture, entretien et remplacement de votre linge de maison : mise en place du linge de lit, changement des draps et serviettes, collecte et blanchisserie, contrôle de l'état du linge et réapprovisionnement." },
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
  { cat: "nettoyage", title: "Appartement insalubre", before: "/assets/realisations/appartement-insalubre-before.jpeg", after: "/assets/realisations/appartement-insalubre-after.jpeg" },
  { cat: "renovation", title: "Rénovation cuisine", before: "/assets/realisations/renovation-cuisine-before.jpeg", after: "/assets/realisations/renovation-cuisine-after.jpeg" },
  { cat: "debarras", title: "Débarras de local", before: "/assets/realisations/debarras-local-before.jpeg", after: "/assets/realisations/debarras-local-after.jpeg" },
  { cat: "espaces-verts", title: "Entretien de jardin", before: "/assets/realisations/espace-vert-before.jpeg", after: "/assets/realisations/espace-vert-after.jpeg" },
  { cat: "nettoyage", title: "Remise en état SDB", before: "/assets/realisations/renovation-sdb-before.jpeg", after: "/assets/realisations/renovation-sdb-after.jpeg" },
  { cat: "renovation", title: "Rénovation bureaux", before: "/assets/realisations/renovation-bureaux-before.png", after: "/assets/realisations/renovation-bureaux-after.webp" },
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
  "Gestion de biens & Logements",
  "Gestion de la literie",
  "Autre / Plusieurs prestations",
];
