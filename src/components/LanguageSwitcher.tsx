"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/utils/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("languageSwitcher");

  return (
    <div
      dir="ltr"
      role="group"
      aria-label={t("label")}
      className={cn(
        "inline-flex items-center rounded-full border border-brand-gold/30 bg-brand-dark/60 p-1 backdrop-blur-md",
        className,
      )}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            aria-current={active ? "true" : undefined}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-300",
              active ? "text-brand-darker" : "text-brand-light/70 hover:text-brand-gold",
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-switch-indicator"
                className="absolute inset-0 -z-10 rounded-full bg-brand-gold"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            {t(l)}
          </Link>
        );
      })}
    </div>
  );
}
