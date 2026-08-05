import { getTranslations } from "next-intl/server";

export async function StoriesIntro() {
  const t = await getTranslations("pages.patientStories.intro");

  return (
    <section className="bg-brand-dark py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-brand-light sm:text-4xl">{t("heading")}</h2>
        <p className="mt-4 leading-relaxed text-brand-light/70">{t("paragraph")}</p>
      </div>
    </section>
  );
}
