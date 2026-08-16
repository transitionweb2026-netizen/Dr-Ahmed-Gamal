import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { HomeHero } from "@/sections/home/HomeHero";
import { AboutDoctorSplit } from "@/sections/home/AboutDoctorSplit";
import { AchievementStrip } from "@/sections/home/AchievementStrip";
import { FeaturedProcedures } from "@/sections/home/FeaturedProcedures";
import { BeforeAfterPreview } from "@/sections/home/BeforeAfterPreview";
import { TestimonialsPreview } from "@/sections/home/TestimonialsPreview";
import { MilestonesCarousel } from "@/sections/home/MilestonesCarousel";
import { WhyChooseUs } from "@/sections/home/WhyChooseUs";
import { FeaturedVideos } from "@/sections/home/FeaturedVideos";
import { FinalCta } from "@/sections/home/FinalCta";
import { getProcedures } from "@/services/procedures";
import { getVideos } from "@/services/videos";
import { getBeforeAfterCases } from "@/services/beforeAfterCases";
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
  const [siteSettings, hero, seo] = await Promise.all([
    getSiteSettings(),
    getTranslations({ locale, namespace: "pages.home.hero" }),
    getSeoMetadata("home"),
  ]);

  return buildMetadata({
    locale,
    path: "/",
    title: seo?.metaTitle[locale] || siteSettings.name,
    description: seo?.metaDescription[locale] || hero("paragraph"),
    image: seo?.ogImage ?? undefined,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [procedures, videos, beforeAfterCases, images] = await Promise.all([
    getProcedures(),
    getVideos(),
    getBeforeAfterCases(),
    getPageImages(),
  ]);

  return (
    <main>
      <HomeHero image={images["home-hero"]} />
      <AboutDoctorSplit videos={videos} image={images["home-about"]} />
      <AchievementStrip />
      <FeaturedProcedures procedures={procedures} image={images["home-specialties"]} />
      <BeforeAfterPreview cases={beforeAfterCases} />
      <TestimonialsPreview />
      <MilestonesCarousel />
      <WhyChooseUs image={images["home-why-choose-us"]} />
      <FeaturedVideos videos={videos} image={images["home-videos"]} />
      <FinalCta />
    </main>
  );
}
