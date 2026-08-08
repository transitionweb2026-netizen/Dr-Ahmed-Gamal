import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SiteSettingsForm } from "./SiteSettingsForm";

export default async function AdminSiteSettingsPage() {
  const supabase = await getSupabaseServerClient();
  const { data: row } = (await supabase?.from("site_settings").select("*").eq("id", 1).maybeSingle()) ?? {
    data: null,
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Site Settings</h1>
      <p className="mt-1 text-sm text-slate-500">Global site name and logo.</p>
      <div className="mt-6">
        {row ? (
          <SiteSettingsForm defaultValues={{ name: row.name, short_name: row.short_name, logo_url: row.logo_url }} />
        ) : (
          <p className="text-sm text-slate-400">No site settings row found.</p>
        )}
      </div>
    </div>
  );
}
