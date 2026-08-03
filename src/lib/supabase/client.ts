import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type ProfileRow = {
  id: string;
  username: string;
  display_name: string;
  pin: string | null;
  avatar: unknown;
  progress: unknown;
  tournament_eligible: boolean;
  created_at: string;
  updated_at: string;
};

export type ProfileInsert = {
  id?: string;
  username: string;
  display_name: string;
  pin?: string | null;
  avatar?: unknown;
  progress?: unknown;
  tournament_eligible?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ProfileUpdate = Partial<ProfileInsert>;

let client: SupabaseClient | null | undefined;

/** Kid-friendly connection error (Spanish UI). */
export const CLOUD_ERROR_MSG =
  "¡Uy! La magia de la nube se enredó. Revisa la conexión e inténtalo otra vez.";

export function isSupabaseConfigured(): boolean {
  const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
  const key = (
    import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  )?.trim();
  return Boolean(url && key);
}

/**
 * Browser Supabase client (anon / publishable key).
 * Returns null when env vars are missing (dev sandbox without secrets).
 */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
  const key = (
    import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  )?.trim();

  if (!url || !key) {
    client = null;
    return null;
  }

  client = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return client;
}
