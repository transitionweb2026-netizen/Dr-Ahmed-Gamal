import type { Metadata } from "next";
import { site } from "@/constants/site";
import type { Locale } from "@/i18n/routing";

interface BuildMetadataOptions {
  locale: Locale;
  /** Path without locale prefix, e.g. "/about" or "/procedures/rhinoplasty". Use "/" for the home page. */
  path: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

function localizedPath(locale: Locale, path: string): string {
  const normalized = path === "/" ? "" : path;
  return `/${locale}${normalized}`;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  noIndex,
}: BuildMetadataOptions): Metadata {
  const canonical = localizedPath(locale, path);
  const ogImage = image ?? localizedPath(locale, "/opengraph-image");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: localizedPath("en", path),
        ar: localizedPath("ar", path),
        "x-default": localizedPath(site.defaultLocale, path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
