"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const checklistItemSchema = z.object({
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  text: bilingualSchema,
  icon: z.string().min(1, "Required"),
  order_index: z.coerce.number().int(),
  is_published: z.boolean(),
});

export interface ChecklistItemFormResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function parseChecklistItemForm(formData: FormData) {
  return checklistItemSchema.safeParse({
    slug: formData.get("slug"),
    text: bilingualFromForm(formData, "text"),
    icon: formData.get("icon"),
    order_index: formData.get("order_index"),
    is_published: formData.get("is_published") === "on",
  });
}

export async function createChecklistItemAction(
  _prev: ChecklistItemFormResult | null,
  formData: FormData,
): Promise<ChecklistItemFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseChecklistItemForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("checklist_items").insert(parsed.data);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/why-choose-us");
  revalidatePublicSite();
  redirect("/admin/why-choose-us");
}

export async function updateChecklistItemAction(
  id: string,
  _prev: ChecklistItemFormResult | null,
  formData: FormData,
): Promise<ChecklistItemFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseChecklistItemForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("checklist_items").update(parsed.data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/why-choose-us");
  revalidatePublicSite();
  redirect("/admin/why-choose-us");
}

export async function deleteChecklistItemAction(id: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("checklist_items").delete().eq("id", id);
  revalidatePath("/admin/why-choose-us");
  revalidatePublicSite();
}
