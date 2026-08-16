"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";
import { pageSlugify } from "./pageSlugify";

export interface PageImagesFormResult {
  ok: boolean;
  error?: string;
}

/**
 * Updates every image belonging to one page group in a single save —
 * the form posts one `url__<slug>` field per image row.
 */
export async function updatePageImagesAction(
  pageParam: string,
  slugs: string[],
  _prev: PageImagesFormResult | null,
  formData: FormData,
): Promise<PageImagesFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const urlSchema = z.string().url("Enter a valid image URL");
  const updates: { slug: string; url: string }[] = [];

  for (const slug of slugs) {
    const parsed = urlSchema.safeParse(formData.get(`url__${slug}`));
    if (!parsed.success) return { ok: false, error: `${slug}: ${parsed.error.issues[0]?.message}` };
    updates.push({ slug, url: parsed.data });
  }

  const results = await Promise.all(
    updates.map(({ slug, url }) => supabase.from("page_images").update({ url }).eq("slug", slug)),
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) return { ok: false, error: failed.error.message };

  revalidatePath("/admin/page-images");
  revalidatePath(`/admin/page-images/${pageSlugify(pageParam)}`);
  revalidatePublicSite();
  return { ok: true };
}
