"use client";

import { useActionState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateSiteSettingsAction, type SiteSettingsFormResult } from "./actions";

interface SiteSettingsFormProps {
  defaultValues: { name: string; short_name: string; logo_url: string };
}

export function SiteSettingsForm({ defaultValues }: SiteSettingsFormProps) {
  const [state, formAction, pending] = useActionState<SiteSettingsFormResult | null, FormData>(
    updateSiteSettingsAction,
    null,
  );

  return (
    <form action={formAction} className="max-w-lg space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Full site name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={defaultValues.name}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </div>
      <div>
        <label htmlFor="short_name" className="block text-sm font-medium text-slate-700">
          Short name
        </label>
        <input
          id="short_name"
          name="short_name"
          type="text"
          required
          defaultValue={defaultValues.short_name}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </div>
      <ImageUploadField label="Logo" name="logo_url" defaultValue={defaultValues.logo_url} required />

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
