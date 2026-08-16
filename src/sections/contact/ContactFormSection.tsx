import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/sections/contact/ContactForm";
import type { Procedure } from "@/types/content";

export async function ContactFormSection({ procedures, image }: { procedures: Procedure[]; image: string }) {
  const t = await getTranslations("pages.contact.formSection");

  return (
    <section className="relative overflow-hidden bg-brand-darker py-[120px]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 start-[-100px] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="gold-glass-card relative z-10 mx-auto w-full max-w-md rounded-xl p-8 lg:mx-0">
            <h2 className="mb-2 text-headline-md font-serif text-brand-light">{t("heading")}</h2>
            <p className="mb-8 text-body-md text-brand-light/70">{t("paragraph")}</p>
            <ContactForm procedures={procedures} />
          </div>

          <div className="gold-glass-card relative hidden h-[500px] w-full overflow-hidden rounded-xl lg:block">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
