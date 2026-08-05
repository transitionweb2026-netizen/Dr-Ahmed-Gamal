import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { procedures } from "@/content/procedures";
import { videos } from "@/content/videos";
import { getGalleryImages } from "@/utils/images";

// Below-the-fold and Framer-Motion-heavy (3D transforms) — split into its own
// chunk instead of the main About page bundle, with a skeleton while it loads.
const CoverflowGallery = dynamic(
  () => import("@/components/CoverflowGallery").then((m) => m.CoverflowGallery),
  {
    loading: () => (
      <div className="h-80 animate-pulse rounded-2xl bg-brand-darker/50 sm:h-96" />
    ),
  },
);

const pool = Array.from(
  new Set([...procedures.map((p) => p.image), ...videos.map((v) => v.thumbnail)]),
);
const images = getGalleryImages(pool, 20);

export async function PhotoGallery() {
  const t = await getTranslations("pages.about.gallery");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 font-serif text-4xl text-brand-light">{t("heading")}</h2>
        </div>

        <CoverflowGallery images={images} />
      </div>
    </section>
  );
}
