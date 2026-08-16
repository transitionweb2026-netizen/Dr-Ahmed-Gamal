"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";

const translationSchema = z.object({
  value_en: z.string().min(1, "Required"),
  value_ar: z.string().min(1, "Required"),
});

export interface TranslationFormResult {
  ok: boolean;
  error?: string;
}

export async function updateTranslationAction(
  key: string,
  _prev: TranslationFormResult | null,
  formData: FormData,
): Promise<TranslationFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = translationSchema.safeParse({
    value_en: formData.get("value_en"),
    value_ar: formData.get("value_ar"),
  });
  if (!parsed.success) return { ok: false, error: "Both languages are required." };

  const { error } = await supabase.from("translations").upsert([
    { key, locale: "en", value: parsed.data.value_en },
    { key, locale: "ar", value: parsed.data.value_ar },
  ]);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/translations");
  revalidatePath(`/admin/translations/${encodeURIComponent(key)}`);
  revalidatePublicSite();
  return { ok: true };
}
