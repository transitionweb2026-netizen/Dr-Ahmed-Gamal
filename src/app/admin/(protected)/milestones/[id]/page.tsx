import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { MilestoneForm } from "../MilestoneForm";
import { updateMilestoneAction } from "../actions";

export default async function EditMilestonePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: milestone } = (await supabase?.from("milestones").select("*").eq("id", id).maybeSingle()) ?? {
    data: null,
  };

  if (!milestone) notFound();

  const action = updateMilestoneAction.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit milestone</h1>
      <div className="mt-6">
        <MilestoneForm
          action={action}
          submitLabel="Save changes"
          defaultValues={{
            slug: milestone.slug,
            year: milestone.year,
            title: milestone.title,
            description: milestone.description,
            icon: milestone.icon,
            featured_on_home: milestone.featured_on_home,
            featured_on_about: milestone.featured_on_about,
            order_index: milestone.order_index,
            is_published: milestone.is_published,
          }}
        />
      </div>
    </div>
  );
}
