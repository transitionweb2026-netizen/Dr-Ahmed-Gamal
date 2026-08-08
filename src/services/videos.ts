import { getSupabasePublicClient } from "@/lib/supabase/public";
import { videos as staticVideos } from "@/content/videos";
import type { Video } from "@/types/content";

export async function getVideos(): Promise<Video[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return staticVideos;

  const { data, error } = await supabase.from("videos").select("*").eq("is_published", true).order("order_index");

  if (error || !data) return staticVideos;

  return data.map(
    (row): Video => ({
      id: row.slug,
      title: row.title,
      category: row.category,
      thumbnail: row.thumbnail,
      youtubeId: row.youtube_id ?? undefined,
      vimeoId: row.vimeo_id ?? undefined,
      aspect: row.aspect,
    }),
  );
}
