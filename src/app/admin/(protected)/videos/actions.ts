"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const nullableTextSchema = z
  .string()
  .nullable()
  .transform((v) => (v && v.trim() !== "" ? v.trim() : null));

const videoSchema = z.object({
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  title: bilingualSchema,
  category: bilingualSchema,
  thumbnail: z.string().url("Must be a valid URL"),
  youtube_id: nullableTextSchema,
  vimeo_id: nullableTextSchema,
  aspect: z.enum(["9:16", "16:9"]),
  video_type: z.enum(["educational", "patient_story"]),
  order_index: z.coerce.number().int(),
  is_published: z.boolean(),
});

export interface VideoFormResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function parseVideoForm(formData: FormData) {
  return videoSchema.safeParse({
    slug: formData.get("slug"),
    title: bilingualFromForm(formData, "title"),
    category: bilingualFromForm(formData, "category"),
    thumbnail: formData.get("thumbnail"),
    youtube_id: formData.get("youtube_id"),
    vimeo_id: formData.get("vimeo_id"),
    aspect: formData.get("aspect"),
    video_type: formData.get("video_type"),
    order_index: formData.get("order_index"),
    is_published: formData.get("is_published") === "on",
  });
}

export async function createVideoAction(
  _prev: VideoFormResult | null,
  formData: FormData,
): Promise<VideoFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseVideoForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("videos").insert(parsed.data);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/videos");
  redirect("/admin/videos");
}

export async function updateVideoAction(
  id: string,
  _prev: VideoFormResult | null,
  formData: FormData,
): Promise<VideoFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  const parsed = parseVideoForm(formData);
  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  const { error } = await supabase.from("videos").update(parsed.data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/videos");
  redirect("/admin/videos");
}

export async function deleteVideoAction(id: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("videos").delete().eq("id", id);
  revalidatePath("/admin/videos");
}
