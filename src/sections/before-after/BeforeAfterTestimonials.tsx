import { getLocale, getTranslations } from "next-intl/server";
import { Icon } from "@/components/Icon";
import { StarRating } from "@/components/StarRating";
import { testimonials } from "@/content/testimonials";

export async function BeforeAfterTestimonials() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.beforeAfter.testimonials");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center font-serif text-4xl text-brand-light">{t("heading")}</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.id} className="glass-panel flex flex-col gap-4 rounded-2xl p-8">
              <Icon name="format_quote" className="h-8 w-8 text-brand-gold/50" />
              <blockquote className="flex-1 leading-relaxed text-brand-light/80">
                &ldquo;{testimonial.quote[locale]}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between border-t border-brand-gold/10 pt-4">
                <figcaption className="font-serif text-brand-light">{testimonial.name}</figcaption>
                <StarRating rating={testimonial.rating} />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
