import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { getContactInfo } from "@/services/contactInfo";

// Legacy's "Transformation Mirror" CTA pairs the eyebrow/heading/buttons with
// a circular-cropped doctor portrait — reusing the same placeholder portrait
// used on the About page's PersonalMessage section rather than introducing a
// new image asset.
const PORTRAIT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDOODoWObUH7MnELpTvoPb3O4NdeEoZ3oKMZlqC0uC6ycIDSqbeJQIQtxcvc55I3Y9KmgVoeTNR15eRIFvMXufvIZ4AeyjkLVninKL4CMDRMdvjxg_FU_HEHAOZoIde0o2abYKGDiJVL6VBUNlfG9UYcx3IFzFzyTuPtYXzzW_r8iWcyj2gtzEfX_YopLWqVOSUvIFxl3S3HffazB543kPiIQIAJ2gCOPNXslByKx1SRjFz9oQMwimQ4A";

export async function BeforeAfterCta() {
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
                src={PORTRAIT_IMAGE}
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
