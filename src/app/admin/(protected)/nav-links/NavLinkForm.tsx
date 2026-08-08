"use client";

import { useActionState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import type { NavLinkFormResult } from "./actions";

interface NavLinkFormProps {
  action: (prev: NavLinkFormResult | null, formData: FormData) => Promise<NavLinkFormResult>;
  submitLabel: string;
  defaultValues?: {
    href: string;
    label: { en: string; ar: string };
    order_index: number;
    is_visible: boolean;
  };
}

export function NavLinkForm({ action, submitLabel, defaultValues }: NavLinkFormProps) {
  const [state, formAction, pending] = useActionState<NavLinkFormResult | null, FormData>(action, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div>
        <label htmlFor="href" className="block text-sm font-medium text-slate-700">
          Href <span className="text-red-500">*</span>
        </label>
        <input
          id="href"
          name="href"
          type="text"
          required
          defaultValue={defaultValues?.href}
          placeholder="e.g. /about"
          className="mt-1 w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <p className="mt-1 text-xs text-slate-500">The page path this nav item links to.</p>
      </div>

      <BilingualField label="Label" name="label" defaultValue={defaultValues?.label} required />

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
              name="is_visible"
              defaultChecked={defaultValues?.is_visible ?? true}
              className="rounded border-slate-300"
            />
            Visible
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
