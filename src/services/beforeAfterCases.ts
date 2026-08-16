import { getSupabasePublicClient } from "@/lib/supabase/public";
import { beforeAfterCases as staticCases } from "@/content/beforeAfterCases";
import type { BeforeAfterCase } from "@/types/content";

export async function getBeforeAfterCases(): Promise<BeforeAfterCase[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticCases;

  const { data, error } = await supabase
    .from("before_after_cases")
    .select("*")
    .eq("is_published", true)
    .order("order_index");

  if (error || !data) return staticCases;

  return data.map(
    (row): BeforeAfterCase => ({
      id: row.slug,
      title: row.title,
      subtitle: row.subtitle,
      category: row.category,
      beforeImage: row.before_image,
      afterImage: row.after_image,
      featuredOnHome: row.featured_on_home,
      showInCategoryGallery: row.show_in_category_gallery,
    }),
  );
}
