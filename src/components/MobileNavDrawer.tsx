"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { NavLink } from "@/constants/nav";
import { Icon } from "@/components/Icon";
import { CTAButton } from "@/components/CTAButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useDirection } from "@/lib/rtl";
import { cn } from "@/utils/cn";

interface MobileNavDrawerProps {
  navLinks: NavLink[];
}

export function MobileNavDrawer({ navLinks }: MobileNavDrawerProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("nav");
  const cta = useTranslations("cta");
  const pathname = usePathname();
  const dir = useDirection();
  const reduceMotion = useReducedMotion();
  const offscreenX = dir === "rtl" ? "-100%" : "100%";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={t("openMenu")}
          className="inline-flex items-center justify-center rounded-full p-2 text-brand-light transition-colors hover:text-brand-gold lg:hidden"
        >
          <Icon name="menu" className="h-7 w-7" />
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-brand-darker/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed inset-y-0 end-0 z-50 flex w-full max-w-sm flex-col gap-8 border-s border-brand-gold/20 bg-brand-dark px-6 py-8 shadow-glass"
                initial={{ x: reduceMotion ? 0 : offscreenX }}
                animate={{ x: 0 }}
                exit={{ x: reduceMotion ? 0 : offscreenX }}
                transition={{ type: "tween", duration: reduceMotion ? 0.01 : 0.3, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-serif text-lg text-brand-gold">
                    {t("menu")}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label={t("closeMenu")}
                      className="rounded-full p-2 text-brand-light transition-colors hover:text-brand-gold"
                    >
                      <Icon name="close" className="h-6 w-6" />
                    </button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 overflow-y-auto">
                  {navLinks.map((link) => {
                    const active =
                      link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "rounded-lg px-3 py-3 font-serif text-lg transition-colors",
                          active ? "text-brand-gold" : "text-brand-light/80 hover:text-brand-gold",
                        )}
                      >
                        {link.label[locale]}
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex flex-col gap-4 border-t border-brand-gold/10 pt-6">
                  <LanguageSwitcher className="self-start" />
                  <CTAButton href="/contact" size="md" showArrow onClick={() => setOpen(false)}>
                    {cta("bookConsultation")}
                  </CTAButton>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
