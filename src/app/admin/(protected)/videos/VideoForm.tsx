"use client";

import { useActionState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { VideoFormResult } from "./actions";

interface VideoFormProps {
  action: (prev: VideoFormResult | null, formData: FormData) => Promise<VideoFormResult>;
  submitLabel: string;
  defaultValues?: {
    slug: string;
    title: { en: string; ar: string };
    category: { en: string; ar: string };
    thumbnail: string;
    youtube_id: string | null;
    vimeo_id: string | null;
    aspect: string;
    video_type: string;
    order_index: number;
    is_published: boolean;
  };
}

export function VideoForm({ action, submitLabel, defaultValues }: VideoFormProps) {
  const [state, formAction, pending] = useActionState<VideoFormResult | null, FormData>(action, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-slate-700">
          Slug <span className="text-red-500">*</span>
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          pattern="[a-z0-9\-]+"
          defaultValue={defaultValues?.slug}
          placeholder="e.g. rhinoplasty-before-after"
          className="mt-1 w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <p className="mt-1 text-xs text-slate-500">Used in the page URL — lowercase, hyphens only.</p>
      </div>

      <BilingualField label="Title" name="title" defaultValue={defaultValues?.title} required />
      <BilingualField label="Category" name="category" defaultValue={defaultValues?.category} required />

      <ImageUploadField label="Thumbnail" name="thumbnail" defaultValue={defaultValues?.thumbnail} required />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="youtube_id" className="block text-sm font-medium text-slate-700">
            YouTube ID
          </label>
          <input
            id="youtube_id"
            name="youtube_id"
            type="text"
            defaultValue={defaultValues?.youtube_id ?? ""}
            placeholder="e.g. dQw4w9WgXcQ"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
        <div>
          <label htmlFor="vimeo_id" className="block text-sm font-medium text-slate-700">
            Vimeo ID
          </label>
          <input
            id="vimeo_id"
            name="vimeo_id"
            type="text"
            defaultValue={defaultValues?.vimeo_id ?? ""}
            placeholder="e.g. 123456789"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="aspect" className="block text-sm font-medium text-slate-700">
            Aspect ratio <span className="text-red-500">*</span>
          </label>
          <select
            id="aspect"
            name="aspect"
            required
            defaultValue={defaultValues?.aspect ?? "9:16"}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          >
            <option value="9:16">9:16</option>
            <option value="16:9">16:9</option>
          </select>
        </div>
        <div>
          <label htmlFor="video_type" className="block text-sm font-medium text-slate-700">
            Video type <span className="text-red-500">*</span>
          </label>
          <select
            id="video_type"
            name="video_type"
            required
            defaultValue={defaultValues?.video_type}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          >
            <option value="">Select…</option>
            <option value="educational">Educational</option>
            <option value="patient_story">Patient Story</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="order_index" className="block text-sm font-medium text-slate-700">
            Display order
          </label>
          <input
            id="order_index"
            name="order_index"
            type="number"
            defaultValue={defaultValues?.order_index ?? 0}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
        <div className="flex flex-col justify-end gap-2 pb-1">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={defaultValues?.is_published ?? true}
              className="rounded border-slate-300"
            />
            Published
          </label>
        </div>
      </div>

      {state && !state.ok && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
