import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function pageAnchor(page: string) {
  return page.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

interface PageImageRow {
  slug: string;
  page: string;
  label: string;
  url: string;
}

export default async function AdminPageImagesPage() {
  const supabase = await getSupabaseServerClient();
  const { data: rows } = ((await supabase?.from("page_images").select("*").order("page")) ?? { data: [] }) as {
    data: PageImageRow[];
  };

  const groups = new Map<string, PageImageRow[]>();
  for (const row of rows ?? []) {
    if (!groups.has(row.page)) groups.set(row.page, []);
    groups.get(row.page)!.push(row);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Page Images</h1>
      <p className="mt-1 text-sm text-slate-500">
        Hero and section background images, grouped by the page they appear on.
      </p>

      {groups.size === 0 && (
        <p className="mt-6 max-w-xl rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          No rows yet — the page_images table needs to be created and seeded first (see
          supabase/migrations/0002_page_images.sql and scripts/seed-page-images.ts). Until then every page keeps
          showing its original images unchanged.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-8">
        {Array.from(groups.entries()).map(([page, items]) => (
          <section key={page} id={pageAnchor(page)}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{page}</h2>
            <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white">
              <table className="w-full text-start text-sm">
                <tbody className="divide-y divide-slate-100">
                  {items?.map((row) => (
                    <tr key={row.slug}>
                      <td className="w-20 px-4 py-3">
                        {/* eslint-disable-next-line @next/next/no-img-element -- admin-only thumbnail of an arbitrary external URL */}
                        <img src={row.url} alt="" className="h-12 w-12 rounded-md border border-slate-200 object-cover" />
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">{row.label}</td>
                      <td className="px-4 py-3 text-end">
                        <Link href={`/admin/page-images/${row.slug}`} className="text-slate-600 hover:text-slate-900">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
