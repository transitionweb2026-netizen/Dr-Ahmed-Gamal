import { getSupabasePublicClient } from "@/lib/supabase/public";
import { procedures as staticProcedures } from "@/content/procedures";
import type { Procedure } from "@/types/content";

export async function getProcedures(): Promise<Procedure[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticProcedures;

  const { data, error } = await supabase
    .from("procedures")
    .select("*")
    .eq("is_published", true)
    .order("order_index");

  if (error || !data) return staticProcedures;

  return data.map(
    (row): Procedure => ({
      slug: row.slug,
      name: row.name,
      shortDescription: row.short_description,
      category: row.category,
      icon: row.icon,
      image: row.image,
      featuredOnHome: row.featured_on_home,
      order: row.order_index,
      detail: {
        overview: row.overview,
        recovery: row.recovery,
        faq: row.faq ?? [],
      },
    }),
  );
}
