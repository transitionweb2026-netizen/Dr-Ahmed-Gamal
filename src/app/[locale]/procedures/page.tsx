import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { ProceduresHero } from "@/sections/procedures/ProceduresHero";
import { ProceduresGrid } from "@/sections/procedures/ProceduresGrid";
import { ProceduresCta } from "@/sections/procedures/ProceduresCta";
import { getProcedures } from "@/services/procedures";
import { getContactInfo } from "@/services/contactInfo";
import { getSeoMetadata } from "@/services/seoMetadata";
import { getSiteSettings } from "@/services/siteSettings";
import { getPageImages } from "@/services/pageImages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const [t, seo] = await Promise.all([
    getTranslations({ locale, namespace: "pages.procedures.hero" }),
    getSeoMetadata("procedures"),
  ]);

  return buildMetadata({
    locale,
    path: "/procedures",
    title: seo?.metaTitle[locale] || t("title"),
    description: seo?.metaDescription[locale] || t("paragraph"),
    image: seo?.ogImage ?? undefined,
  });
}

export default async function ProceduresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [procedures, contactInfo, siteSettings, images] = await Promise.all([
    getProcedures(),
    getContactInfo(),
    getSiteSettings(),
    getPageImages(),
  ]);

  return (
    <main>
      <ProceduresHero image={images["procedures-hero"]} />
      <ProceduresGrid procedures={procedures} />
      <ProceduresCta contactInfo={contactInfo} shortName={siteSettings.shortName} image={images["procedures-cta"]} />
    </main>
  );
}
