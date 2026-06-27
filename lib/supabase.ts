import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Client Supabase côté serveur uniquement (utilise la SERVICE ROLE KEY).
// Ne JAMAIS importer ce module dans un composant client.
// Instancié paresseusement pour ne pas planter au build si les variables
// d'environnement ne sont pas encore renseignées.
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase non configuré : définissez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local",
    );
  }

  cached = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
