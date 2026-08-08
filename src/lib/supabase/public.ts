import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Anon-key Supabase client for PUBLIC page data fetching — deliberately NOT
 * cookie-aware (unlike src/lib/supabase/server.ts, used only by /admin).
 * Reading cookies() would opt every public route out of static generation;
 * public pages never need a user session, only the anon "published content"
 * view, so this plain client keeps generateStaticParams/ISR working.
 * Returns null when unconfigured so callers fall back to bundled content.
 */
let client: SupabaseClient | null | undefined;

export function getSupabasePublicClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  client = url && anonKey ? createClient(url, anonKey) : null;
  return client;
}
