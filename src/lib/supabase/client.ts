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
let clientStamp: string | null = null;
let didLogEnv = false;

/** Kid-friendly connection error (Spanish UI). */
export const CLOUD_ERROR_MSG =
  "¡Uy! La magia de la nube se enredó. Revisa la conexión e inténtalo otra vez.";

/** Strip accidental quotes/whitespace from Vercel dashboard values */
function cleanEnv(raw: unknown): string {
  if (raw == null) return "";
  let s = String(raw).trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  // Treat common placeholders as empty
  if (!s || s === "undefined" || s === "null") return "";
  return s;
}

function readEnvVar(name: string): string {
  // Vite inlines import.meta.env.VITE_* at build time (client + SSR bundles)
  try {
    const meta = import.meta.env as Record<string, unknown>;
    const fromMeta = cleanEnv(meta?.[name]);
    if (fromMeta) return fromMeta;
  } catch {
    /* ignore */
  }

  // Node / Nitro runtime (server) — process.env may hold the same keys
  try {
    if (typeof process !== "undefined" && process.env) {
      const fromProc = cleanEnv(process.env[name]);
      if (fromProc) return fromProc;
    }
  } catch {
    /* ignore */
  }

  return "";
}

export type SupabaseEnvStatus = {
  url: string;
  key: string;
  configured: boolean;
  hasUrl: boolean;
  hasKey: boolean;
  urlHost: string | null;
};

/**
 * Resolve Supabase URL + anon/publishable key from env.
 * Accepts VITE_SUPABASE_* (preferred) and common aliases.
 */
export function getSupabaseEnv(): SupabaseEnvStatus {
  const url =
    readEnvVar("VITE_SUPABASE_URL") ||
    readEnvVar("SUPABASE_URL") ||
    readEnvVar("NEXT_PUBLIC_SUPABASE_URL");

  const key =
    readEnvVar("VITE_SUPABASE_ANON_KEY") ||
    readEnvVar("VITE_SUPABASE_PUBLISHABLE_KEY") ||
    readEnvVar("SUPABASE_ANON_KEY") ||
    readEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  let urlHost: string | null = null;
  if (url) {
    try {
      urlHost = new URL(url).host;
    } catch {
      urlHost = "(url inválida)";
    }
  }

  return {
    url,
    key,
    configured: Boolean(url && key && url.startsWith("http")),
    hasUrl: Boolean(url),
    hasKey: Boolean(key),
    urlHost,
  };
}

function logEnvOnce(status: SupabaseEnvStatus) {
  if (didLogEnv) return;
  didLogEnv = true;
  if (typeof console === "undefined") return;
  if (status.configured) {
    console.info(
      "[Academia Arcana] Nube: OK",
      `· host=${status.urlHost ?? "?"}`,
      `· key=${status.hasKey ? "sí" : "no"}`,
    );
  } else {
    console.warn(
      "[Academia Arcana] Nube: variables no encontradas",
      `· VITE_SUPABASE_URL=${status.hasUrl ? "sí" : "no"}`,
      `· VITE_SUPABASE_ANON_KEY=${status.hasKey ? "sí" : "no"}`,
      "· modo local (el progreso se guarda en este aparato)",
    );
  }
}

export function isSupabaseConfigured(): boolean {
  const status = getSupabaseEnv();
  logEnvOnce(status);
  return status.configured;
}

/**
 * Browser / SSR Supabase client (anon / publishable key).
 * Returns null when env vars are missing.
 * Does not permanently cache a failed (null) client — rechecks env each call.
 */
export function getSupabase(): SupabaseClient | null {
  const status = getSupabaseEnv();
  logEnvOnce(status);

  if (!status.configured) {
    client = null;
    clientStamp = null;
    return null;
  }

  const stamp = `${status.url}::${status.key.slice(0, 12)}`;
  if (client && clientStamp === stamp) return client;

  client = createClient(status.url, status.key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  clientStamp = stamp;
  return client;
}

/** Force re-read env (e.g. after hydration). Safe to call often. */
export function refreshSupabaseClient(): SupabaseClient | null {
  client = undefined;
  clientStamp = null;
  didLogEnv = false;
  return getSupabase();
}
