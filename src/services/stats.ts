import { getSupabasePublicClient } from "@/lib/supabase/public";
import { stats as staticStats } from "@/content/stats";
import type { Stat } from "@/types/content";

export async function getStats(): Promise<Stat[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticStats;

  const { data, error } = await supabase.from("stats").select("*").eq("is_published", true).order("order_index");

  if (error || !data) return staticStats;

  return data.map(
    (row): Stat => ({
      id: row.slug,
      value: row.value,
      label: row.label,
      icon: row.icon,
      featuredOnHome: row.featured_on_home,
      featuredOnAbout: row.featured_on_about,
    }),
  );
}
