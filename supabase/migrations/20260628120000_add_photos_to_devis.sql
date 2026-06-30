-- Migration : support des photos des demandes de devis.
--  - colonne photos (URLs publiques des fichiers stockés)
--  - bucket de stockage public "devis-photos"
-- Idempotente : rejouable sans erreur.

alter table public.devis add column if not exists photos text[];

-- Bucket public pour les photos (les liens sont mis dans l'email).
insert into storage.buckets (id, name, public)
values ('devis-photos', 'devis-photos', true)
on conflict (id) do nothing;

-- Recharge le cache de schéma de l'API.
notify pgrst, 'reload schema';
