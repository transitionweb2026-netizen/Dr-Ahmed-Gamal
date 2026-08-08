"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client (anon key only) — used by admin client components
 * that need direct interaction, e.g. Storage uploads. Returns null when
 * unconfigured (same lazy-init/fallback convention as src/lib/resend.ts).
 */
let client: SupabaseClient | null | undefined;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  client = url && anonKey ? createBrowserClient(url, anonKey) : null;
  return client;
}
