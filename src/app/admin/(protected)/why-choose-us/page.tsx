import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteChecklistItemAction } from "./actions";

export default async function AdminWhyChooseUsPage() {
  const supabase = await getSupabaseServerClient();
  const { data: checklistItems } = (await supabase?.from("checklist_items").select("*").order("order_index")) ?? {
    data: [],
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Why Choose Us</h1>
          <p className="mt-1 text-sm text-slate-500">{checklistItems?.length ?? 0} total</p>
        </div>
        <Link
          href="/admin/why-choose-us/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          + New checklist item
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-start text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-start">Text</th>
              <th className="px-4 py-3 text-start">Icon</th>
              <th className="px-4 py-3 text-start">Order</th>
              <th className="px-4 py-3 text-start">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {checklistItems?.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-medium text-slate-900">{item.text?.en}</td>
                <td className="px-4 py-3 text-slate-600">{item.icon}</td>
                <td className="px-4 py-3 text-slate-600">{item.order_index}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      item.is_published
                        ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                        : "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                    }
                  >
                    {item.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/why-choose-us/${item.id}`} className="text-slate-600 hover:text-slate-900">
                      Edit
                    </Link>
                    <DeleteButton action={deleteChecklistItemAction.bind(null, item.id)} label="Delete" />
                  </div>
                </td>
              </tr>
            ))}
            {checklistItems?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  No checklist items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
