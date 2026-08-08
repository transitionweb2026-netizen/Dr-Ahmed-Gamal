"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/constants/iconMap";

interface FloatingActionButtonsProps {
  whatsappHref: string;
  phoneHref: string;
}

interface Action {
  key: string;
  href: string;
  icon: IconName;
  label: string;
}

const actionButtonClass =
  "gold-glass-card flex h-12 w-12 items-center justify-center rounded-full text-brand-gold transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker sm:h-14 sm:w-14";

/**
 * Site-wide dual-action FAB (WhatsApp + Call) — both always visible with
 * their real icons, no click-to-reveal step (an earlier hidden-trigger
 * version proved undiscoverable). Deliberately anchored at the *opposite*
 * bottom corner from HeroContactCapsule/HeroFloatingContact — this widget
 * is `fixed` (always on screen), while the hero capsule is only `absolute`
 * within each page's hero, so pinning both to the same corner would
 * overlap for the whole first viewport of every page.
 */
export function FloatingActionButtons({ whatsappHref, phoneHref }: FloatingActionButtonsProps) {
  const t = useTranslations("floatingContact");
  const reduceMotion = useReducedMotion();

  const actions: Action[] = [
    { key: "whatsapp", href: whatsappHref, icon: "whatsapp", label: t("whatsapp") },
    { key: "call", href: phoneHref, icon: "call", label: t("call") },
  ];

  return (
    <div
      className="fixed start-4 z-40 flex flex-col items-center gap-3 sm:start-6"
      style={{ bottom: "max(1.25rem, calc(env(safe-area-inset-bottom) + 0.75rem))" }}
    >
      {actions.map((action, index) => (
        <motion.a
          key={action.key}
          href={action.href}
          target={action.href.startsWith("http") ? "_blank" : undefined}
          rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={action.label}
          className={actionButtonClass}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 36, scale: reduceMotion ? 1 : 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0.01 : 0.5,
            ease: [0.34, 1.56, 0.64, 1],
            delay: reduceMotion ? 0 : 0.4 + index * 0.15,
          }}
        >
          <Icon name={action.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.a>
      ))}
    </div>
  );
}
