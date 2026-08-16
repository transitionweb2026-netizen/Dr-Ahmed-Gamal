"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const caseSchema = z.object({
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  title: bilingualSchema,
  subtitle: bilingualSchema,
  category: z.enum(["face", "body", "breast"]),
  before_image: z.string().url("Must be a valid URL"),
  after_image: z.string().url("Must be a valid URL"),
  featured_on_home: z.boolean(),
  show_in_category_gallery: z.boolean(),
  order_index: z.coerce.number().int(),
  is_published: z.boolean(),
});

export interface BeforeAfterCaseFormResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function parseCaseForm(formData: FormData) {
  return caseSchema.safeParse({
    slug: formData.get("slug"),
    title: bilingualFromForm(formData, "title"),
    subtitle: bilingualFromForm(formData, "subtitle"),
    category: formData.get("category"),
    before_image: formData.get("before_image"),
    after_image: formData.get("after_image"),
    featured_on_home: formData.get("featured_on_home") === "on",
    show_in_category_gallery: formData.get("show_in_category_gallery") === "on",
    order_index: formData.get("order_index"),
    is_published: formData.get("is_published") === "on",
  });
}

export async function createCaseAction(
  _prev: BeforeAfterCaseFormResult | null,
  formData: FormData,
): Promise<BeforeAfterCaseFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseCaseForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("before_after_cases").insert(parsed.data);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/before-after");
  revalidatePublicSite();
  redirect("/admin/before-after");
}

export async function updateCaseAction(
  id: string,
  _prev: BeforeAfterCaseFormResult | null,
  formData: FormData,
): Promise<BeforeAfterCaseFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseCaseForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("before_after_cases").update(parsed.data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/before-after");
  revalidatePublicSite();
  redirect("/admin/before-after");
}

export async function deleteCaseAction(id: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("before_after_cases").delete().eq("id", id);
  revalidatePath("/admin/before-after");
  revalidatePublicSite();
}
