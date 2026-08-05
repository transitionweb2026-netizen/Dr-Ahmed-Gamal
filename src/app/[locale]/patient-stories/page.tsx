import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PatientStoriesHero } from "@/sections/patient-stories/PatientStoriesHero";
import { StoriesIntro } from "@/sections/patient-stories/StoriesIntro";
import { StoriesGrid } from "@/sections/patient-stories/StoriesGrid";
import { StoriesCta } from "@/sections/patient-stories/StoriesCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "pages.patientStories.hero" });

  return buildMetadata({
    locale,
    path: "/patient-stories",
    title: `${t("titleLine1")} ${t("titleLine2")}`,
    description: t("paragraph"),
  });
}

export default async function PatientStoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <PatientStoriesHero />
      <StoriesIntro />
      <StoriesGrid />
      <StoriesCta />
    </main>
  );
}
