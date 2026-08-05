"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import type { Procedure } from "@/types/content";

interface ProcedureModalProps {
  procedure: Procedure | null;
  onClose: () => void;
}

export function ProcedureModal({ procedure, onClose }: ProcedureModalProps) {
  const locale = useLocale() as "en" | "ar";
  const cta = useTranslations("cta");
  const t = useTranslations("procedures");

  return (
    <Modal
      open={!!procedure}
      onOpenChange={(open) => !open && onClose()}
      title={procedure ? procedure.name[locale] : ""}
      contentClassName="max-h-[85vh] overflow-y-auto"
    >
      {procedure && (
        <div>
          <div className="relative h-56 w-full overflow-hidden rounded-t-2xl sm:h-64">
            <Image
              src={procedure.image}
              alt={procedure.name[locale]}
              fill
              className="object-cover"
              sizes="672px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
          </div>
          <div className="space-y-6 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Icon name={procedure.icon} className="h-6 w-6 text-brand-gold" />
              <h2 className="font-serif text-2xl text-brand-light">{procedure.name[locale]}</h2>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
                {t("overview")}
              </h3>
              <p className="mt-2 leading-relaxed text-brand-light/80">
                {procedure.detail.overview[locale]}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
                {t("recovery")}
              </h3>
              <p className="mt-2 leading-relaxed text-brand-light/80">
                {procedure.detail.recovery[locale]}
              </p>
            </div>
            <div className="flex flex-col gap-3 border-t border-brand-gold/10 pt-6 sm:flex-row">
              <CTAButton
                href={`/procedures/${procedure.slug}`}
                variant="outline"
                size="md"
                className="flex-1 justify-center"
              >
                {cta("learnMore")}
              </CTAButton>
              <CTAButton href="/contact" variant="solid" size="md" className="flex-1 justify-center">
                {cta("bookConsultation")}
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
