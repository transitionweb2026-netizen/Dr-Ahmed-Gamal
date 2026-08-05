import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { contactInfo } from "@/constants/contactInfo";

interface ContactCtaBannerProps {
  eyebrow?: string;
  heading: string;
  paragraph?: string;
}

export async function ContactCtaBanner({ eyebrow, heading, paragraph }: ContactCtaBannerProps) {
  const cta = await getTranslations("cta");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">{eyebrow}</p>
        )}
        <h2 className="mt-4 font-serif text-3xl text-brand-light sm:text-4xl">{heading}</h2>
        {paragraph && <p className="mt-4 leading-relaxed text-brand-light/70">{paragraph}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
    </section>
  );
}
