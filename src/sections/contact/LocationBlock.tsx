import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/Icon";

interface LocationBlockProps {
  image: string;
  imageAlt: string;
  heading: string;
  tagline: string;
  address: string;
  mapsUrl: string;
}

export async function LocationBlock({ image, imageAlt, heading, tagline, address, mapsUrl }: LocationBlockProps) {
  const cta = await getTranslations("cta");

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="gold-glass-card grid grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={cta("getDirections")}
            className="group relative block h-64 md:h-auto"
          >
            <Image src={image} alt={imageAlt} fill className="object-cover object-top" sizes="(min-width: 768px) 50vw, 100vw" />
            <div className="absolute inset-0 flex items-center justify-center bg-brand-darker/0 transition-colors duration-300 group-hover:bg-brand-darker/40">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-gold bg-brand-darker/70 text-brand-gold opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <Icon name="map" className="h-6 w-6" />
              </div>
            </div>
          </a>

          <div className="flex flex-col justify-center bg-brand-dark/40 p-8 backdrop-blur-md md:p-12">
            <h2 className="mb-2 text-headline-md font-serif text-brand-light">{heading}</h2>

            <p className="mb-6 flex items-center gap-2 text-body-md text-brand-gold">
              <Icon name="location_on" className="h-5 w-5 shrink-0" />
              {tagline}
            </p>

            <p className="mb-8 text-body-md text-brand-light/70">{address}</p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-brand-gold px-6 py-3 text-button uppercase text-brand-gold transition-colors hover:bg-brand-gold/10"
            >
              <Icon name="map" className="h-4 w-4" />
              {cta("getDirections")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
