"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProcedureModal } from "@/components/ProcedureModal";
import type { Procedure } from "@/types/content";

export function FeaturedProcedures({ procedures, image }: { procedures: Procedure[]; image: string }) {
  const [selected, setSelected] = useState<Procedure | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("pages.home.procedures");
  const featured = procedures.filter((p) => p.featuredOnHome);

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 z-0">
        <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-brand-darker/80" />
      </div>

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
              className="group rounded-3xl text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker"
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

        <div className="text-center">
          <Link
            href="/procedures"
            className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-brand-gold transition-colors duration-300 hover:text-white"
          >
            {t("cta")} <span className="ms-2">→</span>
          </Link>
        </div>
      </div>

      <ProcedureModal procedure={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
