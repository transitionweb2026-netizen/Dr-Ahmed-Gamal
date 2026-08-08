import { getSupabaseServerClient } from "@/lib/supabase/server";
import { TestimonialForm } from "../TestimonialForm";
import { createTestimonialAction } from "../actions";

export default async function NewTestimonialPage() {
  const supabase = await getSupabaseServerClient();
  const { data: procedures } = (await supabase?.from("procedures").select("slug, name").order("order_index")) ?? {
    data: [],
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">New testimonial</h1>
      <div className="mt-6">
        <TestimonialForm
          action={createTestimonialAction}
          submitLabel="Create testimonial"
          procedures={procedures ?? []}
        />
      </div>
    </div>
  );
}
