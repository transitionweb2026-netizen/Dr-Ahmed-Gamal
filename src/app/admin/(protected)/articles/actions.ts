"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const articleSchema = z.object({
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  title: bilingualSchema,
  excerpt: bilingualSchema,
  body: bilingualSchema,
  category: bilingualSchema,
  published_at: z.string().min(1, "Required"),
  read_time_minutes: z.coerce.number().int(),
  image: z.string().url("Must be a valid URL"),
  featured: z.boolean(),
  is_published: z.boolean(),
});

export interface ArticleFormResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function parseArticleForm(formData: FormData) {
  return articleSchema.safeParse({
    slug: formData.get("slug"),
    title: bilingualFromForm(formData, "title"),
    excerpt: bilingualFromForm(formData, "excerpt"),
    body: bilingualFromForm(formData, "body"),
    category: bilingualFromForm(formData, "category"),
    published_at: formData.get("published_at"),
    read_time_minutes: formData.get("read_time_minutes"),
    image: formData.get("image"),
    featured: formData.get("featured") === "on",
    is_published: formData.get("is_published") === "on",
  });
}

export async function createArticleAction(
  _prev: ArticleFormResult | null,
  formData: FormData,
): Promise<ArticleFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseArticleForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("articles").insert(parsed.data);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/articles");
  revalidatePublicSite();
  redirect("/admin/articles");
}

export async function updateArticleAction(
  id: string,
  _prev: ArticleFormResult | null,
  formData: FormData,
): Promise<ArticleFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseArticleForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("articles").update(parsed.data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/articles");
  revalidatePublicSite();
  redirect("/admin/articles");
}

export async function deleteArticleAction(id: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePublicSite();
}
