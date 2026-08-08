import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ChecklistItemForm } from "../ChecklistItemForm";
import { updateChecklistItemAction } from "../actions";

export default async function EditChecklistItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: checklistItem } = (await supabase?.from("checklist_items").select("*").eq("id", id).maybeSingle()) ?? {
    data: null,
  };

  if (!checklistItem) notFound();

  const action = updateChecklistItemAction.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit checklist item</h1>
      <div className="mt-6">
        <ChecklistItemForm
          action={action}
          submitLabel="Save changes"
          defaultValues={{
            slug: checklistItem.slug,
            text: checklistItem.text,
            icon: checklistItem.icon,
            order_index: checklistItem.order_index,
            is_published: checklistItem.is_published,
          }}
        />
      </div>
    </div>
  );
}
