import { getLocale, getTranslations } from "next-intl/server";
import { Icon } from "@/components/Icon";
import { contactInfo } from "@/constants/contactInfo";
import type { IconName } from "@/constants/iconMap";

const SOCIAL_ICONS: Record<string, IconName> = {
  instagram: "camera_alt",
  facebook: "groups",
  tiktok: "video_library",
  youtube: "play_circle",
};

function InfoCard({ icon, title, children }: { icon: IconName; title: string; children: React.ReactNode }) {
  return (
    <div className="gold-glass-card flex flex-col gap-4 rounded-xl p-8 transition-transform hover:-translate-y-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <h3 className="font-serif text-xl text-brand-light">{title}</h3>
      <div className="space-y-2 text-brand-light/70">{children}</div>
    </div>
  );
}

export async function ContactInfoGrid() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.contact.contactGrid");
  const socialEntries = Object.entries(contactInfo.social);
  const hasSocial = socialEntries.length > 0;

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard icon="call" title={t("phoneTitle")}>
            <p>
              <span className="text-xs uppercase tracking-wider text-brand-gold/70">
                {t("mainPhoneLabel")}
              </span>
              <br />
              <a href={contactInfo.phone.href} className="transition-colors hover:text-brand-gold">
                {contactInfo.phone.display}
              </a>
            </p>
            <p>
              <span className="text-xs uppercase tracking-wider text-brand-gold/70">
                {t("emergencyPhoneLabel")}
              </span>
              <br />
              <a href={contactInfo.emergencyPhone.href} className="transition-colors hover:text-brand-gold">
                {contactInfo.emergencyPhone.display}
              </a>
            </p>
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
              <div className="flex items-center gap-4">
                {socialEntries.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold transition-colors hover:border-brand-gold hover:text-brand-light"
                    aria-label={platform}
                  >
                    <Icon name={SOCIAL_ICONS[platform] ?? "public"} className="h-4 w-4" />
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
