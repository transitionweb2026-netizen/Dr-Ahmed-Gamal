import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { getProcedures } from "@/services/procedures";
import { getVideos } from "@/services/videos";
import { getSeoMetadata } from "@/services/seoMetadata";
import { getPageImages } from "@/services/pageImages";
import { AboutHero } from "@/sections/about/AboutHero";
import { PersonalMessage } from "@/sections/about/PersonalMessage";
import { AboutVideoSplit } from "@/sections/about/AboutVideoSplit";
import { AchievementStrip } from "@/sections/about/AchievementStrip";
import { AboutProcedures } from "@/sections/about/AboutProcedures";
import { JourneyTimeline } from "@/sections/about/JourneyTimeline";
import { PhotoGallery } from "@/sections/about/PhotoGallery";
import { AboutCta } from "@/sections/about/AboutCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const [t, seo] = await Promise.all([
    getTranslations({ locale, namespace: "pages.about.hero" }),
    getSeoMetadata("about"),
  ]);

  return buildMetadata({
    locale,
    path: "/about",
    title: seo?.metaTitle[locale] || t("title"),
    description: seo?.metaDescription[locale] || t("paragraph"),
    image: seo?.ogImage ?? undefined,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [procedures, videos, images] = await Promise.all([getProcedures(), getVideos(), getPageImages()]);

  return (
    <main>
      <AboutHero image={images["about-hero"]} />
      <PersonalMessage image={images["about-message-portrait"]} />
      <AboutVideoSplit videos={videos} />
      <AchievementStrip />
      <AboutProcedures procedures={procedures} image={images["about-procedures"]} />
      <JourneyTimeline />
      <PhotoGallery />
      <AboutCta image={images["about-cta"]} />
    </main>
  );
}
