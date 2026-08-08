"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const siteSettingsSchema = z.object({
  name: z.string().min(1, "Required"),
  short_name: z.string().min(1, "Required"),
  logo_url: z.string().url("Must be a valid URL"),
});

export interface SiteSettingsFormResult {
  ok: boolean;
  error?: string;
}

export async function updateSiteSettingsAction(
  _prev: SiteSettingsFormResult | null,
  formData: FormData,
): Promise<SiteSettingsFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = siteSettingsSchema.safeParse({
    name: formData.get("name"),
    short_name: formData.get("short_name"),
    logo_url: formData.get("logo_url"),
  });
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("site_settings").update(parsed.data).eq("id", 1);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/site-settings");
  return { ok: true };
}
