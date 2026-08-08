"use client";

import { useActionState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { iconMap } from "@/constants/iconMap";
import type { MilestoneFormResult } from "./actions";

interface MilestoneFormProps {
  action: (prev: MilestoneFormResult | null, formData: FormData) => Promise<MilestoneFormResult>;
  submitLabel: string;
  defaultValues?: {
    slug: string;
    year: string;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    icon: string;
    featured_on_home: boolean;
    featured_on_about: boolean;
    order_index: number;
    is_published: boolean;
  };
}

export function MilestoneForm({ action, submitLabel, defaultValues }: MilestoneFormProps) {
  const [state, formAction, pending] = useActionState<MilestoneFormResult | null, FormData>(action, null);

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
          placeholder="e.g. clinic-founded"
          className="mt-1 w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <p className="mt-1 text-xs text-slate-500">Used in the page URL — lowercase, hyphens only.</p>
      </div>

      <BilingualField label="Title" name="title" defaultValue={defaultValues?.title} required />
      <BilingualField
        label="Description"
        name="description"
        defaultValue={defaultValues?.description}
        multiline
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-slate-700">
            Year <span className="text-red-500">*</span>
          </label>
          <input
            id="year"
            name="year"
            type="text"
            required
            defaultValue={defaultValues?.year}
            placeholder="e.g. 2001"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-slate-700">
            Icon <span className="text-red-500">*</span>
          </label>
          <select
            id="icon"
            name="icon"
            required
            defaultValue={defaultValues?.icon}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          >
            <option value="">Select…</option>
            {Object.keys(iconMap).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
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
              name="featured_on_home"
              defaultChecked={defaultValues?.featured_on_home ?? true}
              className="rounded border-slate-300"
            />
            Featured on Home
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="featured_on_about"
              defaultChecked={defaultValues?.featured_on_about ?? false}
              className="rounded border-slate-300"
            />
            Featured on About
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
