"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";
import { getContentBlock } from "../../content-blocks";

export interface ContentBlockFormResult {
  ok: boolean;
  error?: string;
}

/**
 * Saves every field in one content block together. The block's field list
 * comes from the server-side registry (getContentBlock), not the client,
 * so this can't be tricked into writing arbitrary translation keys.
 */
export async function updateContentBlockAction(
  blockId: string,
  _prev: ContentBlockFormResult | null,
  formData: FormData,
): Promise<ContentBlockFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const block = getContentBlock(blockId);
  if (!block) return { ok: false, error: "Unknown content block." };

  const rows: { key: string; locale: "en" | "ar"; value: string }[] = [];
  for (const field of block.fields) {
    const { en, ar } = bilingualFromForm(formData, field.key);
    if (!en || !ar) return { ok: false, error: `“${field.label}” needs both English and Arabic text.` };
    rows.push({ key: field.key, locale: "en", value: en }, { key: field.key, locale: "ar", value: ar });
  }

  const { error } = await supabase.from("translations").upsert(rows);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/content");
  revalidatePath(`/admin/content/${blockId}`);
  revalidatePublicSite();
  return { ok: true };
}
