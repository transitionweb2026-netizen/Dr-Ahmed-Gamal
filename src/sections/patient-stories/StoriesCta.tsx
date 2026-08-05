import { getTranslations } from "next-intl/server";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";

export async function StoriesCta() {
  const t = await getTranslations("pages.patientStories.cta");

  return <ContactCtaBanner eyebrow={t("eyebrow")} heading={t("heading")} paragraph={t("paragraph")} />;
}
