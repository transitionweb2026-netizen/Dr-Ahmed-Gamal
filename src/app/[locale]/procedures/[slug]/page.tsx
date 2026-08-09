import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/Icon";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";
import { getProcedures } from "@/services/procedures";

export async function generateStaticParams() {
  const procedures = await getProcedures();
  return procedures.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const procedures = await getProcedures();
  const procedure = procedures.find((p) => p.slug === slug);
  if (!procedure) return {};

  const loc = locale as "en" | "ar";
  return buildMetadata({
    locale,
    path: `/procedures/${slug}`,
    title: procedure.name[loc],
    description: procedure.shortDescription[loc],
    image: procedure.image,
  });
}

export default async function ProcedureDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as "en" | "ar";

  const procedures = await getProcedures();
  const procedure = procedures.find((p) => p.slug === slug);
  if (!procedure) {
    notFound();
  }

  const t = await getTranslations("procedures");
  const cta = await getTranslations("pages.procedures.cta");
  const nav = await getTranslations("nav");

  const breadcrumb = buildBreadcrumbSchema(
    [
      { name: nav("home"), path: "/" },
      { name: nav("procedures"), path: "/procedures" },
      { name: procedure.name[loc], path: `/procedures/${procedure.slug}` },
    ],
    loc,
  );

  const related = [
    ...procedures.filter((p) => p.slug !== procedure.slug && p.category === procedure.category),
    ...procedures.filter((p) => p.slug !== procedure.slug && p.category !== procedure.category),
  ].slice(0, 3);

  return (
    <main>
      <JsonLd data={breadcrumb} />
      <section className="relative h-72 w-full sm:h-96">
        <Image
          src={procedure.image}
          alt={procedure.name[loc]}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/60 to-brand-darker/10" />

        <div className="absolute inset-x-0 top-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/procedures"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-gold/90 transition-colors hover:text-brand-gold"
            >
              <Icon name="chevron_left" className="h-4 w-4 rtl:rotate-180" />
              {t("allProcedures")}
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-darker/70 text-brand-gold">
              <Icon name={procedure.icon} className="h-6 w-6" />
            </div>
            <h1 className="font-serif text-4xl text-brand-light sm:text-5xl">
              {procedure.name[loc]}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-brand-darker py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-serif text-2xl text-brand-gold">{t("overview")}</h2>
            <p className="mt-4 leading-relaxed text-brand-light/80">
              {procedure.detail.overview[loc]}
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-brand-gold">{t("recovery")}</h2>
            <p className="mt-4 leading-relaxed text-brand-light/80">
              {procedure.detail.recovery[loc]}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-serif text-3xl text-brand-light">{t("faqTitle")}</h2>
          <FaqAccordion
            items={procedure.detail.faq.map((faq, i) => ({
              id: String(i),
              question: faq.question,
              answer: faq.answer,
            }))}
          />
        </div>
      </section>

      <section className="bg-brand-darker py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 font-serif text-4xl text-brand-light">{t("relatedProcedures")}</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/procedures/${item.slug}`} className="group block">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.name[loc]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/10 to-transparent" />
                </div>
                <h3 className="mt-4 font-serif text-lg text-brand-light transition-colors group-hover:text-brand-gold">
                  {item.name[loc]}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCtaBanner eyebrow={cta("eyebrow")} heading={cta("heading")} paragraph={cta("paragraph")} />
    </main>
  );
}
