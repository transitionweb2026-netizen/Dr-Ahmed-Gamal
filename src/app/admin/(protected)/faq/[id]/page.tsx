import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { FaqItemForm } from "../FaqItemForm";
import { updateFaqItemAction } from "../actions";

export default async function EditFaqItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: faqItem } = (await supabase?.from("faq_items").select("*").eq("id", id).maybeSingle()) ?? {
    data: null,
  };

  if (!faqItem) notFound();

  const action = updateFaqItemAction.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit FAQ item</h1>
      <div className="mt-6">
        <FaqItemForm
          action={action}
          submitLabel="Save changes"
          defaultValues={{
            slug: faqItem.slug,
            question: faqItem.question,
            answer: faqItem.answer,
            order_index: faqItem.order_index,
            is_published: faqItem.is_published,
          }}
        />
      </div>
    </div>
  );
}
