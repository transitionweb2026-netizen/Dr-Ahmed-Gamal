import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Icon } from "@/components/Icon";
import { SectionKicker } from "@/components/SectionKicker";
import { getWhyChooseUs } from "@/services/whyChooseUs";

const SECTION_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAR43twscyrMv2G1Bf4MA9DLstqAnDaGnCOeoSFWtcL9ZBdILxqxp_dOsyQKHWSMAz9R03-S7QczfNxnHLvhRpCZesSw_rr8DmxlX_Sm6pvnh9XQ8jCLgukp1-sX2LKXY0D2TEQSm4W1mo03xulzf4_eGOeN_QIfQQZwy4tiHp0NzoaTL7dgwaXPOTnBn6tEyrS4X0O2RaiC-6g8lDGIi06y0Adf0iV-o9RC2mjlkAkaIS_H4u88VltsA";

export async function WhyChooseUs() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.home.whyChooseUs");
  const whyChooseUs = await getWhyChooseUs();

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <SectionKicker eyebrow={t("eyebrow")} heading={t("heading")} />
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-2xl bg-brand-gold/20 opacity-30 blur transition duration-1000 group-hover:opacity-50" />
            <div className="relative aspect-[4/5] w-full transform overflow-hidden rounded-2xl border border-brand-gold/30 shadow-2xl shadow-black/80 transition-transform duration-700 group-hover:scale-[1.02]">
              <Image
                src={SECTION_IMAGE}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/60 via-transparent to-transparent" />
            </div>
          </div>

          <div>
            <p className="text-lg leading-relaxed font-light text-gray-300">{t("paragraph")}</p>

            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {whyChooseUs.map((item) => (
                <li
                  key={item.id}
                  className="glass-panel flex items-center gap-4 rounded-xl border border-brand-gold/20 bg-[#1c120a]/80 p-4 transition-all duration-300 hover:border-brand-gold/50 hover:shadow-neon-gold"
                >
                  <Icon name={item.icon} className="h-6 w-6 shrink-0 text-brand-gold" />
                  <span className="text-sm font-medium tracking-wide text-brand-light">
                    {item.text[locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
