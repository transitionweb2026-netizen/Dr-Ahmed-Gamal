import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteArticleAction } from "./actions";

export default async function AdminArticlesPage() {
  const supabase = await getSupabaseServerClient();
  const { data: articles } = (await supabase?.from("articles").select("*").order("published_at", {
    ascending: false,
  })) ?? {
    data: [],
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Articles</h1>
          <p className="mt-1 text-sm text-slate-500">{articles?.length ?? 0} total</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          + New article
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-start text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-start">Title</th>
              <th className="px-4 py-3 text-start">Category</th>
              <th className="px-4 py-3 text-start">Published</th>
              <th className="px-4 py-3 text-start">Featured</th>
              <th className="px-4 py-3 text-start">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles?.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3 font-medium text-slate-900">{a.title?.en}</td>
                <td className="px-4 py-3 text-slate-600">{a.category?.en}</td>
                <td className="px-4 py-3 text-slate-600">{a.published_at}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      a.featured
                        ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                        : "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                    }
                  >
                    {a.featured ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      a.is_published
                        ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                        : "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                    }
                  >
                    {a.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/articles/${a.id}`} className="text-slate-600 hover:text-slate-900">
                      Edit
                    </Link>
                    <DeleteButton action={deleteArticleAction.bind(null, a.id)} label="Delete" />
                  </div>
                </td>
              </tr>
            ))}
            {articles?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No articles yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
