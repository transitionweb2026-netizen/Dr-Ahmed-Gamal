import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { contactInfo } from "@/constants/contactInfo";

// Reused from the "A Tour of Our Elite Clinic" thumbnail in src/content/videos.ts
// (THUMB_CLINIC) — the existing placeholder that reads as a clinic building shot.
const CLINIC_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB4iLCApbgxorz0O9XzZAaEllbJ5NWmQaI2XAB5XDFX05_1Efd5Ir1HCBxPH1eA-5VY0PJkyy29dnl5ZJxHJabaYp068eNu-TuEMVXcbUivqRYma7Fp4fPJ5CrClYSUFVLk_lJjZvtezIqKavSNPv9JYdpc-97HX8jWraWUNgvOurl2hMh6KmOce_B-aZBNmNc7_-ljBeHMVYaqFaCbSJElAfyC7oWwZJ4mH_r_eBYIEstKIFwW7AA5BQ";

export async function LocationBlock() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.contact.location");
  const cta = await getTranslations("cta");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="gold-glass-card grid grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image
              src={CLINIC_IMAGE}
              alt={t("imageAlt")}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">{t("eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl text-brand-light sm:text-4xl">{t("heading")}</h2>

            <div className="mt-6 flex items-center gap-3 text-lg text-brand-light/80">
              <Icon name="location_on" className="h-5 w-5 shrink-0 text-brand-gold" />
              <span>{contactInfo.address[locale]}</span>
            </div>

            <div className="mt-8">
              <CTAButton href={contactInfo.mapsUrl} variant="outline" size="lg">
                {cta("getDirections")}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
