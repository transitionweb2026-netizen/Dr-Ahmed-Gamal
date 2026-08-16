import { getSupabasePublicClient } from "@/lib/supabase/public";
import { pageImages as staticPageImages } from "@/constants/pageImages";

/** Hero/section background images, keyed by slug (admin: /admin/page-images).
 * Falls back to the static bundled URLs when the CMS/table is unreachable,
 * so a missing table or unset env vars never breaks a page. */
export async function getPageImages(): Promise<Record<string, string>> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticPageImages;

  const { data, error } = await supabase.from("page_images").select("slug, url");
  if (error || !data || data.length === 0) return staticPageImages;

  return { ...staticPageImages, ...Object.fromEntries(data.map((row) => [row.slug, row.url])) };
}
