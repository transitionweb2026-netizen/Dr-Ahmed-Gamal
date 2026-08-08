"use client";

import { useActionState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import type { TestimonialFormResult } from "./actions";

interface ProcedureOption {
  slug: string;
  name: { en: string; ar: string };
}

interface TestimonialFormProps {
  action: (prev: TestimonialFormResult | null, formData: FormData) => Promise<TestimonialFormResult>;
  submitLabel: string;
  procedures: ProcedureOption[];
  defaultValues?: {
    slug: string;
    name: string;
    quote: { en: string; ar: string };
    rating: number;
    procedure_slug: string | null;
    featured_on_home: boolean;
    order_index: number;
    is_published: boolean;
  };
}

export function TestimonialForm({ action, submitLabel, procedures, defaultValues }: TestimonialFormProps) {
  const [state, formAction, pending] = useActionState<TestimonialFormResult | null, FormData>(action, null);

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
          placeholder="e.g. sarah-m-rhinoplasty"
          className="mt-1 w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <p className="mt-1 text-xs text-slate-500">Internal stable id — lowercase, hyphens only.</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={defaultValues?.name}
          placeholder="e.g. Sarah M."
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </div>

      <BilingualField label="Quote" name="quote" defaultValue={defaultValues?.quote} multiline required />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-slate-700">
            Rating <span className="text-red-500">*</span>
          </label>
          <select
            id="rating"
            name="rating"
            required
            defaultValue={defaultValues?.rating ?? 5}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="procedure_slug" className="block text-sm font-medium text-slate-700">
            Procedure
          </label>
          <select
            id="procedure_slug"
            name="procedure_slug"
            defaultValue={defaultValues?.procedure_slug ?? ""}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          >
            <option value="">— None —</option>
            {procedures.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name.en}
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
              defaultChecked={defaultValues?.featured_on_home ?? false}
              className="rounded border-slate-300"
            />
            Featured on Home
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
