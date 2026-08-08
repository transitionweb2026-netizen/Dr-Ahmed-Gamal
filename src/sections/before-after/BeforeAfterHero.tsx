import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { HeroFloatingContact } from "@/components/HeroFloatingContact";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDreGDi5Tk5vPjyM0FkzujGOSivDoOuN6JzhgfqEyk82twgar9ZlVqQA8Mxuj9Pa3d71I0psf0deXNczx2CxGQpwqV33pqQeMK71vqiEqpJcJTLchBjn_aYnXoOktF9ukPzQecONsikmXGtafgZTiq5Qip0u8gS1olO7gD8CaYPVVhiVsd-kDIWYuAYirx2zOnpyeamKfQArfQzitgUywx4SaZq4drgSVwtkDn59R4bugr-dkoaoHWRDQ";

export async function BeforeAfterHero() {
  const t = await getTranslations("pages.beforeAfter.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={HERO_IMAGE}
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
