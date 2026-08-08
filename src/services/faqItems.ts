import { getSupabasePublicClient } from "@/lib/supabase/public";
import { faqItems as staticFaqItems } from "@/content/faqItems";
import type { FaqItem } from "@/types/content";

export async function getFaqItems(): Promise<FaqItem[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticFaqItems;

  const { data, error } = await supabase
    .from("faq_items")
    .select("*")
    .eq("is_published", true)
    .order("order_index");

  if (error || !data) return staticFaqItems;

  return data.map(
    (row): FaqItem => ({
      id: row.slug,
      question: row.question,
      answer: row.answer,
    }),
  );
}
