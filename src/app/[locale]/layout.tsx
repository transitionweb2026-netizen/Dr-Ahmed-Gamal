import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DirectionProvider } from "@radix-ui/react-direction";
import { routing, type Locale } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/constants/site";
import { getNavLinks } from "@/services/navLinks";
import { getSiteSettings } from "@/services/siteSettings";
import { getContactInfo } from "@/services/contactInfo";
import { buildPhysicianSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/layouts/SiteHeader";
import { SiteFooter } from "@/layouts/SiteFooter";
import { FloatingActionButtons } from "@/components/FloatingActionButtons";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Every page under [locale] is statically generated; ISR re-runs the
// CMS-backed data fetches (translations, services/*) on this interval so
// admin edits reach the live site without a full rebuild/redeploy.
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("name"),
      template: `%s | ${t("shortName")}`,
    },
    description: t("tagline"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = await getTranslations({ locale, namespace: "common" });
  const navLinks = await getNavLinks();
  const siteSettings = await getSiteSettings();
  const contactInfo = await getContactInfo();

  return (
    <html
      lang={locale}
      dir={dir}
      data-theme="dark"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand-darker font-sans text-brand-light">
        <JsonLd data={buildPhysicianSchema(locale as Locale, contactInfo)} />
        <a
          href="#main-content"
          className="sr-only rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-darker focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100]"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <DirectionProvider dir={dir}>
            <SiteHeader navLinks={navLinks} site={siteSettings} />
            <div id="main-content" className="flex-1">
              {children}
            </div>
            <SiteFooter />
            <FloatingActionButtons whatsappHref={contactInfo.whatsapp.href} phoneHref={contactInfo.phone.href} />
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
