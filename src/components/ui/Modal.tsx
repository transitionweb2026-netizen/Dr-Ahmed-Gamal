"use client";

import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  contentClassName?: string;
}

export function Modal({ open, onOpenChange, title, children, contentClassName }: ModalProps) {
  const t = useTranslations("common");
  const reduceMotion = useReducedMotion();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-brand-darker/85 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
              />
            </Dialog.Overlay>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
              <Dialog.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  className={cn(
                    "relative w-full max-w-2xl rounded-2xl border border-brand-gold/20 bg-brand-dark shadow-glass",
                    contentClassName,
                  )}
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 12 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.25, ease: "easeOut" }}
                >
                  <Dialog.Title className="sr-only">{title}</Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label={t("close")}
                      className="absolute end-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-darker/70 text-brand-light transition-colors hover:text-brand-gold"
                    >
                      <Icon name="close" className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                  {children}
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
