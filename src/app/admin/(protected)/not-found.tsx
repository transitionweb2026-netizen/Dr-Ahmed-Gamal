import Link from "next/link";

/**
 * Renders inside the (protected) layout — sidebar stays visible — instead
 * of falling through to the public site's dark-themed not-found.tsx
 * (src/app/not-found.tsx), which is jarring and looks like a broken link
 * out of the admin entirely.
 */
export default function AdminNotFound() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Not found</h1>
      <p className="mt-1 text-sm text-slate-500">
        That record doesn&apos;t exist — it may have been deleted, or the link is out of date.
      </p>
      <Link href="/admin" className="mt-4 inline-block text-sm text-slate-600 hover:text-slate-900">
        ← Back to Dashboard
      </Link>
    </div>
  );
}
