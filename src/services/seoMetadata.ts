import { getSupabasePublicClient } from "@/lib/supabase/public";
import type { Bilingual } from "@/types/content";

export interface SeoMetadata {
  metaTitle: Bilingual;
  metaDescription: Bilingual;
  ogImage: string | null;
}

/** CMS-editable SEO overrides (admin: /admin/seo). Returns null when the
 * CMS is unreachable or the page has no row — callers fall back to their
 * existing translation-derived title/description in that case. */
export async function getSeoMetadata(pageSlug: string): Promise<SeoMetadata | null> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("seo_metadata")
    .select("meta_title, meta_description, og_image")
    .eq("page_slug", pageSlug)
    .maybeSingle();

  if (error || !data) return null;

  return {
    metaTitle: data.meta_title,
    metaDescription: data.meta_description,
    ogImage: data.og_image,
  };
}
