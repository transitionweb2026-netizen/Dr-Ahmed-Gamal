import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { HeroFloatingContact } from "@/components/HeroFloatingContact";

export async function BeforeAfterHero({ image }: { image: string }) {
  const t = await getTranslations("pages.beforeAfter.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={image}
      fullHeight
      align="start"
      title={
        <>
          {t("titleLine1")}{" "}
          <span className="bg-gradient-to-b from-brand-gold via-[#a67c00] to-[#5c4000] bg-clip-text text-transparent">
            {t("titleLine2")}
          </span>
        </>
      }
      paragraph={t("paragraph")}
      capsule={<HeroFloatingContact />}
    >
      <CTAButton href="/contact" variant="flat" size="lg">
        {cta("bookNow")}
      </CTAButton>
    </PageHero>
  );
}
