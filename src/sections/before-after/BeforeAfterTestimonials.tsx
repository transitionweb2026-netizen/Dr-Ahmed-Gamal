import { getLocale, getTranslations } from "next-intl/server";
import { Icon } from "@/components/Icon";
import { StarRating } from "@/components/StarRating";
import { testimonials } from "@/content/testimonials";

// Cases & Reviews.html's own 8-reviewer set — excludes the 3 testimonials
// that are scoped to the Home page (`featuredOnHome`) so this page shows the
// same 8 reviewers the legacy mockup did, not the merged 11.
const pageTestimonials = testimonials.filter((testimonial) => !testimonial.featuredOnHome);

export async function BeforeAfterTestimonials() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.beforeAfter.testimonials");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center font-serif text-4xl text-brand-light">{t("heading")}</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pageTestimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="gold-glass-card card-glow-halo flex flex-col gap-4 rounded-2xl p-8 transition-transform hover:-translate-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/10">
                  <Icon name="person" className="h-4 w-4 text-brand-gold/60" />
                </div>
                <Icon name="format_quote" className="h-8 w-8 text-brand-gold/50" />
              </div>
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
