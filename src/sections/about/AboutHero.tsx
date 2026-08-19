import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { HeroFloatingContact } from "@/components/HeroFloatingContact";

export async function AboutHero({ image }: { image: string }) {
  const t = await getTranslations("pages.about.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={image}
      eyebrow={t("eyebrow")}
      title={t("title")}
      paragraph={t("paragraph")}
      align="start"
      imageClassName="object-[70%_20%]"
      gradientVariant="directional"
      minHeightClassName="min-h-[600px] pb-16 sm:min-h-[90vh]"
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
