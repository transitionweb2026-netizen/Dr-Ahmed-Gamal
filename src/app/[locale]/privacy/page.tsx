import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "legal.privacy" });

  return buildMetadata({
    locale,
    path: "/privacy",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("legal");
  const sections = t.raw("privacy.sections") as { heading: string; body: string }[];
  const updated = t("updated", {
    date: new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(
      new Date(),
    ),
  });

  return (
    <main className="mx-auto max-w-3xl px-4 py-32 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-brand-gold">{t("privacy.title")}</h1>
      <p className="mt-2 text-sm text-brand-light/65">{updated}</p>
      <p className="mt-6 leading-relaxed text-brand-light/80">{t("privacy.intro")}</p>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-xl text-brand-light">{section.heading}</h2>
            <p className="mt-2 leading-relaxed text-brand-light/70">{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
