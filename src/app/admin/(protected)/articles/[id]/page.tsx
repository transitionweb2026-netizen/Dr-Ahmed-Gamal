import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ArticleForm } from "../ArticleForm";
import { updateArticleAction } from "../actions";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: article } = (await supabase?.from("articles").select("*").eq("id", id).maybeSingle()) ?? {
    data: null,
  };

  if (!article) notFound();

  const action = updateArticleAction.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit article</h1>
      <div className="mt-6">
        <ArticleForm
          action={action}
          submitLabel="Save changes"
          defaultValues={{
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            body: article.body,
            category: article.category,
            published_at: article.published_at,
            read_time_minutes: article.read_time_minutes,
            image: article.image,
            featured: article.featured,
            is_published: article.is_published,
          }}
        />
      </div>
    </div>
  );
}
