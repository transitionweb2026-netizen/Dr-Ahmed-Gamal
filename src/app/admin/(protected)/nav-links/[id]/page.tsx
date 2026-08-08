import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { NavLinkForm } from "../NavLinkForm";
import { updateNavLinkAction } from "../actions";

export default async function EditNavLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: navLink } = (await supabase?.from("nav_links").select("*").eq("id", id).maybeSingle()) ?? {
    data: null,
  };

  if (!navLink) notFound();

  const action = updateNavLinkAction.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit nav link</h1>
      <div className="mt-6">
        <NavLinkForm
          action={action}
          submitLabel="Save changes"
          defaultValues={{
            href: navLink.href,
            label: navLink.label,
            order_index: navLink.order_index,
            is_visible: navLink.is_visible,
          }}
        />
      </div>
    </div>
  );
}
