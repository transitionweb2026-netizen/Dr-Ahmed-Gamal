"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const milestoneSchema = z.object({
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  year: z.string().min(1, "Required"),
  title: bilingualSchema,
  description: bilingualSchema,
  icon: z.string().min(1, "Required"),
  featured_on_home: z.boolean(),
  featured_on_about: z.boolean(),
  order_index: z.coerce.number().int(),
  is_published: z.boolean(),
});

export interface MilestoneFormResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function parseMilestoneForm(formData: FormData) {
  return milestoneSchema.safeParse({
    slug: formData.get("slug"),
    year: formData.get("year"),
    title: bilingualFromForm(formData, "title"),
    description: bilingualFromForm(formData, "description"),
    icon: formData.get("icon"),
    featured_on_home: formData.get("featured_on_home") === "on",
    featured_on_about: formData.get("featured_on_about") === "on",
    order_index: formData.get("order_index"),
    is_published: formData.get("is_published") === "on",
  });
}

export async function createMilestoneAction(
  _prev: MilestoneFormResult | null,
  formData: FormData,
): Promise<MilestoneFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseMilestoneForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("milestones").insert(parsed.data);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/milestones");
  revalidatePublicSite();
  redirect("/admin/milestones");
}

export async function updateMilestoneAction(
  id: string,
  _prev: MilestoneFormResult | null,
  formData: FormData,
): Promise<MilestoneFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseMilestoneForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("milestones").update(parsed.data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/milestones");
  revalidatePublicSite();
  redirect("/admin/milestones");
}

export async function deleteMilestoneAction(id: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("milestones").delete().eq("id", id);
  revalidatePath("/admin/milestones");
  revalidatePublicSite();
}
