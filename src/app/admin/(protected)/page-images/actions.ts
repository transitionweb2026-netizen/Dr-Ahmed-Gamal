"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const pageImageSchema = z.object({
  url: z.string().url("Enter a valid image URL"),
});

export interface PageImageFormResult {
  ok: boolean;
  error?: string;
}

export async function updatePageImageAction(
  slug: string,
  _prev: PageImageFormResult | null,
  formData: FormData,
): Promise<PageImageFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = pageImageSchema.safeParse({ url: formData.get("url") });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Please fix the errors below." };

  const { error } = await supabase.from("page_images").update({ url: parsed.data.url }).eq("slug", slug);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/page-images");
  revalidatePath(`/admin/page-images/${slug}`);
  return { ok: true };
}
