import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { ContactHero } from "@/sections/contact/ContactHero";
import { ContactFormSection } from "@/sections/contact/ContactFormSection";
import { LocationBlock } from "@/sections/contact/LocationBlock";
import { ContactInfoGrid } from "@/sections/contact/ContactInfoGrid";
import { ContactClosingCta } from "@/sections/contact/ContactClosingCta";
import { getProcedures } from "@/services/procedures";
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
    getTranslations({ locale, namespace: "pages.contact.hero" }),
    getSeoMetadata("contact"),
  ]);

  return buildMetadata({
    locale,
    path: "/contact",
    title: seo?.metaTitle[locale] || t("title"),
    description: seo?.metaDescription[locale] || t("paragraph"),
    image: seo?.ogImage ?? undefined,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [procedures, images] = await Promise.all([getProcedures(), getPageImages()]);

  return (
    <main>
      <ContactHero image={images["contact-hero"]} />
      <ContactFormSection procedures={procedures} image={images["contact-form-portrait"]} />
      <LocationBlock image={images["contact-location"]} />
      <ContactInfoGrid />
      <ContactClosingCta />
    </main>
  );
}
