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
import { getContactInfo } from "@/services/contactInfo";

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
  const loc = locale as "en" | "ar";
  const [procedures, images, contactInfo, tLocation, tLocation2] = await Promise.all([
    getProcedures(),
    getPageImages(),
    getContactInfo(),
    getTranslations({ locale, namespace: "pages.contact.location" }),
    getTranslations({ locale, namespace: "pages.contact.location2" }),
  ]);

  return (
    <main>
      <ContactHero image={images["contact-hero"]} />
      <ContactFormSection procedures={procedures} image={images["contact-form-portrait"]} />
      <LocationBlock
        image={images["contact-location"]}
        imageAlt={tLocation("imageAlt")}
        heading={tLocation("heading")}
        tagline={tLocation("tagline")}
        address={contactInfo.address[loc]}
        mapsUrl={contactInfo.mapsUrl}
      />
      {contactInfo.location2 && (
        <LocationBlock
          image={images["contact-location-2"]}
          imageAlt={tLocation2("imageAlt")}
          heading={tLocation2("heading")}
          tagline={tLocation2("tagline")}
          address={contactInfo.location2.address[loc]}
          mapsUrl={contactInfo.location2.mapsUrl}
        />
      )}
      <ContactInfoGrid />
      <ContactClosingCta />
    </main>
  );
}
