import { getSupabasePublicClient } from "@/lib/supabase/public";
import { contactInfo as staticContactInfo } from "@/constants/contactInfo";

export async function getContactInfo(): Promise<typeof staticContactInfo> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticContactInfo;

  const { data: row, error } = await supabase.from("contact_info").select("*").eq("id", 1).maybeSingle();
  if (error || !row) return staticContactInfo;

  return {
    phone: { display: row.phone_display, href: row.phone_href },
    emergencyPhone: { display: row.emergency_phone_display, href: row.emergency_phone_href },
    whatsapp: { display: row.whatsapp_display, href: row.whatsapp_href },
    email: { display: row.email_display, href: row.email_href },
    address: row.address,
    mapsUrl: row.maps_url,
    workingHours: row.working_hours ?? [],
    social: row.social ?? {},
  };
}
