import { getTranslations } from "next-intl/server";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";

export async function BlogCta({ image }: { image: string }) {
  const t = await getTranslations("pages.blog.cta");

  return (
    <ContactCtaBanner
      eyebrow={t("eyebrow")}
      heading={t("heading")}
      paragraph={t("paragraph")}
      image={image}
      imageAlt={t("imageAlt")}
    />
  );
}
