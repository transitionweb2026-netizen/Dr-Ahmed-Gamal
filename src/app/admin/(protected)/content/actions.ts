"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";
import { getContentBlock } from "../../content-blocks";

export interface ContentBlockFormResult {
  ok: boolean;
  error?: string;
  /** Set when text saved fine but the image(s) couldn't be — e.g. the
   * page_images table hasn't been created yet. Shown alongside a normal
   * success message rather than as a hard failure. */
  warning?: string;
}

/**
 * Saves every text field and image in one section together. The block's
 * field/image list comes from the server-side registry (getContentBlock),
 * not the client, so this can't be tricked into writing arbitrary rows.
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

  const textRows: { key: string; locale: "en" | "ar"; value: string }[] = [];
  for (const field of block.fields) {
    const { en, ar } = bilingualFromForm(formData, field.key);
    if (!en || !ar) return { ok: false, error: `“${field.label}” needs both English and Arabic text.` };
    textRows.push({ key: field.key, locale: "en", value: en }, { key: field.key, locale: "ar", value: ar });
  }

  if (textRows.length > 0) {
    const { error } = await supabase.from("translations").upsert(textRows);
    if (error) return { ok: false, error: error.message };
  }

  let imageWarning: string | undefined;
  const images = block.images ?? [];
  if (images.length > 0) {
    const urlSchema = z.string().url("Enter a valid image URL");
    const imageUpdates: { slug: string; url: string }[] = [];
    for (const image of images) {
      const parsed = urlSchema.safeParse(formData.get(`image__${image.slug}`));
      if (!parsed.success) return { ok: false, error: `${image.label}: ${parsed.error.issues[0]?.message}` };
      imageUpdates.push({ slug: image.slug, url: parsed.data });
    }

    const results = await Promise.all(
      imageUpdates.map(({ slug, url }) => supabase.from("page_images").update({ url }).eq("slug", slug)),
    );
    const failed = results.find((r) => r.error);
    if (failed?.error) {
      imageWarning = `Text saved, but the image(s) couldn't be — ${failed.error.message}. The page_images table may not be created yet (see supabase/migrations/0002_page_images.sql).`;
    }
  }

  revalidatePath("/admin/content");
  revalidatePath(`/admin/content/${blockId}`);
  revalidatePublicSite();
  return { ok: true, warning: imageWarning };
}
