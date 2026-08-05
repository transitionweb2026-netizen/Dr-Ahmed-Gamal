import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DirectionProvider } from "@radix-ui/react-direction";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/constants/site";
import { SiteHeader } from "@/layouts/SiteHeader";
import { SiteFooter } from "@/layouts/SiteFooter";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

  return (
    <html
      lang={locale}
      dir={dir}
      data-theme="dark"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand-darker font-sans text-brand-light">
        <a
          href="#main-content"
          className="sr-only rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-darker focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100]"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <DirectionProvider dir={dir}>
            <SiteHeader />
            <div id="main-content" className="flex-1">
              {children}
            </div>
            <SiteFooter />
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
