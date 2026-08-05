import Image from "next/image";
import type { ReactNode } from "react";

interface PageHeroProps {
  image: string;
  eyebrow?: string;
  title: ReactNode;
  paragraph?: string;
  children?: ReactNode;
}

export function PageHero({ image, eyebrow, title, paragraph, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-darker pb-20 pt-40">
      <div className="absolute inset-0 z-0">
        <Image src={image} alt="" fill priority className="object-cover opacity-40" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/70 to-brand-darker/40" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">{eyebrow}</p>
        )}
        <h1 className="mt-4 font-serif text-4xl text-brand-light sm:text-5xl lg:text-6xl">{title}</h1>
        {paragraph && (
          <p className="mt-6 text-lg leading-relaxed text-brand-light/70">{paragraph}</p>
        )}
        {children && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">{children}</div>
        )}
      </div>
    </section>
  );
}
