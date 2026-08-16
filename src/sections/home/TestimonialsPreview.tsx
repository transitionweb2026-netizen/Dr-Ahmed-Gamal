import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/Icon";
import { StarRating } from "@/components/StarRating";
import { getTestimonials } from "@/services/testimonials";

export async function TestimonialsPreview() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.home.testimonials");
  const testimonials = await getTestimonials();
  const featured = testimonials.filter((t) => t.featuredOnHome);

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((testimonial) => (
            <div key={testimonial.id} className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-[#d4af37]/20 opacity-75 blur transition duration-500 group-hover:opacity-100" />
              <figure className="gold-glass-card card-glow-halo relative flex flex-col gap-4 rounded-lg p-8 transition-transform duration-500 hover:-translate-y-2">
                <Icon name="format_quote" className="h-8 w-8 text-brand-gold/50" />
                <blockquote className="flex-1 text-sm font-light italic leading-relaxed text-gray-300">
                  &ldquo;{testimonial.quote[locale]}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between gap-4 border-t border-brand-gold/10 pt-4">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-brand-gold/30 bg-brand-darker text-brand-gold"
                    >
                      <Icon name="person" className="h-7 w-7" />
                    </span>
                    <div>
                      <figcaption className="font-serif text-lg tracking-wider text-brand-light">
                        {testimonial.name}
                      </figcaption>
                      {testimonial.procedureName && (
                        <p className="text-xs uppercase tracking-wide text-brand-gold/60">
                          {testimonial.procedureName[locale]}
                        </p>
                      )}
                    </div>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>
              </figure>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/before-after"
            className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-brand-gold transition-colors duration-300 hover:text-white"
          >
            {t("cta")} <span className="ms-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
