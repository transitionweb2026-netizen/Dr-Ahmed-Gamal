"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/Icon";
import { ProcedureModal } from "@/components/ProcedureModal";
import type { Procedure } from "@/types/content";

const SECTION_BACKGROUND =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC0WgM_rg_waaEBMCdhv5XDCqHeU6U_FOqXabijXUaOm8QMZ_o7p11xukV2J94x4nEW-H8f3cTOQfMQe6cvf8ttRSxtpUkklcjIjTDL9e-G8p_gYNed5m67UcLpwucrYLg64Nv6xpsm9LRIVflrBkFi1_BekJ4S4zAx3jDRoTwdQhuf7_IavEhnEc051z-LLfzIyeK9ihNcnQQgW3ZU41T6N1yDH1XOuKmNwa2ml6kNRC-iT82qyFsXNeFTY6NTWNm_pUg";

export function AboutProcedures({ procedures }: { procedures: Procedure[] }) {
  const [selected, setSelected] = useState<Procedure | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("pages.about.procedures");
  const featured = procedures.filter((p) => p.featuredOnHome);

  return (
    <section
      className="relative bg-brand-darker py-24"
      style={{
        backgroundImage: `linear-gradient(rgba(19, 19, 19, 0.85), rgba(19, 19, 19, 0.85)), url(${SECTION_BACKGROUND})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((procedure) => (
            <button
              key={procedure.slug}
              type="button"
              onClick={() => setSelected(procedure)}
              className="group flex flex-col overflow-hidden rounded-2xl neon-card bg-[#231a11] text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.15)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.3)]"
            >
              <div className="relative h-48 w-full shrink-0 overflow-hidden">
                <Image
                  src={procedure.image}
                  alt={procedure.name[locale]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231a11] to-transparent" />
              </div>

              <div className="relative z-10 -mt-6 flex flex-1 flex-col items-center px-6 pb-6">
                <span className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-darker text-brand-gold shadow-gold">
                  <Icon name={procedure.icon} className="h-6 w-6" />
                </span>
                <h3 className="mb-3 font-serif text-xl text-brand-light">{procedure.name[locale]}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-brand-light/60">
                  {procedure.shortDescription[locale]}
                </p>
                <span className="mt-auto flex w-full justify-end text-brand-gold/50 transition-colors group-hover:text-brand-gold">
                  <Icon
                    name="arrow_forward"
                    className="h-5 w-5 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  />
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/procedures"
            className="inline-flex items-center border-b border-brand-gold pb-1 text-sm font-bold uppercase tracking-widest text-brand-gold transition-colors duration-300 hover:text-white"
          >
            {t("viewAllCta")}
          </Link>
        </div>
      </div>

      <ProcedureModal procedure={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
