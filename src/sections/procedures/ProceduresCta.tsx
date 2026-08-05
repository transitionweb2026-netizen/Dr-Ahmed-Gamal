import { getTranslations } from "next-intl/server";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";

export async function ProceduresCta() {
  const t = await getTranslations("pages.procedures.cta");

  return (
    <ContactCtaBanner eyebrow={t("eyebrow")} heading={t("heading")} paragraph={t("paragraph")} />
  );
}
