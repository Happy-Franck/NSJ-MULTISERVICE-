# NSJ Multiservice — Guide projet (CLAUDE.md)

Site vitrine **Next.js (App Router) + TypeScript** pour NSJ Multiservice
(nettoyage, rénovation, débarras, conciergerie & services en Île-de-France).
Charte : **noir · orange (#ff6a00) · blanc**, thèmes clair/sombre.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- CSS global hérité du template d'origine → [`app/globals.css`](app/globals.css)
  (tokens CSS, pas de Tailwind). Polices **Inter** + **Sora** via `next/font`.
- **Supabase** (`@supabase/supabase-js`) : stockage des demandes de devis.
- **Nodemailer** (SMTP) : notification email des demandes de devis.

## Structure

```
app/
  layout.tsx          Shell (Header/Footer/WhatsApp/Lightbox), SEO, thème anti-flash
  page.tsx            Accueil
  services/           Page Services
  realisations/       Page Réalisations (galerie + filtres)
  a-propos/           Page À propos
  contact/            Page Contact
  api/devis/route.ts  POST → validation + insert Supabase + email SMTP
components/           Header, Footer, sections (Hero, Gallery, Reviews…), DevisForm
lib/
  site.ts             Coordonnées + navigation
  data.ts             Services, why, perks, gallery, reviews, prestations
  icons.tsx           Icônes SVG (composant <Icon name=… />)
  devis.ts            Type + validation serveur d'une demande de devis
  supabase.ts         Client Supabase (service role, serveur uniquement)
  mailer.ts           Envoi email SMTP (Nodemailer)
supabase/schema.sql   Schéma de la table `devis`
```

## Commandes

```bash
npm run dev     # développement (http://localhost:3000)
npm run build   # build de production
npm run lint    # eslint
npx tsc --noEmit  # vérification de types
```

## Configuration (devis)

1. Copier `.env.example` → `.env.local` et renseigner les valeurs.
2. Créer un projet Supabase, puis exécuter `supabase/schema.sql` dans le SQL Editor.
3. Renseigner les identifiants SMTP (Gmail : utiliser un *App Password*).
   Les demandes sont envoyées à `DEVIS_TO_EMAIL` (défaut : solofonirina35@gmail.com).

## Règle de travail — commits Git

> **Chaque section / page / logique (front ou back) validée = 1 commit.**

Commits atomiques et descriptifs (`feat:`, `fix:`, `chore:`, `docs:`),
poussés sur `main` (remote : `Happy-Franck/NSJ-MULTISERVICE-`).
Vérifier `npx tsc --noEmit` (ou `npm run build`) avant chaque commit.

## À faire / améliorations possibles

- Upload des photos du formulaire de devis via **Supabase Storage**
  (le champ fichier est présent dans l'UI mais n'est pas encore transmis).
- Remplacer les coordonnées fictives dans [`lib/site.ts`](lib/site.ts)
  (téléphone, email, WhatsApp) par les vraies.
- Renseigner les vraies réalisations/avis dans [`lib/data.ts`](lib/data.ts).
