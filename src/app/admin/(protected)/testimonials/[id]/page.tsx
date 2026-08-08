import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { TestimonialForm } from "../TestimonialForm";
import { updateTestimonialAction } from "../actions";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: testimonial } = (await supabase?.from("testimonials").select("*").eq("id", id).maybeSingle()) ?? {
    data: null,
  };

  if (!testimonial) notFound();

  const { data: procedures } = (await supabase?.from("procedures").select("slug, name").order("order_index")) ?? {
    data: [],
  };

  const action = updateTestimonialAction.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit testimonial</h1>
      <div className="mt-6">
        <TestimonialForm
          action={action}
          submitLabel="Save changes"
          procedures={procedures ?? []}
          defaultValues={{
            slug: testimonial.slug,
            name: testimonial.name,
            quote: testimonial.quote,
            rating: testimonial.rating,
            procedure_slug: testimonial.procedure_slug,
            featured_on_home: testimonial.featured_on_home,
            order_index: testimonial.order_index,
            is_published: testimonial.is_published,
          }}
        />
      </div>
    </div>
  );
}
