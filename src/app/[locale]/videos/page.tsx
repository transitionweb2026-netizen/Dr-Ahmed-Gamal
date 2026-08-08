import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { VideosHero } from "@/sections/videos/VideosHero";
import { VideosIntroGrid } from "@/sections/videos/VideosIntroGrid";
import { VideosGrid } from "@/sections/videos/VideosGrid";
import { VideosCta } from "@/sections/videos/VideosCta";
import { getVideos } from "@/services/videos";
import { getContactInfo } from "@/services/contactInfo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "pages.videos.hero" });

  return buildMetadata({
    locale,
    path: "/videos",
    title: `${t("titleLine1")} ${t("titleLine2")}`,
    description: t("paragraph"),
  });
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [videos, contactInfo] = await Promise.all([getVideos(), getContactInfo()]);

  return (
    <main>
      <VideosHero />
      <VideosIntroGrid videos={videos} />
      <VideosGrid videos={videos} />
      <VideosCta contactInfo={contactInfo} videos={videos} />
    </main>
  );
}
