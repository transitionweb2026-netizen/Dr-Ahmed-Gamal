import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { TranslationForm } from "./TranslationForm";

export default async function EditTranslationPage({ params }: { params: Promise<{ key: string }> }) {
  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);

  const supabase = await getSupabaseServerClient();
  const { data: rows } = (await supabase?.from("translations").select("locale, value").eq("key", key)) ?? {
    data: [],
  };

  if (!rows || rows.length === 0) notFound();

  const en = rows.find((r) => r.locale === "en")?.value ?? "";
  const ar = rows.find((r) => r.locale === "ar")?.value ?? "";

  return (
    <div>
      <Link href="/admin/translations" className="text-sm text-slate-500 hover:text-slate-900">
        ← Back to Site Text
      </Link>
      <h1 className="mt-2 text-xl font-semibold text-slate-900">Edit text</h1>
      <p className="mt-1 font-mono text-xs text-slate-500">{key}</p>
      <div className="mt-6">
        <TranslationForm translationKey={key} defaultValues={{ en, ar }} />
      </div>
    </div>
  );
}
