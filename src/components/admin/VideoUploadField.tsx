"use client";

import { useId, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface VideoUploadFieldProps {
  label: string;
  name: string;
  defaultValue?: string | null;
}

/**
 * Video field with a live preview, a direct-to-Supabase-Storage upload
 * button, and a plain URL input as a fallback/override — mirrors
 * ImageUploadField, but for an actual video file instead of a YouTube/Vimeo
 * link. VideoModal prefers this URL over youtube_id/vimeo_id when present.
 */
export function VideoUploadField({ label, name, defaultValue }: VideoUploadFieldProps) {
  const id = useId();
  const fileId = useId();
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("CMS storage isn't configured.");
      return;
    }

    setUploading(true);
    setError(null);

    const path = `${crypto.randomUUID()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file, { upsert: false });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="mt-1 space-y-3">
        {url && (
          <video
            src={url}
            controls
            className="h-40 w-full max-w-xs rounded-md border border-slate-200 bg-black object-contain"
          />
        )}
        <input
          id={id}
          name={name}
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://… (leave blank to use YouTube/Vimeo below instead)"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <div>
          <label htmlFor={fileId} className="block text-xs font-medium text-slate-500">
            Or upload a video file
          </label>
          <div className="mt-1 flex items-center gap-3">
            <label
              htmlFor={fileId}
              className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-slate-500">
                <path d="M10 3a.75.75 0 0 1 .75.75v8.69l2.72-2.72a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06l2.72 2.72V3.75A.75.75 0 0 1 10 3Z" />
                <path d="M3.5 12.75a.75.75 0 0 1 .75.75v2a1 1 0 0 0 1 1h9.5a1 1 0 0 0 1-1v-2a.75.75 0 0 1 1.5 0v2a2.5 2.5 0 0 1-2.5 2.5h-9.5A2.5 2.5 0 0 1 2.75 15.5v-2a.75.75 0 0 1 .75-.75Z" />
              </svg>
              Choose Video
            </label>
            <input id={fileId} type="file" accept="video/*" onChange={handleFileChange} className="sr-only" />
            {uploading && <span className="text-xs text-slate-400">Uploading…</span>}
          </div>
          <p className="mt-1 text-xs text-slate-400">Up to 300 MB. Larger files may need YouTube/Vimeo instead.</p>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
