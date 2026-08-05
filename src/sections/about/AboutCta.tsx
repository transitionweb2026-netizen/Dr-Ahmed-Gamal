import { getTranslations } from "next-intl/server";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";

export async function AboutCta() {
  const t = await getTranslations("pages.about.cta");

  return (
    <ContactCtaBanner
      heading={`${t("titleLine1")} ${t("titleLine2")}`}
      paragraph={t("paragraph")}
    />
  );
}
