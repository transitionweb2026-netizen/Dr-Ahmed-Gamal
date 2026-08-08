import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { buildPhysicianSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { ContactHero } from "@/sections/contact/ContactHero";
import { ContactFormSection } from "@/sections/contact/ContactFormSection";
import { LocationBlock } from "@/sections/contact/LocationBlock";
import { ContactInfoGrid } from "@/sections/contact/ContactInfoGrid";
import { ContactClosingCta } from "@/sections/contact/ContactClosingCta";
import { getProcedures } from "@/services/procedures";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "pages.contact.hero" });

  return buildMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("paragraph"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const procedures = await getProcedures();

  return (
    <main>
      <JsonLd data={buildPhysicianSchema(locale as Locale)} />
      <ContactHero />
      <ContactFormSection procedures={procedures} />
      <LocationBlock />
      <ContactInfoGrid />
      <ContactClosingCta />
    </main>
  );
}
