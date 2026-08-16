import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { getVideos } from "@/services/videos";

export async function FinalCta() {
  const t = await getTranslations("pages.home.finalCta");
  const cta = await getTranslations("cta");
  const videos = await getVideos();
  const phoneImage = videos.find((v) => v.id === "patient-journey") ?? videos[0];

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 flex justify-center lg:order-1 lg:justify-end">
          <div className="relative h-[500px] w-64 -rotate-6 overflow-hidden rounded-[3rem] border-4 border-gray-800 bg-black p-2 shadow-2xl">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-20 h-6 rounded-t-[2.5rem] bg-black"
            />
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-brand-dark">
              <Image
                src={phoneImage.thumbnail}
                alt=""
                fill
                className="object-cover opacity-60"
                sizes="256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-darker/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-10 px-4 text-center">
                <h4 className="mb-4 font-serif text-lg leading-tight text-white">
                  {t("phoneOverline")}
                </h4>
                <CTAButton href="/contact" variant="flat" size="sm" className="px-6 py-3 font-bold">
                  {cta("bookNow")}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 space-y-6 text-center lg:order-2 lg:text-start">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif text-4xl leading-tight text-brand-light lg:text-5xl">
            {t("titleLine1")} <br />
            <span className="italic text-brand-gold">{t("titleLine2")}</span>
          </h2>
          <p className="leading-relaxed text-brand-light/70">{t("paragraph")}</p>
          <CTAButton href="/contact" variant="flat" size="lg" className="px-8 font-bold">
            {cta("requestConsultation")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
