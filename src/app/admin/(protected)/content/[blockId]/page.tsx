import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getPageImages } from "@/services/pageImages";
import { getContentBlock } from "../../../content-blocks";
import { ContentBlockForm } from "./ContentBlockForm";
import enMessages from "../../../../../../messages/en.json";
import arMessages from "../../../../../../messages/ar.json";

/** Reads a dot-path (e.g. "legal.privacy.sections.2.heading") out of a nested object. */
function getDeep(root: unknown, key: string): string {
  const value = key.split(".").reduce<unknown>((node, part) => {
    if (node && typeof node === "object") return (node as Record<string, unknown>)[part];
    return undefined;
  }, root);
  return typeof value === "string" ? value : "";
}

export default async function EditContentBlockPage({ params }: { params: Promise<{ blockId: string }> }) {
  const { blockId } = await params;
  const block = getContentBlock(blockId);
  if (!block) notFound();

  const supabase = await getSupabaseServerClient();
  const keys = block.fields.map((f) => f.key);
  const [translationsResult, pageImages] = await Promise.all([
    supabase?.from("translations").select("key, locale, value").in("key", keys),
    getPageImages(),
  ]);
  const rows = (translationsResult?.data ?? []) as { key: string; locale: string; value: string }[];

  const values = Object.fromEntries(
    block.fields.map((field) => {
      const en = rows.find((r) => r.key === field.key && r.locale === "en")?.value ?? getDeep(enMessages, field.key);
      const ar = rows.find((r) => r.key === field.key && r.locale === "ar")?.value ?? getDeep(arMessages, field.key);
      return [field.key, { en, ar }];
    }),
  );

  // getPageImages() already falls back to the static bundled URLs (same
  // service the live frontend uses) when the page_images table doesn't
  // exist yet, so this always shows the image that's actually live.
  const imageValues = Object.fromEntries((block.images ?? []).map((img) => [img.slug, pageImages[img.slug]]));

  return (
    <div>
      <Link href="/admin/content" className="text-sm text-slate-500 hover:text-slate-900">
        ← Back to Website Text
      </Link>
      <h1 className="mt-2 text-xl font-semibold text-slate-900">
        {block.page} — {block.section}
      </h1>
      {block.sharedButtons && block.sharedButtons.length > 0 && (
        <p className="mt-1 text-sm text-slate-500">
          This section also shows the {block.sharedButtons.map((b) => `“${b}”`).join(", ")} button
          {block.sharedButtons.length > 1 ? "s" : ""} — shared across many pages, edit under{" "}
          <Link href="/admin/content/site-buttons" className="underline hover:text-slate-900">
            Site-wide → Buttons &amp; CTAs
          </Link>
          .
        </p>
      )}
      <div className="mt-6">
        <ContentBlockForm
          blockId={blockId}
          fields={block.fields}
          values={values}
          images={block.images ?? []}
          imageValues={imageValues}
        />
      </div>
    </div>
  );
}
