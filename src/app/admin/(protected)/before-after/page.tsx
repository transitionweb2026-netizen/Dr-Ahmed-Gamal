import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteCaseAction } from "./actions";

export default async function AdminBeforeAfterPage() {
  const supabase = await getSupabaseServerClient();
  const { data: cases } = (await supabase?.from("before_after_cases").select("*").order("order_index")) ?? {
    data: [],
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Before / After Cases</h1>
          <p className="mt-1 text-sm text-slate-500">{cases?.length ?? 0} total</p>
        </div>
        <Link
          href="/admin/before-after/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          + New case
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-start text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-start">Title</th>
              <th className="px-4 py-3 text-start">Category</th>
              <th className="px-4 py-3 text-start">Featured on Home</th>
              <th className="px-4 py-3 text-start">In category gallery</th>
              <th className="px-4 py-3 text-start">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases?.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 font-medium text-slate-900">{c.title?.en}</td>
                <td className="px-4 py-3 text-slate-600">{c.category}</td>
                <td className="px-4 py-3 text-slate-600">{c.featured_on_home ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-slate-600">{c.show_in_category_gallery ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      c.is_published
                        ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                        : "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                    }
                  >
                    {c.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/before-after/${c.id}`} className="text-slate-600 hover:text-slate-900">
                      Edit
                    </Link>
                    <DeleteButton action={deleteCaseAction.bind(null, c.id)} label="Delete" />
                  </div>
                </td>
              </tr>
            ))}
            {cases?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No before/after cases yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
