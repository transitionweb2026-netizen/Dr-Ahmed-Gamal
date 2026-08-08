import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { getProcedures } from "@/services/procedures";
import { getVideos } from "@/services/videos";
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

export async function PhotoGallery() {
  const t = await getTranslations("pages.about.gallery");
  const [procedures, videos] = await Promise.all([getProcedures(), getVideos()]);

  const pool = Array.from(
    new Set([...procedures.map((p) => p.image), ...videos.map((v) => v.thumbnail)]),
  );
  const images = getGalleryImages(pool, 20);

  return (
    <section className="relative overflow-hidden bg-brand-darker py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
        </div>

        <CoverflowGallery images={images} />
      </div>
    </section>
  );
}
