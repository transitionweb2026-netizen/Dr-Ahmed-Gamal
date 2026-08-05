import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { BeforeAfterHero } from "@/sections/before-after/BeforeAfterHero";
import { CategoryGalleries } from "@/sections/before-after/CategoryGalleries";
import { BeforeAfterTestimonials } from "@/sections/before-after/BeforeAfterTestimonials";
import { BeforeAfterCta } from "@/sections/before-after/BeforeAfterCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "pages.beforeAfter.hero" });

  return buildMetadata({
    locale,
    path: "/before-after",
    title: t("title"),
    description: t("paragraph"),
  });
}

export default async function BeforeAfterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <BeforeAfterHero />
      <CategoryGalleries />
      <BeforeAfterTestimonials />
      <BeforeAfterCta />
    </main>
  );
}
