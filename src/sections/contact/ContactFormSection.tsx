import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/sections/contact/ContactForm";

const PORTRAIT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDOODoWObUH7MnELpTvoPb3O4NdeEoZ3oKMZlqC0uC6ycIDSqbeJQIQtxcvc55I3Y9KmgVoeTNR15eRIFvMXufvIZ4AeyjkLVninKL4CMDRMdvjxg_FU_HEHAOZoIde0o2abYKGDiJVL6VBUNlfG9UYcx3IFzFzyTuPtYXzzW_r8iWcyj2gtzEfX_YopLWqVOSUvIFxl3S3HffazB543kPiIQIAJ2gCOPNXslByKx1SRjFz9oQMwimQ4A";

export async function ContactFormSection() {
  const t = await getTranslations("pages.contact.formSection");

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">{t("eyebrow")}</p>
            <h2 className="mt-4 font-serif text-4xl text-brand-light">{t("heading")}</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <Image src={PORTRAIT_IMAGE} alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
