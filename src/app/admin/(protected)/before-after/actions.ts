"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";
import { revalidatePublicSite } from "@/lib/admin/revalidatePublicSite";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const ANGLE_COUNT = 4;

const angleSchema = z.object({
  image: z.string().url("Angle image must be a valid URL"),
  afterImage: z.string().url("Angle after-image must be a valid URL").optional(),
});

const caseSchema = z.object({
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  title: bilingualSchema,
  subtitle: bilingualSchema,
  category: z.enum(["nose", "gynecomastia", "arm-lift", "cleft-lip", "otoplasty"]),
  before_image: z.string().url("Must be a valid URL"),
  after_image: z.string().url("Must be a valid URL"),
  featured_on_home: z.boolean(),
  show_in_category_gallery: z.boolean(),
  order_index: z.coerce.number().int(),
  is_published: z.boolean(),
  angles: z.array(angleSchema),
});

export interface BeforeAfterCaseFormResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

/** Only Nose cases keep a per-angle afterImage — reading angle_after__N for
 * any other category would just be discarded server-side anyway (CaseForm
 * doesn't render those inputs once a non-Nose category is selected), but
 * dropping it here keeps the persisted shape unambiguous either way. */
function parseAngles(formData: FormData, category: FormDataEntryValue | null) {
  const isNose = category === "nose";
  const angles: { image: string; afterImage?: string }[] = [];
  for (let i = 0; i < ANGLE_COUNT; i++) {
    const image = String(formData.get(`angle_image__${i}`) ?? "").trim();
    if (!image) continue;
    const afterImage = isNose ? String(formData.get(`angle_after__${i}`) ?? "").trim() : "";
    angles.push(afterImage ? { image, afterImage } : { image });
  }
  return angles;
}

function parseCaseForm(formData: FormData) {
  const category = formData.get("category");
  return caseSchema.safeParse({
    slug: formData.get("slug"),
    title: bilingualFromForm(formData, "title"),
    subtitle: bilingualFromForm(formData, "subtitle"),
    category,
    before_image: formData.get("before_image"),
    after_image: formData.get("after_image"),
    featured_on_home: formData.get("featured_on_home") === "on",
    show_in_category_gallery: formData.get("show_in_category_gallery") === "on",
    order_index: formData.get("order_index"),
    is_published: formData.get("is_published") === "on",
    angles: parseAngles(formData, category),
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
