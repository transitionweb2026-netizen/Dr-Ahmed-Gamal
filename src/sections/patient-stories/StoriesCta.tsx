import { getTranslations } from "next-intl/server";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";
import { getVideos } from "@/services/videos";

export async function StoriesCta() {
  const t = await getTranslations("pages.patientStories.cta");
  const videos = await getVideos();

  // Reference has a bespoke abstract 3D composition (two overlapping rotated
  // panels + a floating "Book Now" glass chip) in place of a plain photo.
  // ContactCtaBanner's `image` prop only exposes a single 2-column image slot
  // (no children/decorative-overlay API), so that composition is simplified
  // to this one placeholder image rather than forking the shared banner for
  // a single page — see report for details.
  const storyImage = videos.find((v) => v.id === "story-rania-transformation")!;

  return (
    <ContactCtaBanner
      eyebrow={t("eyebrow")}
      heading={t("heading")}
      paragraph={t("paragraph")}
      image={storyImage.thumbnail}
      imageAlt=""
    />
  );
}
