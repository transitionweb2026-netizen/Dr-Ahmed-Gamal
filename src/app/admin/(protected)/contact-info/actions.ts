"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { bilingualFromForm } from "@/lib/admin/formHelpers";

const bilingualSchema = z.object({ en: z.string().min(1, "Required"), ar: z.string().min(1, "Required") });

const workingHourRowSchema = z.object({ days: bilingualSchema, hours: bilingualSchema });

const socialSchema = z.object({
  instagram: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  tiktok: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
});

const contactInfoSchema = z.object({
  phone_display: z.string().min(1, "Required"),
  phone_href: z.string().min(1, "Required"),
  emergency_phone_display: z.string().min(1, "Required"),
  emergency_phone_href: z.string().min(1, "Required"),
  whatsapp_display: z.string().min(1, "Required"),
  whatsapp_href: z.string().min(1, "Required"),
  email_display: z.string().min(1, "Required"),
  email_href: z.string().min(1, "Required"),
  address: bilingualSchema,
  maps_url: z.string().min(1, "Required"),
  working_hours: z.array(workingHourRowSchema),
  social: socialSchema,
});

export interface ContactInfoFormResult {
  ok: boolean;
  error?: string;
}

export async function updateContactInfoAction(
  _prev: ContactInfoFormResult | null,
  formData: FormData,
): Promise<ContactInfoFormResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, error: "CMS not configured." };

  let workingHours: unknown = [];
  try {
    workingHours = JSON.parse(String(formData.get("working_hours") ?? "[]"));
  } catch {
    workingHours = [];
  }

  const rawSocial = {
    instagram: String(formData.get("social_instagram") ?? "").trim(),
    facebook: String(formData.get("social_facebook") ?? "").trim(),
    tiktok: String(formData.get("social_tiktok") ?? "").trim(),
    youtube: String(formData.get("social_youtube") ?? "").trim(),
  };

  const parsed = contactInfoSchema.safeParse({
    phone_display: formData.get("phone_display"),
    phone_href: formData.get("phone_href"),
    emergency_phone_display: formData.get("emergency_phone_display"),
    emergency_phone_href: formData.get("emergency_phone_href"),
    whatsapp_display: formData.get("whatsapp_display"),
    whatsapp_href: formData.get("whatsapp_href"),
    email_display: formData.get("email_display"),
    email_href: formData.get("email_href"),
    address: bilingualFromForm(formData, "address"),
    maps_url: formData.get("maps_url"),
    working_hours: workingHours,
    social: rawSocial,
  });

  if (!parsed.success) return { ok: false, error: "Please fix the errors below." };

  // Drop empty social URLs entirely rather than storing "".
  const social = Object.fromEntries(Object.entries(parsed.data.social).filter(([, v]) => v));

  const { error } = await supabase
    .from("contact_info")
    .update({ ...parsed.data, social })
    .eq("id", 1);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/contact-info");
  return { ok: true };
}
