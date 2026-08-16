"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const testimonialSchema = z.object({
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  name: z.string().min(1, "Required"),
  quote: bilingualSchema,
  rating: z.coerce.number().int().min(1).max(5),
  procedure_slug: z
    .string()
    .nullable()
    .or(z.literal(""))
    .transform((value) => (value === "" || value === null ? null : value)),
  featured_on_home: z.boolean(),
  order_index: z.coerce.number().int(),
  is_published: z.boolean(),
});

export interface TestimonialFormResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function parseTestimonialForm(formData: FormData) {
  return testimonialSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    quote: bilingualFromForm(formData, "quote"),
    rating: formData.get("rating"),
    procedure_slug: formData.get("procedure_slug"),
    featured_on_home: formData.get("featured_on_home") === "on",
    order_index: formData.get("order_index"),
    is_published: formData.get("is_published") === "on",
  });
}

export async function createTestimonialAction(
  _prev: TestimonialFormResult | null,
  formData: FormData,
): Promise<TestimonialFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseTestimonialForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("testimonials").insert(parsed.data);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePublicSite();
  redirect("/admin/testimonials");
}

export async function updateTestimonialAction(
  id: string,
  _prev: TestimonialFormResult | null,
  formData: FormData,
): Promise<TestimonialFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseTestimonialForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("testimonials").update(parsed.data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePublicSite();
  redirect("/admin/testimonials");
}

export async function deleteTestimonialAction(id: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePublicSite();
}
