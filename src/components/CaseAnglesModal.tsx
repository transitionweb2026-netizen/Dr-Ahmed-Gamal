"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import type { BeforeAfterCase } from "@/types/content";

interface CaseAnglesModalProps {
  caseItem: BeforeAfterCase | null;
  onClose: () => void;
}

/**
 * Popup shown when a Before & After card is clicked — up to 4 additional
 * angle views. Nose cases set `afterImage` on every angle, so each renders
 * as its own before/after slider; every other category only sets `image`,
 * rendered as a single static photo.
 */
export function CaseAnglesModal({ caseItem, onClose }: CaseAnglesModalProps) {
  const locale = useLocale() as "en" | "ar";
  const angles = caseItem?.angles?.filter((a) => a.image) ?? [];

  return (
    <Modal
      open={!!caseItem}
      onOpenChange={(open) => !open && onClose()}
      title={caseItem ? caseItem.title[locale] : ""}
      contentClassName="max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8"
    >
      {caseItem && (
        <>
          <h3 className="pe-8 font-serif text-2xl text-brand-light">{caseItem.title[locale]}</h3>
          <p className="mt-1 text-sm text-brand-light/60">{caseItem.subtitle[locale]}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {angles.map((angle, i) =>
              angle.afterImage ? (
                <BeforeAfterSlider
                  key={i}
                  beforeImage={angle.image}
                  afterImage={angle.afterImage}
                  beforeAlt={`${caseItem.title[locale]} — ${i + 1}`}
                  afterAlt={`${caseItem.title[locale]} — ${i + 1}`}
                />
              ) : (
                <div key={i} className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-brand-gold/30">
                  <Image
                    src={angle.image}
                    alt={`${caseItem.title[locale]} — ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
              ),
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
