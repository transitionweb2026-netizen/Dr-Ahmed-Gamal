import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/Icon";
import { contactInfo } from "@/constants/contactInfo";

// Same hero portrait used behind About's hero — reused here at low opacity
// as the "Cinematic Consultation Portal" section's backdrop image.
const BACKGROUND_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0VNsM0wX80bzSvbTOR489BcEFjL1kq6Ana5TSz17vJzdDbhMpj5wDSBzqa4CFFaUQxa0i3bk5W7LsKv88Hn9jD88m3jPXnVmgsTq_hZ52H_s_ihzkdv0KsPgxdiwhmXaWlnVTHudtmoPpiOfsOxn7SPNwrpLVG6FcMlR4q_XJRkyTSUVNSh6DdnGU2pYmaJJxIOCRECMXsPUx7vijuf3AtBNDEMKeyaaiBAmsbo6v2H0St0B8UAGtGQ";

export async function AboutCta() {
  const t = await getTranslations("pages.about.cta");
  const cta = await getTranslations("cta");

  return (
    <section className="relative overflow-hidden border-t border-brand-gold/20 bg-brand-darker py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-brand-darker via-brand-darker/90 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brand-gold/30 bg-[#1c120a]/80 p-8 shadow-neon-gold backdrop-blur-xl md:p-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8 text-start">
              <h2 className="font-serif text-3xl leading-tight text-brand-light lg:text-5xl">
                {t("titleLine1")} <span className="italic text-brand-gold">{t("titleLine2")}</span>
              </h2>
              <p className="font-light text-gray-300">{t("paragraph")}</p>

              <div className="flex flex-col space-y-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-brand-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-darker shadow-gold transition-colors duration-300 hover:bg-white"
                >
                  {cta("bookConsultation")}
                </Link>
                <div className="flex gap-4">
                  <a
                    href={contactInfo.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-gold/40 bg-brand-darker/50 px-6 py-3 text-xs font-medium uppercase tracking-wider text-brand-light transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold"
                  >
                    <Icon name="chat" className="h-4 w-4" />
                    {cta("whatsapp")}
                  </a>
                  <a
                    href={contactInfo.phone.href}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-gold/40 bg-brand-darker/50 px-6 py-3 text-xs font-medium uppercase tracking-wider text-brand-light transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold"
                  >
                    <Icon name="phone" className="h-4 w-4" />
                    {cta("callNow")}
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden items-center justify-center lg:flex">
              <div className="relative h-64 w-64">
                <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border border-brand-gold/30" />
                <div className="absolute inset-4 animate-[spin_15s_linear_infinite_reverse] rounded-full border border-brand-gold/20" />
                <div className="absolute inset-8 animate-[spin_8s_linear_infinite] rounded-full border-t border-b border-brand-gold/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon
                    name="diamond"
                    aria-hidden
                    className="h-16 w-16 text-brand-gold/80 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
