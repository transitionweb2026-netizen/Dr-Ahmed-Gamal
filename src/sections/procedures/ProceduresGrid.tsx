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
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
          <p className="mt-4 leading-relaxed text-brand-light/70">{t("paragraph")}</p>
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
                <div className="absolute start-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-darker/70 text-brand-gold backdrop-blur-sm">
                  <Icon name={procedure.icon} className="h-5 w-5" />
                </div>
              </div>
              <div className="relative z-10 flex flex-1 flex-col bg-gradient-to-b from-transparent to-brand-darker/60 p-6">
                <h3 className="font-serif text-xl text-brand-light drop-shadow-md transition-colors group-hover:text-brand-gold">
                  {procedure.name[locale]}
                </h3>
                <p className="mt-2 mb-4 line-clamp-2 text-sm leading-relaxed text-brand-light/60">
                  {procedure.shortDescription[locale]}
                </p>
                <span className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-gold">
                  <span className="relative pb-1">
                    {cta("learnMore")}
                    <span
                      aria-hidden
                      className="absolute bottom-0 start-0 h-px w-0 bg-brand-gold transition-all duration-300 group-hover:w-full"
                    />
                  </span>
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
