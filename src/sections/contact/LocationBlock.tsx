import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Icon } from "@/components/Icon";
import { getContactInfo } from "@/services/contactInfo";

// Reused from the "A Tour of Our Elite Clinic" thumbnail in src/content/videos.ts
// (THUMB_CLINIC) — the existing placeholder that reads as a clinic building shot.
const CLINIC_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB4iLCApbgxorz0O9XzZAaEllbJ5NWmQaI2XAB5XDFX05_1Efd5Ir1HCBxPH1eA-5VY0PJkyy29dnl5ZJxHJabaYp068eNu-TuEMVXcbUivqRYma7Fp4fPJ5CrClYSUFVLk_lJjZvtezIqKavSNPv9JYdpc-97HX8jWraWUNgvOurl2hMh6KmOce_B-aZBNmNc7_-ljBeHMVYaqFaCbSJElAfyC7oWwZJ4mH_r_eBYIEstKIFwW7AA5BQ";

export async function LocationBlock() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.contact.location");
  const cta = await getTranslations("cta");
  const contactInfo = await getContactInfo();

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="gold-glass-card grid grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image
              src={CLINIC_IMAGE}
              alt={t("imageAlt")}
              fill
              className="object-cover object-top"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

          <div className="flex flex-col justify-center bg-brand-dark/40 p-8 backdrop-blur-md md:p-12">
            <h2 className="mb-2 text-headline-md font-serif text-brand-light">{t("heading")}</h2>

            <p className="mb-6 flex items-center gap-2 text-body-md text-brand-gold">
              <Icon name="location_on" className="h-5 w-5 shrink-0" />
              {t("tagline")}
            </p>

            <p className="mb-8 text-body-md text-brand-light/70">{contactInfo.address[locale]}</p>

            <a
              href={contactInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-brand-gold px-6 py-3 text-button uppercase text-brand-gold transition-colors hover:bg-brand-gold/10"
            >
              <Icon name="map" className="h-4 w-4" />
              {cta("getDirections")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
