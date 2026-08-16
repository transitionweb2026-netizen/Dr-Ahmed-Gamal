import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { PageImageForm } from "./PageImageForm";

export default async function EditPageImagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: row } = (await supabase?.from("page_images").select("*").eq("slug", slug).maybeSingle()) ?? {
    data: null,
  };

  if (!row) notFound();

  return (
    <div>
      <Link href="/admin/page-images" className="text-sm text-slate-500 hover:text-slate-900">
        ← Back to Page Images
      </Link>
      <h1 className="mt-2 text-xl font-semibold text-slate-900">{row.label}</h1>
      <p className="mt-1 text-sm text-slate-500">{row.page}</p>
      <div className="mt-6">
        <PageImageForm slug={slug} defaultValue={row.url} />
      </div>
    </div>
  );
}
