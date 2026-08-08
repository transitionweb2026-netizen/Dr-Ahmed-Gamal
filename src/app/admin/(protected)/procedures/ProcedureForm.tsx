"use client";

import { useActionState, useState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { iconMap } from "@/constants/iconMap";
import type { ProcedureFormResult } from "./actions";

interface FaqEntry {
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
}

interface ProcedureFormProps {
  action: (prev: ProcedureFormResult | null, formData: FormData) => Promise<ProcedureFormResult>;
  submitLabel: string;
  defaultValues?: {
    slug: string;
    name: { en: string; ar: string };
    short_description: { en: string; ar: string };
    category: string;
    icon: string;
    image: string;
    overview: { en: string; ar: string };
    recovery: { en: string; ar: string };
    faq: FaqEntry[];
    featured_on_home: boolean;
    order_index: number;
    is_published: boolean;
  };
}

const EMPTY_FAQ_ENTRY: FaqEntry = { question: { en: "", ar: "" }, answer: { en: "", ar: "" } };

export function ProcedureForm({ action, submitLabel, defaultValues }: ProcedureFormProps) {
  const [state, formAction, pending] = useActionState<ProcedureFormResult | null, FormData>(action, null);
  const [faq, setFaq] = useState<FaqEntry[]>(defaultValues?.faq ?? []);

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
          placeholder="e.g. rhinoplasty"
          className="mt-1 w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <p className="mt-1 text-xs text-slate-500">Used in the page URL — lowercase, hyphens only.</p>
      </div>

      <BilingualField label="Name" name="name" defaultValue={defaultValues?.name} required />
      <BilingualField
        label="Short description"
        name="short_description"
        defaultValue={defaultValues?.short_description}
        multiline
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={defaultValues?.category}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          >
            <option value="">Select…</option>
            <option value="face">Face</option>
            <option value="body">Body</option>
            <option value="breast">Breast</option>
            <option value="non-surgical">Non-surgical</option>
          </select>
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

      <ImageUploadField label="Image" name="image" defaultValue={defaultValues?.image} required />

      <BilingualField label="Overview" name="overview" defaultValue={defaultValues?.overview} multiline required />
      <BilingualField label="Recovery" name="recovery" defaultValue={defaultValues?.recovery} multiline required />

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">Procedure FAQ</p>
          <button
            type="button"
            onClick={() => setFaq((f) => [...f, EMPTY_FAQ_ENTRY])}
            className="text-xs font-medium text-slate-600 underline hover:text-slate-900"
          >
            + Add question
          </button>
        </div>
        <div className="mt-2 space-y-4">
          {faq.map((entry, i) => (
            <div key={i} className="rounded-md border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500">Question {i + 1}</p>
                <button
                  type="button"
                  onClick={() => setFaq((f) => f.filter((_, idx) => idx !== i))}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-2">
                <BilingualFaqRow
                  label="Question"
                  value={entry.question}
                  onChange={(question) => setFaq((f) => f.map((e, idx) => (idx === i ? { ...e, question } : e)))}
                />
                <BilingualFaqRow
                  label="Answer"
                  value={entry.answer}
                  onChange={(answer) => setFaq((f) => f.map((e, idx) => (idx === i ? { ...e, answer } : e)))}
                />
              </div>
            </div>
          ))}
        </div>
        <input type="hidden" name="faq" value={JSON.stringify(faq)} />
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

function BilingualFaqRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: { en: string; ar: string };
  onChange: (value: { en: string; ar: string }) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="text-[11px] text-slate-500">
          {label} (EN)
        </label>
        <input
          type="text"
          value={value.en}
          onChange={(e) => onChange({ ...value, en: e.target.value })}
          className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-sm"
        />
      </div>
      <div>
        <label className="text-[11px] text-slate-500">
          {label} (AR)
        </label>
        <input
          type="text"
          dir="rtl"
          value={value.ar}
          onChange={(e) => onChange({ ...value, ar: e.target.value })}
          className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-sm"
        />
      </div>
    </div>
  );
}
