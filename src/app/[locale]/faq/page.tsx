import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { buildFaqPageSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { faqItems } from "@/content/faqItems";
import { FaqHero } from "@/sections/faq/FaqHero";
import { FaqList } from "@/sections/faq/FaqList";
import { FaqCta } from "@/sections/faq/FaqCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "pages.faq.hero" });

  return buildMetadata({
    locale,
    path: "/faq",
    title: t("title"),
    description: t("paragraph"),
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd data={buildFaqPageSchema(faqItems, locale as "en" | "ar")} />
      <FaqHero />
      <FaqList />
      <FaqCta />
    </main>
  );
}
