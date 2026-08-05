import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDreGDi5Tk5vPjyM0FkzujGOSivDoOuN6JzhgfqEyk82twgar9ZlVqQA8Mxuj9Pa3d71I0psf0deXNczx2CxGQpwqV33pqQeMK71vqiEqpJcJTLchBjn_aYnXoOktF9ukPzQecONsikmXGtafgZTiq5Qip0u8gS1olO7gD8CaYPVVhiVsd-kDIWYuAYirx2zOnpyeamKfQArfQzitgUywx4SaZq4drgSVwtkDn59R4bugr-dkoaoHWRDQ";

export async function BeforeAfterHero() {
  const t = await getTranslations("pages.beforeAfter.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero image={HERO_IMAGE} title={t("title")} paragraph={t("paragraph")}>
      <CTAButton href="/contact" size="lg">
        {cta("bookConsultation")}
      </CTAButton>
    </PageHero>
  );
}
