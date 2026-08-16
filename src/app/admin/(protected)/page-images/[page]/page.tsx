import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { pageSlugify } from "../pageSlugify";
import { PageImagesForm } from "./PageImagesForm";

interface PageImageRow {
  slug: string;
  page: string;
  label: string;
  url: string;
}

export default async function EditPageImagesPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageParam } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: rows } = ((await supabase?.from("page_images").select("*").order("slug")) ?? { data: [] }) as {
    data: PageImageRow[];
  };

  // An empty table (migration/seed not run yet) is a different situation
  // from a genuinely unknown page slug — only 404 for the latter.
  if (!rows || rows.length === 0) {
    return (
      <div>
        <Link href="/admin/page-images" className="text-sm text-slate-500 hover:text-slate-900">
          ← Back to Page Images
        </Link>
        <p className="mt-6 max-w-xl rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          No rows yet — the page_images table needs to be created and seeded first (see
          supabase/migrations/0002_page_images.sql and scripts/seed-page-images.ts). Until then every page keeps
          showing its original images unchanged.
        </p>
      </div>
    );
  }

  const items = rows.filter((row) => pageSlugify(row.page) === pageParam);
  if (items.length === 0) notFound();

  return (
    <div>
      <Link href="/admin/page-images" className="text-sm text-slate-500 hover:text-slate-900">
        ← Back to Page Images
      </Link>
      <h1 className="mt-2 text-xl font-semibold text-slate-900">{items[0].page} — Page Images</h1>
      <p className="mt-1 text-sm text-slate-500">Edit and save every image on this page together.</p>
      <div className="mt-6">
        <PageImagesForm pageName={items[0].page} images={items} />
      </div>
    </div>
  );
}
