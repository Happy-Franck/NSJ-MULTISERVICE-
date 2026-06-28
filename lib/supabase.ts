import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import WebSocketImpl from "ws";

// Polyfill WebSocket pour Node < 22 : supabase-js initialise un client
// realtime qui exige un WebSocket global (absent avant Node 22). On n'utilise
// pas le realtime, mais il faut que la construction du client n'échoue pas.
if (typeof (globalThis as { WebSocket?: unknown }).WebSocket === "undefined") {
  (globalThis as { WebSocket?: unknown }).WebSocket = WebSocketImpl;
}

// Client Supabase côté serveur uniquement (utilise la SERVICE ROLE KEY).
// Ne JAMAIS importer ce module dans un composant client.
// Instancié paresseusement pour ne pas planter au build si les variables
// d'environnement ne sont pas encore renseignées.
let cached: SupabaseClient | null = null;

// Indique si les variables Supabase sont présentes. Permet de rendre le
// stockage optionnel en développement local (ex : test email seul).
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

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
