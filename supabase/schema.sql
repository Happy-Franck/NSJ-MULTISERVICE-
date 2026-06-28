-- ============================================================
-- NSJ Multiservice — schéma Supabase
-- Table de stockage des demandes de devis.
-- À exécuter dans : Supabase Dashboard > SQL Editor.
-- ============================================================

create table if not exists public.devis (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nom         text not null,
  prenom      text not null,
  telephone   text not null,
  email       text not null,
  adresse     text,
  prestation  text not null,
  message     text,
  photos      text[],            -- URLs publiques des photos (Supabase Storage)
  statut      text not null default 'nouveau'
);

-- Si la table existe déjà sans la colonne photos, exécuter :
--   alter table public.devis add column if not exists photos text[];

-- Index pour trier rapidement les demandes les plus récentes.
create index if not exists devis_created_at_idx on public.devis (created_at desc);

-- Row Level Security activée : aucune policy publique n'est définie,
-- donc les clés anon/public ne peuvent ni lire ni écrire.
-- L'API serveur (route /api/devis) utilise la SERVICE ROLE KEY,
-- qui contourne la RLS pour insérer les demandes en toute sécurité.
alter table public.devis enable row level security;

-- ------------------------------------------------------------
-- Stockage des photos (Supabase Storage)
-- Bucket PUBLIC "devis-photos" (les liens sont mis dans l'email).
-- Il peut être créé depuis le Dashboard > Storage, ou automatiquement
-- par le script du projet. Équivalent SQL :
--   insert into storage.buckets (id, name, public)
--   values ('devis-photos', 'devis-photos', true)
--   on conflict (id) do nothing;
-- ------------------------------------------------------------
