import Link from "next/link";
import { contentBlocks } from "../../content-blocks";
import { pageSlugify } from "../page-images/pageSlugify";

export default function AdminContentPage() {
  const groups = new Map<string, typeof contentBlocks>();
  for (const block of contentBlocks) {
    if (!groups.has(block.page)) groups.set(block.page, []);
    groups.get(block.page)!.push(block);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Website Text</h1>
      <p className="mt-1 text-sm text-slate-500">
        Every editable sentence on the site, grouped by the page and section it appears on — pick a section below
        to edit exactly what you see on the website. Small system labels (Next / Previous / Close, form field
        names, error messages) aren&apos;t listed here since they&apos;re rarely changed — find them under
        Site-wide → All Site Text if you ever need them.
      </p>

      <div className="mt-8 flex flex-col gap-8">
        {Array.from(groups.entries()).map(([page, blocks]) => (
          <section key={page} id={pageSlugify(page)}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{page}</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {blocks.map((block) => (
                <Link
                  key={block.id}
                  href={`/admin/content/${block.id}`}
                  className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <p className="text-sm font-medium text-slate-700">{block.section}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {block.fields.length} field{block.fields.length === 1 ? "" : "s"}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
