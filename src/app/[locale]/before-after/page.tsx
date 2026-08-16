import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { BeforeAfterHero } from "@/sections/before-after/BeforeAfterHero";
import { CategoryGalleries } from "@/sections/before-after/CategoryGalleries";
import { BeforeAfterTestimonials } from "@/sections/before-after/BeforeAfterTestimonials";
import { BeforeAfterCta } from "@/sections/before-after/BeforeAfterCta";
import { getBeforeAfterCases } from "@/services/beforeAfterCases";
import { getSeoMetadata } from "@/services/seoMetadata";
import { getPageImages } from "@/services/pageImages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const [t, seo] = await Promise.all([
    getTranslations({ locale, namespace: "pages.beforeAfter.hero" }),
    getSeoMetadata("before-after"),
  ]);

  return buildMetadata({
    locale,
    path: "/before-after",
    title: seo?.metaTitle[locale] || `${t("titleLine1")} ${t("titleLine2")}`,
    description: seo?.metaDescription[locale] || t("paragraph"),
    image: seo?.ogImage ?? undefined,
  });
}

export default async function BeforeAfterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [cases, images] = await Promise.all([getBeforeAfterCases(), getPageImages()]);

  return (
    <main>
      <BeforeAfterHero image={images["before-after-hero"]} />
      <CategoryGalleries cases={cases} />
      <BeforeAfterTestimonials />
      <BeforeAfterCta image={images["before-after-cta"]} />
    </main>
  );
}
