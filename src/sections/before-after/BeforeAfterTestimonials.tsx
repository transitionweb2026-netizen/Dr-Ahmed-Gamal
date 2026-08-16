import { getLocale, getTranslations } from "next-intl/server";
import { Icon } from "@/components/Icon";
import { StarRating } from "@/components/StarRating";
import { getTestimonials } from "@/services/testimonials";

export async function BeforeAfterTestimonials() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.beforeAfter.testimonials");
  const testimonials = await getTestimonials();

  // Cases & Reviews.html's own 8-reviewer set — excludes the 3 testimonials
  // that are scoped to the Home page (`featuredOnHome`) so this page shows the
  // same 8 reviewers the legacy mockup did, not the merged 11.
  const pageTestimonials = testimonials.filter((testimonial) => !testimonial.featuredOnHome);

  return (
    <section className="relative overflow-hidden border-y border-brand-gold/10 bg-brand-dark py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/10 opacity-50 blur-[120px]"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center font-serif text-4xl text-brand-light">{t("heading")}</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {pageTestimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="card-glow-halo flex flex-col gap-6 rounded-2xl border border-brand-gold/30 bg-gradient-to-br from-brand-dark/40 to-brand-darker/60 p-8 shadow-2xl backdrop-blur-xl transition-transform hover:-translate-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/10">
                  <Icon name="person" className="h-4 w-4 text-brand-gold/60" />
                </div>
                <Icon name="format_quote" className="h-8 w-8 text-brand-gold/50" />
              </div>
              <StarRating rating={testimonial.rating} />
              <blockquote className="flex-1 leading-relaxed text-brand-light/80">
                &ldquo;{testimonial.quote[locale]}&rdquo;
              </blockquote>
              <div className="mt-auto flex items-center justify-between border-t border-brand-gold/10 pt-4">
                <div>
                  <figcaption className="text-label-sm uppercase tracking-widest text-brand-gold">
                    {testimonial.name}
                  </figcaption>
                  {testimonial.procedureName && (
                    <p className="mt-0.5 text-xs text-brand-light/50">{testimonial.procedureName[locale]}</p>
                  )}
                </div>
                <div className="h-2 w-2 rounded-full bg-brand-gold/40 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
