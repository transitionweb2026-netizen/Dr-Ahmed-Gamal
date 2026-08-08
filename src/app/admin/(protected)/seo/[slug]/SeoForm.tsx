"use client";

import { useActionState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { updateSeoMetadataAction, type SeoFormResult } from "../actions";

interface SeoFormProps {
  pageSlug: string;
  defaultValues: {
    meta_title: { en: string; ar: string };
    meta_description: { en: string; ar: string };
    og_image: string | null;
  };
}

export function SeoForm({ pageSlug, defaultValues }: SeoFormProps) {
  const action = updateSeoMetadataAction.bind(null, pageSlug);
  const [state, formAction, pending] = useActionState<SeoFormResult | null, FormData>(action, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <BilingualField label="Meta title" name="meta_title" defaultValue={defaultValues.meta_title} required />
      <BilingualField
        label="Meta description"
        name="meta_description"
        defaultValue={defaultValues.meta_description}
        multiline
        required
      />
      <div>
        <label htmlFor="og_image" className="block text-sm font-medium text-slate-700">
          Social share image URL (optional)
        </label>
        <input
          id="og_image"
          name="og_image"
          type="url"
          defaultValue={defaultValues.og_image ?? ""}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {state && !state.ok && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state?.ok && <p className="text-sm text-green-600">Saved.</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
