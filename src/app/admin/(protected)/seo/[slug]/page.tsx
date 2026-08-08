import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SeoForm } from "./SeoForm";

export default async function EditSeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: row } = (await supabase?.from("seo_metadata").select("*").eq("page_slug", slug).maybeSingle()) ?? {
    data: null,
  };

  if (!row) notFound();

  return (
    <div>
      <Link href="/admin/seo" className="text-sm text-slate-500 hover:text-slate-900">
        ← Back to SEO Metadata
      </Link>
      <h1 className="mt-2 text-xl font-semibold capitalize text-slate-900">{slug.replace("-", " ")}</h1>
      <div className="mt-6">
        <SeoForm
          pageSlug={slug}
          defaultValues={{
            meta_title: row.meta_title,
            meta_description: row.meta_description,
            og_image: row.og_image,
          }}
        />
      </div>
    </div>
  );
}
