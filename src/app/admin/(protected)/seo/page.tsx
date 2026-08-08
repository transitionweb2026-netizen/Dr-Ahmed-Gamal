import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminSeoPage() {
  const supabase = await getSupabaseServerClient();
  const { data: rows } = (await supabase?.from("seo_metadata").select("*").order("page_slug")) ?? { data: [] };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">SEO Metadata</h1>
      <p className="mt-1 text-sm text-slate-500">Meta title/description shown in search results and link previews.</p>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-start text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-start">Page</th>
              <th className="px-4 py-3 text-start">Meta title (EN)</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows?.map((row) => (
              <tr key={row.page_slug}>
                <td className="px-4 py-3 font-medium capitalize text-slate-900">{row.page_slug.replace("-", " ")}</td>
                <td className="max-w-md truncate px-4 py-3 text-slate-600">{row.meta_title?.en}</td>
                <td className="px-4 py-3 text-end">
                  <Link href={`/admin/seo/${row.page_slug}`} className="text-slate-600 hover:text-slate-900">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
