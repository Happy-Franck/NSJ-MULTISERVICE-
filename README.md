# NSJ Multiservice

Site vitrine **Next.js (App Router) + TypeScript** pour **NSJ Multiservice** —
nettoyage, nettoyage extrême, débarras, rénovation, conciergerie, serrurerie,
transport, bricolage, espaces verts et dératisation en Île-de-France.

Charte graphique **noir · orange · blanc**, thèmes clair/sombre, design bento/glass.

## Fonctionnalités

- 5 pages : Accueil, Services, Réalisations, À propos, Contact
- Thème clair/sombre (sans flash au chargement)
- Galerie avant/après interactive (slider + filtres + lightbox)
- Carousel d'avis, compteurs animés, bouton WhatsApp flottant
- **Formulaire de devis** : stockage **Supabase** + notification **email (SMTP)**

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev                  # http://localhost:3000
```

## Configuration du formulaire de devis

### 1. Supabase

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, exécuter le contenu de [`supabase/schema.sql`](supabase/schema.sql)
   (crée la table `devis`).
3. Dans **Project Settings → API**, récupérer :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` (secret) → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Email (SMTP / Nodemailer)

Renseigner `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.
Pour **Gmail**, créer un *mot de passe d'application* (App Password) et l'utiliser
comme `SMTP_PASS`. Les demandes sont envoyées vers `DEVIS_TO_EMAIL`.

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lancer le build de production |
| `npm run lint` | Linter ESLint |

## Stack

Next.js 16 · React 19 · TypeScript · Supabase · Nodemailer · CSS (tokens, sans Tailwind).
