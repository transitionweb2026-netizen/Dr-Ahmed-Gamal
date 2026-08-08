"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const faqEntrySchema = z.object({
  question: bilingualSchema,
  answer: bilingualSchema,
});

const procedureSchema = z.object({
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  name: bilingualSchema,
  short_description: bilingualSchema,
  category: z.enum(["face", "body", "breast", "non-surgical"]),
  icon: z.string().min(1, "Required"),
  image: z.string().url("Must be a valid URL"),
  overview: bilingualSchema,
  recovery: bilingualSchema,
  faq: z.array(faqEntrySchema),
  featured_on_home: z.boolean(),
  order_index: z.coerce.number().int(),
  is_published: z.boolean(),
});

export interface ProcedureFormResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function parseProcedureForm(formData: FormData) {
  let faq: unknown = [];
  try {
    faq = JSON.parse(String(formData.get("faq") ?? "[]"));
  } catch {
    faq = [];
  }

  return procedureSchema.safeParse({
    slug: formData.get("slug"),
    name: bilingualFromForm(formData, "name"),
    short_description: bilingualFromForm(formData, "short_description"),
    category: formData.get("category"),
    icon: formData.get("icon"),
    image: formData.get("image"),
    overview: bilingualFromForm(formData, "overview"),
    recovery: bilingualFromForm(formData, "recovery"),
    faq,
    featured_on_home: formData.get("featured_on_home") === "on",
    order_index: formData.get("order_index"),
    is_published: formData.get("is_published") === "on",
  });
}

export async function createProcedureAction(
  _prev: ProcedureFormResult | null,
  formData: FormData,
): Promise<ProcedureFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseProcedureForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("procedures").insert(parsed.data);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/procedures");
  redirect("/admin/procedures");
}

export async function updateProcedureAction(
  id: string,
  _prev: ProcedureFormResult | null,
  formData: FormData,
): Promise<ProcedureFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseProcedureForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("procedures").update(parsed.data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/procedures");
  redirect("/admin/procedures");
}

export async function deleteProcedureAction(id: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("procedures").delete().eq("id", id);
  revalidatePath("/admin/procedures");
}
