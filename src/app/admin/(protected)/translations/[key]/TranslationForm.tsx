"use client";

import { useActionState } from "react";
import { updateTranslationAction, type TranslationFormResult } from "../actions";

interface TranslationFormProps {
  translationKey: string;
  defaultValues: { en: string; ar: string };
}

export function TranslationForm({ translationKey, defaultValues }: TranslationFormProps) {
  const action = updateTranslationAction.bind(null, translationKey);
  const [state, formAction, pending] = useActionState<TranslationFormResult | null, FormData>(action, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div>
        <label htmlFor="value_en" className="block text-sm font-medium text-slate-700">
          English
        </label>
        <textarea
          id="value_en"
          name="value_en"
          rows={4}
          required
          defaultValue={defaultValues.en}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </div>
      <div>
        <label htmlFor="value_ar" className="block text-sm font-medium text-slate-700">
          Arabic
        </label>
        <textarea
          id="value_ar"
          name="value_ar"
          dir="rtl"
          rows={4}
          required
          defaultValue={defaultValues.ar}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </div>

      <p className="text-xs text-slate-500">
        If this text contains <code>{"{placeholders}"}</code> like <code>{"{year}"}</code>, keep them exactly as-is —
        they get filled in automatically.
      </p>

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
