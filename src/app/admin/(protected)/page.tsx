import Link from "next/link";
import { adminNavGroups } from "../nav-items";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Find content by the page it appears on — pick the page below, then the section you want to edit.
      </p>

      <div className="mt-8 flex flex-col gap-8">
        {adminNavGroups.map((group) => (
          <section key={group.page}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{group.page}</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <Link
                  key={`${group.page}-${item.href}`}
                  href={item.href}
                  className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <p className="text-sm font-medium text-slate-700">{item.label}</p>
                  {item.hint && <p className="mt-1 text-xs text-slate-400">{item.hint}</p>}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
