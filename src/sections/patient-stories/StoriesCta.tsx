import { getTranslations } from "next-intl/server";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";

/**
 * Reference has a bespoke abstract 3D composition (two overlapping rotated
 * panels + a floating "Book Now" glass chip) in place of a plain photo.
 * ContactCtaBanner's `image` prop only exposes a single 2-column image slot
 * (no children/decorative-overlay API), so that composition is simplified
 * to this one image rather than forking the shared banner for a single page.
 */
export async function StoriesCta({ image }: { image: string }) {
  const t = await getTranslations("pages.patientStories.cta");

  return (
    <ContactCtaBanner eyebrow={t("eyebrow")} heading={t("heading")} paragraph={t("paragraph")} image={image} imageAlt="" />
  );
}
