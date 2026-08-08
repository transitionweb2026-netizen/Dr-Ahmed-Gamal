import { getLocale, getTranslations } from "next-intl/server";
import { Icon } from "@/components/Icon";
import { getContactInfo } from "@/services/contactInfo";
import type { IconName } from "@/constants/iconMap";

const SOCIAL_ICONS: Record<string, IconName> = {
  facebook: "groups",
  instagram: "camera_alt",
  tiktok: "video_library",
};

function InfoCard({ icon, title, children }: { icon: IconName; title: string; children: React.ReactNode }) {
  return (
    <div className="group gold-glass-card flex flex-col rounded-xl p-8 text-center transition-transform hover:-translate-y-2">
      <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold transition-colors group-hover:bg-brand-gold/20">
        <Icon name={icon} className="h-7 w-7" />
      </div>
      <h3 className="mb-2 text-label-sm uppercase tracking-wider text-brand-light/50">{title}</h3>
      <div className="space-y-2 text-brand-light/70">{children}</div>
    </div>
  );
}

export async function ContactInfoGrid() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.contact.contactGrid");
  const contactInfo = await getContactInfo();
  const socialEntries = Object.entries(contactInfo.social);
  const hasSocial = socialEntries.length > 0;

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard icon="call" title={t("phoneTitle")}>
            <a
              href={contactInfo.phone.href}
              className="block text-body-lg text-brand-light transition-colors hover:text-brand-gold"
            >
              {contactInfo.phone.display}
            </a>
            <a
              href={contactInfo.emergencyPhone.href}
              className="block text-body-md text-brand-light/70 transition-colors hover:text-brand-gold"
            >
              {t("emergencyPhoneLabel")}: {contactInfo.emergencyPhone.display}
            </a>
          </InfoCard>

          <InfoCard icon="mail" title={t("emailTitle")}>
            <a href={contactInfo.email.href} className="transition-colors hover:text-brand-gold">
              {contactInfo.email.display}
            </a>
          </InfoCard>

          <InfoCard icon="schedule" title={t("hoursTitle")}>
            {contactInfo.workingHours.map((entry) => (
              <p key={entry.days.en} className="flex items-baseline justify-between gap-4">
                <span>{entry.days[locale]}</span>
                <span className="text-brand-light/65">{entry.hours[locale]}</span>
              </p>
            ))}
          </InfoCard>

          {hasSocial && (
            <InfoCard icon="share" title={t("socialTitle")}>
              <div className="flex items-center justify-center gap-4">
                {socialEntries.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-brand-light/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
                    aria-label={platform}
                  >
                    <Icon name={SOCIAL_ICONS[platform] ?? "public"} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </InfoCard>
          )}
        </div>
      </div>
    </section>
  );
}
