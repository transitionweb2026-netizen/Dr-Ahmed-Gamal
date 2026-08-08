import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { StatForm } from "../StatForm";
import { updateStatAction } from "../actions";

export default async function EditStatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: stat } = (await supabase?.from("stats").select("*").eq("id", id).maybeSingle()) ?? {
    data: null,
  };

  if (!stat) notFound();

  const action = updateStatAction.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit stat</h1>
      <div className="mt-6">
        <StatForm
          action={action}
          submitLabel="Save changes"
          defaultValues={{
            slug: stat.slug,
            value: stat.value,
            label: stat.label,
            icon: stat.icon,
            featured_on_home: stat.featured_on_home,
            featured_on_about: stat.featured_on_about,
            order_index: stat.order_index,
            is_published: stat.is_published,
          }}
        />
      </div>
    </div>
  );
}
