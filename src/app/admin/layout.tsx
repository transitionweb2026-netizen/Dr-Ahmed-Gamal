import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "CMS Admin",
  robots: { index: false, follow: false },
};

/**
 * Root layout for the whole /admin tree. This route lives outside
 * src/app/[locale]/, so it doesn't inherit that segment's <html>/<body> (or
 * next-intl/RTL setup) and has to provide its own — the admin dashboard is
 * an internal English-only tool, deliberately not styled as part of the
 * public bilingual site.
 */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
