import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { VideoForm } from "../VideoForm";
import { updateVideoAction } from "../actions";

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: video } = (await supabase?.from("videos").select("*").eq("id", id).maybeSingle()) ?? {
    data: null,
  };

  if (!video) notFound();

  const action = updateVideoAction.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit video</h1>
      <div className="mt-6">
        <VideoForm
          action={action}
          submitLabel="Save changes"
          defaultValues={{
            slug: video.slug,
            title: video.title,
            category: video.category,
            thumbnail: video.thumbnail,
            youtube_id: video.youtube_id,
            vimeo_id: video.vimeo_id,
            aspect: video.aspect,
            video_type: video.video_type,
            order_index: video.order_index,
            is_published: video.is_published,
          }}
        />
      </div>
    </div>
  );
}
