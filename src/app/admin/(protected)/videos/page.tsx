import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteVideoAction } from "./actions";

export default async function AdminVideosPage() {
  const supabase = await getSupabaseServerClient();
  const { data: videos } = (await supabase?.from("videos").select("*").order("order_index")) ?? {
    data: [],
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Videos</h1>
          <p className="mt-1 text-sm text-slate-500">{videos?.length ?? 0} total</p>
        </div>
        <Link
          href="/admin/videos/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          + New video
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-start text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-start">Title</th>
              <th className="px-4 py-3 text-start">Category</th>
              <th className="px-4 py-3 text-start">Type</th>
              <th className="px-4 py-3 text-start">Aspect</th>
              <th className="px-4 py-3 text-start">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {videos?.map((v) => (
              <tr key={v.id}>
                <td className="px-4 py-3 font-medium text-slate-900">{v.title?.en}</td>
                <td className="px-4 py-3 text-slate-600">{v.category?.en}</td>
                <td className="px-4 py-3 text-slate-600">
                  {v.video_type === "educational" ? "Educational" : "Patient Story"}
                </td>
                <td className="px-4 py-3 text-slate-600">{v.aspect}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      v.is_published
                        ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                        : "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                    }
                  >
                    {v.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/videos/${v.id}`} className="text-slate-600 hover:text-slate-900">
                      Edit
                    </Link>
                    <DeleteButton action={deleteVideoAction.bind(null, v.id)} label="Delete" />
                  </div>
                </td>
              </tr>
            ))}
            {videos?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No videos yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
