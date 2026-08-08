import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminTranslationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const supabase = await getSupabaseServerClient();
  const { data: rows } = (await supabase?.from("translations").select("key, locale, value").order("key")) ?? {
    data: [],
  };

  const byKey = new Map<string, { en?: string; ar?: string }>();
  for (const row of rows ?? []) {
    const entry = byKey.get(row.key) ?? {};
    entry[row.locale as "en" | "ar"] = row.value;
    byKey.set(row.key, entry);
  }

  let keys = [...byKey.keys()].sort();
  if (q) {
    const needle = q.toLowerCase();
    keys = keys.filter(
      (key) =>
        key.toLowerCase().includes(needle) ||
        byKey.get(key)?.en?.toLowerCase().includes(needle) ||
        byKey.get(key)?.ar?.includes(needle),
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Site Text</h1>
      <p className="mt-1 text-sm text-slate-500">
        Every button label, heading, and UI string on the site — {byKey.size} total, {keys.length} shown.
      </p>

      <form method="get" className="mt-4">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by key or text…"
          className="w-full max-w-md rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </form>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-start text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-start">Key</th>
              <th className="px-4 py-3 text-start">English</th>
              <th className="px-4 py-3 text-start">Arabic</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {keys.slice(0, 300).map((key) => {
              const entry = byKey.get(key)!;
              return (
                <tr key={key}>
                  <td className="px-4 py-2 font-mono text-xs text-slate-500">{key}</td>
                  <td className="max-w-xs truncate px-4 py-2 text-slate-900">{entry.en}</td>
                  <td className="max-w-xs truncate px-4 py-2 text-slate-900" dir="rtl">
                    {entry.ar}
                  </td>
                  <td className="px-4 py-2 text-end">
                    <Link
                      href={`/admin/translations/${encodeURIComponent(key)}`}
                      className="text-slate-600 hover:text-slate-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
            {keys.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  No matching keys.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {keys.length > 300 && (
          <p className="border-t border-slate-200 px-4 py-3 text-xs text-slate-400">
            Showing the first 300 matches — refine your search to narrow further.
          </p>
        )}
      </div>
    </div>
  );
}
