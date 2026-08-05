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

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
          <p className="mt-4 leading-relaxed text-brand-light/70">{t("paragraph")}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((procedure) => (
            <button
              key={procedure.slug}
              type="button"
              onClick={() => setSelected(procedure)}
              className="group text-start"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={procedure.image}
                  alt={procedure.name[locale]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/10 to-transparent" />
                <div className="absolute start-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-darker/70 text-brand-gold backdrop-blur-sm">
                  <Icon name={procedure.icon} className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mt-4 font-serif text-xl text-brand-light transition-colors group-hover:text-brand-gold">
                {procedure.name[locale]}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-brand-light/60">
                {procedure.shortDescription[locale]}
              </p>
            </button>
          ))}
        </div>
      </div>

      <ProcedureModal procedure={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
