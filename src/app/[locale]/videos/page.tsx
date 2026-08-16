import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { buildVideoObjectSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { VideosHero } from "@/sections/videos/VideosHero";
import { VideosGrid } from "@/sections/videos/VideosGrid";
import { VideosCta } from "@/sections/videos/VideosCta";
import { getVideos } from "@/services/videos";
import { getContactInfo } from "@/services/contactInfo";
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
    getTranslations({ locale, namespace: "pages.videos.hero" }),
    getSeoMetadata("videos"),
  ]);

  return buildMetadata({
    locale,
    path: "/videos",
    title: seo?.metaTitle[locale] || `${t("titleLine1")} ${t("titleLine2")}`,
    description: seo?.metaDescription[locale] || t("paragraph"),
    image: seo?.ogImage ?? undefined,
  });
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [videos, contactInfo, images] = await Promise.all([getVideos(), getContactInfo(), getPageImages()]);

  // Structured data must match what's actually visible — same filter/limit
  // as VideosGrid's "Watch & Learn" section (exactly 9 educational videos).
  const structuredDataVideos = videos.filter((v) => v.videoType !== "patient_story").slice(0, 9);

  return (
    <main>
      {structuredDataVideos.map((video) => (
        <JsonLd key={video.id} data={buildVideoObjectSchema(video, locale as Locale)} />
      ))}
      <VideosHero image={images["videos-hero"]} />
      <VideosGrid videos={videos} />
      <VideosCta contactInfo={contactInfo} videos={videos} />
    </main>
  );
}
