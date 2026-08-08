import { getSupabasePublicClient } from "@/lib/supabase/public";
import { whyChooseUs as staticWhyChooseUs } from "@/content/whyChooseUs";
import type { ChecklistItem } from "@/types/content";

export async function getWhyChooseUs(): Promise<ChecklistItem[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticWhyChooseUs;

  const { data, error } = await supabase
    .from("checklist_items")
    .select("*")
    .eq("is_published", true)
    .order("order_index");

  if (error || !data) return staticWhyChooseUs;

  return data.map(
    (row): ChecklistItem => ({
      id: row.slug,
      text: row.text,
      icon: row.icon,
    }),
  );
}
