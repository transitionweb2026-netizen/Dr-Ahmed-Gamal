"use client";

import { useActionState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { BeforeAfterCaseFormResult } from "./actions";

interface CaseFormProps {
  action: (prev: BeforeAfterCaseFormResult | null, formData: FormData) => Promise<BeforeAfterCaseFormResult>;
  submitLabel: string;
  defaultValues?: {
    slug: string;
    title: { en: string; ar: string };
    subtitle: { en: string; ar: string };
    category: string;
    before_image: string;
    after_image: string;
    featured_on_home: boolean;
    show_in_category_gallery: boolean;
    order_index: number;
    is_published: boolean;
  };
}

export function CaseForm({ action, submitLabel, defaultValues }: CaseFormProps) {
  const [state, formAction, pending] = useActionState<BeforeAfterCaseFormResult | null, FormData>(action, null);

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
          placeholder="e.g. rhinoplasty-case-1"
          className="mt-1 w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <p className="mt-1 text-xs text-slate-500">Used in the page URL — lowercase, hyphens only.</p>
      </div>

      <BilingualField label="Title" name="title" defaultValue={defaultValues?.title} required />
      <BilingualField label="Subtitle" name="subtitle" defaultValue={defaultValues?.subtitle} required />

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={defaultValues?.category}
          className="mt-1 w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
          <option value="">Select…</option>
          <option value="face">Face</option>
          <option value="body">Body</option>
          <option value="breast">Breast</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ImageUploadField
          label="Before image"
          name="before_image"
          defaultValue={defaultValues?.before_image}
          required
        />
        <ImageUploadField label="After image" name="after_image" defaultValue={defaultValues?.after_image} required />
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
              name="featured_on_home"
              defaultChecked={defaultValues?.featured_on_home ?? false}
              className="rounded border-slate-300"
            />
            Featured on Home
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="show_in_category_gallery"
              defaultChecked={defaultValues?.show_in_category_gallery ?? true}
              className="rounded border-slate-300"
            />
            Show in category gallery
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
