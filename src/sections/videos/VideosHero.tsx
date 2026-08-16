import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { HeroFloatingContact } from "@/components/HeroFloatingContact";

export async function VideosHero({ image }: { image: string }) {
  const t = await getTranslations("pages.videos.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={image}
      align="start"
      title={
        <span className="drop-shadow-2xl">
          {t("titleLine1")} <br />
          <span className="bg-gradient-to-br from-[#f2ca50] to-[#d4af37] bg-clip-text text-transparent">
            {t("titleLine2")}
          </span>
        </span>
      }
      paragraph={t("paragraph")}
      capsule={<HeroFloatingContact />}
    >
      <CTAButton
        href="/contact"
        size="lg"
        showArrow
        className="mb-20 rounded-full bg-gradient-to-r from-brand-gold to-[#f2ca50] text-brand-darker shadow-[0_10px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)]"
      >
        {cta("contactUs")}
      </CTAButton>
    </PageHero>
  );
}
