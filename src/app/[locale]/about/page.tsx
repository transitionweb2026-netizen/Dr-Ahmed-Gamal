import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { buildPhysicianSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { getProcedures } from "@/services/procedures";
import { getVideos } from "@/services/videos";
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
  const t = await getTranslations({ locale, namespace: "pages.about.hero" });

  return buildMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("paragraph"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [procedures, videos] = await Promise.all([getProcedures(), getVideos()]);

  return (
    <main>
      <JsonLd data={buildPhysicianSchema(locale as Locale)} />
      <AboutHero />
      <PersonalMessage />
      <AboutVideoSplit videos={videos} />
      <AchievementStrip />
      <AboutProcedures procedures={procedures} />
      <JourneyTimeline />
      <PhotoGallery />
      <AboutCta />
    </main>
  );
}
