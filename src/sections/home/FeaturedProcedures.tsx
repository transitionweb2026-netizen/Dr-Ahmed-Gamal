"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";
import { ProcedureModal } from "@/components/ProcedureModal";
import { procedures } from "@/content/procedures";
import type { Procedure } from "@/types/content";

const featured = procedures.filter((p) => p.featuredOnHome);

export function FeaturedProcedures() {
  const [selected, setSelected] = useState<Procedure | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("pages.home.procedures");
  const cta = useTranslations("cta");

  return (
    <section className="bg-brand-darker py-24">
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
              className="group text-start"
            >
              <div className="neon-card relative h-[450px] overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-neon-gold-hover!">
                <div className="absolute inset-x-0 top-0 h-[60%] overflow-hidden rounded-t-3xl">
                  <Image
                    src={procedure.image}
                    alt={procedure.name[locale]}
                    fill
                    className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a2015] via-[#2a2015]/40 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex h-[40%] flex-col justify-center p-6 text-center">
                  <h3 className="mb-3 font-serif text-xl text-brand-light">{procedure.name[locale]}</h3>
                  <p className="line-clamp-3 text-sm font-light text-gray-300">
                    {procedure.shortDescription[locale]}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProcedureModal procedure={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
