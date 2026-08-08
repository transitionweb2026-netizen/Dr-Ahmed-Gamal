"use client";

import { useId, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface ImageUploadFieldProps {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}

/**
 * Image field with a live preview, a direct-to-Supabase-Storage upload
 * button, and a plain URL input as a fallback/override — admins can either
 * upload a new file or paste an existing URL. Submits as `name` in
 * FormData either way, via the hidden/plain text input's value.
 */
export function ImageUploadField({ label, name, defaultValue, required }: ImageUploadFieldProps) {
  const id = useId();
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
        {required && <span className="text-red-500"> *</span>}
      </label>

      <div className="mt-1 flex items-start gap-3">
        {url && (
          // eslint-disable-next-line @next/next/no-img-element -- admin-only preview of an arbitrary external/uploaded URL
          <img src={url} alt="" className="h-20 w-20 shrink-0 rounded-md border border-slate-200 object-cover" />
        )}
        <div className="flex-1 space-y-2">
          <input
            id={id}
            name={name}
            type="url"
            required={required}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://…"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
          <div className="flex items-center gap-2">
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs text-slate-500" />
            {uploading && <span className="text-xs text-slate-400">Uploading…</span>}
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
