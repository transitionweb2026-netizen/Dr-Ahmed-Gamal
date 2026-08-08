import { getTranslations } from "next-intl/server";

export async function StoriesIntro() {
  const t = await getTranslations("pages.patientStories.intro");

  return (
    <section className="relative bg-brand-dark py-20">
      <div
        aria-hidden
        className="light-leak top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2"
      />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-center gap-6">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-brand-gold/50" />
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2ca50] to-[#d4af37] font-serif text-headline-md uppercase tracking-widest">
            {t("heading")}
          </h2>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-brand-gold/50" />
        </div>
        <p className="mx-auto max-w-2xl text-body-md text-brand-light/70">{t("paragraph")}</p>
      </div>
    </section>
  );
}
