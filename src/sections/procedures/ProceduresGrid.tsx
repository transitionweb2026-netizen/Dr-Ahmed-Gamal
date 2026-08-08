"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ProcedureModal } from "@/components/ProcedureModal";
import { Icon } from "@/components/Icon";
import { procedures } from "@/content/procedures";
import type { Procedure } from "@/types/content";

const sorted = [...procedures].sort((a, b) => a.order - b.order);

export function ProceduresGrid() {
  const [selected, setSelected] = useState<Procedure | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("pages.procedures.grid");
  const cta = useTranslations("cta");

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-gold/50" />
            <h2 className="bg-gradient-to-r from-[#f2ca50] to-brand-gold bg-clip-text text-headline-md uppercase tracking-widest text-transparent md:text-headline-lg">
              {t("heading")}
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-gold/50" />
          </div>
          <p className="mx-auto max-w-2xl text-body-lg text-brand-light/70">{t("paragraph")}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {sorted.map((procedure) => (
            <button
              key={procedure.slug}
              type="button"
              onClick={() => setSelected(procedure)}
              className="luxury-card group flex h-full min-h-[400px] flex-col rounded-2xl text-start"
            >
              <div className="relative h-[55%] w-full shrink-0 overflow-hidden rounded-t-2xl">
                <Image
                  src={procedure.image}
                  alt={procedure.name[locale]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent opacity-90" />
              </div>
              <div className="relative z-10 flex flex-1 flex-col bg-gradient-to-b from-transparent to-brand-darker/60 p-6">
                <h3 className="font-serif text-xl text-brand-light drop-shadow-md transition-colors group-hover:text-brand-gold">
                  {procedure.name[locale]}
                </h3>
                <p className="mt-2 mb-4 line-clamp-2 text-sm leading-relaxed text-brand-light/60">
                  {procedure.shortDescription[locale]}
                </p>
                <span className="mt-auto inline-flex w-fit items-center gap-2 border-b border-brand-gold/30 pb-1 text-sm font-semibold uppercase tracking-wider text-brand-gold transition-all duration-300 group-hover:gap-3 group-hover:border-brand-gold">
                  {cta("learnMore")}
                  <Icon
                    name="arrow_forward"
                    className="h-4 w-4 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
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
