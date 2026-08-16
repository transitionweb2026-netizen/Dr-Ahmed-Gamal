import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { buildFaqPageSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { getFaqItems } from "@/services/faqItems";
import { getSeoMetadata } from "@/services/seoMetadata";
import { getPageImages } from "@/services/pageImages";
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
  const [t, seo] = await Promise.all([
    getTranslations({ locale, namespace: "pages.faq.hero" }),
    getSeoMetadata("faq"),
  ]);

  return buildMetadata({
    locale,
    path: "/faq",
    title: seo?.metaTitle[locale] || t("title"),
    description: seo?.metaDescription[locale] || t("paragraph"),
    image: seo?.ogImage ?? undefined,
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [faqItems, images] = await Promise.all([getFaqItems(), getPageImages()]);

  return (
    <main>
      <JsonLd data={buildFaqPageSchema(faqItems, locale as "en" | "ar")} />
      <FaqHero image={images["faq-hero"]} />
      <FaqList />
      <FaqCta />
    </main>
  );
}
