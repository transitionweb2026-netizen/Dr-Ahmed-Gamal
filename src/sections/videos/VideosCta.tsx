import { getTranslations } from "next-intl/server";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";

export async function VideosCta() {
  const t = await getTranslations("pages.videos.cta");

  return (
    <ContactCtaBanner
      heading={`${t("titleLine1")} ${t("titleLine2")}`}
      paragraph={t("paragraph")}
    />
  );
}
