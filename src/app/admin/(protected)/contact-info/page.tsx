import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ContactInfoForm } from "./ContactInfoForm";

export default async function AdminContactInfoPage() {
  const supabase = await getSupabaseServerClient();
  const { data: row } = (await supabase?.from("contact_info").select("*").eq("id", 1).maybeSingle()) ?? {
    data: null,
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Contact Info</h1>
      <p className="mt-1 text-sm text-slate-500">
        This is the single source of contact details used across the whole site.
      </p>
      <div className="mt-6">
        {row ? (
          <ContactInfoForm
            defaultValues={{
              phone_display: row.phone_display,
              phone_href: row.phone_href,
              emergency_phone_display: row.emergency_phone_display,
              emergency_phone_href: row.emergency_phone_href,
              whatsapp_display: row.whatsapp_display,
              whatsapp_href: row.whatsapp_href,
              email_display: row.email_display,
              email_href: row.email_href,
              address: row.address,
              maps_url: row.maps_url,
              working_hours: row.working_hours ?? [],
              social: row.social ?? {},
            }}
          />
        ) : (
          <p className="text-sm text-slate-400">No contact info row found.</p>
        )}
      </div>
    </div>
  );
}
