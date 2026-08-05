import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/constants/site";
import { contactInfo } from "@/constants/contactInfo";
import { Icon } from "@/components/Icon";

const quickLinks = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/before-after", labelKey: "beforeAfter" },
  { href: "/patient-stories", labelKey: "patientStories" },
  { href: "/contact", labelKey: "contact" },
] as const;

export async function SiteFooter() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const year = new Date().getFullYear();

  const categories = [
    t("categories.facial"),
    t("categories.breast"),
    t("categories.body"),
    t("categories.nonSurgical"),
  ];

  return (
    <footer className="border-t border-brand-gold/10 bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Image
              src={site.logoUrl}
              alt={site.name}
              width={56}
              height={56}
              className="h-12 w-auto rounded-md object-contain"
            />
            <p className="max-w-xs text-sm leading-relaxed text-brand-light/60">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider text-brand-gold">
              {t("quickLinksTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-light/70 transition-colors hover:text-brand-gold"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider text-brand-gold">
              {t("proceduresTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              {categories.map((label) => (
                <li key={label}>
                  <Link
                    href="/procedures"
                    className="text-sm text-brand-light/70 transition-colors hover:text-brand-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider text-brand-gold">
              {t("contactTitle")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-light/70">
              <li className="flex items-start gap-2">
                <Icon name="location_on" className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                <span>{contactInfo.address[locale]}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="call" className="h-4 w-4 shrink-0 text-brand-gold" />
                <a href={contactInfo.phone.href} className="transition-colors hover:text-brand-gold">
                  {contactInfo.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-brand-gold" />
                <a href={contactInfo.email.href} className="transition-colors hover:text-brand-gold">
                  {contactInfo.email.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-brand-gold/10 pt-8 text-xs text-brand-light/65 sm:flex-row">
          <p>{t("rightsReserved", { year })}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-brand-gold">
              {t("privacyPolicy")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand-gold">
              {t("termsOfService")}
            </Link>
            <span>{t("developedBy")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
