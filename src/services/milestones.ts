import { getSupabasePublicClient } from "@/lib/supabase/public";
import { milestones as staticMilestones } from "@/content/milestones";
import type { Milestone } from "@/types/content";

export async function getMilestones(): Promise<Milestone[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticMilestones;

  const { data, error } = await supabase
    .from("milestones")
    .select("*")
    .eq("is_published", true)
    .order("order_index");

  if (error || !data) return staticMilestones;

  return data.map(
    (row): Milestone => ({
      id: row.slug,
      year: row.year,
      title: row.title,
      description: row.description,
      icon: row.icon,
    }),
  );
}
