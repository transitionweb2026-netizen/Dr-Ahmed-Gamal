"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";
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
              className="group text-start"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={procedure.image}
                  alt={procedure.name[locale]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/10 to-transparent" />
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
