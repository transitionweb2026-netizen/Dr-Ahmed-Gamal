"use client";

import { useActionState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { updateContentBlockAction, type ContentBlockFormResult } from "../actions";
import type { ContentField } from "../../../content-blocks";

interface ContentBlockFormProps {
  blockId: string;
  fields: ContentField[];
  values: Record<string, { en: string; ar: string }>;
}

export function ContentBlockForm({ blockId, fields, values }: ContentBlockFormProps) {
  const action = updateContentBlockAction.bind(null, blockId);
  const [state, formAction, pending] = useActionState<ContentBlockFormResult | null, FormData>(action, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {fields.map((field) => (
        <BilingualField
          key={field.key}
          label={field.label}
          name={field.key}
          defaultValue={values[field.key]}
          multiline={field.multiline}
          required
        />
      ))}

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
