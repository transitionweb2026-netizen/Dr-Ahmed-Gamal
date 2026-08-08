"use client";

import { useActionState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { iconMap } from "@/constants/iconMap";
import type { ChecklistItemFormResult } from "./actions";

interface ChecklistItemFormProps {
  action: (prev: ChecklistItemFormResult | null, formData: FormData) => Promise<ChecklistItemFormResult>;
  submitLabel: string;
  defaultValues?: {
    slug: string;
    text: { en: string; ar: string };
    icon: string;
    order_index: number;
    is_published: boolean;
  };
}

export function ChecklistItemForm({ action, submitLabel, defaultValues }: ChecklistItemFormProps) {
  const [state, formAction, pending] = useActionState<ChecklistItemFormResult | null, FormData>(action, null);

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
          placeholder="e.g. board-certified-surgeon"
          className="mt-1 w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <p className="mt-1 text-xs text-slate-500">Used in the page URL — lowercase, hyphens only.</p>
      </div>

      <BilingualField label="Text" name="text" defaultValue={defaultValues?.text} required />

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={defaultValues?.is_published ?? true}
          className="rounded border-slate-300"
        />
        Published
      </label>

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
