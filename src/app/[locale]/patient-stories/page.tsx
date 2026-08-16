import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PatientStoriesHero } from "@/sections/patient-stories/PatientStoriesHero";
import { StoriesIntro } from "@/sections/patient-stories/StoriesIntro";
import { StoriesGrid } from "@/sections/patient-stories/StoriesGrid";
import { StoriesCta } from "@/sections/patient-stories/StoriesCta";
import { getVideos } from "@/services/videos";
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
    getTranslations({ locale, namespace: "pages.patientStories.hero" }),
    getSeoMetadata("patient-stories"),
  ]);

  return buildMetadata({
    locale,
    path: "/patient-stories",
    title: seo?.metaTitle[locale] || `${t("titleLine1")} ${t("titleLine2")}`,
    description: seo?.metaDescription[locale] || t("paragraph"),
    image: seo?.ogImage ?? undefined,
  });
}

export default async function PatientStoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [videos, images] = await Promise.all([getVideos(), getPageImages()]);

  return (
    <main>
      <PatientStoriesHero image={images["patient-stories-hero"]} />
      <StoriesIntro />
      <StoriesGrid videos={videos} />
      <StoriesCta />
    </main>
  );
}
