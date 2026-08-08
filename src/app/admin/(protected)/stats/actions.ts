"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const statSchema = z.object({
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  value: z.string().min(1, "Required"),
  label: bilingualSchema,
  icon: z.string().min(1, "Required"),
  featured_on_home: z.boolean(),
  featured_on_about: z.boolean(),
  order_index: z.coerce.number().int(),
  is_published: z.boolean(),
});

export interface StatFormResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function parseStatForm(formData: FormData) {
  return statSchema.safeParse({
    slug: formData.get("slug"),
    value: formData.get("value"),
    label: bilingualFromForm(formData, "label"),
    icon: formData.get("icon"),
    featured_on_home: formData.get("featured_on_home") === "on",
    featured_on_about: formData.get("featured_on_about") === "on",
    order_index: formData.get("order_index"),
    is_published: formData.get("is_published") === "on",
  });
}

export async function createStatAction(
  _prev: StatFormResult | null,
  formData: FormData,
): Promise<StatFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseStatForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("stats").insert(parsed.data);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/stats");
  redirect("/admin/stats");
}

export async function updateStatAction(
  id: string,
  _prev: StatFormResult | null,
  formData: FormData,
): Promise<StatFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseStatForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("stats").update(parsed.data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/stats");
  redirect("/admin/stats");
}

export async function deleteStatAction(id: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("stats").delete().eq("id", id);
  revalidatePath("/admin/stats");
}
