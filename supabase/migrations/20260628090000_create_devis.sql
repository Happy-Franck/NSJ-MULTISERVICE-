-- Migration : création de la table des demandes de devis.
-- Idempotente (if not exists) pour pouvoir s'appliquer même si la table
-- a déjà été créée manuellement.

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
  statut      text not null default 'nouveau'
);

create index if not exists devis_created_at_idx on public.devis (created_at desc);

-- RLS activée, aucune policy publique : seul le service role (côté serveur)
-- peut lire/écrire.
alter table public.devis enable row level security;
