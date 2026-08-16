"use client";

import { useActionState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updatePageImageAction, type PageImageFormResult } from "../actions";

interface PageImageFormProps {
  slug: string;
  defaultValue: string;
}

export function PageImageForm({ slug, defaultValue }: PageImageFormProps) {
  const action = updatePageImageAction.bind(null, slug);
  const [state, formAction, pending] = useActionState<PageImageFormResult | null, FormData>(action, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <ImageUploadField label="Image" name="url" defaultValue={defaultValue} required />

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
