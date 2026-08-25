import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { HeroFloatingContact } from "@/components/HeroFloatingContact";
import { CTAButton } from "@/components/CTAButton";

export async function ProceduresHero({ image }: { image: string }) {
  const t = await getTranslations("pages.procedures.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={image}
      align="start"
      eyebrow={t("eyebrow")}
      title={t("title")}
      paragraph={t("paragraph")}
      capsule={<HeroFloatingContact />}
    >
      <CTAButton href="/contact" size="lg">
        {cta("bookConsultation")}
      </CTAButton>
      <CTAButton href="/before-after" variant="outline" size="lg">
        {cta("viewResults")}
      </CTAButton>
    </PageHero>
  );
}
