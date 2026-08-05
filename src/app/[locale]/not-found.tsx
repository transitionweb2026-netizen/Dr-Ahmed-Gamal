import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="font-serif text-3xl text-brand-gold">{t("title")}</h1>
      <p className="max-w-md text-brand-light/70">{t("description")}</p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-gold px-8 py-3 text-sm font-medium uppercase tracking-wider text-brand-darker transition-colors hover:bg-white"
      >
        {t("cta")}
      </Link>
    </main>
  );
}
