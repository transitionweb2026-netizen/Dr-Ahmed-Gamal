import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { CTAButton } from "@/components/CTAButton";
import { contactInfo } from "@/constants/contactInfo";
import { cn } from "@/utils/cn";

interface ContactCtaBannerProps {
  eyebrow?: string;
  heading: string;
  paragraph?: string;
  /** Optional right-column image — renders a 2-column card when present. */
  image?: string;
  imageAlt?: string;
}

export async function ContactCtaBanner({
  eyebrow,
  heading,
  paragraph,
  image,
  imageAlt,
}: ContactCtaBannerProps) {
  const cta = await getTranslations("cta");

  return (
    <section className="bg-brand-darker px-5 py-[120px] md:px-16">
      <div className="gold-glass-card relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-8 md:p-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 h-64 w-64 rounded-full bg-brand-gold/20 blur-[100px] rtl:-end-24 ltr:-start-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 h-64 w-64 rounded-full bg-brand-gold/10 blur-[100px] rtl:-start-24 ltr:-end-24"
        />
        <div
          className={cn(
            "relative z-10 grid grid-cols-1 items-center gap-12",
            image && "md:grid-cols-2",
          )}
        >
          <div className={cn(!image && "mx-auto max-w-2xl text-center")}>
            {eyebrow && (
              <p className="text-label-sm uppercase tracking-widest text-brand-gold">{eyebrow}</p>
            )}
            <h2 className="mt-4 text-headline-lg font-serif text-brand-light">{heading}</h2>
            {paragraph && (
              <p className="mt-4 text-body-lg leading-relaxed text-brand-light/70">{paragraph}</p>
            )}
            <div className={cn("mt-8 flex flex-wrap gap-4", !image && "justify-center")}>
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
          {image && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-brand-gold/20 shadow-glass">
              <Image
                src={image}
                alt={imageAlt ?? ""}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
