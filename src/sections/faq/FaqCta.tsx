import { getTranslations } from "next-intl/server";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";

export async function FaqCta() {
  const t = await getTranslations("pages.faq.cta");

  return <ContactCtaBanner eyebrow={t("eyebrow")} heading={t("heading")} paragraph={t("paragraph")} />;
}
