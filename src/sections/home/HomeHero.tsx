import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { HeroFloatingContact } from "@/components/HeroFloatingContact";

export async function HomeHero({ image }: { image: string }) {
  const t = await getTranslations("pages.home.hero");
  const cta = await getTranslations("cta");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-darker pb-16 pt-24">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover object-center opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-darker via-brand-darker/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-darker" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-5xl leading-tight text-brand-light lg:text-7xl">
            {t("titleLine1")} <br />
            <span className="italic text-brand-gold">{t("titleLine2")}</span>
          </h1>
          <p className="max-w-xl text-lg font-light leading-relaxed text-gray-300">
            {t("paragraph")}
          </p>
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <CTAButton href="/contact" size="lg">
              {cta("bookConsultation")}
            </CTAButton>
            <CTAButton href="/before-after" variant="outline" size="lg">
              {cta("viewResults")}
            </CTAButton>
          </div>
        </div>
      </div>

      <HeroFloatingContact />
    </section>
  );
}
