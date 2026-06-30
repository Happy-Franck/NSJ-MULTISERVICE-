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
2. Créer le schéma (table `devis`, colonne `photos`, bucket `devis-photos`).
   Deux options :
   - **Rapide** : copier [`supabase/schema.sql`](supabase/schema.sql) dans le **SQL Editor**.
   - **Recommandé (migrations versionnées)** : voir la section *Migrations* ci-dessous.
3. Dans **Project Settings → API**, récupérer :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - clé `publishable` (ou `anon`) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - clé `secret` (ou `service_role`) → `SUPABASE_SERVICE_ROLE_KEY`

#### Migrations (Supabase CLI)

La structure de la base est versionnée dans [`supabase/migrations/`](supabase/migrations/)
(un fichier SQL horodaté par changement). Les migrations sont **idempotentes**
(`if not exists`) : on peut les rejouer sans risque.

```bash
npm run db:link    # relier au projet distant (une fois) — demande ton access token
npm run db:push    # applique les migrations non encore jouées sur la base distante
npm run db:new -- nom_du_changement   # crée un nouveau fichier de migration
```

> Pour modifier la base : on ne réécrit pas une table existante, on ajoute une
> **nouvelle** migration (ex. `alter table … add column …`) puis `npm run db:push`.

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
| `npm run mail` | Faux serveur SMTP local (MailDev, web sur :1080) |
| `npm run db:link` | Relier la CLI au projet Supabase distant |
| `npm run db:push` | Appliquer les migrations sur la base distante |
| `npm run db:new -- <nom>` | Créer un nouveau fichier de migration |

## Stack

Next.js 16 · React 19 · TypeScript · Supabase · Nodemailer · CSS (tokens, sans Tailwind).
