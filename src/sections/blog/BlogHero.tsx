import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { HeroFloatingContact } from "@/components/HeroFloatingContact";

export async function BlogHero({ image }: { image: string }) {
  const t = await getTranslations("pages.blog.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={image}
      align="start"
      eyebrow={t("eyebrow")}
      title={
        <>
          {t("titleLine1")} <br />
          <span className="italic text-brand-gold">{t("titleLine2")}</span>
        </>
      }
      paragraph={t("paragraph")}
      capsule={<HeroFloatingContact />}
    >
      <CTAButton href="/contact" size="lg">
        {cta("contactUs")}
      </CTAButton>
      <CTAButton href="/before-after" variant="outline" size="lg">
        {cta("viewResults")}
      </CTAButton>
    </PageHero>
  );
}
