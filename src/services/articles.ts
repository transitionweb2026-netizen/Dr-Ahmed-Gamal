import { getSupabasePublicClient } from "@/lib/supabase/public";
import { articles as staticArticles } from "@/content/articles";
import type { Article } from "@/types/content";

export async function getArticles(): Promise<Article[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticArticles;

  // Ascending, not descending — matches the original static array's order
  // (the non-featured articles were listed oldest-first; preserving exact
  // display order matters more here than "sensible" newest-first sorting).
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: true });

  if (error || !data) return staticArticles;

  return data.map(
    (row): Article => ({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      body: row.body,
      category: row.category,
      publishedAt: row.published_at,
      readTimeMinutes: row.read_time_minutes,
      image: row.image,
      featured: row.featured,
    }),
  );
}
