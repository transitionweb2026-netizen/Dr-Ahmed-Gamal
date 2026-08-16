import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { HeroFloatingContact } from "@/components/HeroFloatingContact";

export async function PatientStoriesHero({ image }: { image: string }) {
  const t = await getTranslations("pages.patientStories.hero");
  const cta = await getTranslations("cta");

  // PageHero's `eyebrow` prop is intentionally typed as a plain string so
  // every other page can hand it a translated string with no ceremony. This
  // page's reference gives the eyebrow a gradient text-fill, so the styled
  // span is built here and handed to that string-typed slot — PageHero's
  // JSX just interpolates `{eyebrow}`, so a ReactNode still renders
  // correctly there without widening the shared prop type for one page.
  const eyebrow = (
    <span className="bg-gradient-to-r from-[#f2ca50] to-[#d4af37] bg-clip-text text-transparent">
      {t("eyebrow")}
    </span>
  ) as unknown as string;

  return (
    <PageHero
      image={image}
      align="start"
      eyebrow={eyebrow}
      title={
        <>
          {t("titleLine1")} <br />
          <span className="italic text-brand-gold">{t("titleLine2")}</span>
        </>
      }
      paragraph={t("paragraph")}
      capsule={<HeroFloatingContact />}
    >
      <CTAButton href="/contact" size="lg" showArrow className="px-8 py-4">
        {cta("contactUs")}
      </CTAButton>
      <CTAButton href="/before-after" size="lg" variant="outline" className="px-8 py-4">
        {cta("viewResults")}
      </CTAButton>
    </PageHero>
  );
}
