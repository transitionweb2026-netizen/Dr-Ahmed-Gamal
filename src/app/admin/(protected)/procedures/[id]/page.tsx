import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ProcedureForm } from "../ProcedureForm";
import { updateProcedureAction } from "../actions";

export default async function EditProcedurePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: procedure } = (await supabase?.from("procedures").select("*").eq("id", id).maybeSingle()) ?? {
    data: null,
  };

  if (!procedure) notFound();

  const action = updateProcedureAction.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit procedure</h1>
      <div className="mt-6">
        <ProcedureForm
          action={action}
          submitLabel="Save changes"
          defaultValues={{
            slug: procedure.slug,
            name: procedure.name,
            short_description: procedure.short_description,
            category: procedure.category,
            icon: procedure.icon,
            image: procedure.image,
            overview: procedure.overview,
            recovery: procedure.recovery,
            faq: procedure.faq ?? [],
            featured_on_home: procedure.featured_on_home,
            order_index: procedure.order_index,
            is_published: procedure.is_published,
          }}
        />
      </div>
    </div>
  );
}
