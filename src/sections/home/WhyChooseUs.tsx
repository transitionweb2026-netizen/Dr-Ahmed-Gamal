import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Icon } from "@/components/Icon";
import { whyChooseUs } from "@/content/whyChooseUs";

const SECTION_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAR43twscyrMv2G1Bf4MA9DLstqAnDaGnCOeoSFWtcL9ZBdILxqxp_dOsyQKHWSMAz9R03-S7QczfNxnHLvhRpCZesSw_rr8DmxlX_Sm6pvnh9XQ8jCLgukp1-sX2LKXY0D2TEQSm4W1mo03xulzf4_eGOeN_QIfQQZwy4tiHp0NzoaTL7dgwaXPOTnBn6tEyrS4X0O2RaiC-6g8lDGIi06y0Adf0iV-o9RC2mjlkAkaIS_H4u88VltsA";

export async function WhyChooseUs() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.home.whyChooseUs");

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <Image
              src={SECTION_IMAGE}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div>
            <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
            <p className="mt-4 leading-relaxed text-brand-light/70">{t("paragraph")}</p>

            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {whyChooseUs.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <Icon name={item.icon} className="h-5 w-5 shrink-0 text-brand-gold" />
                  <span className="text-brand-light/80">{item.text[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
