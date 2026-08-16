import { redirect } from "next/navigation";
import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { logoutAction } from "../logout-action";
import { adminNavGroups } from "../nav-items";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          The CMS isn&apos;t configured yet — Supabase environment variables are missing. The public site keeps
          working from its bundled content in the meantime.
        </div>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: adminRow } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle();
  if (!adminRow) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <p className="text-sm font-semibold text-slate-900">CMS Admin</p>
          <p className="mt-0.5 truncate text-xs text-slate-500">{user.email}</p>
        </div>
        <nav className="flex flex-col gap-4 p-3">
          <Link
            href="/admin"
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            Dashboard
          </Link>
          {adminNavGroups.map((group) => (
            <div key={group.page}>
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {group.page}
              </p>
              <div className="mt-1 flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <Link
                    key={`${group.page}-${item.href}`}
                    href={item.href}
                    title={item.hint}
                    className="rounded-md px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-md px-3 py-2 text-start text-sm text-slate-500 transition-colors hover:bg-slate-100"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-x-auto p-8">{children}</main>
    </div>
  );
}
