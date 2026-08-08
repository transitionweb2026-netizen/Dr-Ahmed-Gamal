"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { NavLink } from "@/constants/nav";
import type { site as staticSite } from "@/constants/site";
import { CTAButton } from "@/components/CTAButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";
import { cn } from "@/utils/cn";

interface SiteHeaderProps {
  navLinks: NavLink[];
  site: typeof staticSite;
}

export function SiteHeader({ navLinks, site }: SiteHeaderProps) {
  const locale = useLocale() as "en" | "ar";
  const cta = useTranslations("cta");
  const pathname = usePathname();

  return (
    <header className="glass-panel fixed inset-x-0 top-0 z-40 border-b border-brand-gold/10">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-shrink-0 items-center" aria-label={site.name}>
          <Image
            src={site.logoUrl}
            alt={site.name}
            width={64}
            height={64}
            className="h-14 w-auto rounded-md object-contain sm:h-16"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-7">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors",
                  active ? "text-brand-gold" : "text-gray-300 hover:text-brand-gold",
                )}
              >
                {link.label[locale]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <CTAButton href="/contact" size="sm">
            {cta("bookConsultation")}
          </CTAButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <MobileNavDrawer navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
