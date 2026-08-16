"use client";

import { useActionState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updatePageImagesAction, type PageImagesFormResult } from "../actions";

interface PageImageRow {
  slug: string;
  page: string;
  label: string;
  url: string;
}

interface PageImagesFormProps {
  pageName: string;
  images: PageImageRow[];
}

export function PageImagesForm({ pageName, images }: PageImagesFormProps) {
  const slugs = images.map((image) => image.slug);
  const action = updatePageImagesAction.bind(null, pageName, slugs);
  const [state, formAction, pending] = useActionState<PageImagesFormResult | null, FormData>(action, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      {images.map((image) => (
        <ImageUploadField key={image.slug} label={image.label} name={`url__${image.slug}`} defaultValue={image.url} required />
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
        {pending ? "Saving…" : "Save all images"}
      </button>
    </form>
  );
}
