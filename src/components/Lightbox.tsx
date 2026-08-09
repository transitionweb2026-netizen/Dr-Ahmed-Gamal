"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";

interface LightboxProps {
  images: string[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}

export function Lightbox({ images, index, open, onOpenChange, onIndexChange }: LightboxProps) {
  const t = useTranslations("common");
  const reduceMotion = useReducedMotion();
  const go = (next: number) => onIndexChange(((next % images.length) + images.length) % images.length);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[60] bg-brand-darker/95"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              forceMount
              aria-describedby={undefined}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") go(index + 1);
                if (event.key === "ArrowLeft") go(index - 1);
              }}
            >
              <motion.div
                className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
              >
                <Dialog.Title className="sr-only">Gallery</Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label={t("close")}
                    className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark/70 text-brand-light transition-colors hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker"
                  >
                    <Icon name="close" className="h-6 w-6" />
                  </button>
                </Dialog.Close>

                <div className="relative h-full max-h-[80vh] w-full max-w-4xl">
                  <Image
                    src={images[index]}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>

                <div className="mt-4 flex items-center gap-6">
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    aria-label={t("previous")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold transition-colors hover:border-brand-gold hover:bg-brand-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker"
                  >
                    <Icon name="chevron_left" className="h-5 w-5 rtl:rotate-180" />
                  </button>
                  <span dir="ltr" className="font-mono text-sm text-brand-light/60">
                    {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() => go(index + 1)}
                    aria-label={t("next")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold transition-colors hover:border-brand-gold hover:bg-brand-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker"
                  >
                    <Icon name="chevron_right" className="h-5 w-5 rtl:rotate-180" />
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
