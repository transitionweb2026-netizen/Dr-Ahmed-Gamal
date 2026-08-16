"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const navLinkSchema = z.object({
  href: z.string().min(1, "Required"),
  label: bilingualSchema,
  order_index: z.coerce.number().int(),
  is_visible: z.boolean(),
});

export interface NavLinkFormResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function parseNavLinkForm(formData: FormData) {
  return navLinkSchema.safeParse({
    href: formData.get("href"),
    label: bilingualFromForm(formData, "label"),
    order_index: formData.get("order_index"),
    is_visible: formData.get("is_visible") === "on",
  });
}

export async function createNavLinkAction(
  _prev: NavLinkFormResult | null,
  formData: FormData,
): Promise<NavLinkFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseNavLinkForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("nav_links").insert(parsed.data);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/nav-links");
  revalidatePublicSite();
  redirect("/admin/nav-links");
}

export async function updateNavLinkAction(
  id: string,
  _prev: NavLinkFormResult | null,
  formData: FormData,
): Promise<NavLinkFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseNavLinkForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("nav_links").update(parsed.data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/nav-links");
  revalidatePublicSite();
  redirect("/admin/nav-links");
}

export async function deleteNavLinkAction(id: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("nav_links").delete().eq("id", id);
  revalidatePath("/admin/nav-links");
  revalidatePublicSite();
}
