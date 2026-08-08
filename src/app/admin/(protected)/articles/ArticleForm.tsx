"use client";

import { useActionState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { ArticleFormResult } from "./actions";

interface ArticleFormProps {
  action: (prev: ArticleFormResult | null, formData: FormData) => Promise<ArticleFormResult>;
  submitLabel: string;
  defaultValues?: {
    slug: string;
    title: { en: string; ar: string };
    excerpt: { en: string; ar: string };
    body: { en: string; ar: string };
    category: { en: string; ar: string };
    published_at: string;
    read_time_minutes: number;
    image: string;
    featured: boolean;
    is_published: boolean;
  };
}

export function ArticleForm({ action, submitLabel, defaultValues }: ArticleFormProps) {
  const [state, formAction, pending] = useActionState<ArticleFormResult | null, FormData>(action, null);

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
          placeholder="e.g. rhinoplasty-recovery-tips"
          className="mt-1 w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <p className="mt-1 text-xs text-slate-500">Used in the page URL — lowercase, hyphens only.</p>
      </div>

      <BilingualField label="Title" name="title" defaultValue={defaultValues?.title} required />
      <BilingualField label="Excerpt" name="excerpt" defaultValue={defaultValues?.excerpt} multiline required />

      <div>
        <BilingualField label="Body" name="body" defaultValue={defaultValues?.body} multiline required />
        <p className="mt-1 text-xs text-slate-500">Accepts Markdown.</p>
      </div>

      <BilingualField label="Category" name="category" defaultValue={defaultValues?.category} required />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="published_at" className="block text-sm font-medium text-slate-700">
            Published date <span className="text-red-500">*</span>
          </label>
          <input
            id="published_at"
            name="published_at"
            type="date"
            required
            defaultValue={defaultValues?.published_at}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
        <div>
          <label htmlFor="read_time_minutes" className="block text-sm font-medium text-slate-700">
            Read time (minutes)
          </label>
          <input
            id="read_time_minutes"
            name="read_time_minutes"
            type="number"
            defaultValue={defaultValues?.read_time_minutes ?? 5}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
      </div>

      <ImageUploadField label="Image" name="image" defaultValue={defaultValues?.image} required />

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={defaultValues?.featured ?? false}
            className="rounded border-slate-300"
          />
          Featured
        </label>
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
