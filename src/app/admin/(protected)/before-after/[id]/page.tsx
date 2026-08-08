import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { CaseForm } from "../CaseForm";
import { updateCaseAction } from "../actions";

export default async function EditCasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: caseItem } = (await supabase?.from("before_after_cases").select("*").eq("id", id).maybeSingle()) ?? {
    data: null,
  };

  if (!caseItem) notFound();

  const action = updateCaseAction.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit before/after case</h1>
      <div className="mt-6">
        <CaseForm
          action={action}
          submitLabel="Save changes"
          defaultValues={{
            slug: caseItem.slug,
            title: caseItem.title,
            subtitle: caseItem.subtitle,
            category: caseItem.category,
            before_image: caseItem.before_image,
            after_image: caseItem.after_image,
            featured_on_home: caseItem.featured_on_home,
            show_in_category_gallery: caseItem.show_in_category_gallery,
            order_index: caseItem.order_index,
            is_published: caseItem.is_published,
          }}
        />
      </div>
    </div>
  );
}
