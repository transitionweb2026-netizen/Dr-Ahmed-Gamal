import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { getContactInfo } from "@/services/contactInfo";

export async function BeforeAfterCta({ image }: { image: string }) {
  const t = await getTranslations("pages.beforeAfter.cta");
  const about = await getTranslations("pages.about.message");
  const cta = await getTranslations("cta");
  const contactInfo = await getContactInfo();

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="gold-glass-card card-glow-halo flex flex-col items-center gap-12 rounded-2xl p-8 md:flex-row md:p-12">
          <div className="flex justify-center md:w-1/2">
            <div className="relative h-80 w-64 overflow-hidden rounded-full border border-brand-gold/50 shadow-[0_0_40px_rgba(212,175,55,0.25)]">
              <Image
                src={image}
                alt={about("signature")}
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 text-start md:w-1/2">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
              {t("eyebrow")}
            </p>
            <h2 className="font-serif text-3xl text-brand-light sm:text-4xl">{t("heading")}</h2>
            <div className="flex flex-wrap items-center justify-start gap-4">
              <CTAButton href="/contact" size="lg">
                {cta("bookConsultation")}
              </CTAButton>
              <CTAButton href={contactInfo.whatsapp.href} variant="outline" size="lg">
                {cta("whatsapp")}
              </CTAButton>
              <CTAButton href={contactInfo.phone.href} variant="outline" size="lg">
                {cta("callNow")}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
