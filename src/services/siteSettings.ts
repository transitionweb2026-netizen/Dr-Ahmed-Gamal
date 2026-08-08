import { getSupabasePublicClient } from "@/lib/supabase/public";
import { site as staticSite } from "@/constants/site";

export async function getSiteSettings(): Promise<typeof staticSite> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticSite;

  const { data: row, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error || !row) return staticSite;

  // url/locales/defaultLocale are infra config, not CMS content — kept from
  // the static object; only name/shortName/logoUrl come from the CMS.
  return {
    ...staticSite,
    name: row.name,
    shortName: row.short_name,
    logoUrl: row.logo_url,
  };
}
