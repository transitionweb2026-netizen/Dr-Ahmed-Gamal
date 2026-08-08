import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteMilestoneAction } from "./actions";

export default async function AdminMilestonesPage() {
  const supabase = await getSupabaseServerClient();
  const { data: milestones } = (await supabase?.from("milestones").select("*").order("order_index")) ?? {
    data: [],
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Milestones</h1>
          <p className="mt-1 text-sm text-slate-500">{milestones?.length ?? 0} total</p>
        </div>
        <Link
          href="/admin/milestones/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          + New milestone
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-start text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-start">Title</th>
              <th className="px-4 py-3 text-start">Year</th>
              <th className="px-4 py-3 text-start">Featured on Home</th>
              <th className="px-4 py-3 text-start">Featured on About</th>
              <th className="px-4 py-3 text-start">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {milestones?.map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-3 font-medium text-slate-900">{m.title?.en}</td>
                <td className="px-4 py-3 text-slate-600">{m.year}</td>
                <td className="px-4 py-3 text-slate-600">{m.featured_on_home ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-slate-600">{m.featured_on_about ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      m.is_published
                        ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                        : "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                    }
                  >
                    {m.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/milestones/${m.id}`} className="text-slate-600 hover:text-slate-900">
                      Edit
                    </Link>
                    <DeleteButton action={deleteMilestoneAction.bind(null, m.id)} label="Delete" />
                  </div>
                </td>
              </tr>
            ))}
            {milestones?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No milestones yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
