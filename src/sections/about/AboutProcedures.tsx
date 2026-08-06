"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { ProcedureModal } from "@/components/ProcedureModal";
import { procedures } from "@/content/procedures";
import type { Procedure } from "@/types/content";

const featured = procedures.filter((p) => p.featuredOnHome);

export function AboutProcedures() {
  const [selected, setSelected] = useState<Procedure | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("pages.about.procedures");
  const cta = useTranslations("cta");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
          <CTAButton href="/procedures" variant="ghost" showArrow>
            {cta("showMore")}
          </CTAButton>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((procedure) => (
            <button
              key={procedure.slug}
              type="button"
              onClick={() => setSelected(procedure)}
              className="group flex flex-col overflow-hidden rounded-2xl neon-card text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.15)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.3)]"
            >
              <div className="relative h-48 w-full shrink-0 overflow-hidden">
                <Image
                  src={procedure.image}
                  alt={procedure.name[locale]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a120a] to-transparent" />
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
      </div>

      <ProcedureModal procedure={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
