import { getTranslations } from "next-intl/server";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";

export async function BeforeAfterCta() {
  const t = await getTranslations("pages.beforeAfter.cta");

  return <ContactCtaBanner eyebrow={t("eyebrow")} heading={t("heading")} />;
}
