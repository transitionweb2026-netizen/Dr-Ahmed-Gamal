"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const seoSchema = z.object({
  meta_title: bilingualSchema,
  meta_description: bilingualSchema,
  og_image: z.string().url().optional().or(z.literal("")),
});

export interface SeoFormResult {
  ok: boolean;
  error?: string;
}

export async function updateSeoMetadataAction(
  pageSlug: string,
  _prev: SeoFormResult | null,
  formData: FormData,
): Promise<SeoFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = seoSchema.safeParse({
    meta_title: bilingualFromForm(formData, "meta_title"),
    meta_description: bilingualFromForm(formData, "meta_description"),
    og_image: formData.get("og_image"),
  });
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase
    .from("seo_metadata")
    .update({
      meta_title: parsed.data.meta_title,
      meta_description: parsed.data.meta_description,
      og_image: parsed.data.og_image || null,
    })
    .eq("page_slug", pageSlug);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/seo");
  revalidatePath(`/admin/seo/${pageSlug}`);
  revalidatePublicSite();
  return { ok: true };
}
