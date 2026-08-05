import { getLocale, getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { StarRating } from "@/components/StarRating";
import { testimonials } from "@/content/testimonials";

const featured = testimonials.filter((t) => t.featuredOnHome);

export async function TestimonialsPreview() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.home.testimonials");
  const cta = await getTranslations("cta");

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
          <CTAButton href="/before-after" variant="ghost" showArrow>
            {cta("showMore")}
          </CTAButton>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {featured.map((testimonial) => (
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
