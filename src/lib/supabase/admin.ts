import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — bypasses RLS. Server-only: never import
 * this from a "use client" file or expose SUPABASE_SERVICE_ROLE_KEY to the
 * browser. Used by admin Server Actions to write CMS data. Returns null
 * when unconfigured (same lazy-init/fallback convention as src/lib/resend.ts).
 */
let client: SupabaseClient | null | undefined;

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  client = url && serviceRoleKey ? createClient(url, serviceRoleKey, { auth: { persistSession: false } }) : null;
  return client;
}
