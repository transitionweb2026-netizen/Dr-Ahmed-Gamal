"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const faqItemSchema = z.object({
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  question: bilingualSchema,
  answer: bilingualSchema,
  order_index: z.coerce.number().int(),
  is_published: z.boolean(),
});

export interface FaqItemFormResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function parseFaqItemForm(formData: FormData) {
  return faqItemSchema.safeParse({
    slug: formData.get("slug"),
    question: bilingualFromForm(formData, "question"),
    answer: bilingualFromForm(formData, "answer"),
    order_index: formData.get("order_index"),
    is_published: formData.get("is_published") === "on",
  });
}

export async function createFaqItemAction(
  _prev: FaqItemFormResult | null,
  formData: FormData,
): Promise<FaqItemFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseFaqItemForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("faq_items").insert(parsed.data);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function updateFaqItemAction(
  id: string,
  _prev: FaqItemFormResult | null,
  formData: FormData,
): Promise<FaqItemFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseFaqItemForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("faq_items").update(parsed.data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function deleteFaqItemAction(id: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("faq_items").delete().eq("id", id);
  revalidatePath("/admin/faq");
}
