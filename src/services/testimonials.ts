import { getSupabasePublicClient } from "@/lib/supabase/public";
import { testimonials as staticTestimonials } from "@/content/testimonials";
import type { Testimonial } from "@/types/content";

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticTestimonials;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*, procedure:procedures!testimonials_procedure_slug_fkey(name)")
    .eq("is_published", true)
    .order("order_index");

  if (error || !data) return staticTestimonials;

  return data.map(
    (row): Testimonial => ({
      id: row.slug,
      name: row.name,
      quote: row.quote,
      rating: row.rating,
      procedureSlug: row.procedure_slug ?? undefined,
      procedureName: row.procedure?.name ?? undefined,
      featuredOnHome: row.featured_on_home,
    }),
  );
}
