import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { pageSlugify } from "./pageSlugify";

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
        Hero and section background images, one form per page — edit and save all of a page&apos;s images together.
      </p>

      {groups.size === 0 && (
        <p className="mt-6 max-w-xl rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          No rows yet — the page_images table needs to be created and seeded first (see
          supabase/migrations/0002_page_images.sql and scripts/seed-page-images.ts). Until then every page keeps
          showing its original images unchanged.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from(groups.entries()).map(([page, items]) => (
          <Link
            key={page}
            href={`/admin/page-images/${pageSlugify(page)}`}
            className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            <p className="text-sm font-medium text-slate-700">{page}</p>
            <p className="mt-1 text-xs text-slate-400">
              {items.length} image{items.length === 1 ? "" : "s"}
            </p>
            <div className="mt-3 flex gap-2">
              {items.slice(0, 4).map((item) => (
                // eslint-disable-next-line @next/next/no-img-element -- admin-only thumbnail of an arbitrary external URL
                <img
                  key={item.slug}
                  src={item.url}
                  alt=""
                  className="h-10 w-10 rounded border border-slate-200 object-cover"
                />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
