"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/constants/iconMap";
import { cn } from "@/utils/cn";

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
  "gold-glass-card flex h-12 w-12 items-center justify-center rounded-full text-brand-gold transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker";

/**
 * Site-wide dual-action FAB (WhatsApp + Call). Deliberately anchored at the
 * *opposite* bottom corner from HeroContactCapsule/HeroFloatingContact —
 * this widget is `fixed` (always on screen), while the hero capsule is only
 * `absolute` within each page's hero, so pinning both to the same corner
 * would overlap for the whole first viewport of every page.
 */
export function FloatingActionButtons({ whatsappHref, phoneHref }: FloatingActionButtonsProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("floatingContact");
  const reduceMotion = useReducedMotion();
  const groupId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const actions: Action[] = [
    { key: "whatsapp", href: whatsappHref, icon: "whatsapp", label: t("whatsapp") },
    { key: "call", href: phoneHref, icon: "call", label: t("call") },
  ];

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const revealTransition = { duration: reduceMotion ? 0.01 : 0.35, ease: [0.34, 1.56, 0.64, 1] as const };

  return (
    <div
      ref={rootRef}
      className="fixed start-4 z-40 flex flex-col items-center gap-3 sm:start-6"
      style={{ bottom: "max(1.25rem, calc(env(safe-area-inset-bottom) + 0.75rem))" }}
    >
      <AnimatePresence>
        {open && (
          <div id={groupId} role="group" aria-label={t("open")} className="flex flex-col items-center gap-3">
            {actions.map((action, index) => (
              <motion.a
                key={action.key}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={action.label}
                className={actionButtonClass}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.5 }}
                transition={{ ...revealTransition, delay: reduceMotion ? 0 : index * 0.08 }}
              >
                <Icon name={action.icon} className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={groupId}
        aria-label={open ? t("close") : t("open")}
        className={cn(
          "group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-brand-gold/50 bg-gradient-to-b from-[#a67c00] to-[#5c4000] text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_0_25px_rgba(212,175,55,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker",
          !open && "timeline-pulse",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: reduceMotion ? 0 : -45, scale: reduceMotion ? 1 : 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: reduceMotion ? 0 : 45, scale: reduceMotion ? 1 : 0.6 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.25, ease: "easeInOut" }}
            className="relative z-10 flex items-center justify-center"
          >
            <Icon name={open ? "close" : "chat"} className="h-6 w-6" />
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
