import { getSupabasePublicClient } from "@/lib/supabase/public";
import { navLinks as staticNavLinks, type NavLink } from "@/constants/nav";

export async function getNavLinks(): Promise<NavLink[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticNavLinks;

  const { data, error } = await supabase
    .from("nav_links")
    .select("*")
    .eq("is_visible", true)
    .order("order_index");

  if (error || !data) return staticNavLinks;

  return data.map((row): NavLink => ({ href: row.href, label: row.label }));
}
