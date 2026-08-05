import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { buildPhysicianSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const [site, hero] = await Promise.all([
    getTranslations({ locale, namespace: "site" }),
    getTranslations({ locale, namespace: "pages.home.hero" }),
  ]);

  return buildMetadata({
    locale,
    path: "/",
    title: site("name"),
    description: hero("paragraph"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd data={buildPhysicianSchema(locale as Locale)} />
      <HomeHero />
      <AboutDoctorSplit />
      <AchievementStrip />
      <FeaturedProcedures />
      <BeforeAfterPreview />
      <TestimonialsPreview />
      <MilestonesCarousel />
      <WhyChooseUs />
      <FeaturedVideos />
      <FinalCta />
    </main>
  );
}
